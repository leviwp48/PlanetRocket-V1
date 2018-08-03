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

<title>Planet Rocket - Training</title>

<link rel="stylesheet" id="alex-lowe-core-layout" href="./css/alex-lowe-core-layout.css" type="text/css" media="all">
<link rel="stylesheet" id="about-page" href="./css/about-page.css" type="text/css" media="all">
<link rel="stylesheet" id="gbc-main" href="./css/gbc-css/gbc-main.css" type="text/css" media="all">
<script type="text/javascript" src="./js/lib/html5.js"></script>

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

            <div class="row" style="text-align:center; margin-top:30px;">
              <h1>
                Community Trainings
              </h1>
            </div>

          </div>

        </div>
      </div>

      <!-- vertical conservation element- the container for the regular posts as well as the left column for ads. -->
      <div class="v-inner">
          <div class="box" style="height:100%; background:#FFFFFF;">

            <!-- This be the regular posts section -->
            <div class="center_column about-light-background" style="width:90%; max-width:800px; height:100%;">


            <div class="row width-check"></div>

            <div class="videoWrapper">

              <div class="videoCard">
                <div class="videoHeader">
                  <img src="/adam-hayes/public/images/logo_white_PlanetRocket.png" alt="Avatar" class="avatar">
                  <h3 class="videoTitle">Killer Fortnite Video</h3>
                </div>

                <iframe width="560" height="315" src="https://www.youtube.com/embed/IagLdgXVTcA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

                <div class="videoExtras">
                  <button> Likes </button>
                  <button> Shares </button>
                  <button> Projects </button>
                </div>
              </div>

              <div class="videoCard">
                <div class="videoHeader">
                  <img src="/adam-hayes/public/images/twitch_logo_small.png" alt="Avatar" class="avatar">
                  <h3 class="videoTitle">Killer Fortnite Video</h3>
                </div>

                <iframe width="560" height="315" src="https://www.youtube.com/embed/IagLdgXVTcA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

                <div class="videoExtras">
                  <button> Likes </button>
                  <button> Shares </button>
                  <button> Projects </button>
                </div>
              </div>

              <div class="videoCard">
                <div class="videoHeader">
                  <img src="/adam-hayes/public/images/logo_white_PlanetRocket.png" alt="Avatar" class="avatar">
                  <h3 class="videoTitle">Killer Fortnite Video</h3>
                </div>

                <iframe width="560" height="315" src="https://www.youtube.com/embed/IagLdgXVTcA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

                <div class="videoExtras">
                  <button> Likes </button>
                  <button> Shares </button>
                  <button> Projects </button>
                </div>
              </div>

              <div class="videoCard">
                <div class="videoHeader">
                  <img src="/adam-hayes/public/images/logo_white_PlanetRocket.png" alt="Avatar" class="avatar">
                  <h3 class="videoTitle">Killer Fortnite Video</h3>
                </div>

                <iframe width="560" height="315" src="https://www.youtube.com/embed/IagLdgXVTcA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

                <div class="videoExtras">
                  <button> Likes </button>
                  <button> Shares </button>
                  <button> Projects </button>
                </div>
              </div>

              <div class="videoCard">
                <div class="videoHeader">
                  <img src="/adam-hayes/public/images/logo_white_PlanetRocket.png" alt="Avatar" class="avatar">
                  <h3 class="videoTitle">Killer Fortnite Video</h3>
                </div>

                <iframe width="560" height="315" src="https://www.youtube.com/embed/IagLdgXVTcA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

                <div class="videoExtras">
                  <button> Likes </button>
                  <button> Shares </button>
                  <button> Projects </button>
                </div>
              </div>

              <div class="videoCard">
                <div class="videoHeader">
                  <img src="/adam-hayes/public/images/logo_white_PlanetRocket.png" alt="Avatar" class="avatar">
                  <h3 class="videoTitle">Killer Fortnite Video</h3>
                </div>

                <iframe width="560" height="315" src="https://www.youtube.com/embed/IagLdgXVTcA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

                <div class="videoExtras">
                  <button> Likes </button>
                  <button> Shares </button>
                  <button> Projects </button>
                </div>
              </div>

              <div class="videoCard">
                <div class="videoHeader">
                  <img src="/adam-hayes/public/images/logo_white_PlanetRocket.png" alt="Avatar" class="avatar">
                  <h3 class="videoTitle">Killer Fortnite Video</h3>
                </div>

                <iframe width="560" height="315" src="https://www.youtube.com/embed/IagLdgXVTcA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

                <div class="videoExtras">
                  <button> Likes </button>
                  <button> Shares </button>
                  <button> Projects </button>
                </div>
              </div>

            </div>

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
window["_loggedIn"] = <?php echo $logged_in ? "true" : "false" ?>;
window["user"] = <?php echo $logged_in ? json_encode($user) : "null" ?>;
window["_APP_BASE"] = "<?php echo APP_BASE; ?>";
</script>

<script type="text/javascript" src="./js/loaders/loader-index-page.js"></script>

</body>
</html>
