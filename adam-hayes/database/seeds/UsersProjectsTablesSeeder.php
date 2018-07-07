<?php

use Illuminate\Database\Seeder;

class UsersProjectsTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {

	//get all of the projects
	$projects = App\Project::all();

		//then we're going to involve each user in between 0 and 3 projects.
	    //the pluck function will grab the ids from each and turn it into an array
		App\User::all()->each(function ($user) use ($projects) { 
		    $user->projects()->attach(
		        $projects->random(rand(0, 3))->pluck('id')->toArray()
		    ); 
		});

    }
}
