<?php

////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                        //
//  UserController                                                                        //
//                                                                                        //
//  A crud-style controller. Has sections for creating, updating and a table-service to   //
//  see all of the projects associated with the current user.                             //
//                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////



namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use \App\Project;

use \App\Need;

use \App\User;

use \App\JoinRequest;

use \App\ProjectCoverImage;

use \App\InnoDbTableStatistic;

use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Facades\DB;

use Log;


class UserController extends Controller {


	/**
	 * a helper function to get the needs hierarchy and turn it into
	 * a nested array structure. this is always tricky because of PHP's stupid stupid stupid
	 * pass-by-value rules for arrays.
	 *
	 */
	protected function getNeedsTreeAsJSON() {
	$needs = Need::all();
	$i=0;
	$len = count($needs);
	$rootContainer;
	$rootKey = '';

	$containers = [];

	$log = '';

		for($i=0; $i<$len; $i++) {
		$need = $needs[$i];
		$needID = $need['id'];
		$needIDKey = $needID.'_key';
		$parentID = $need['parent_id'];
		$parentIDKey = $parentID.'_key';
		$name = $need['name'];
		$desc = $need['description'];
		$isRoot = $i == 0;


			//if there isn't a container for this ID, then make one
		    //and add it to the containers
			if(!@$containers[$needIDKey]) {
			$containers[$needIDKey] = ['id'=>$needID, 'name'=>$name, 'description'=>$desc, 'children'=>[]];

				//record the root container
				if($isRoot) {
				$rootKey = $needIDKey;
				}

			}

			if(!$isRoot) {
			$containers[$parentIDKey]['children'][] = &$containers[$needIDKey];
			}

		}


	return json_encode($containers[$rootKey]);
	}


	/**
	 * a helper function to validate the errors coming from a request for a project.
	 *
	 */
	protected function validateProjectRequest($request) {
	$errs = [];

	$projectName = trim($request->input('name'));

	$needs = trim($request->input('needs'));

	$projectDescription = trim($request->input('description'));

	$projectShortDescription = trim($request->input('short_description'));

	$needsArray = json_decode( trim($request->input('needs')),  true);

		if(!$projectName || $projectName == "") {
		$newErr = ["field"=>"name", "message"=>"Your project must have a name!"];
		$errs[] = $newErr;
		}

		if(!$projectDescription || $projectDescription == "") {
		$newErr = ["field"=>"description", "message"=>"Your project must have a description!"];
		$errs[] = $newErr;
		}

		if(!$projectShortDescription || $projectShortDescription == "") {
		$newErr = ["field"=>"short_description", "message"=>"Your project must have a short description!"];
		$errs[] = $newErr;
		}

		if(!$needsArray) {
		$newErr = ["field"=>"needs", "message"=>"Your project must have at least 1 requirement!"];
		$errs[] = $newErr;
		} else
		if(count($needsArray) == 0) {
		$newErr = ["field"=>"needs", "message"=>"Your project must have at least 1 requirement!"];
		$errs[] = $newErr;
		}

	return $errs;
	}



	/**
	 * A helper function used for project images.
	 * We get the new project-images from the client and we compare them against the old project
	 * images and this function will tell us which ones need to be added, which need to be edited
	 * and which ones weill get deleted.
	 *
	 */
	protected function getAddDeleteEdit($news, $olds) {

	$newToAdd    = [];
	$oldToDelete = [];
	$editThese   = [];

		for($i=0; $i<count($news); $i++) {
		$new = $news[$i];
		$newID = $new["id"];
		$newWasFoundInOld = false;

			for($j=0; $j<count($olds); $j++) {
			$old = $olds[$j];

				if($newID == $old["id"]) {
				$newWasFoundInOld = true;
				$editThese[] = ["old"=>$old, "new"=>$new];
				}

			}

			if(!$newWasFoundInOld) {
			$newToAdd[] = $new;
			}

		}


		for($i=0; $i<count($olds); $i++) {
		$old2 = $olds[$i];
		$oldID = $old2["id"];
		$oldWasFoundInNew = false;

			for($j=0; $j<count($news); $j++) {
			$new = $news[$j];

				if($oldID == $new["id"]) {
				$oldWasFoundInNew = true;
				}

			}

			if(!$oldWasFoundInNew) {
			$oldToDelete[] = $old2;
			}

		}

	return ["add"=>$newToAdd, "delete"=>$oldToDelete, "edit"=>$editThese];
	}



