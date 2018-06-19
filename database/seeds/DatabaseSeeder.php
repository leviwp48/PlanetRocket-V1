<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;


use App\User;
use App\Project;
use App\Need;
use App\ProjectCoverImage;

//use Log;


class DatabaseSeeder extends Seeder
{


private $_storedSeederCoverImages;

private $_coverImgsMinID = 0;


    //In order to test these things, we need to have projects that each user owns, projects that both users
    //are involved in together, and then projects that both users are involved in separately. 
    //
    // own and involved in groups of 10.
    // user1 o o o i i i     
    // user2         i i i o o o 
    // So each one has 10 project that it's involved with that's unique, and 20 that it shares with the other, 
    // and then 30 that each one owns exclusively.
    private function projectsAndNeedsForUser($user, $userOneOrTwo, $projectIDs, $needConnections) {

    $minProjectID = Project::min('id');
    $projectConnections = [];

        //create some projects for the user to be involved in
        for($i=0; $i<count($projectIDs); $i++) {
        $pID = $projectIDs[$i];
       
            //we want our test user to own 50 project and be involved in 50 others
            //https://laravel.com/docs/5.2/eloquent-relationships#inserting-many-to-many-relationships
            //We have to put together this kind of array:
            //$user->roles()->sync([1 => ['expires' => true], 2, 3]);
            //Ugh- php and its weird arrays

            //divy the projects between the two users. 
            //some will be owned by one user, some will be owned by the other user.
            if($userOneOrTwo) {

                //own and involved in groups of 10.
                //user1 o o o i i i     
                //user2         i i i o o o 
                //So each one has 10 project that it's involved with that's unique, and 20 that it shares with the other, 
                //and then 30 that each one owns exclusively.

                //owns 0-29, involved with 30-59
                if($i < 30) {
                $projectConnections[$pID] = ["auth"=>"owner"];
                } else 
                if($i >= 30 && $i < 60) {
                $projectConnections[] = $pID;  
                }

            } else {

                //involved with 40-69, owns 70-99,
                if($i >= 70 && $i < 100) {
                $projectConnections[$pID] = ["auth"=>"owner"];
                } else
                if($i >= 40 && $i < 70) {
                $projectConnections[] = $pID;   
                }
   
            }

        }

    $user->projects()->sync($projectConnections);
    $user->needs()->sync($needConnections);
    $user->save();

    }

