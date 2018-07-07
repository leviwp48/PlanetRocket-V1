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
<link rel="stylesheet" id="gbc-main" href="/css/gbc-css/gbc-main.css" type="text/css" media="all">
<script type="text/javascript" src="/js/lib/html5.js"></script>

<meta name="viewport" content="width=device-width">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta name="csrf-token" content="{!! csrf_token() !!}">
<body>

    <!-- These guys are hidden and fixed rows -->
    <div id="js_responsive_device_width" style="height:0px; position:absolute;"></div>

    <div style="position:fixed; width:100%; height:100%; background:url('/images/PlanetRocketMain-forweb3.png')">
    </div>

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
          Banner::go(true);

          NavBar::go($user, true);
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
        <div class="box" style="height:100%; color:white;">
  

            <div class="center_column index_page_column_width" style="max-width:1200px; color:white;">

              <div class="box" 
              style="width:70%; left:50%; margin-top:30px; transform:translateX(-50%); -ms-transform:translateX(-50%);">
                <div class="img-wrap-w-center">
                  <img class="box" src="/images/PlanetRocket-Logo.png">
                </div>
              </div>

            </div>


  <!--           <div class="row" style="margin-top:50px; text-align:center; background:rgba(91, 51, 224, 0.3); padding-top:10px; padding-bottom:10px;">
              <div class="row" style="padding:10px; background:rgba(28, 30, 142, 0.4);">
              <h2 class="indexpage">What's your big idea?</h2>
              </div>
            </div> -->

          <div class="row" style="margin-top:50px; text-align:center; padding-top:10px; padding-bottom:10px;">
              <div class="row" style="padding:10px; background:rgba(15, 47, 160, 0.6);">
              <h2 class="indexpage">What's your big idea?</h2>
              </div>
          </div>


            <div class="center_column index_page_column_width" style="max-width:1200px;">
              

              <div class="visible_at_screen_lt_size1">

                  <div class="row" style="margin-top:80px;">

                    <div class="box">
                    <h3 class="indexpage">A charity?</h3>
                    </div>

                    <div class="box" style="width:130px; height:130px; top:-50px; margin-left:20px;">
                      <div class="img-wrap-h-center">
                        <img class="box" src="/images/PlanetRocket-art-homepage-charity.png">
                      </div>
                    </div>

                  </div>

                  <div class="row" style="margin-top:20px;">

                    <div class="box">
                    <h3 class="indexpage">An app?</h3>
                    </div>

                    <div class="box" style="width:130px; height:130px; top:-50px; margin-left:20px;">
                      <div class="img-wrap-h-center">
                        <img class="box" src="/images/PlanetRocket-art-homepage-app.png">
                      </div>
                    </div>

                  </div>
                  <div class="row">

                    <div class="box">
                    <h3 class="indexpage">A community garden?</h3>
                    </div>

                    <div class="box" style="width:100px; height:130px; top:-50px; margin-left:5px;">
                      <div class="img-wrap-h-center">
                        <img class="box" src="/images/PlanetRocket-art-homepage-garden.png">
                      </div>
                    </div>

                  </div>

              </div>

              <div class="visible_at_screen_gt_size1">
                <div class="h-group" style="margin-top:80px;">

                  <div class="box" style="white-space:nowrap;">

                    <div class="box">
                    <h3 class="indexpage">A charity?</h3>
                    </div>

                    <div class="box" style="width:130px; height:130px; top:-50px; margin-left:20px;">
                      <div class="img-wrap-h-center">
                        <img class="box" src="/images/PlanetRocket-art-homepage-charity.png">
                      </div>
                    </div>

                  </div>

                  <div class="box" style="width:100%;"></div>


                  <div class="box" style="white-space:nowrap;">

                    <div class="box">
                    <h3 class="indexpage">An app?</h3>
                    </div>

                    <div class="box" style="width:130px; height:130px; top:-50px; margin-left:20px;">
                      <div class="img-wrap-h-center">
                        <img class="box" src="/images/PlanetRocket-art-homepage-app.png">
                      </div>
                    </div>

                  </div>

                </div>
                <div class="box" style="white-space:nowrap; left:50%; transform:translateX(-50%); -ms-transform:translateX(-50%);">

                  <div class="box">
                  <h3 class="indexpage">A community garden?</h3>
                  </div>

                  <div class="box" style="width:130px; height:130px; top:-50px; margin-left:20px;">
                    <div class="img-wrap-h-center">
                      <img class="box" src="/images/PlanetRocket-art-homepage-garden.png">
                    </div>
                  </div>

                </div>
              </div>


            </div>


          <div class="row" style="margin-top:50px; text-align:center; padding-top:10px; padding-bottom:10px;">
              <div class="row" style="padding:10px; background:rgba(15, 47, 160, 0.6);">
              <h2 class="indexpage">What's your mission?</h2>
              </div>
          </div>

            <div class="center_column index_page_column_width" style="max-width:1200px;">


              <div class="visible_at_screen_lt_size1">
                
                  <div class="row" style="margin-top:80px;">

                    <div class="box">
                    <h3 class="indexpage">Political Advocacy?</h3>
                    </div>

                    <div class="box" style="width:130px; height:130px; top:-50px; margin-left:20px;">
                      <div class="img-wrap-h-center">
                        <img class="box" src="/images/PlanetRocket-art-homepage-advocacy.png">
                      </div>
                    </div>

                  </div>

                  <div class="row" style="margin-top:20px;">

                    <div class="box">
                    <h3 class="indexpage">Fight hate?</h3>
                    </div>

                    <div class="box" style="width:130px; height:130px; top:-50px; margin-left:20px;">
                      <div class="img-wrap-h-center">
                        <img class="box" src="/images/PlanetRocket-art-homepage-peace.png">
                      </div>
                    </div>

                  </div>
                  <div class="row">

                    <div class="box">
                    <h3 class="indexpage">Raise awareness?</h3>
                    </div>

                    <div class="box" style="width:100px; height:130px; top:-50px; margin-left:5px;">
                      <div class="img-wrap-h-center">
                        <img class="box" src="/images/PlanetRocket-art-homepage-awareness.png">
                      </div>
                    </div>

                  </div>

              </div>
              <div class="visible_at_screen_gt_size1">

                <div class="h-group" style="margin-top:80px;">

                  <div class="box" style="white-space:nowrap;">

                    <div class="box">
                    <h3 class="indexpage">Politics?</h3>
                    </div>

                    <div class="box" style="width:130px; height:130px; top:-50px; margin-left:0px;">
                      <div class="img-wrap-h-center">
                        <img class="box" src="/images/PlanetRocket-art-homepage-advocacy.png">
                      </div>
                    </div>

                  </div>

                  <div class="box" style="width:100%;"></div>


                  <div class="box" style="white-space:nowrap;">

                    <div class="box">
                    <h3 class="indexpage">Fight hate?</h3>
                    </div>

                    <div class="box" style="width:130px; height:130px; top:-50px; margin-left:0px;">
                      <div class="img-wrap-h-center">
                        <img class="box" src="/images/PlanetRocket-art-homepage-peace.png">
                      </div>
                    </div>

                  </div>

                </div>


                <div class="box" style="white-space:nowrap; left:50%; transform:translateX(-50%); -ms-transform:translateX(-50%);">

                  <div class="box">
                  <h3 class="indexpage">Raise awareness?</h3>
                  </div>

                  <div class="box" style="width:130px; height:130px; top:-50px; margin-left:20px;">
                    <div class="img-wrap-h-center">
                      <img class="box" src="/images/PlanetRocket-art-homepage-awareness.png">
                    </div>
                  </div>

                </div>
              </div>

              <div class="row" style="font-size:1.3em;">
                Welcome! Planet Rocket is a <strong>collaborative approach</strong> to problem solving. We believe that issues touch upon many systems, 
                and that all sides need to be heard to come up with the best solution. We welcome <strong>idea people, doers, and funders</strong> here. 
                But how can you use this platform? Do you have an idea about improving your community? Do you have time to volunteer to projects 
                that will help out your neighbors? Are you able to contribute to projects with funding to carry out those projects? You can do 
                all of that and more, here on Planet Rocket!
                <br/><br/>
                If you are serious about bringing change to your community, let’s change the world!
              </div>

              <?php if($logged_in) { ?>
              <a class="row formstyles-button" href="/user/new-project" style="text-align:center;">Start your adventure!</a>
              <?php } else { ?>
              <a class="row formstyles-button" href="/login" style="text-align:center;">Start your adventure!</a>
              <?php } ?>

            </div>


            <!-- End of Center column -->
            <div class="row" style="margin-bottom:40px;"></div>

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

<script type="text/javascript" src="/js/loaders/loader-index-page.js"></script>

</body>
</html>