	////////////////////////////////////////
	//                                    //
	//  notifications                     //
	//                                    //
	////////////////////////////////////////

	/**
	 * an ajax-hook to return the users notifications to the client
	 *
	 */
	public function get_notifications() {

	$user = Auth::user();

	$notifications = $user->notifications;

		if(!$notifications) {
		$notifications = '[]';
		}

	return $notifications;
	}

	/**
	 * an ajax hook that the user hits to delete a notification.
	 *
	 */
	public function remove_notification_for_id(Request $request) {

	$user = Auth::user();

	$uid = $request->input("notification_uid");

	$user->removeNotificationForID($uid);

	$user->save();

	return json_encode(["success"=>true]);
	}








	//////////////////////////////////////////////////////////////////////////////////
	//                                                                              //
	// Creating the project                                                         //
	//                                                                              //
    // These two end-points are the hooks to create a project. The view             //
    // to see the form and the ajax-hook that the form uses to create a new project //
    //                                                                              //
    //////////////////////////////////////////////////////////////////////////////////

	/**
	 * the form page
	 *
	 */
	public function new_project() {

	$user = Auth::user();


	return \View::make("new-project")
		->with("all_needs", $this->getNeedsTreeAsJSON())
		->with("user", $user)
		->with("logged_in", true);

	}

	/**
	 * the ajax hook. create a new Project, give it the needs and assign the user
	 * as the owner of the record.
	 *
	 */
	public function create_new_project(Request $request) {

	$user = Auth::user();

	//validate the input
	$errs = $this->validateProjectRequest($request);

		//if there were any form errors, then complain to the user.
		if(count($errs) > 0) {
		return json_encode(["message"=>"Form failed with errors.", "success"=>false, "errors"=>$errs]);
		}

		//else, get the inputs and create the project
		else {

		//the name
		$projectName = trim($request->input('name'));

		//the long description
		$projectDescription = trim($request->input('description'));

		//the short description
		$shortProjectDescription = trim($request->input('short_description'));

		//the images
		$projectImages = json_decode( trim($request->input('project_images')),  true);

		//the project needs. they come in as a json array of objects:
		//{"id":need-id, "user_description":the user description of the need}
        //do we're going to put these into an array so that laravel can digest them and
        //create all of the many-to-many connections with the sync function
		$needs = trim($request->input('needs'));
		$needsArrayFromForm = json_decode( trim($request->input('needs')),  true);

		$syncNeedData = [];

			for($i=0; $i<count($needsArrayFromForm); $i++) {
			$needObj = $needsArrayFromForm[$i];
			$needObjID = $needObj["id"];
			$needObjUserDescription = @$needObj["user_description"];
			$syncNeedData[$needObjID] = ["user_description" => $needObjUserDescription];
			}


		//save the new project,
		$project = new Project();
	    $project->name = $projectName;
	    $project->description = $projectDescription;
	    $project->short_description = $shortProjectDescription;
	    $project->save();

	    //sync it with the different needs that it has. this is a cool function to manage all of the
	    //pivot many-to-many connections automatically. painful code to write yourself and believe me I know.
	    $project->needs()->sync($syncNeedData);
	    $project->save();

	    //and attach the project to the user.
	    //you can use the id of the new project as soon as it's saved.
	    //So we're going to add this project to the list of projects for the user and save it
	    //note that we can use the project->id because we saved it in the last step.
	    //And we're also giving it ownership of the new project.
	    $user->projects()->attach([$project->id => ["auth"=>"owner"]]);
	    $user->save();

	    	//if we have project-images, then we're going to have to deal with them. the images were already uploaded
	        //as the user was using the form, and the id was returned to the user, and so now the ids of the project-images
	        //return to us in this endpoint, and basically we're going to take the id (correlation) of each project-image
	        //then hunt if down and "claim" it for this project.
	    	if($projectImages) {
	    	//heres the projectImages:
	    	//[{"file":"X_39-cf6d4f3ca1de08fa1b2647a12563c8e1.jpg","correlation":103,"description":"Testing 1 2 3"},
	    	//{"file":"X_39-opbhsd3cw6n01.jpg","correlation":104,"description":"Testng 4 5 6"}]

	    		//loop through and correlate all of the project-image records with this project.
	    		//the claimImageWithProject will handle the url and the file itself.
	    		for($i=0; $i<count($projectImages); $i++) {
	    		$projectImageFromClient = $projectImages[$i];

	    		$correlationID = $projectImageFromClient["correlation"];

	    		$projectCoverImage = ProjectCoverImage::find($correlationID);

	    			if(!$projectCoverImage) {
	    			return json_encode(["message"=>"Form failed.", "success"=>false, "errors"=>["Could not save image."]]);
	    			}

	    		$projectCoverImage->claimImageWithProject($project->id);
	    		$projectCoverImage->description = @$projectImageFromClient["description"];

	    		$projectCoverImage->save();
	    		}



			}


	    //everything's done, so return a json-response.
		return json_encode(["message"=>"Form succeeded.", "success"=>true, "errors"=>[], "created_record_id"=>$project->id]);
    	}


	}





