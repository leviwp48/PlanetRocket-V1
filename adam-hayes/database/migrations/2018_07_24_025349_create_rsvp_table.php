<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRsvpTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rsvp', function (Blueprint $table) {
            $table->increments('id');

            //the person who sent it
            $table->integer('sender_id')->unsigned();
            $table->foreign('sender_id')->references('id')->on('users')->onDelete('cascade');

            //the person who received it
            $table->integer('recipient_id')->unsigned();
            $table->foreign('recipient_id')->references('id')->on('users')->onDelete('cascade');

            //the project to which the message pertains
            $table->integer('project_id')->unsigned();
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');

            //has the message been read yet?
            $table->boolean("unread")->default(true);

            //the id of the first message in the thread.
            $table->integer("first_in_thread_id")->unsigned()->nullable();

            //the usual timestamps.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rsvp');
    }
}
