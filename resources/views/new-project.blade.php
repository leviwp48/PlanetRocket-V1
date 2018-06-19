<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#" class="" lang="en-US"><head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">


<?php
use Resources\Templates\SideNavBar;
use Resources\Templates\NavBar;
use Resources\Templates\Banner;
?>
 
<title>Create a new project</title>

<link rel="stylesheet" id="alex-lowe-core-layout" href="/css/alex-lowe-core-layout.css" type="text/css" media="all">
<link rel="stylesheet" id="gbc-main" href="/css/gbc-css/gbc-main.css" type="text/css" media="all">
<script type="text/javascript" src="/js/lib/html5.js"></script>

<meta name="viewport" content="width=device-width">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta name="csrf-token" content="{!! csrf_token() !!}">
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


              <div class="row"><h3>Upload images for your project</h3></div>
              <?php echo Form::open(array(
              'route' => 'projects.upload-image-endpoint', 
              'class'=>'dropzone',
              'id'=>'my-awesome-dropzone',
              'enctype'=>'multipart/form-data',
              'files'=>true
              )); ?>

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

      <!-- The footer -->
      <div id="footer" class="v-inner">
        <div class="box footer" style="color:#FFFFFF;">

                <div class="center_column" style="width:90%; max-width:900px; color:#444444; padding-top:20px; padding-bottom:20px; font-size:12px;">
                Copyright 2018 Planet Rocket
                </div>

        <div class="row" style="height:20px;"></div>
        </div>
      </div>

    </div>


<script type="text/javascript">
window["needsTree"] = <?php echo $all_needs; ?>;
window["_loggedIn"] = <?php echo $logged_in ? "true" : "false" ?>;
window["user"] = <?php echo $logged_in ? json_encode($user) : "null" ?>;
window["_APP_BASE"] = "<?php echo APP_BASE; ?>";

</script>


<script type="text/javascript" src="/js/loaders/loader-new-project.js"></script>

</body>
</html>