<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProjectReocurrenceInfo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        
    	Schema::table('projects', function($table) {
        $table->string('reoccur', 15)->after('short_description')->nullable();
        });
        
        Schema::table('projects', function($table) {
        $table->datetime('reoccur_through')->after('reoccur')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
                Schema::table('projects', function($table) {
        $table->dropColumn('reoccur');
	});
	        Schema::table('projects', function($table) {
        $table->dropColumn('reoccur_through');
	});
    }
}