	//////////////////////////////////////////////////////////////////////////////////
	//                                                                              //
	// Editing the project                                                          //
	//                                                                              //
    // These three end-points are used for editing a project                        //
    // We have the edit form view, the ajax hook to fetch the project for the form  //
    // and the ajax hook to edit the record                                         //
    //                                                                              //
    //////////////////////////////////////////////////////////////////////////////////


	/**
	 * edit the project. If the use doesn't own the project, then just return the read-only view of the project.
	 *
	 */
	public function edit_project($id) {

	$user = Auth::user();

		//check to see if the user owns the project. it would be pretty silly if
	    //we let people edit each others projects willy-nilly.
		if(Project::doesProjectIDBelongToUser($id)) {

		$name = Project::getFoundProject()->name;

		return \View::make("edit-project")
			->with("all_needs", $this->getNeedsTreeAsJSON())
			->with("user", $user)
			->with("logged_in", true)
			->with("project_name", $name);

		}

		//if they don't own the project, then just return the read-only view of the project.
		else {
		$project = Project::find($id);

		return $this->view_project($project);
		}

	}

	/**
	 * get the project. this hook is supposed to be kind of generic, and it's used
	 * by the edit form to fetch the record for editing.
	 *
	 */
	public function get_project(\App\Project $project) {

	//grab the id and get the needs.
	$projectID = $project->id;

		//This is the "Laravel" way of querying many-to-many connections, and I did this for a while,
	    //but eventually I needed to get not only needs for a project, but also the specific user-supplied
	    //description of each need as it pertains to their project. like "We need two vans with clean titles"
		// $needs = Need::whereHas('projects', function($q) use($projectID) {
		// $q->where('id', '=', $projectID);
		// })->get();

		//This is the way we have to do this in order to get both the needs AND their descriptions from the
	    //pivot table. As far as I can tell this kind of query is outside the abilities of Laravel's ORM.
		$selectNeedsRawQuery = "SELECT needs.*, need_project.*
		FROM needs

			INNER JOIN need_project
			ON needs.id = need_project.need_id

				INNER JOIN  projects
		        	ON need_project.project_id = projects.id

    	WHERE projects.id = :projectID";

		$needs = DB::select( DB::raw($selectNeedsRawQuery), array(
		   'projectID' => $projectID
		));


	//get the cover-images
	$projectCoverImages = ProjectCoverImage::where("project_id","=",$projectID)->get();

	//put together a response for the client.
	$toClient = [];
	$toClient['name'] = $project->name;
	$toClient['description'] = $project->description;
	$toClient['short_description'] = $project->short_description;
	$toClient['needs'] = $needs;
	$toClient['project_images'] = $projectCoverImages;

	return json_encode($toClient);
	}

