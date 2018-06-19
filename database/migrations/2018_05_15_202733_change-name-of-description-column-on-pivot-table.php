<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeNameOfDescriptionColumnOnPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
   public function up()
    {
        Schema::table('need_project', function($t) {
            $t->renameColumn('description', 'user_description');
        });
    }


    public function down()
    {
        Schema::table('stnk', function($t) {
            $t->renameColumn('user_description', 'description');
        });
    }
}
