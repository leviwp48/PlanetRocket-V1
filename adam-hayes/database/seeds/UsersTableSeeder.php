<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {

    //create 10 users.
    factory(App\User::class, 20)->create();

    }

    //public function run()
    //{

		// factory(App\User::class, 2)->create()->each(function($u) {
		// 	$u->issues()->save(factory(App\Issues::class)->make());
		// });

    //}

}
