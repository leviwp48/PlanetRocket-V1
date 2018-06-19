<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use \App\JoinRequest;

use \App\Project;

use \App\User;

use Log;

class JoinRequestController extends Controller
{


	/**
	 * validate the request. similar to the corresponding function in the UserController file.
	 *
	 */
	protected function validateProjectJoinRequest($request) {
	$errs = [];

	$introduction = trim($request->input('introduction'));

	$needs = trim($request->input('needs'));

	$ownerID = trim($request->input('owner_id'));

	$projectID = trim($request->input('project_id'));	

	$projectName = trim($request->input('project_name'));

	$senderName = trim($request->input('sender_name'));

		if(!$introduction || $introduction == "") {
		$newErr = ["field"=>"introduction", "message"=>"Please tell us a little about yourself!"];
		$errs[] = $newErr;
		}
		if(!$needs || $needs == "") {
		$newErr = ["field"=>"needs", "message"=>"Please select at least requirement that you can give us hand with!"];
		$errs[] = $newErr;
		}
		if(!$ownerID || $ownerID == "") {
		$newErr = ["field"=>"owner_id", "message"=>"Missing project owner."];
		$errs[] = $newErr;
		}
		if(!$projectID || $projectID == "") {
		$newErr = ["field"=>"project_id", "message"=>"Missing project id."];
		$errs[] = $newErr;
		}
		if(!$projectName || $projectName == "") {
		$newErr = ["field"=>"project_name", "message"=>"Missing project name."];
		$errs[] = $newErr;
		}
		if(!$senderName || $senderName == "") {
		$newErr = ["field"=>"sender_name", "message"=>"Missing sender name."];
		$errs[] = $newErr;
		}


	return $errs;
	}


 
	/** 
	 * send off a join request to the owner of the project and post notifications in both the user
	 * and the recipient of the project.
     *
     */
	public function request_join_project(Request $request) {

	$errs = $this->validateProjectJoinRequest($request);

	$introduction = trim($request->input('introduction'));

	$needs = trim($request->input('needs'));

	$ownerID = trim($request->input('owner_id'));

	$projectID = trim($request->input('project_id'));	

	$projectName = trim($request->input('project_name'));

	$senderName = trim($request->input('sender_name'));

	$user = Auth::user();

		if(count($errs) > 0) {
		return json_encode(["message"=>"Form failed with errors.", "success"=>false, "errors"=>$errs]);
		} else {

		$userID = $user->id;

		Log::info("needs: ".$needs);

		//send the join-request.
		$join = new JoinRequest();
		$join->recipient_id = $ownerID;
		$join->sender_id = $userID;
		$join->sender_name = $senderName;
		$join->project_id = $projectID;
		$join->project_name = $projectName;
		$join->message = $introduction;
		$join->needs = $needs;
		$join->message_type = "request_to_join";
		$join->save();

		//make notification messages for both the user and the recipient
		$notificationID = "join-request-".$join->id;
		$userNotification = "You just requested to join the project \"".e($projectName)."\"";
		$ownerNotificaion = e($senderName)." would like to join ".e($projectName)."!";

		//add the notifications the user and the recipient. they'll appear in the drop-down widgets.
		$user->addNotification(["uid"=>$notificationID, "project"=>$projectID, "message"=>$userNotification, "type"=>"join_request_outgoing", "id"=>$join->id]);
		$user->save();

		$recipient = User::where("id", $ownerID)->firstOrFail();
		$recipient->addNotification(["uid"=>$notificationID, "project"=>$projectID, "message"=>$ownerNotificaion, "type"=>"join_request_incoming", "id"=>$join->id]);
		$recipient->save();

		return json_encode(["message"=>"Form succeeded", "success"=>true, "errors"=>[]]);
		}

	}

	

