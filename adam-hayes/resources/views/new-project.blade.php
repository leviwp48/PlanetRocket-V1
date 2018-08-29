<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#" class="" lang="en-US"><head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">


<?php
use Resources\Templates\SideNavBar;
use Resources\Templates\NavBar;
use Resources\Templates\Banner;
?>

<title>Create a new project</title>

<link rel="stylesheet" id="normalize" href="/adam-hayes/public/css/normalize.css" type="text/css" media="all">
<link rel="stylesheet" id="alex-lowe-core-layout" href="/adam-hayes/public/css/alex-lowe-core-layout.css" type="text/css" media="all">
<link rel="stylesheet" id="gbc-main" href="/adam-hayes/public/css/gbc-css/gbc-main.css" type="text/css" media="all">
<link rel="stylesheet" id="gbc-main" href="/adam-hayes/public/css/filter-dropdown.css" type="text/css" media="all">

<script type="text/javascript" src="/adam-hayes/public/js/lib/html5.js"></script>

<meta name="viewport" content="width=device-width">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta name="csrf-token" content="{!! csrf_token() !!}">
</head>
<body>

    <!-- These guys are hidden and fixed rows -->
    <div id="js_responsive_device_width" style="height:0px; position:absolute;"></div>

    <div id="fixed_row" class="fixed_row top_nav_bar_blue_rgba2" style="z-index: 3; display: none;"></div>

    <?php
    SideNavBar::go($user);
    ?>


    <!-- The page is first based on a vertical-group. The reason for this is that we want the header and footer
    elements to do the infinite sandwich effect where they go off to infinity on either side, and we wouldn't be able
    to do that if everything was in a single center column.
    This vertical-group is based on Ex 2 in vertical conservation elements.html in the html research folder.
    Also, we have an overflow:hidden style here because otherwise we tend to get annoying "bleed-off" scrolling
    where it lets us scroll horizontally even through there's nothing there.
    -->
    <div class="v-group" style="z-index:2; overflow:hidden;">

      <!-- vertical conservation element -->
      <div class="v-inner">
        <div class="box">
          <?php
          Banner::go();

          NavBar::go($user);
          ?>
        </div>
      </div>


      <!-- vertical conservation element- the container for the featured posts. -->
      <div class="v-inner">
        <div class="box">

          <!-- This be the featured posts section -->
          <div id="log_area" class="center_column" style="width:90%; max-width:1200px; background:#FFFFFF;">
          </div>

          <div id="token" class="center_column" style="width:90%; max-width:1200px; background:#FFFFFF;">

          </div>

        </div>
      </div>

      <!-- vertical conservation element- the container for the regular posts as well as the left column for ads. -->
      <div class="v-inner">
          <div class="box" style="height:100%; background:#FFFFFF;">

            <!-- This be the regular posts section -->
            <div class="center_column" style="width:90%; max-width:1200px; height:100%; background:#FFFFFF;">

              <div id="test" class="row"></div>

              <p class="row formstyles-paragraph"><h1>Create a new Project!</h1></p>

              <p class="row formstyles-paragraph">
                Use our handy form to get started on a new project for you and your friends to work on!
                Want to organize an outdoor concert? A beach garbage pickup? The possibilities are endless. Set up a small business,
                Organize a fundraiser for your local no-kill shelter, or launch a yearly club picnic. We've got the tools to
                 help you get started and connect you with people who can lend a hand.</p>


              <div class="row"><h3>Upload images for your project</h3><h4>Images will not be uploaded for reoccurring projects past the first occurrence</h4></div>
              <?php echo Form::open(array(
              'route' => 'projects.upload-image-endpoint',
              'class'=>'dropzone',
              'id'=>'my-awesome-dropzone',
              'enctype'=>'multipart/form-data',
              'files'=>true
              ));

              header("HTTP/1.0 400 Bad Request");
