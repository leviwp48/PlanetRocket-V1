<?php

namespace App;

use Kalnoy\Nestedset\NodeTrait;
use Illuminate\Database\Eloquent\Model;

class Need extends Model {

	use NodeTrait;

    /**
     * The Needs that belong to this user.
     *
     */
    public function users() {
    return $this->belongsToMany('App\User');
    }

    /**
     * The projects that belong to this particular need
     *
     */
    public function projects() {
    return $this->belongsToMany('App\Project');
    }
    
}