	/**
	 * respond to a join request by just altering some of the properties of the join-request and re-saving it. 
	 * If there is a message for the recipent, then we'll add a notification to the recipient's data as well. 
	 *
	 * there's a few important types here:
	 * request_to_join
	 *      some has sent a fresh request-to-join a project, and no action has been taken yet
	 *
	 * request_to_join_rejected
	 *		the owner of the project has decided to reject the request, but there's no message.
	 *      in this case, the request record will be deleted.
	 *
	 * request_to_join_rejected_with_message
	 *      the owner of the project has decided to reject the request, but there IS a message.
	 *
	 * request_to_join_accepted
	 *		The owner has accepted the request.
	 *
	 */
	public function respond_to_join_request(Request $request) {

	$userName = Auth::user()->name;

	$joinRequestID = $request->input("join_request_id");
	$messageToUser = trim($request->input("message_to_user"));
	$granted = ($request->input("granted") == "yes") ? true : false;

	$joinRequestOld = JoinRequest::find($joinRequestID);
	$projectID = $joinRequestOld->project_id;
	$projectName = $joinRequestOld->project_name;
	$needs = $joinRequestOld->needs;
	$sendToID = $joinRequestOld->sender_id;


		if(!Project::doesProjectIDBelongToUser($joinRequestOld->project_id)) {
		return response()->json([
			     "message" => "join request pertains to a project that doesn't belong to this user."
			   ], 500);
		} 
		if(!$joinRequestOld) {
		return response()->json([
			     "message" => "join request not found."
			   ], 500);
		}

	$sendToUser = User::find($sendToID);

		//complain if there's no user to send this to.
		if(!$sendToUser) {
		return response()->json([
			     "message" => "no user found for id: ".$sendToID
			   ], 500);	
		}

	$joinRequestOld->delete();

	$joinRequest = new JoinRequest();
	$joinRequest->project_id = $projectID;
	$joinRequest->project_name = $projectName;
	$joinRequest->needs = $needs;
	$joinRequest->recipient_id = $sendToID;
	$joinRequest->sender_id = Auth::user()->id;
	$joinRequest->sender_name = Auth::user()->name;
	$joinRequest->message = $messageToUser;
	$joinRequest->save();

		if(!$granted) {

			if($messageToUser == "") {
			$joinRequest->message_type = "request_to_join_rejected";
			} else {
			$joinRequest->message_type = "request_to_join_rejected_with_message";
			$sendToUser->addNotification(
				["uid"=>"join-request-".$joinRequest->id, 
				"project"=>$joinRequest->project_id, 
				"project_name"=>$joinRequest->project_name,
				"sender_name"=>$userName,
				"message"=>$userName." has sent you a message.", 
				"type"=>"request_to_join_rejected_with_message", 
				"id"=>$joinRequest->id]);

			$sendToUser->save();
			}

		} else {

		//attach the requester to the project, as an "involved" person.
		$requestedProject = Project::getFoundProject();
		$requestedProject->users()->attach([$sendToID=>['auth'=>'involved']]);
		$requestedProject->save();


		$joinRequest->message_type = "request_to_join_accepted";

			$sendToUser->addNotification(
			["uid"=>"join-request-".$joinRequest->id, 
			"project"=>$joinRequest->project_id, 
			"project_name"=>$joinRequest->project_name,
			"sender_name"=>$userName,
			"message"=>$userName." has sent you a message!", 
			"type"=>"request_to_join_accepted", 
			"id"=>$joinRequest->id]);

		$sendToUser->save();
		}

		if($joinRequest->message_type != "request_to_join_rejected") {
		$joinRequest->save();
		} else {
		//we already deleted the old one, so we just won't create the new one.
		$joinRequest->delete();
		}
		
	}



	/**
	 * the user has read the join request, so if it's in an end-of-life state then we can delete it.
	 *
	 */
	public function join_request_is_finished(Request $request) {

		try {

		$userID = Auth::user()->id;
		$joinRequestID = $request->input("join_request_id");
		$joinRequest = JoinRequest::find($joinRequestID);

			//make sure that the join-request is actually intended for this user,
		    //and that it's actually in an end-of-life state where it has been rejected with a message
		    //or accepted.
			if($joinRequest->recipient_id == $userID) {

			$response = [];
			$response['project_id'] = $joinRequest->project_id;
			$response['project_name'] = $joinRequest->project_name;
			$response['sender_id'] = $joinRequest->sender_id;
			$response['sender_name'] = $joinRequest->sender_name;
			$response['message'] = $joinRequest->message;
			$response['message_type'] = $joinRequest->message_type; 

				if($joinRequest->message_type == "request_to_join_rejected_with_message" || $joinRequest->message_type == "request_to_join_accepted") {
				$joinRequest->delete();
				return json_encode($joinRequest);
				}

			}

		return response()->json([
				     "message" => "server error: join-request does not belong to the user or it is not in its end-of-life state yet."
				   ], 500);	

		} catch(Exception $e) {
		return response()->json([
				     "message" => "server error: ".$e->getMessage()
				   ], 500);	
		}



	}



	/**
	 * a hook to return a join-request with an id.
	 *
	 */
	public function get_join_request(Request $request) {

	$userID = Auth::user()->id;

	$jrID = $request->input("join_request_id");

		if(!$jrID) {
		return response()->json([
			     "message" => "no id found in request"
			   ], 500);
		}

	$jRequest = JoinRequest::join('users', 'users.id', '=', 'join_requests.sender_id')
		->where("join_requests.id","=",$jrID)
		->select('join_requests.*', 'users.email as email','users.name as name')
		->first();

		if(!$jRequest) {
		return response()->json([
			     "message" => "no join request found for id ".$jrID
			   ], 500);
		}

	return json_encode($jRequest);
	}



	/**
	 * this is for the table that appears on the edit-view of a project. The client
	 * will display the users that have requested to join the project.
	 *
	 */
	public function join_request_table_service(Request $request) {

	$userID = Auth::user()->id;

	$projectID = $request->input("project_id");

		//double check to make sure that the user owns this project. 
		if(!Project::doesProjectIDBelongToUser($projectID)) {
		return json_encode(["user-owns"=>"no"]);
		}

	$rowsPerPage = intval( $request->input("rows_per_page") ); //integer

	$whichPage = intval( $request->input("which_page") ); //0 indexed

	//returns an empty string if there's no input
	$sortField = $request->input("sort_field");

	$sortDir   = $request->input("sort_dir") == "ASC" ? "ASC" : "DESC"; 

	$count = JoinRequest::where("project_id",$projectID)->where("message_type", "request_to_join")->count();

	//get the actual data records
		$query = JoinRequest::take($rowsPerPage);

		$query->skip($whichPage * $rowsPerPage);

			if($sortField != "") {
			$query->orderBy($sortField, $sortDir);
			}

	$results = $query->join('users', 'users.id', '=', 'join_requests.sender_id')
		->where("project_id",$projectID)->where("message_type", "request_to_join")
		->select('join_requests.*', 'users.email as email','users.name as name')
		->get();

	$response = ["data"=>$results, "count"=>$count];

	return json_encode($response);

	}





}