	/**
	 * when the edit form is done, it's going to hit this hook with the edited record
	 * and this thing will do that editing and return the response to the client.
	 *
	 */
	public function edit_existing_project(Request $request) {

	$errs = $this->validateProjectRequest($request);

		if(count($errs) > 0) {
		return json_encode(["message"=>"Form failed with errors.", "success"=>false, "errors"=>$errs]);
		} else {
		$projectID = $request->input('id');

		//same thing as we did for the create_project function. Put together an array for laravel's
		//sync function to chew on.
		$needsArrayFromForm = json_decode( trim($request->input('needs')),  true);
		$syncNeedData = [];

			for($i=0; $i<count($needsArrayFromForm); $i++) {
			$needObj = $needsArrayFromForm[$i];
			$needObjID = $needObj["id"];
			$needObjUserDescription = @$needObj["user_description"];
			$syncNeedData[$needObjID] = ["user_description" => $needObjUserDescription];
			}

		//get the project.
		$project = Project::findOrFail($projectID);

		$projectImagesEditedFromClient = json_decode( trim($request->input('project_images')),  true);

			//get the add-edit-delete lists from the old project images to the new project images and
		    //rectify everything.
			if($projectImagesEditedFromClient) {

			$arrayOfProjectCoverImagesObjsFromClient = [];

				for($i=0; $i<count($projectImagesEditedFromClient); $i++) {
				$fromClient = $projectImagesEditedFromClient[$i];
				$fromClientProjectCoverImageID = $fromClient["correlation"];
				$descriptionFromClient = @$fromClient["description"];
				$fromClientObj = ["id"=>$fromClientProjectCoverImageID, "url"=>$fromClient["file"], "description"=>$descriptionFromClient];
				$arrayOfProjectCoverImagesObjsFromClient[] = $fromClientObj;
				}

			$projectCoverImagesCurrent = ProjectCoverImage::where("project_id","=",$projectID)->get();

			//get the three lists of things to rectify here. the new records to add, the old records to delete
			//and the current records that need editing.
			$addDeleteEdit = $this->getAddDeleteEdit($arrayOfProjectCoverImagesObjsFromClient, $projectCoverImagesCurrent);

			$projectCoverImagesToAdd = &$addDeleteEdit["add"];
			$projectCoverImagesToDelete = $addDeleteEdit["delete"];
			$projectCoverImagesToEdit = $addDeleteEdit["edit"];


				//add the new project cover images. loop through, and claim the ProjectCoverImage.
			    //Note that we're NOT creating a new ProjectCoverImage here. And why? because
			    //the ProjectCoverImage gets created when the image is uploaded. All we have
			    //to do here is CLAIM the cover image and update it.
				for($i=0; $i<count($projectCoverImagesToAdd); $i++) {
				$addObj = $projectCoverImagesToAdd[$i];
				$newCoverImage = ProjectCoverImage::find($addObj["id"]);
				$newCoverImage->url = $addObj["url"];
				$newCoverImage->description = @$addObj["description"];
				$newCoverImage->claimImageWithProject($projectID);
				$newCoverImage->save();
				}

				//llop through and delete the project-cover-image records as well as the actual files
				for($i=0; $i<count($projectCoverImagesToDelete); $i++) {
				$coverImageToDelete = $projectCoverImagesToDelete[$i];
				$coverImageToDelete->delete();
				Storage::delete('public/project-cover-images/'.$coverImageToDelete["url"]);
				}

				//loop through and make the existing project-cover-image match the edited data from the client.
				for($i=0; $i<count($projectCoverImagesToEdit); $i++) {
				$oldNew = $projectCoverImagesToEdit[$i];
				$oldCoverImageToEdit = $oldNew['old'];
				$newCoverImageData = $oldNew['new'];
				//the description is the only thing to edit here.

				$oldCoverImageToEdit->description = @$newCoverImageData["description"];
				$oldCoverImageToEdit->save();


				}

			}

			//else, there are no cover-images, so they were all deleted.
			else {
			$project->project_cover_images()->delete();
			}


		//save the changes to the project, and refresh the project-cover-images.
		$project->name = $request->input('name');
		$project->description = $request->input('description');
		$project->short_description = $request->input('short_description');
		$project->needs()->sync($syncNeedData);

		$project->save();

		$response = ["message"=>"Record was successfully edited.", "success"=>true, "errors"=>[]];

		return json_encode($response);
		}

	}


