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

<title>Planet Rockets - All Projects</title>

<link rel="stylesheet" id="alex-lowe-core-layout" href="/css/alex-lowe-core-layout.css" type="text/css" media="all">
<link rel="stylesheet" id="about-page" href="/css/about-page.css" type="text/css" media="all">
<link rel="stylesheet" id="gbc-main" href="/css/gbc-css/gbc-main.css" type="text/css" media="all">
<link rel='stylesheet' href='/adam-hayes/fullcalendar/fullcalendar.css' />
<link rel='stylesheet' href='/adam-hayes/jquery-ui-1.12.1.custom/jquery-ui.css' />
<!--<link rel='stylesheet' href='https://code.jquery.com/ui/1.12.1/themes/dot-luv/jquery-ui.css'/>-->

<script src='/adam-hayes/fullcalendar/lib/jquery.min.js'></script>
<script src='/adam-hayes/fullcalendar/lib/moment.min.js'></script>
<script src='/adam-hayes/fullcalendar/fullcalendar.js'></script>
<script src='/adam-hayes/jquery-ui-1.12.1.custom/jquery-ui.min.js'></script>
<script type="text/javascript" src="/public/js/lib/html5.js"></script>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-115020689-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-115020689-1');
</script>
<script>
  $(document).ready(function() {
    // page is now ready, initialize the calendar...

    var jq = null;

    $('#calendar').fullCalendar({
      themeSystem: 'jquery-ui',
      eventLimit: true,
      header:{
        left: 'prev,today,next',
        center: 'title',
        right: 'month,agendaWeek,listMonth'
      },

      eventSources:[
        _events
      ],

      eventRender: function(event, element) {
        element.attr('href', 'javascript:void(0);');
        element.click(function() {
          var found = false;
          var count = 0;
          var temp_arr = window._events;

        //This is terrible I know
        //NEEDS UPDATE TO BETTER ALGO
          for(var i = 0; i < temp_arr.length; i++)
          {
            if (temp_arr[i].id == event.id)
            {
              var projectData = temp_arr[i];
            }
          }

          //console.log($.fn.jquery);

          if (jq == null)
          {
            jq = jQuery.noConflict( true );
          }

          //This is used to make use the short description if the regular description is too long
          if(event.description.length < 600 || event.short_description == null)
          {
            $("#eventContent").html(event.description);
          }

          else
          {
            $("#eventContent").html(event.short_description);
          }

          //$("eventButton").attr('href', "https//google.com");
          var id = event.id;

          $('#eventClickWindow').dialog({
            show: "size",
            hide: "size",
            height: 500,
            width: 500,
            title: event.title,
            modal: true,
            buttons: [
              {
                text: "More Info",
                id: "more_info"
              }
            ],
             open: function (event, ui){
               $('#more_info').wrap('<a href="/adam-hayes/public/projects/view-project/'+id+'"></a>');
             }
          });
          //$( '#eventClickWindow' ).dialog("open");
          return false;
        });
      }
    })
  });
</script>

<meta name="viewport" content="width=device-width">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="csrf-token" content="{!! csrf_token() !!}">
<body>

    <script>
    //used to make all the events into js objects
      var _events = [];
    </script>

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
        <div class="center_column about-light-background" style="width:90%; max-width:800px; height:100%; font-family:Georgia;">
          <div class="h-group" style="margin-top:30px;">
            <div class="box icon-width" style="padding-left:10px; padding-right:10px; vertical-align:middle;">
              <div class="img-wrap-w-center">
                <img class="box" alt="CPP Logo" src="/images/CPP_logo2.png">
              </div>
            </div>
          </div>
          <div class="row" style="text-align:center;"> <h1>HAPPY <strong>CPP</strong> MONTH</h1>
              The month of August is Community Pride and Peace month. This month we will work on making the Community
              a safer, greener, and happier place to be. Below are events on our community calendar where you can help volunteer.
              If you have an idea how to make an impact in our community please feel free to launch a project and we can help you turn your
              scommunity changing idea into a reality.
          </div>
            <?php
              $results = DB::table('projects')->get();

            ?>

              <?php

              foreach ($results as $project)
              {
                $desc = $project->description;
                $short_desc = $project->short_description;
                $desc = trim(preg_replace('/\s+/',' ', $desc));
                $short_desc = trim(preg_replace('/\s+/',' ', $short_desc));

                ?>
                <script>

                  var id = <?= $project->id ?>;
                  var title = "<?= $project->name ?>";
                  var start = '<?= $project->start_time ?>';
                  var description = "<?= $desc ?>";
                  var short_description = "<?= $short_desc ?>";

                  event = {
                    'id' : id,
                    'title' : title,
                    'allDay' : false,
                    'start' : start,
                    'color' : '#1e2e84',
                    'description' : description,
                    'short_description' : short_description
                  };
                  _events.push(event);
                </script>
                <?php
              }
            ?>

            <div id='calendar'></div>
            <div id='eventClickWindow'>
              <p id='eventContent'></p>
              <!--<button> <a id='eventButton' href="">
                More Info</a> </button>-->
            </div>
          </div>

        </div>
      </div>

      <!-- vertical conservation element- the container for the regular posts as well as the left column for ads. -->
      <div class="v-inner">
          <div class="box" style="height:100%; background:#FFFFFF;">

            <!-- This be the regular posts section -->
            <div class="center_column" style="width:90%; max-width:1200px; height:100%; background:#FFFFFF;">

              <div class="row" style="margin-top:20px;">

                <?php
                  if($user) {
                  ?>
                    <a href="<?php echo APP_BASE; ?>/user/new-project">
                      <div class="box formstyles-button">Create a new project!</div>
                    </a>
                    <a href="<?php echo APP_BASE; ?>/user/projects">
                      <div class="box formstyles-button">See your current projects</div>
                    </a>
                  <?php
                  } else {
                  ?>
                    <a href="<?php echo APP_BASE; ?>/login">
                      <div class="box formstyles-button" style="background:#66b517;">Login or sign up!</div>
                    </a>
                  <?php
                  }

                ?>

              </div>

              <div class="row" style="margin-top:20px;"><h2>Create something for our community</h2></div>

              <div id="all_projects" style="margin-top:20px;" class="row"></div>

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
window["_loggedIn"] = <?php echo $logged_in ? "true" : "false" ?>;
window["user"] = <?php echo $logged_in ? json_encode($user) : "null" ?>;
window["_APP_BASE"] = "<?php echo APP_BASE; ?>";
</script>

<script type="text/javascript" src="/js/loaders/loader-all-projects.js"></script>

</body>
</html>
