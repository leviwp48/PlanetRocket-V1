<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', 'UserController@home_page');

/*
Route::get('/', function(){
		return view('calendar-list-view');
});
*/
Route::get('/contact', 'UserController@contact');

Route::get('/about', 'UserController@about');

Route::get('/calendar', 'UserController@calendar');

Route::get('/training', 'UserController@training');

Route::get('/.well-known/acme-challenge/DPRvbXrjTBE5hC0VtR6Px3qNdY9iBMbcKzBupywcdJM', function(){
return "DPRvbXrjTBE5hC0VtR6Px3qNdY9iBMbcKzBupywcdJM.nQTwwr89cu5Q8sBnj55cMu8EVDzSbJunU2k77TcP930";
});
Route::get('/.well-known/acme-challenge/nZx8t8puFVR-H00pb7WqT4FQgSmdGijPHwDxB6UkWx8', function(){
return "nZx8t8puFVR-H00pb7WqT4FQgSmdGijPHwDxB6UkWx8.nQTwwr89cu5Q8sBnj55cMu8EVDzSbJunU2k77TcP930";
});



Route::get('send_test_email', function(){
	Mail::raw('Sending emails with Mailgun and Laravel is easy!', function($message)
	{
		$message->subject('Mailgun and Laravel are awesome!');
		$message->from('no-reply@planetrocket.com', 'Planet Rocket');
		$message->to('alexjameslowe@gmail.com');
	});
});




// Route::get('/hello',function(){
//     return 'Hello World!';
// });

// Route::get('hello', 'Hello@index');


// Route::get('/hello/{name}', 'Hello@show');

// Route::get('/migrations/{migration}',  function ($migration) {
//     //return Artisan::call('migrate', ["--force"=> true, "--path"=>"/database/migrations/".$migration.".php"]);

//     return Artisan::call('migrate', ["--force"=> true]);
// });

//it's safe to run all of the migrations. laravel knows what you're trying to do.
// Route::get('/migrations',  function () {
// return Artisan::call('migrate', ["--force"=> true]);
// });

Auth::routes();

Route::get('logout', 'Auth\LoginController@logout')->name('logout');

Route::get('/user/projects', 'UserController@projects')->middleware('auth');

Route::get('/user/new-project', 'UserController@new_project')->middleware('auth');

Route::get('/user/needs-tree', 'UserController@needs_tree');

Route::get('/projects/all', 'UserController@all_projects');

Route::get('/projects/view-project/{project}', 'UserController@view_project');

//Route::get('/user/edit-project/{project}', 'UserController@edit_project')->middleware('auth');

Route::get('/user/get-project/{project}', 'UserController@get_project')->middleware('auth');

Route::get('/user/edit-project/{project}', 'UserController@edit_project')->middleware('auth');

Route::post('/user/edit-existing-project', array( "as" => "user.edit-existing-project", "uses" => "UserController@edit_existing_project"));

Route::post('/user/projects-table-service', array( "as" => "user.projects-table-service", "uses" => "UserController@projects_table_service"));

Route::post('/user/get-notifications', array("as"=>"user.get-notifications", "uses"=>"UserController@get_notifications"))->middleware('auth');

Route::post('/user/remove-notification-for-id', array("as"=>"user.remove-notification-for-id", "uses"=>"UserController@remove_notification_for_id"))->middleware('auth');



Route::post('/projects/upload-image-endpoint', array("as" => "projects.upload-image-endpoint", "uses" => "ProjectController@upload_image_endpoint"))->middleware('auth');



Route::post('/join-requests/request-join-project', array("as" => "join-requests.request-join-project", "uses" => "JoinRequestController@request_join_project"))->middleware('auth');

Route::post('/join-requests/respond-join-project', array("as" => "join-requests.respond-join-project", "uses" => "JoinRequestController@respond_join_project"))->middleware('auth');

Route::post('/join-requests/join-request-table-service', array("as" => "join-requests.join-request-table-service", "uses" => "JoinRequestController@join_request_table_service"))->middleware('auth');

Route::post('/join-requests/get-join-request', array("as" => "join-requests.get-join-request", "uses" => "JoinRequestController@get_join_request"))->middleware('auth');

Route::post('/join-requests/respond-to-join-request', array("as" => "join-requests.respond-to-join-request", "uses" => "JoinRequestController@respond_to_join_request"))->middleware('auth');

Route::post('/join-requests/join-request-is-finished', array("as" => "join-requests.join-request-is-finished", "uses" => "JoinRequestController@join_request_is_finished"))->middleware('auth');


//Route::get('/projects/upload-image-endpoint', "ProjectController@upload_image_endpoint")->middleware('auth');



//Route::post('/user/test-ajax-hook', 'UserController@test_ajax_hook');

//Route::get('/user/create-new-project', 'UserController@create_new_project')->middleware('auth');
Route::post('/user/create-new-project', array( "as" => "user.create-new-project", "uses" => "UserController@create_new_project"));

//Route::get('/home', 'HomeController@index')->name('home');
Route::get('/home', 'UserController@home_page');
