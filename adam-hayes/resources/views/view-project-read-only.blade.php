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

<title>View Project</title>
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

            <div id="request_join_project_form" class="row" style="display:none;">

              <?php echo Form::open(array(
              'route'                       => 'join-requests.request-join-project',
              'class'                       => 'ajax',
              'data-ajax-client-interface'  => 'RequestJoinProject',
              'data-ajax-server-interface'  => 'LaravelServer',
              'data-ajax-form-mode'         => 'create'
              )); ?>


              <div class="row" style="margin-top:20px;"><h3>Introduce Yourself!</h3></div>
              <?php echo Form::textarea('introduction','',['class'=>'row formstyles-textarea-input']); ?>

              <div style="display:none; height:0px; width:0px;">
              <?php
                echo Form::text('owner_id',     e($owner_id));
                echo Form::text('project_id',   e($project_id));
                echo Form::text('project_name', e($project_name));

                  if($user) {
                  echo Form::text('sender_name',  e($user->name));
                  }
              ?>
              </div>

              <div class="row" style="margin-top:20px"><h3>How can you contribute?</h3></div>
              <fieldset class="row">

                <?php
                  for($i=0; $i<count($needs); $i++) {
                  $need = $needs[$i];
                  $needName = $need["name"];
                  $needID = $need["id"];

                  //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_checkbox
                  echo
                      '<div class="h-group" style="margin-top:10px;">'.

                        '<label class="box formstyles-checkbox-container" style="width:30px; vertical-align:middle;">'.
                        '<input type="checkbox" name="needs" value="'.e($needName.'-'.$needID).'">'.
                        '<span class="formstyles-checkbox-checkmark"></span>'.
                        '</label>'.

                        '<div class="box" style="vertical-align:middle;">'.
                         e($needName).
                        '</div>'.

                      '</div>';

                  }

                ?>

              </fieldset>

               <div class="row" style="margin-top:20px;"></div>
              <?php
              echo Form::submit("Request to join this project!", ['class'=>'row formstyles-submit-button']);
              echo Form::close();
              ?>

            </div>

            <!-- This be the regular posts section -->
            <div id="project_container" class="center_column" style="width:90%; max-width:1200px; height:100%; background:#FFFFFF; padding-bottom:30px;">


            </div>

          </div>
        </div>

        <!--
             Levi Edit 7/21/18
             Added the disqus comment API. Added a border-bottom to row to make a line and margin-bottom to push the footer down. Added a box-shadow to make the shadow.
         -->

            <div class="v-inner">
              <div class="box" style="height:59%; background:#FFFFFF;">
                <div class="center_column about-light-background" style="width:90%; max-width:800px; height:100%; padding-top: 10px;">
                  <div class="row" style="margin-top:20px; margin-bottom: 20px; border-bottom: 1.2px solid #888888; "></div>

                  <div id="disqus_thread" style="border-top: 1px solid #FFFFFF; margin-bottom: 50px; box-shadow: 5px 5px 10px 1px #a8a8a8;"></div>

                  <script>

                    /**
                    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
                    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/

                    var disqus_config = function () {
                      this.page.url = "http://localhost/adam-hayes/public/projects/view-project/" + "<?php echo $project_id ?>" ;  // Replace PAGE_URL with your page's canonical URL variable
                      this.page.identifier = "<?php echo $project_id ?>"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
                    };

                    (function() { // DON'T EDIT BELOW THIS LINE
                      var d = document, s = d.createElement('script');
                      s.src = 'https://planetrocket.disqus.com/embed.js';
                      s.setAttribute('data-timestamp', +new Date());
                      (d.head || d.body).appendChild(s);
                    })();
                  </script>
                  <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>

                </div>
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
window["project_info"] = <?php echo $project_info; ?>;
window["_loggedIn"] = <?php echo $logged_in ? "true" : "false" ?>;
window["user"] = <?php echo $logged_in ? json_encode($user) : "null" ?>;
window["_APP_BASE"] = "<?php echo APP_BASE; ?>";
</script>

<script type="text/javascript" src="/adam-hayes/public/js/loaders/loader-view-project-readonly.js"></script>

</body>
</html>