echo "Ups error message"; ?>

              <?php
              echo Form::close();
              ?>


              <?php echo Form::open(array(
              'route' => 'user.create-new-project',
              'class'=>'ajax',
              'data-ajax-client-interface'=>'CreateProject',
              'data-ajax-server-interface'=>'LaravelServer',
              )); ?>



              <div class="row" style="margin-top:20px"></div>
              <!-- The project-image panel row has to sit above the wrapper for the text-field-->
              <div class="row">
              </div>
              <div class="row" style="height:0px; overflow:hidden;">
                <?php echo Form::text('project_images'); ?>
              </div>
              <!-- -->


              <div class="h-group switch-to-rows" style="margin-top:35px;">

                <div class="box" style="width:30%;"><h3>Title for your project</h3></div>

                <div class="box" style="width:70%;">
                  <?php echo Form::text('name','',['class'=>'row formstyles-text-input']); ?>
                </div>

              </div>

    <div class="date_group">

			<!-- Alec's Attempts at adding date/time functionality -->

        <div class="h-group switch-to-rows" style="margin-top:35px;">

        <?php
          $months = [
            '01' => 'January',
            '02' => 'February',
            '03' => 'March',
            '04' => 'April',
            '05' => 'May',
            '06' => 'June',
            '07' => 'July',
            '08' => 'August',
            '09' => 'September',
            '10' => 'October',
            '11' => 'November',
            '12' => 'December'
            ];
        ?>
            <div class="box" style="width:30%">
                <h3>When does your project occur?</h3>
            </div>

            <div class="box" style="display: -webkit-box;">
                <?php echo Form::selectRange('daynum', 1, 31, null,['style'=>'font-size:115%;', 'class'=>'tobedisabled']); ?>
                <?php echo Form::select('month', $months, null, ['style'=>'font-size:115%;', 'class'=>'tobedisabled']); ?>
                <?php echo Form::selectyear('pyear', 2018, 2118, null, ['style'=>'font-size:115%;', 'class'=>'tobedisabled']); ?>
            </div>

            <div class="box" style="display: -webkit-inline-box;position: initial;margin-top:  15px;">
                <?php echo Form::selectRange('hour', 1, 12, null,['style'=>'font-size:115%;' , 'class'=>'tobedisabled']); ?>
                <h3>:</h3>
                <?php echo Form::select('minute', array('00' => '00', '15' => '15', '30' => '30', '45' => '45'), null, ['style'=>'font-size:115%;', 'class'=>'tobedisabled']); ?>
                <?php echo Form::select('amORpm', array('am' => 'AM', 'pm' => 'PM'), null, ['style'=>'font-size:115%;', 'class'=>'tobedisabled']); ?>
            </div>

        </div>

			  <div class="h-group switch-to-rows" style="margin-top:35px;">

            <div class="box" style="width:30%;">
              <h3>How often does your project reoccur?</h3>
            </div>

            <div class="box" id="dropdownthing" style="width:70%;">
             	<?php echo Form::select('reoccur', array('none' => "it doesn't",
                'daily' => 'every day',
                'weekly' => 'every week',
                'monthly' => 'every month',
                'yearly' => 'every year'),
                null,['style'=>'font-size:115%;',
                'class'=>'rcdrpdwn tobedisabled']); ?>

            <script>
                var reoccurDropdown = document.querySelector(".rcdrpdwn");

                reoccurDropdown.addEventListener('change',function(){
							      if(this.value == "none"){
							         document.querySelector("#rep_untl").style.display = "none";
							         document.querySelector("#dropdownthing").style.width = "70%";
							      }
							      else {
      								document.querySelector("#rep_untl").style.display = "block";
      								document.querySelector("#dropdownthing").style.width = "12%";
      							}
      						});
            </script>
            </div>

            <div id="rep_untl" style="display:none;">

                <div class="box" style="width:13%;">
                	<h3>Through</h3>
                </div>

                <div class="box" style="width:35%;">
                	 <?php echo Form::selectRange('reoccurdaynum', 1, 31, null,['style'=>'font-size:115%;', 'class'=>'tobedisabled']); ?>
                 	 <?php echo Form::select('reoccurmonth', $months, null, ['style'=>'font-size:115%;', 'class'=>'tobedisabled']); ?>
                 	 <?php  echo Form::selectyear('reoccuryear', 2018, 2118, null, ['style'=>'font-size:115%;', 'class'=>'tobedisabled']); ?>
                </div>
            </div>
        </div>
    </div>

    <div class="h-group switch-to-rows" style="margin-top:35px;">
      <div class="box" style="width:30%; padding-right:20px;">
        <h3>No date? Check the box:</h3>
      </div>
      <div class="box" style="width:70%;">
        <input type="checkbox" name="datebox" value="anyy" class="projectCheckbox"/>
      </div>

        <script>
        	var checkbox = document.querySelector("input[name=datebox]");
					var hide = document.querySelector(".date_group");
					var tobedisabled = document.querySelectorAll(".date_group");

					checkbox.addEventListener('change',function(){
							if(this.checked){
							    hide.style.display = "none";

                  for($i = 0; $i < document.querySelectorAll(".tobedisabled").length; $i++){
									   document.querySelectorAll(".tobedisabled")[$i].disabled = true;
									   document.querySelector("input[name=datebox]").value = "dateless";
								  }
							}
							else {
								hide.style.display = "block";
								for($i = 0; $i < document.querySelectorAll(".tobedisabled").length; $i++)
								{
									document.querySelectorAll(".tobedisabled")[$i].disabled = false;
									document.querySelector("input[name=datebox]").value = "adfs";
								}

							}
						});

        </script>
    </div>


			<!-- ALEC'S WORK ENDS HERE -->


              <div class="h-group switch-to-rows" style="margin-top:35px;">

                <div class="box" style="width:30%;"><h3>Briefly describe your project.</h3></div>

                <div class="box" style="width:70%;">
                  <?php echo Form::textarea('short_description','',['class'=>'row formstyles-textarea-input']); ?>
                </div>

              </div>

              <div class="h-group switch-to-rows" style="margin-top:35px;">

                <div class="box" style="width:30%; padding-right:20px;"><h3>Give a longer description of your project. Describe what you'd like to do, what your goals are and who you'd like to work with.</h3></div>

                <div class="box" style="width:70%;">
                  <?php echo Form::textarea('description','',['class'=>'row formstyles-textarea-input']); ?>
                </div>

              </div>

              <!-- Eric's RSVP work -->
              <div class="h-group switch-to-rows" style="margin-top:35px;">
                <div class="box" style="width:30%; padding-right:20px;">
                  <h3>Let members RSVP to the event/project?</h3>
                </div>
                <div class="box" style="width:70%;">
                  <input type="checkbox" name="rsvpBox" value="0" class="projectCheckbox"/>
                </div>
              </div>

              <script>
                var checkbox = document.querySelector("input[name=rsvpBox]");

                checkbox.addEventListener('change',function(){
                    var check = checkbox.value;
                    if(check == 1){
                      checkbox.value = 0;
                    }

                    else {
                      checkbox.value = 1;
                    }
                  });

              </script>

              <!-- End of Eric's work -->

              <!-- Begin Levi's work -->
              <div class="h-group switch-to-rows" style="margin-top:35px;">
                <div class="box" style="width:30%; padding-right:20px;">
                  <h3>Category for your project</h3>
                </div>
                <div class="box" style="width:70%;">
                  <select>
                    <option value="miscallaneous" name="category"> Miscallaneous </option>
                  </select>

