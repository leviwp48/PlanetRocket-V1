<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInnodbTableData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inno_db_table_statistics', function (Blueprint $table) {
            $table->increments('id');
            $table->string('table_name',25);
            $table->string('model_name',25);
            $table->integer('table_count')->nullable();
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
         Schema::dropIfExists('inno_db_table_statistics');
    }
}
