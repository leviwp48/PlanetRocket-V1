<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProjectOccurence extends Model
{
    public function projects(){
        return $this->belongsTo('App\Project');
    }
}
