<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    private $_notificationsArr;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


    /**
     * The projects that belong to this user.
     *
     */
    public function projects() {
    return $this->belongsToMany('App\Project');
    }

    /**
     * The Needs that belong to this user.
     *
     */
    public function needs() {
    return $this->belongsToMany('App\Need');
    }


    /**
     * a function to add in a notification to the user.
     * the notifications should have some sort of unique-id "uid" so that they can be removed later on.
     * when you add notifications, it's up to you to do that. for instance, if you have to 
     * add a notification for a join-request with an id of 34, then your uid might be join-request-34.
     *
     */
    public function addNotification($notification, $batch=false) {

        if(!$this->_notificationsArr) {
        $arr = json_decode($this->notifications);

            if(!$arr) {
            $arr = [];
            }

        $this->_notificationsArr = $arr;
        }

    $this->_notificationsArr[] = $notification;

        if(!$batch) {
        $this->notifications = json_encode($this->_notificationsArr);
        }

    }

    /**
     * remove a notification from the user.
     *
     */
    public function removeNotificationForID($id, $batch=false) {

        if(!$this->_notificationsArr) {
        $arr = json_decode($this->notifications, true);

            if(!$arr) {
            $arr = [];
            }

        $this->_notificationsArr = $arr;
        }

        for($i=0; $i<count($this->_notificationsArr); $i++) {
        $noti = $this->_notificationsArr[$i];
            if($noti["uid"] == $id) {
            array_splice($this->_notificationsArr, $i, 1);
            break;
            }

        }

        if(!$batch) {
        $this->notifications = json_encode($this->_notificationsArr);    
        }

    }

    /**
     * if you had to run the above two functions in a batch, then call this after the batch
     * and it will refresh the json field.
     *
     */
    public function refreshNotificationsAfterBatch() {

        if($this->_notificationsArr) {
        $this->notifications = json_encode($this->_notificationsArr);    
        }
        
    }



}