	//////////////////////////////////////////////////////////////////////////////////                                                //
	//                                                                              //
	// some regular old pages like the index page, about us blah blah               //
    //                                                                              //
    //////////////////////////////////////////////////////////////////////////////////


	public function home_page() {
	$user = Auth::user();
	$loggedIn = $user ? true : false;
	return \View::make("index")
		->with("user", $user)
		->with("logged_in", $loggedIn);
	}
	public function contact() {
	$user = Auth::user();
	$loggedIn = $user ? true : false;
	return \View::make("contact")
		->with("user", $user)
		->with("logged_in", $loggedIn);
	}
	public function about() {
	$user = Auth::user();
	$loggedIn = $user ? true : false;
	return \View::make("about")
		->with("user", $user)
		->with("logged_in", $loggedIn);
	}
	public function calendar() {
	$user = Auth::user();
	$loggedIn = $user ? true : false;
	return \View::make("calendar")
		->with("user", $user)
		->with("logged_in", $loggedIn);
	}







	//////////////////////////////////////////////////////////////////////////////////
	//                                                                              //
	// SeeinG the user's projects                                                   //
	//                                                                              //
	// The view for the projects table for the user, and the table-service hook     //
    //                                                                              //
    //////////////////////////////////////////////////////////////////////////////////


	public function all_projects() {
	$user = Auth::user();
	$loggedIn = $user ? true : false;
	return \View::make("all-projects")
		->with("user", $user)
		->with("logged_in", $loggedIn);
	}

	/**
	 * the view to see all of the projects that the user is involved in.
	 * this will give the user the information to populate their project-tables
	 *
	 */
	public function projects() {

	//just a testing variable
	$scifi = "Star Trek";

	$user = Auth::user();

	$userEmail = $user['email'];

	$userID = $user['id'];

	$rowsPerPage = 10;
	$whichPage = 0;

	$projects = Project::take($rowsPerPage)
		->skip($whichPage * $rowsPerPage)
		->whereHas('users', function($q) use($userID) {
			 $q->where('id', '=', $userID);
		 })->get();

	//get the count so that we can show the user the total number of records
	//as well as get accurate pagination.
	//we can do it this way on InnoDB as long as we're using where clauses.
	$count = Project::whereHas('users', function($q) use($userID) {
	$q->where('id', '=', $userID);
	})->count();


	//get all of the needs that this user is able to provide.
	$needs = Need::whereHas('users', function($q) use($userID) {
	$q->where('id', '=', $userID);
	})->get();

	//set these guys on the view.
	return \View::make("user-projects")
		->with("scifi", $scifi)
		->with("email", $userEmail)
		->with("projects_json", json_encode(["data"=>$projects, "count"=>$count]))
		->with("needs_json", json_encode($needs))
		->with("user", $user)
		->with("logged_in", true);

	}



