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

<title>Planet Rocket - All Projects</title>

<link rel="stylesheet" id="normalize" href="/adam-hayes/public/css/normalize.css" type="text/css" media="all">
<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,700" rel="stylesheet">
<link rel="stylesheet" id="alex-lowe-core-layout" href="./css/alex-lowe-core-layout.css" type="text/css" media="all">
<link rel="stylesheet" id="gbc-main" href="./css/gbc-css/gbc-main.css" type="text/css" media="all">
<link rel="stylesheet" id="about-page" href="./css/about-page.css" type="text/css" media="all">


<script type="text/javascript" src="./js/lib/html5.js"></script>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-115020689-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-115020689-1');
</script>

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
 
    
    <div class="v-group" style="z-index:2; overflow:hidden;;">
    
          <div class="v-inner">
        <div class="box">
          <?php
          Banner::go();
          NavBar::go($user);
          ?>
        </div>
      </div>

      <!-- vertical conservation element -->

		

	  <div class="v-inner">
      <div class="box">
          <div class="center_column_content" >
            <h1 class="light-weight" >Planet Rocket is on a <strong>MISSION</strong></h1>
            <h2 class="light-weight" >To create a social platform for collaborative solutions to community problems.</h2>
            <p >We beleive by empowering and connecting cities, nonprofits, small businesses, schools, and community members, there is nothing we cannot do. Also, it wont hurt to have fun in the process</p>
        </div>
      </div>
    </div>
      <embed src="/adam-hayes/public/images/SS_Aboutus1.svg" style="background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
    background-size: cover;">
        <div class="v-inner">
        <div class="box">
          <div class="center_column_content" >
            <h1 class="light-weight" >Our <strong>BIG</strong> Vision</h1>
            <h2 class="light-weight" >A connected, collaborative effort of our planet for a better world</h2>
            <p >Working on world peace, the mitigation of climate change, creating a sustainable economy, fostering a healthy relationship between technology and humanity, and a more loving and compassionate world are worth for a mission statement</p>
        </div>
      </div>
    </div>

      <embed src="/adam-hayes/public/images/SS_Aboutus2.svg">
        <div class="v-inner">
      <div class="box">
          <div class="center_column_content" >
            <h1 class="light-weight" >Our <strong>HUMBOLDT</strong> County Vision</h1>
            <h2 class="light-weight" >We have people, we have the resources, now we need the plan</h2>
            <p >One of the greatest places on our planet is the perfect place to show the world what a community can really do. There is no problem that we cannot solve in our community. Suppose we did make our community a more vibrant place, what would that look like?</p>
        </div>
      </div>
    </div>

      <embed src="/adam-hayes/public/images/SS_Aboutus3.svg">

      <div class="center_column_content">
      <embed src="/adam-hayes/public/images/Artboard_21.svg">
      </div>
      
	  </div>
    
    

	  
      <!-- The footer -->
      @include('inc.footer')


    


	</div>
	
<script type="text/javascript">
window["_loggedIn"] = <?php echo $logged_in ? "true" : "false" ?>;
window["user"] = <?php echo $logged_in ? json_encode($user) : "null" ?>;
window["_APP_BASE"] = "<?php echo APP_BASE; ?>";
</script>

<script type="text/javascript" src="./js/loaders/loader-index-page.js"></script>

</body>
</html>
