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

<link rel="stylesheet" id="alex-lowe-core-layout" href="./css/alex-lowe-core-layout.css" type="text/css" media="all">
<link rel="stylesheet" id="about-page" href="./css/index-page.css" type="text/css" media="all">
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
          <div class="center_column" style="width:90%; max-width:900px; background:#FFFFFF;">
          </div>

        </div>
      </div>
      <div class="v-inner">
        <div class="box">

          <!-- This be the featured posts section -->
          <div class="center_column" style="width:90%; max-width:1200px; background:#FFFFFF;">

            <div class="row" style="text-align:center; margin-top:30px; margin-bottom:30px;">
              <h1>
                Community Trainings
              </h1>
            </div>

          </div>

        </div>
      </div>
      <!-- vertical conservation element- the container for the regular posts as well as the left column for ads. -->
            <div class="v-inner">
        <div class="box">

          <!-- This be the featured posts section -->
          <div class="center_column" style="width:90%; max-width:1200px; background:#FFFFFF;">


            

			<div class="button-group">
				<div style="text-align:center;">
					<a href="/adam-hayes/public/resources/food">
						<button style="background:#000000; color:white; height:125%; width:30%; font-size:2.3em; font-weight:100; ">Food</button>
					</a>
				</div>
			</div>
			
			<div class="button-group">
				<div style="text-align:center;">
					<a href="/adam-hayes/public/resources/housing">
						<button style="background:#000000; color:white; height:125%; width:30%; font-size:2.3em; margin-top:.5em; font-weight:100; ">Housing</button>
					</a>
				</div>
			</div>
			
			<div class="button-group">
				<div style="text-align:center;">
					<a href="/adam-hayes/public/resources/lgbtq">
						<button style="background:#000000; color:white; height:125%; width:30%; font-size:2.3em; margin-top:.5em;font-weight:100; ">LGBTQ+</button>
					</a>
				</div>
			</div>
			
			<div class="button-group">
				<div style="text-align:center;">
					<a href="/adam-hayes/public/resources/medical">
						<button style="background:#000000; color:white; height:125%; width:30%; font-size:2.3em; margin-top:.5em;font-weight:100; ">Medical</button>
					</a>
				</div>
			</div>
			
			<div class="button-group">
				<div style="text-align:center;">
					<a href="/adam-hayes/public/resources/shelters">
						<button style="background:#000000; color:white; height:125%; width:30%; font-size:2.3em; margin-top:.5em;font-weight:100; ">Shelters</button>
					</a>
				</div>
			</div>
			
			<div class="button-group">
				<div style="text-align:center;">
					<a href="/adam-hayes/public/resources/transportation">
						<button style="background:#000000; color:white; height:125%; width:30%; font-size:2.3em; margin-top:.5em;margin-bottom:30px;font-weight:100; ">Transportation</button>
					</a>
				</div>
			</div>
			
			
			
			
			
          </div>

        </div>
      </div>
      

      

      <!-- The footer -->
      <div id="footer" class="v-inner">
        <div class="box footer" style="color:#FFFFFF;">

          <div class="center_column" style="width:90%; max-width:900px; color:#444444; padding-top:20px; padding-bottom:20px; font-size:12px;">
            <p class="copyright">&copy; 2018 Planet Rocket</p>
            <a href="<?php echo APP_BASE; ?>/contact">
              <p class="contact_us">Contact Us</p>
            </a>
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

<script type="text/javascript" src="./js/loaders/loader-index-page.js"></script>

</body>
</html>
