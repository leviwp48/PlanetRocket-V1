<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#" class="" lang="en-US"><head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- <meta name="viewport" content="width=device-width, initial-scale=1">
 -->

<?php
use Resources\Templates\SideNavBar;
use Resources\Templates\NavBar;
use Resources\Templates\Banner;
?>

<title>Edit a project</title>
<link rel="stylesheet" id="alex-lowe-core-layout" href="/adam-hayes/public/css/alex-lowe-core-layout.css" type="text/css" media="all">

<link rel="stylesheet" id="gbc-main" href="/adam-hayes/public/css/gbc-css/gbc-main.css" type="text/css" media="all">
<script type="text/javascript" src="/adam-hayes/public/js/lib/html5.js"></script>

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
          <div class="center_column" style="width:90%; max-width:1200px; background:#FFFFFF;">
          </div>

        </div>
      </div>

      <!-- vertical conservation element- the container for the regular posts as well as the left column for ads. -->
      <div class="v-inner">
          <div class="box" style="height:100%; background:#FFFFFF;">

            <!-- This be the regular posts section -->
            <div class="center_column" style="width:90%; max-width:1200px; height:100%; background:#FFFFFF;">

              <div class="row" id="alex-layout-test">
              </div>

              <div id="test" class="row"></div>

              <p class="row formstyles-paragraph"><h2>Inspect/Update your Project "<?php echo e($project_name); ?>"</h2></p>

              <p class="row formstyles-paragraph">
              View and change important information about your project.<br/>Change the requirements, add new participants and edit the description and title.</p>

              <div class="row" id="join-requests-table"></div>

              <div class="row" style="margin-top:35px;"><h3>Upload images for your project</h3><h4>Images will not be uploaded for reoccurring projects past the first occurrence</h4></div>
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
              'route'                       => 'user.edit-existing-project',
              'class'                       => 'ajax',
              'data-ajax-client-interface'  => 'EditProject',
              'data-ajax-server-interface'  => 'LaravelServer',
              'data-ajax-form-mode'         => 'edit',
              'data-ajax-data-hook'         => '/adam-hayes/public/user/get-project'
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

                <div class="box" style="width:30%;"><h3>Project title</h3></div>

                <div class="box" style="width:70%;">
                <?php echo Form::text('name','',['class'=>'row formstyles-text-input']); ?>
                </div>

              </div>


              <div class="h-group switch-to-rows" style="margin-top:35px;">

                <div class="box" style="width:30%;"><h3>Project Description (Short)</h3></div>

                <div class="box" style="width:70%;">
                <?php echo Form::textarea('short_description','',['class'=>'row formstyles-textarea-input']); ?>
                </div>

              </div>

              <div class="h-group switch-to-rows" style="margin-top:35px;">

                <div class="box" style="width:30%;"><h3>Project Description (Long)</h3></div>

                <div class="box" style="width:70%;">
                <?php echo Form::textarea('description','',['class'=>'row formstyles-textarea-input']); ?>
                </div>

              </div>


              <div class="h-group switch-to-rows" style="margin-top:35px;">

                <div class="box" style="width:30%'">
                  <h3>Requirements and needs</h3>
                  <div class="row">You can add or edit a description for each of your project requirements in the textbox provided.</div>
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


              <div class="row" style="margin-top:35px;"></div>
              <?php
              echo Form::submit("Update your project", ['class'=>'row formstyles-submit-button']);
              echo Form::close();
              ?>

              <div class="row" style="margin-top:40px;"></div>

            </div>
            <!-- End of Center column -->

        </div>
      </div>

     <div id="footer" class="v-inner" >
        <div class="box footer" style="width:100vw;" >

               
               <p class="copyright"> Copyright 2018 Planet Rocket</p>
                  <a href="<?php echo APP_BASE; ?>/contact">
                    <p class="contact_us">Contact Us</p>
                  </a>
                
                

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
<script type="text/javascript" src="/adam-hayes/public/js/loaders/loader-edit-project.js"></script>
</body>
</html>