<!--
                    <select name="category">
                      <option value="community_improvement">Community Improvement</option>
                      <option value="people_helping_people">People Helping People</option>
                      <option value="the_environment">THE Environment</option>
                      <option value="innovation">Innovation</option>
                      <option value="social">Social</option>
                      <option value="the_environment">THE Environment</option>
                    </select>
              </div>
              </div>

              <script>
                var option = document.querySelector("input[name=category]");

                option.addEventListener('change',function(){
                    var optionSelect = option.value;
                    if(optionSelect == 1){
                      option.value = 0;
                    }
                    else {
                      option.value = 1;
                    }
                  });
              </script>

-->
              <!-- End Levi's work -->

              <div class="h-group switch-to-rows" style="margin-top:35px;">

                <div class="box" style="width:30%;">
                  <h3>What does your project require?</h3>
                  <div class="row">You can add an description for each of your project requirements in the textbox provided.</div>
                </div>
                <!-- The needs input has to obey this soecific html format:
                 A text-input wrapped inside a row which hides it,
                 and then wrapped again inside a container row. -->
                <div class="box" style="width:70%;" id="project_needs_container">

                  <div class="row" style="height:0px; overflow:hidden;">
                  <?php echo Form::text('needs'); ?>
                  </div>

                </div>

              </div>

              <?php if($user && $user['email'] == 'alexjameslowe@gmail.com') { ?>

              <?php } ?>



              <div class="row" style="margin-top:20px;"></div>
              <?php
              echo Form::submit("Start Now!", ['class'=>'row formstyles-submit-button']);
              echo Form::close();
              ?>
              <div class="row" style="margin-top:40px;"></div>

            </div>
            <!-- End of Center column -->

        </div>
      </div>

      @include('inc.footer')

    </div>


<script type="text/javascript">
window["needsTree"] = <?php echo $all_needs; ?>;
window["_loggedIn"] = <?php echo $logged_in ? "true" : "false" ?>;
window["user"] = <?php echo $logged_in ? json_encode($user) : "null" ?>;
window["_APP_BASE"] = "<?php echo APP_BASE; ?>";
</script>


<script type="text/javascript" src="/adam-hayes/public/js/loaders/loader-new-project.js"></script>

</body>
</html>
