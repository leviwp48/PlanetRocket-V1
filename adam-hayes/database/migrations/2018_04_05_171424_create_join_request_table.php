<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJoinRequestTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('join_requests', function (Blueprint $table) {
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

            //the message
            $table->text("message");

            //the needs, for when the user requests to join.
            $table->text("needs")->nullable();

            //has the message been read yet?
            $table->boolean("unread")->default(true);

            //the id of the first message in the thread.
            $table->integer("first_in_thread_id")->unsigned()->nullable();

            //the usual timestamps.
            $table->timestamps();

            //the id.
            //$table->primary("id");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('join_request');
    }
}
