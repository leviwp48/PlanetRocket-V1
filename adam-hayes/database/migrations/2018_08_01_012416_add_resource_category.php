<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddResourceCategory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::dropIfExists('resource_category');
         
        Schema::table('resources', function($table) {
        $table->string('category', 20)->after('website')->nullable();
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
        
                Schema::create('resource_category', function (Blueprint $table) {
            $table->integer('resource_id')->unsigned()->index();
            $table->foreign('resource_id')->references('id')->on('resources')->onDelete('cascade');
            $table->string('category', 15);
            $table->primary(['resource_id', 'category']);
        });
        
         Schema::table('resources', function($table) {
        $table->dropColumn('category');
        });
    }
}
