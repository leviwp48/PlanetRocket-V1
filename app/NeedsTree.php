<?php

//////////////////////////////////////////////////////////////
//                                                          //
//  NeedTree                                                //
//                                                          //
//  This is a helper class for the database seeding files.  //
//  It gives us the original needs-tree                     //
//                                                          //
//////////////////////////////////////////////////////////////



namespace App;

class NeedsTree {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function getTree() {


    	$arr = [
			    'name' => 'root',
			    'description' => 'Description Root',

				    'children' => [

				    	['name' => 'Money', 'description' => 'Gimmee da caasshhhh!!'],

				    	['name' => 'Hardware', 'description' => 'Tools and items that you need', 'children'=>[

				    		['name' => 'Hand tools/power tools', 'description' => 'Tools for wood and metal work', 'children' =>[

				    			['name' => 'Drill'],
				    			['name' => 'Hammer'],
				    			['name' => 'Screwdriver'],
				    			['name' => 'Hand Saw'],
				    			['name' => 'C-Clamps'],
				    			['name' => 'Table Saw'], 
				    			['name' => 'Generator']

				    		]],

				    		['name' => 'Outdoor venues', 'description' => 'Everything you need for an outdoor event', 'children' => [

				    			['name' => 'Seating'],
				    			['name' => 'Tent/shelters'],
				    			['name' => 'Collapsible tables'],
				    			['name' => 'Tablecloths'],
				    			['name' => 'Dance floor']

				    		]],

				    		['name' => 'Musical', 'description' => 'Everything you need to make music', 'children' => [

				    			['name' => 'Guitar'],
				    			['name' => 'Drum Kit'],
				    			['name' => 'Amp/Speaker'],
				    			['name' => 'Cord'],
				    			['name' => 'Mixer'],
				    			['name' => 'Soundboard'], 
				    			['name' => 'Microphone']

				    		]]

				    	]],

				    	['name' => 'Transportation', 'description' => 'Getting things and people from point A to point B', 'children' => [

				    		['name' => 'Van'],
				    		['name' => 'Car'],
				    		['name' => 'Bike'],
				    		['name' => 'Bus'],
				    		['name' => 'Limo'],
				    		['name' => 'Pickup Truck'],
				    		['name' => 'Flatbed Truck'],
				    		['name' => 'Trailer'],
				    		['name' => 'Semi'],
				    		['name' => 'X-Wing']

				    	]],

				    	['name' => 'Venue', 'description' => 'A room, space, stage or outdoor area for an event', 'children' => [

				    		['name' => 'Indoor stage'],
				    		['name' => 'Outdoor stage'],
				    		['name' => 'Dance hall'],
				    		['name' => 'Gym'],
				    		['name' => 'Convention center'],
				    		['name' => 'Church'],
				    		['name' => 'Parking lot'],
				    		['name' => 'Park or picnic area'],
				    		['name' => 'Public space', 'description'=> 'City square or other rentable public area']

				    	]],

				    	['name' => 'Labor', 'description' => 'Support staff to help everything go smoothly', 'children' => [

				    		['name' => 'Setup/Teardown', 'description'=>'For an event, people to set up and tear-down chairs and other placements at a venue'],
				    		['name' => 'Landscaping/Groundskeeping'],
				    		['name' => 'Drivers'],
				    		['name' => 'Parking enforcement'],
				    		['name' => 'Garbage'],
				    		['name' => 'Help desk']

				    	]],

				    	['name' => 'Technical/Creative staff', 'description' => 'People who know how to use computers and electronics', 'children' => [

				    		['name' => 'Sound engineer', 'description' => "For an event, running sound"], 

				    	    ['name' => 'Electrical'],

				    		['name' => 'Video', 'description' => 'Shooting and editing'],

				    		['name' => 'Photography', 'description' => 'Shooting and editing'],

							['name' => 'Programming', 'description' => 'Computer programming', 'children' => [

								['name' => 'Website'],
								['name' => 'Mobile App']

							]],

							['name' => 'Graphic Designer']

				    	]],

				    	['name' => 'Office Staff', 'description' => 'People to run your office for an on-going project', 'children' => [

				    		['name' => 'Administrative Assistant'],
				    		['name' => 'Project Manager'],
				    		['name' => 'Coordinator'],
				    		['name' => 'Analyst'],
				    		['name' => 'Intern'],
				    		['name' => 'HR'],
				    		['name' => 'Consultant']

				    	]],

				    	['name' => 'Business', 'description' => 'The suits', 'children' => [

				    		['name' => 'Legal'],
				    		['name' => 'Finance'],
				    		['name' => 'Marketing'],
				    		['name' => 'Sales']

				    	]]

				    ],
				];

	return $arr;
    }

}
