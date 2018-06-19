<?php

use Illuminate\Database\Seeder;

use App\NeedsTree;

class NeedsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {

    	//$node = new App\Need(['name'=>'root', 'description'=>'The Root Need Node']);
		//$node->save();
		//+++++++++++$node = new App\Need();

		//+++++++++++$needsTree = new NeedsTree;

		//++++++++++$node = App\Need::create($needsTree->getTree());

/*
		$node = App\Need::create([
		    'name' => 'root',
		    'description' => 'Description Root',

		    'children' => [

		        [
	            'name' => 'Bar',
	            'description' => 'Description Bar',

		            'children' => [
		                [
	                	'name' => 'Baz',
	                	'description' => 'Description Baz'
		                ],

		                [
	                	'name' => 'Abc',
	                	'description' => 'Description Abc'
		                ],

		                [
	                	'name' => 'Def',
	                	'description' => 'Description Def'
		                ],

		            ],
		        ],

		        [
		        'name' => 'Xyz',
		        'description' => 'Description Xyz'
		        ]


		    ],
		]);
	*/

	//+++++++++++++$node->save();

    }

}