    private function renameProjectsForUser($user, $prefix, $userOneOrTwo, $projectIDs) {

        if($userOneOrTwo) {

            //loop through and connect these projects to the needs.
            for($i=0; $i<count($projectIDs); $i++) {

                if($i < 60) {
                $pID = $projectIDs[$i];
                $project = Project::where('id',$pID)->firstOrFail();
                $name = $project->name;
                $project->name = $prefix.' '.$name;
                $project->save();
                }

            }

        } else {

            for($i=0; $i<count($projectIDs); $i++) {

                if($i >= 40) {
                $pID = $projectIDs[$i];
                $project = Project::where('id',$pID)->firstOrFail();
                $name = $project->name;
                $project->name = $prefix.' '.$name;
                $project->save();
                }

            }

        }

    }


    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {

	//allows us to fill everything, regardless of whether the model marks it as fillable or not
	Model::unguard();

    //get rid of the existing seed data.
    DB::table('users')->delete();
    DB::table('projects')->delete();
    DB::table('project_user')->delete();
    DB::table('needs')->delete();
    DB::table('need_user')->delete();
    DB::table('project_cover_images')->delete();
    DB::table('inno_db_table_statistics')->delete();

    //call the seeders

    //FOR LAUNCH 
    //$this->call(UsersTableSeeder::class);   
    // $this->call(ProjectsTableSeeder::class);
    $this->call(NeedsTableSeeder::class);
    // $this->call(UsersProjectsTablesSeeder::class);
    // $this->call(UsersNeedsTablesSeeder::class);

	Model::reguard();


    //We're going to create a test user and connect some needs and 
    $user0 = new User();
    $user0->name = "Alex";
    $user0->email = "alexjameslowe@gmail.com";
    $user0->password = "$2y$10$1o06zk15.4dLKATV4zkqSegOoCjHzhA3AsPuqdZNhPsU9WyPa6hyi"; //Password123#
    $user0->save();

    //FOR LAUNCH.
    return;

    $user1 = new User();
    $user1->name = "GBC";
    $user1->email = "glowingbluecore@gmail.com";
    $user1->password = "$2y$10$1o06zk15.4dLKATV4zkqSegOoCjHzhA3AsPuqdZNhPsU9WyPa6hyi"; //Password123#
    $user1->save();

    $user2 = new User();
    $user2->name = "Gandalf";
    $user2->email = "gandalf@lotr.com";
    $user2->password = "$2y$10$1o06zk15.4dLKATV4zkqSegOoCjHzhA3AsPuqdZNhPsU9WyPa6hyi"; //Password123#
    $user2->save();

    //get the min project ids and make arrays of 3 ids for needs and projects
    //$minProjectID = Project::min('id');
    $minNeedID = Need::min('id');
    $maxNeedID = Need::max('id');
    $minProjectID = Project::min('id');

    $needConnections = [];
    $projectIDs = [];
    $projectIDsForGandalf = [];

        //create some needs
        for($i=0; $i<5; $i++) {
        $needConnections[] = $minNeedID+$i;
        }
        for($i=0; $i<100; $i++) { 
        $projectIDs[] = $minProjectID+$i;   
        }

        //give the gandalf user the ones that the other two don't own.
        //every one of these project has to have an owner.
        for($i= 30; $i<70; $i++) {
        $pID = $minProjectID+$i;
        $projectIDsForGandalf[$pID] = ["auth"=>"owner"];  
        }
        for($i=100; $i<300; $i++) {
        $pID = $minProjectID+$i;
        $projectIDsForGandalf[$pID] = ["auth"=>"owner"];   
        }

    //hand the projects and needs to the first two users
    $this->projectsAndNeedsForUser($user0, true,  $projectIDs, $needConnections);
    $this->projectsAndNeedsForUser($user1, false, $projectIDs, $needConnections);

    $this->renameProjectsForUser($user0, "AAA-Alex", true, $projectIDs);
    $this->renameProjectsForUser($user1, "ZZZ-GBC", false, $projectIDs);

    //the "gandalf" user is going to own all of the remaining projects.
    $user2->projects()->sync($projectIDsForGandalf);
    $user2->needs()->sync($needConnections);
    $user2->save();

    //alright. Now those projects that we created. I'm going to loop through them, and we're going to assign some needs to them. 
    //These are the projects that are assigned to the user, and you'll note that these needs are entirely separate from the user's needs.
    $top3Needs = [];
        for($j=0; $j<3; $j++) {
        $top3Needs[] = $maxNeedID-$j;
        }

        //loop through and connect these projects to the needs.
        //for($i=0; $i<count($projectIDs); $i++) {
        for($i=0; $i<300; $i++) {
        //$pID =  $projectIDs[$i];
        $pID = $minProjectID+$i;
        $project = Project::where('id',$pID)->first();
            if(!$project) {
            throw new Exception("No project for ID: ".$pID);
            }
        $project->needs()->sync($top3Needs);
        $project->save();
        }

    
    //get the array of stored seeder cover images    
    $this->_storedSeederCoverImages = Storage::files('public/seeder-images');

    //delete the old project cover images
    $oldProjectCoverImages = Storage::files('public/project-cover-images');
    Storage::delete($oldProjectCoverImages);

    //loop through the projects. For the first 20 projects we're going to
    //populate them with project-cover-images from the seeder-images folder.
    //get the first project
    $minProjectID = Project::min('id');

    //make a dummy cover image first. 
    $dummy = new ProjectCoverImage();
    $dummy->url = "dummy";
    $dummy->project_id = 0;
    $dummy->save();

    $this->_coverImgsMinID = ProjectCoverImage::min('id');

        //loop through and create cover-images for these projects, and in addition,
        //copy the files from the seeder-files and move them into postion in the cover-images folder.
        for($i=0; $i<300; $i++) {
        $projectID = $minProjectID+$i;
        $project = Project::where('id',$projectID)->firstOrFail();   
        $this->populateProjectCoverImagesForProject($project);
        }
    


    }


    private function populateProjectCoverImagesForProject($project) {
    $files = $this->_storedSeederCoverImages; 

    //loop through and move the seeder images over to the 
    //project-cover-images with the unique id. 
    $randomLim = rand(2, count($files));

        for($i=0; $i<$randomLim; $i++) {
        $uniqueIDForImg = $this->_coverImgsMinID+$i+1;

        $file = $files[$i];

        $fileParts = explode('/', $file);
        $fileLast = end($fileParts);
        $fileLast = $uniqueIDForImg.'-'.$fileLast;

        $newFile = 'public/project-cover-images/'.$fileLast;

        //copy them.
        Storage::copy($file, $newFile);

        $coverImage = new ProjectCoverImage();
        $coverImage->project_id = $project->id;
        $coverImage->url = $fileLast;
        $coverImage->description = "Euler Cauchy Rimann Dirac Newton Feynman Einstein Hawking";
        $coverImage->claimed = true;
        $coverImage->save();

        $this->_coverImgsMinID++;
        }

    }


}
