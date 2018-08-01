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

<title>Planet Rocket - Home</title>

<link rel="stylesheet" id="alex-lowe-core-layout" href="css/alex-lowe-core-layout.css" type="text/css" media="all">
<link rel="stylesheet" id="about-page" href="css/index-page.css" type="text/css" media="all">
<link rel="stylesheet" id="gbc-main" href="css/gbc-css/gbc-main.css" type="text/css" media="all">
<link rel="stylesheet" id="login-button-animation" href="css/login-button-animation.css" type="text/css" media="all">
<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,700" rel="stylesheet">
<script type="text/javascript" src="js/lib/html5.js"></script>

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
          <div class="center_column" style=" background:#FFFFFF;">
          </div>

        </div>
      </div>

      <!-- vertical conservation element- the container for the regular posts as well as the left column for ads. -->

      <div class="v-inner" style="font-family: 'Open Sans', sans-serif;">
          <div class="box" style="height:100%; background:#FFFFFF;">

            <!-- This be the regular posts section -->
            


      
            


          <div class="parallax" id="parallaxpanel1-Homepage">
            
            <div class="h-group" id="parallaxcontainer1">
              <div class="box" style="vertical-align:middle;">

                <div class="row homepage"><h3>The video goes here!</h3></div>
                <iframe width="60%" height="60%" src="https://www.youtube.com/embed/tIBxavsiHzM" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>

            <!-- Levi Edit 7/21/18 changed the margin-top to 90px (from 30px) to put the login button between the video and the footer -->
            <!-- Levi Edit 7/22/18 Added CSS to the login button. Also a new CSS file called login-button-animation in public/css/ -->

           
          </div>

            

      <h3 class="textbreak"> We are a platform for creating community <strong>SOLUTIONS</strong></h3>

      <div class="parallax" id="parallaxpanel2-Homepage"></div>

      <h3 class="textbreak">Take your ideas and projects and launch them into our <strong> COMMUNITY</strong></h3>
      
      <div class="parallax" id="parallaxpanel3-Homepage"></div>

      <h3 class="textbreak">We are based in <strong>ARCATA</strong>, California and our whole website is local, organic, and non-gmo </h3>
      
      <div class="parallax" id="parallaxpanel4-Hompage"></div>

      <div class="last_textbreak_container">
        
        <h3 class="textbreak" >If you are based in Humboldt County, we have created something very special just for you </h3>
        
        <div class="row homepage" style="text-align:center; margin-bottom:40px;">
          <div class="h-group" >
            <div class="box" style="vertical-align:middle;">
              <form action="login" method="get">
                <button type="submit" style=" font-family: OpenSans;" class="btn    btn--trees" id="entercommunity">
                  Enter Our Community!
                  <div class='trees'>
                    <i class='fa fa-tree tree-one'></i>
                    <i class='fa fa-tree tree-two'></i>
                    <i class='fa fa-tree tree-three'></i>
                  </div>
                </button>
              </form>
            </div>
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
window["_loggedIn"] = <?php echo $logged_in ? "true" : "false" ?>;
window["user"] = <?php echo $logged_in ? json_encode($user) : "null" ?>;
window["_APP_BASE"] = "<?php echo APP_BASE; ?>";
</script>

<script type="text/javascript" src="js/loaders/loader-index-page.js"></script>

</body>
</html>
