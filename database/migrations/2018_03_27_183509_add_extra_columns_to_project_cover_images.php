<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddExtraColumnsToProjectCoverImages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_cover_images', function($table) {
        $table->text('description')->nullable();
        $table->boolean('claimed')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_cover_images', function($table) {
        $table->dropColumn('description');
        $table->dropColumn('claimed');
        });
    }
}
