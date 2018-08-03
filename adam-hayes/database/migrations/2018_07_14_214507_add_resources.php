<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddResources extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resources', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',100);
            $table->text('description');
            $table->string('address',100)->nullable();
            $table->string('phone', 15)->nullable();
            $table->string('website', 30)->nullable();
            $table->string('category', 15)->nullable();
            $table->timestamps();
        });
        
        Schema::create('resource_region', function (Blueprint $table) {
            $table->integer('resource_id')->unsigned()->index();
            $table->foreign('resource_id')->references('id')->on('resources')->onDelete('cascade');
            $table->string('region', 15);
            $table->primary(['resource_id', 'region']);
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('resource_region');
        Schema::dropIfExists('resources');
    }
}
