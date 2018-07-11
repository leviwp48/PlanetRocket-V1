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

<link rel="stylesheet" id="alex-lowe-core-layout" href="/css/alex-lowe-core-layout.css" type="text/css" media="all">
<link rel="stylesheet" id="about-page" href="/css/index-page.css" type="text/css" media="all">
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
          <div class="center_column" style="width:90%; max-width:900px; background:#FFFFFF;">
          </div>

        </div>
      </div>

      <!-- vertical conservation element- the container for the regular posts as well as the left column for ads. -->
      <div class="v-inner">
          <div class="box" style="height:100%; background:#FFFFFF;">

            <!-- This be the regular posts section -->
            <div class="center_column" style="width:90%; max-width:800px; height:100%; font-family:Georgia;">


            <div class="row homepage" style="text-align:center; margin-top:20px;"><h1>Welcome!</h1></div>
            <div class="row" style="text-align:center;">Welcome! Planet Rocket is a <strong>collaborative approach</strong> to problem solving. We believe that issues touch upon many systems, and that all sides need to be heard to come up with the best solution. We welcome <strong>idea people, doers, and funders</strong> here. But how can you use this platform? Do you have an idea about improving your community? Do you have time to volunteer to projects that will help out your neighbors? Are you able to contribute to projects with funding to carry out those projects? You can do all of that and more, here on Planet Rocket!
            </div>

            <div class="row homepage" style="text-align:center; margin-top:40px;">
              <h2>How can you use Planet Rocket?</h2>
            </div>


            <div class="h-group" style="margin-top:30px;">
              <div class="box icon-width" style="padding-left:10px; padding-right:10px; vertical-align:middle;">
                <div class="img-wrap-w-center">
                  <img class="box" alt="For Individuals" src="/images/home-page-individuals.png">
                </div>
              </div>
              <div class="box" style="vertical-align:middle;">
                <div class="row homepage"><h3>Individuals</h3></div>
                Do you have an idea about improving your community? Do you have time to volunteer to projects that will help out your neighbors? Do you need funding to carry out your project?
              </div>
            </div>


            <div class="h-group" style="margin-top:30px;">
              <div class="box icon-width" style="padding-left:10px; padding-right:10px; vertical-align:middle;">
                <div class="img-wrap-w-center">
                  <img class="box" alt="For Groups" src="/images/home-page-groups.png">
                </div>
              </div>
              <div class="box" style="vertical-align:middle;">
                <div class="row homepage"><h3>Groups</h3></div>
                Do you need help locating others to join your cause? Do you have ideas or research you can share with others on how to improve your community?
              </div>
            </div>


            <div class="h-group" style="margin-top:30px;">
              <div class="box icon-width" style="padding-left:10px; padding-right:10px; vertical-align:middle;">
                <div class="img-wrap-w-center">
                  <img class="box" alt="For Groups" src="/images/home-page-entrepreneurs.png">
                </div>
              </div>
              <div class="box" style="vertical-align:middle;">
                <div class="row homepage"><h3>Entrepreneurs</h3></div>
                Find people who are interested in your idea. Share your idea with others to get feedback. Get funding from people who want to see you succeed.
              </div>
            </div>


            <div class="h-group" style="margin-top:30px;">
              <div class="box icon-width" style="padding-left:10px; padding-right:10px; vertical-align:middle;">
                <div class="img-wrap-w-center">
                  <img class="box" alt="For Groups" src="/images/home-page-nonprofits.png">
                </div>
              </div>
              <div class="box" style="vertical-align:middle;">
                <div class="row homepage"><h3>Nonprofits</h3></div>
                Do you have an issue that you are trying to solve and you need community input? Are you interested in hearing from other agencies or community members who have had success with those issues?
              </div>
            </div>

            <div class="h-group" style="margin-top:30px;">
              <div class="box icon-width" style="padding-left:10px; padding-right:10px; vertical-align:middle;">
                <div class="img-wrap-w-center">
                  <img class="box" alt="For Groups" src="/images/home-page-companies.png">
                </div>
              </div>
              <div class="box" style="vertical-align:middle;">
                <div class="row homepage"><h3>Companies</h3></div>
                Share the great projects you are working on and get feedback from others. Have open communication about how you can better serve your customers!
              </div>
            </div>


            <div class="row" style="margin-top:40px;"></div>

            </div>
            <!-- End of Center column -->

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

<script type="text/javascript" src="/js/loaders/loader-index-page.js"></script>

</body>
</html>
