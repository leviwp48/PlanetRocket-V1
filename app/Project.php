<?php

namespace App;

use App\Events\ProjectCreated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Project extends Model {


public static $foundProject;

    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'name', 'description'
    ];

	/**
	 * The users that belong to this project.
	 *
	 */
    public function users() {
    return $this->belongsToMany('App\User');
    }

    /**
     * The needs that belong to this particular project
     *
     */
    public function needs() {
    return $this->belongsToMany('App\Need');
    }

    /**
     * one-to-many project -> project-cover-images
     *
     */
    public function project_cover_images() {
    return $this->hasMany('App\ProjectCoverImage');
    }


    /**
     * the join-requests for this project. one-to-many.
     *
     */
    public function join_requests() {
    return $this->hasMany('App\JoinRequest');
    }


    /**
     * a helper function to help determine if a project belongs to a user
     *
     */
    public static function doesProjectIDBelongToUser($projectID) {
    $userID = Auth::user()->id;

    $project = Project::whereHas('users', function($q) use($userID, $projectID) {

                    $q->where(function ($query2) use($userID, $projectID) {
                        $query2
                        ->where('id', '=', $userID)
                        ->where('project_user.auth', '=', 'owner')
                        ->where('project_user.project_id', '=', $projectID);
                    });

                })->first();

        if($project) {
        self::$foundProject = $project;
        return true;
        } else {
        return false;
        }

    }


    /**
     * get the project that the above function found.
     *
     */
    public static function getFoundProject() {
    return self::$foundProject;
    }



}
