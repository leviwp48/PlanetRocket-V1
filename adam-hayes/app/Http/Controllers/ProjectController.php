<?php

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
//  ProjectController                                                                                 //
//                                                                                                    //
//  This is mis-nomer, because most of the "project" functions are actually in the UserController.    //
//  What we have in here is the end-point for the image-uploader that appears in the create project   //
//  and edit-project. This is the server-side coordination for the DropZone jquery plugin.            //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////


namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Http\Response;

use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Storage;

use \App\Project;

use \App\Need;

use \App\ProjectCoverImage;

use \App\InnoDbTableStatistic;

use Log;


class ProjectController extends Controller {



	

	protected function checkForImageExtensions($imgName) {
	$arr = explode(".", $imgName);
	$last = strtoupper( end($arr) );
	return ($last == "PNG" || $last == "JPG" || $last == "TIFF" || $last == "GIF");
	}

	/**
	 * the endpoint for uploading images. This gets hit with an image from the client whenever the client
	 * drags an image to the DropZone element on their page. This stores the image in the db, and then when
	 * the project is created, the create_project endpoint will then go find the images and associate them
	 * with the project. You'll notice that we return the id of the newly create ProjectCoverImage to the client
	 * for exactly that purpose.
	 *
	 */
	public function upload_image_endpoint(Request $request) {

		if ($request->hasFile('file')) {

		//grab the minimum-id for the cover-image.
		$uniqueID = ProjectCoverImage::max('id');
		$uniqueID++;

		//upload the images. Note that we upload them with X_ and this means is that the
		//images are "unclaimed" by a project. The project has to save before it can claim
		//those images. Periodically, the server will scan for X_ images over 12 hours old and delete them.
		$uploaddir = '/var/www/html/adam-hayes/storage/app/public/project-cover-images/';

		$messyFileName = $_FILES['file']['name'];

			if(!$this->checkForImageExtensions($messyFileName)) {
			return new Response("Image has the wrong extension.", "500");
			}

		$uploadFileName = 'X_'. $uniqueID.'-'. basename($_FILES['file']['name']);
		$uploadfileURL = $uploaddir . $uploadFileName;
		$tmpNameForUploadedFile = $_FILES['file']['tmp_name'];

			if (move_uploaded_file($tmpNameForUploadedFile, $uploadfileURL)) {

			$coverImage = new ProjectCoverImage();
			$coverImage->project_id = 0;
			$coverImage->url = $uploadFileName;
			$coverImage->save();

			$id = $coverImage->id;

			return json_encode(["message"=>"success", "errors"=>[], "filename"=>$uploadFileName, "correlation"=>$id]);
			} else {
			return new Response("Image failed to move.", "500");
			}


		} else {

		return new Response("No image came through.", "500");

		}

	}






}