	/**
	 * the view for the readonly version of the project. Return the project
	 * as well as all of the users who are attached to it and the needs.
	 *
	 */
	public function view_project(\App\Project $project) {

	$user = Auth::user();
	$isUser = ($user) ? true : false;

	//grab the id and get the needs.
	$projectID = $project->id;

		//same deal. we need the individual descriptions as well as the needs themselves,
	    //so we no choice but to do a query outside of the ORM.
		//get all of the needs that this user is able to provide.
		// $needs = Need::whereHas('projects', function($q) use($projectID) {
		// $q->where('id', '=', $projectID);
		// })->get();

		$selectNeedsRawQuery = "SELECT needs.*, need_project.*
		FROM needs

			INNER JOIN need_project
			ON needs.id = need_project.need_id

				INNER JOIN  projects
		        	ON need_project.project_id = projects.id

    	WHERE projects.id = :projectID";

		$needResults = DB::select( DB::raw($selectNeedsRawQuery), array(
		   'projectID' => $projectID
		));

	//put together an array of needs to the user, with the name, the id and the individual description.
	$needsForClient = [];

		foreach($needResults as $i=>$needResult) {
		$n = (array)$needResult;
		$needForClient = [];
		$needForClient['id'] = $n['id'];
		$needForClient['user_description'] = @$n['user_description'];
		$needForClient['name'] = $n['name'];
		$needsForClient[] = $needForClient;
		}

		//get all of the project images associated with this project.
		$projectCoverImages = ProjectCoverImage::where("project_id","=",$projectID)->get();

		//get all of the users associated with this project.
		$projectUsers = User::whereHas('projects', function($q) use($projectID) {
		$q->where('id', '=', $projectID);
		})->get();

		//get the owner of the project.
		$owner = User::whereHas('projects', function($q) use($projectID) {

					$q->where(function ($query2) use($projectID) {
					    $query2
						->where('id', '=', $projectID)
					 	->where('project_user.auth', '=', 'owner');
					});

				})->first();

		if(!$owner) {
		throw new Exeception("Error view_project: owner not found!");
		}

		//the id of the owner of the project
		$ownerID = $owner->id;

		//the number of times the user has requested to join the project
		$numberOfJoinRequests = 0;

		//if the user is logged-in, then we want to know how this user is involved
		//with the project.
		$userProjectRole = "none";

			if($isUser) {
			$userID = $user->id;

				if($ownerID == $userID) {
				$userProjectRole = "owner";
				} else {

					for($i=0; $i<count($projectUsers); $i++) {
					$pUser = $projectUsers[$i];
						if($userID == $pUser->id) {
						$userProjectRole = "involved";
						break;
						}
					}

				}

			$numberOfJoinRequests = JoinRequest::where("sender_id", $userID)->where("project_id", $projectID)->count();
			}


	//put together a response for the client.
	$toClient = [];
	$toClient['name'] = $project->name;
	$toClient['description'] = $project->description;
	$toClient['short_description'] = $project->short_description;
	$toClient['needs'] = $needsForClient;
	$toClient['logged_in'] = $isUser;
	$toClient['user_project_role'] = $userProjectRole;
	$toClient["cover_images"] = $projectCoverImages;
	$toClient["project_users"] = $projectUsers;
	$toClient["owner"] = $owner;
	$toClient["did_send_join_request"] = ($numberOfJoinRequests > 0);


	return \View::make("view-project-read-only")
	->with("project_info", json_encode($toClient))
	->with("user", $user)
	->with("needs", $needsForClient)
	->with("owner_id", $ownerID)
	->with("project_id", $projectID)
	->with("project_name",$project->name)
	->with("logged_in", $isUser);

	}


