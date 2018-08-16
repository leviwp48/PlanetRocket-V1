<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#" class="" lang="en-US">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- <meta name="viewport" content="width=device-width, initial-scale=1">
 -->

<?php
use Resources\Templates\SideNavBar;
use Resources\Templates\NavBar;
use Resources\Templates\Banner;
?>

<title>Planet Rocket - Calendar</title>

<head>

  <link rel="stylesheet" id="normalize" href="/adam-hayes/public/css/normalize.css" type="text/css" media="all">
  <link rel="stylesheet" id="alex-lowe-core-layout" href="/adam-hayes/public/css/alex-lowe-core-layout.css" type="text/css" media="all">
  <link rel="stylesheet" id="about-page" href="/adam-hayes/public/adam-hayes/public/css/about-page.css" type="text/css" media="all">
  <link rel="stylesheet" id="gbc-main" href="/adam-hayes/public/css/gbc-css/gbc-main.css" type="text/css" media="all">
  <link rel='stylesheet' href='/adam-hayes/fullcalendar/fullcalendar.css' />
  <link rel='stylesheet' href='/adam-hayes/jquery-ui-1.12.1.custom/jquery-ui.css' />
  <!--<link rel='stylesheet' href='https://code.jquery.com/ui/1.12.1/themes/dot-luv/jquery-ui.css'/>-->

  <script src='/adam-hayes/fullcalendar/lib/jquery.min.js'></script>
  <script src='/adam-hayes/fullcalendar/lib/moment.min.js'></script>
  <script src='/adam-hayes/fullcalendar/fullcalendar.js'></script>
  <script src='/adam-hayes/jquery-ui-1.12.1.custom/jquery-ui.min.js'></script>
  <script type="text/javascript" src="/public/js/lib/html5.js"></script>
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
</head>

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
          <div class="center_column" style="width:90%; max-width:1200px; background:#FFFFFF;">
          </div>

        </div>
      </div>

      <!-- vertical conservation element- the container for the regular posts as well as the left column for ads. -->
      <div class="v-inner">
          <div class="box" style="height:100%; background:#FFFFFF;">

            <!-- This be the regular posts section -->
            <div class="center_column about-light-background" style="width:90%; max-width:800px; height:100%;">


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
                $desc = str_replace('"', '\"', $desc);
                $short_desc = str_replace('"', '\"', $short_desc);

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

            <div class="row width-check"></div>

            <div class="row" style="margin-top:40px;"></div>

            </div>
            <!-- End of Center column -->

          </div>
      </div>

      @include('inc.footer')

    </div>


<script type="text/javascript">
  window["_loggedIn"] = <?php echo $logged_in ? "true" : "false" ?>;
  window["user"] = <?php echo $logged_in ? json_encode($user) : "null" ?>;
  window["_APP_BASE"] = "<?php echo APP_BASE; ?>";
</script>

<script type="text/javascript" src="/adam-hayes/public/js/loaders/loader-index-page.js"></script>

</body>
</html>
