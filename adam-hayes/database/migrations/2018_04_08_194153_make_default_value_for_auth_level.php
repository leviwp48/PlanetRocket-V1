<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeDefaultValueForAuthLevel extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
    
        Schema::table('project_user', function($table) {
        $table->string('auth','30')->nullable(false)->change()->default("involved");
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {

        Schema::table('project_user', function($table) {
        $table->string('auth','30')->nullable()->change();
        });
        
    }
}