	/**
	 * here's the ajax end-point which powers the table on the home page, as well as the user project page.
	 * The basic way that these kinds of endpoints work is that they have to get a certain page of records
	 * with a certain sorting and then also return the total count of records, and this is how we get pagination
	 * working on the client-side.
	 *
	 */
	public function projects_table_service(Request $request) {

	//For later. Get Laravel to issue flat arrays instead of kvps. why would we bother? to make the responses smaller
	//and faster so that they don't repeat the field names all the time.
	//https://laracasts.com/discuss/channels/eloquent/eloquent-results-as-array-instead-of-object

	$isUser = ($request->input("user_specific") == "true");

	//ser_owns, user_doesnt_own, all
	$userRelation = $request->input("user_relation");

	$rowsPerPage = intval( $request->input("rows_per_page") ); //integer

	$whichPage = intval( $request->input("which_page") ); //0 indexed

	//returns an empty string if there's no input
	$sortField = $request->input("sort_field");

	$sortDir   = $request->input("sort_dir") == "ASC" ? "ASC" : "DESC";

	//https://stackoverflow.com/questions/29276065/order-by-row-and-limit-result-in-laravel-5
	//https://stackoverflow.com/questions/15229303/is-there-a-way-to-limit-the-result-with-eloquent-orm-of-laravel

		//if it's not for user-specific projects, then we're going to just show all of them, and this is the
	    //case for the projects-table on the front page.
		if(!$isUser) {

		$count = Project::all()->count();

		$query = Project::take($rowsPerPage);

		$query->skip($whichPage * $rowsPerPage);

			if($sortField != "") {
			$query->orderBy($sortField, $sortDir);
			}

		$projects = $query->get();

		$response = ["data"=>$projects, "count"=>$count];

		//return json_encode($projects);
		return json_encode($response);

		}

		//else, this is being used for user-specific tables and in that case we need
		//to get either all of the projects that the user is involved with, or
		//projects that the user owns, or projects that the user is involved with, but doesn't own.
		else
		if($isUser) {

		$user = Auth::user();

		$userEmail = $user['email'];

		$userID = $user['id'];


			if($userRelation == "all") {

				$count = Project::whereHas('users', function($q) use($userID) {
					$q->where('id', '=', $userID);
					})
				->count();

			} else
			if($userRelation == "user_owns") {

				$count = Project::whereHas('users', function($q) use($userID) {

						$q->where(function ($query2) use($userID) {
						    $query2
							->where('id', '=', $userID)
						 	->where('project_user.auth', '=', 'owner');
						});

					})
				->count();

			} else {

			//https://stackoverflow.com/questions/28256933/eloquent-where-not-equal-to
			//you need this orWhereNull thing or it won't catch the nulls. of course.
			//actually, this type of query turned out to be really problematic, so
			//I redid the database and just made a default value to get around this null issue.
				$count = Project::whereHas('users', function($q) use($userID) {

						$q->where(function ($query2) use($userID) {
						    $query2
							->where('id', '=', $userID)
						 	->where('project_user.auth', '!=', 'owner');//->orWhereNull('project_user.auth');
						});

					})
				->count();

			}


		//get the actual data records
		$query = Project::take($rowsPerPage);

		$query->skip($whichPage * $rowsPerPage);

			if($sortField != "") {
			$query->orderBy($sortField, $sortDir);
			}

			//if all involved projects, the ones that the user owns and the ones that the user doesn't own
			if($userRelation == "all") {

				$query->whereHas('users', function($q) use($userID) {
					$q->where('id', '=', $userID);
				});

			}

			//if just the projects that the user owns.
			else
			if($userRelation == "user_owns") {

				$query->whereHas('users', function($q) use($userID) {

					$q->where(function ($query2) use($userID) {
					    $query2
						->where('id', '=', $userID)
					 	->where('project_user.auth', '=', 'owner');
					});

				});

			}


			//if just the projects that the user is involved with but doesn't own.
			else {

				$query->whereHas('users', function($q) use($userID) {

					$q->where(function ($query2) use($userID) {
					    $query2
						->where('id', '=', $userID)
					 	->where('project_user.auth', '!=', 'owner');
					});

				});

			}


		$projects = $query->get();

		//return the page of data and the count of the full table.
		$response = ["data"=>$projects, "count"=>$count];

		return json_encode($response);
		}



	}


}
