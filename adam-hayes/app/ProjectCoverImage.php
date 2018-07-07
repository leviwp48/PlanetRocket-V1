<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\Storage;
//use Illuminate\Support\Collection\Macroable;

class ProjectCoverImage extends Model
{

	/**
	 * "claim" the image. get rid of the X_ off of the front and set the boolean field to true.
	 *
	 */
    public function claimImageWithProject($id) {

    	if(!$this->claimed) {

	    $this->claimed = true;

	    $this->project_id = $id;

	    //we have to get rid of the X_
	    $originalURL = $this->url;

	   	$this->url = substr($originalURL, 2);

	   	//rename the file.
	   	$oldFile = '/public/project-cover-images/'.$originalURL;
	   	$newFile = '/public/project-cover-images/'.$this->url;
        Storage::move($oldFile, $newFile);

   		}

    }
}
