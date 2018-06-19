<?php

use Illuminate\Database\Seeder;

class UsersNeedsTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {

	//get all of the projects
	$needs = App\Need::all();

		//then we're going to involve each user in between 1 and 3 needs.
	    //the pluck function will grab the ids from each and turn it into an array
		App\User::all()->each(function ($user) use ($needs) { 
		    $user->needs()->attach(
		        $needs->random(rand(1, 3))->pluck('id')->toArray()
		    ); 
		});

    }

}
