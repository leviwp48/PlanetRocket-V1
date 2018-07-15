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

<link rel="stylesheet" id="alex-lowe-core-layout" href="/adam-hayes/public/css/alex-lowe-core-layout.css" type="text/css" media="all">
<link rel="stylesheet" id="about-page" href="/adam-hayes/public/css/about-page.css" type="text/css" media="all">
<link rel="stylesheet" id="gbc-main" href="/adam-hayes/public/css/gbc-css/gbc-main.css" type="text/css" media="all">
<script type="text/javascript" src="/adam-hayes/public/js/lib/html5.js"></script>
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
            <div class="center_column about-light-background" style="width:90%; max-width:800px; height:100%; font-family:Georgia;">


            <div class="row width-check"></div>
            <!--
            <br/><br/>

            <div class="row"><h1>What is Planet Rocket?</h1></div>
            <br/><br/>

            <strong>Bring up an issue:</strong> You know the ins and outs of your family, your school, and your community. You are the expert on what is going on. See an issue? See something that can be improved in your community? In your school? All over the world?  Tell people about it on Planet Rocket.

            <br/><br/>
            <strong>Share your opinion:</strong> Not all problems have easy fixes. The solutions are sometimes complicated, and all sides need to be heard. Planet Rocket is a collaborative approach to problem solving. We want to hear from you.

            <br/><br/>
            <strong>Start a project:</strong> Are you ready to hit the ground running with a project? Are you ready to get the party started? Share your successes with others at Planet Rocket. Here you will find support from people all over the globe, anxious to hear all the good things you can accomplish.

            <br/><br/>
            <strong>Contribute to a project:</strong> Can you volunteer to be a part of a project? Do you have a skill that can be used on a project? Can you offer professional advice to make sure the project is successful? Do you have equipment that can be used for a project? Are you great at organizing people to volunteer for a project? It is going to take all of us to change the world. Planet Rocket connects you to causes you’re passionate about and gives you the opportunity to use your skills to create change.

            <br/><br/>
            <strong>Donate to a good cause:</strong> Do you want to contribute to a project but don’t have the time to volunteer? Users in our network can donate to projects that they believe in with the peace of mind that their money is contributing to change!


            <br/><br/><br/>
            <div class="row"><h2>Who is Planet Rocket for?<h2></div>

            Planet Rocket is for EVERYONE.

            <br/><br/>
            <strong>Individuals:</strong> Do you have an idea about improving your community? Do you have time to volunteer to projects that will help out your neighbors?

            <br/><br/>
            <strong>Groups:</strong> Do you need help locating others to join your cause? Do you have ideas or research you can share with others on how to improve your community?

            <br/><br/>
            <strong>Entrepreneurs:</strong> Find people interested in your idea. Share your idea with others to get feedback. Get funding from people who want to see you succeed.

            <br/><br/>
            <strong>Nonprofits:</strong> Do you have an issue you are trying to solve and need community input? Are you interested in hearing from other agencies or community members who have had success with those issues?

            <br/><br/>
            <strong>Companies:</strong> Share the great projects you are working on and get feedback from others. Have open communication about how you can better serve your customers.

            <br/><br/>
            We encourage everyone to have the courage to share their views on Planet Rocket. We encourage everyone to also have the courage to listen to the other opinions. As Winston Churchill put it: “Courage is what it takes to stand up and speak; courage is also what it takes to sit down and listen.” Not all problems have easy fixes. The solutions are sometimes complicated, and all sides need to be heard. Planet Rocket is a collaborative approach to problem solving. We want to hear from you.


            <br/><br/><br/>
            <div class="row"><h2>Our Vision<h2></div>
            We passionately believe that we all hold the power to change the world. Our vision is to redefine what people working together looks like. Planet Rocket brings people from all over the world to brainstorm, problem solve, and execute projects that will change the world.

            <br/><br/>
            In the next years there will be overpopulation, massive climate change, food shortages, continued inequality, and a world on the brink of war. We all have our own experiences, struggles, and opinions. We also all have our own skills, passions, and visions for what the future can be. All of those things combined will help us to problem solve how to overcome humanity’s problems. This is the time for humanity to come together to take control of our fate.


            <br/><br/><br/>
            <div class="row"><h2>Our Values<h2></div>
           <strong> Equality ⬌ Empowerment ⬌ Happiness ⬌ Respect ⬌ Ideas ⬌ Empathy ⬌ World Peace  ⬌ Self-Actualization ⬌ Sustainability ⬌ Community</strong>
            <br/><br/>
            We base all of our actions on our values. We want to be known for staying true to our values in our business interactions. We encourage everyone to share their opinions in a respectful manner with others. However, we will not condone any type of bullying or rude behavior on Planet Rocket. We are not here to break each other down, we are here to change the world.


            <br/><br/><br/>
            <div class="row"><h2>About us<h2></div>
            <strong>Adam Hayes</strong> believes in people. His experience of working with people has given him insight to the power of communities. Adam believes all it takes is a good idea, and good people to make the world a better place. Adam’s background in design, outreach, sales, ideation, problem recognition, communication, rhetoric, storytelling, and leading teams has put Adam in a position where he is ready to launch a business for the stars.

            <br/><br/>
            <strong>Jason Jones</strong> is an alumni of Humboldt State University having earned a business degree with an emphasis in marketing and an MBA with an emphasis in strategic sustainability. He has previously worked with local organizations such as Humboldt County's Economic Development Department and the Humboldt Area Foundation to find viable solutions for issues within the community. He joined the Planet Rocket team because of his passion for community improvement through collaboration and networking

            <br/><br/>
            <strong>Irene Moreno</strong> brings several years of nonprofit and government experience to Planet Rocket. Irene has been working in the public sector since 2009. Her roles have included motivating others to reach their full potential, overcoming obstacles to reach goals, and mentoring youth to build their own businesses. Irene’s passions include uniting others and is a firm believer that anything can be accomplished when we work together.

-->

              <div class="row" style="margin:20px;"><h1 class="about-page-title">TRAITS <span class="about-orange-font">&</span> PROFILES<div class="row about-page-title2">of Our Founders</div></h1></div>


              <!-- The rows for Adam Hayes, visible at large-screen-size. -->
              <div class="row founder-row-visible-gt-600px">
                <div class="h-group" style="padding:20px; background:#343434; color:#F2F2F2;">
                  <div class="box">
                    <div class="row about-orange-font" style="margin-bottom:10px;"><h2>THE CEO</h2></div>
                    Adam Hayes believes in people. His experience of working with people has given him insight to the power of communities. Adam believes all it takes is a good idea, and good people to make the world a better place. Adam’s background in design, outreach, sales, ideation, problem recognition, communication, rhetoric, storytelling, and leading teams has put Adam in a position where he is ready to launch a business for the stars.
                  </div>
                  <div class="box" style="width:240px;">
                  </div>
                </div>
              </div>
              <div class="row founder-row-visible-gt-600px" style="margin-top:-240px;">
                <div class="h-group">
                  <div class="box">
                  </div>
                  <div class="box" style="width:230px;">

                    <div class="img-wrap-w-center">
                      <img class="box" alt="CEO Adam Hayes" src="/adam-hayes/public/images/founder-profile-adam-planet-rocket.png">
                      <div class="abox about-orange-font founder-avatar-label-right">
                        <div class="row"><h2>ADAM HAYES</h2></div>
                        <div class="row"><h3>Chief Executive Officer</h3></div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

               <!-- The row for Adam Hayes, visible at tablet/phone screen-size -->
              <div class="row founder-row-visible-lte-600px" style="padding:20px; background:#343434; color:#F2F2F2;">

                <div style="position:relative; display:inline; width:100px; float:right; right:-20px; padding:10px;">
                    <div class="img-wrap-w-center">
                      <img class="box" alt="CEO Adam Hayes" src="/adam-hayes/public/images/founder-profile-adam-planet-rocket.png">
                      <div class="abox about-orange-font founder-avatar-label-right">
                        <div class="row"><h2>ADAM HAYES</h2></div>
                        <div class="row"><h3>Chief Executive Officer</h3></div>
                      </div>
                    </div>
                </div>

                <div class="row about-orange-font"><h2>THE CEO</h2></div>
                Adam Hayes believes in people. His experience of working with people has given him insight to the power of communities. Adam believes all it takes is a good idea, and good people to make the world a better place. Adam’s background in design, outreach, sales, ideation, problem recognition, communication, rhetoric, storytelling, and leading teams has put Adam in a position where he is ready to launch a business for the stars.
              </div>



              <!-- The rows for Jason JOnes, visible at large-screen-size. -->
              <div class="row founder-row-visible-gt-600px">
                <div class="h-group" style="padding:20px; background:#343434; color:#F2F2F2;">

                  <div class="box" style="width:240px;">
                  </div>
                  <div class="box">
                    <div class="row about-orange-font" style="margin-bottom:10px;"><h2>THE CFO</h2></div>
                    Jason Jones is an alumni of Humboldt State University, having earned earned a business degree with an emphasis in marketing and an MBA with an emphasis in strategic sustainability. He has previously worked with local organizations such as Humboldt County's Economic Development Department and the Humboldt Area Foundation to find viable solutions for issues within the community. He joined the Planet Rocket team because of his passion for community improvement through collaboration and networking.
                  </div>

                </div>
              </div>
              <div class="row founder-row-visible-gt-600px" style="margin-top:-260px;">
                <div class="h-group">

                  <div class="box" style="width:230px;">

                    <div class="img-wrap-w-center">
                      <img class="box" alt="CFO Jason Jones" src="/adam-hayes/public/images/founder-profile-jason-planet-rocket.png">
                      <div class="abox about-orange-font founder-avatar-label-left">
                        <div class="row"><h2>JASON JONES</h2></div>
                        <div class="row"><h3>Chief Financial Officer</h3></div>
                      </div>

                    </div>

                  </div>
                  <div class="box">
                  </div>

                </div>
              </div>

               <!-- The row for Jason Jones, visible at tablet/phone screen-size -->
              <div class="row founder-row-visible-lte-600px" style="padding:20px; background:#343434; color:#F2F2F2; margin-top:40px;">

                <div style="position:relative; display:inline; width:100px; float:left; left:-20px; padding:10px;">
                    <div class="img-wrap-w-center">
                      <img class="box" alt="CFO Jason Jones" src="/adam-hayes/public/images/founder-profile-jason-planet-rocket.png">
                      <div class="abox about-orange-font founder-avatar-label-left">
                        <div class="row"><h2>JASON JONES</h2></div>
                        <div class="row"><h3>Chief Financial Officer</h3></div>
                      </div>

                    </div>
                </div>

                <div class="row about-orange-font"><h2>THE CFO</h2></div>
                   Jason Jones is an alumni of Humboldt State University, having earned earned a business degree with an emphasis in marketing and an MBA with an emphasis in strategic sustainability. He has previously worked with local organizations such as Humboldt County's Economic Development Department and the Humboldt Area Foundation to find viable solutions for issues within the community. He joined the Planet Rocket team because of his passion for community improvement through collaboration and networking.
              </div>



              <!-- The rows for Irene, visible at large-screen-size. -->
              <div class="row founder-row-visible-gt-600px">
                <div class="h-group" style="padding:20px; background:#343434; color:#F2F2F2;">
                  <div class="box">
                    <div class="row about-orange-font" style="margin-bottom:10px;"><h2>THE COO</h2></div>
                    Irene Moreno brings several years of nonprofit and government experience to Planet Rocket. Irene has been working in the public sector since 2009. Her roles have included motivating others to reach their full potential, overcoming obstacles to reach goals, and mentoring youth to build their own businesses. Irene’s passions include uniting others and is a firm believer that anything can be accomplished when we work together.
                  </div>
                  <div class="box" style="width:270px;">
                  </div>
                </div>
              </div>
              <div class="row founder-row-visible-gt-600px" style="margin-top:-240px;">
                <div class="h-group">
                  <div class="box">
                  </div>
                  <div class="box" style="width:260px;">

                    <div class="img-wrap-w-center">
                      <img class="box" alt="COO Irene Moreno" src="/adam-hayes/public/images/founder-profile-irene-planet-rocket.png">
                      <div class="abox about-orange-font founder-avatar-label-right" style="bottom:10px;">
                        <div class="row"><h2>IRENE MORENO</h2></div>
                        <div class="row"><h3>Chief Operating Officer</h3></div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

               <!-- The row for Irene, visible at tablet/phone screen-size -->
              <div class="row founder-row-visible-lte-600px" style="padding:20px; background:#343434; color:#F2F2F2; margin-top:40px;">

                <div style="position:relative; display:inline; width:100px; float:right; right:-20px; padding:10px;">
                    <div class="img-wrap-w-center">
                      <img class="box" alt="COO Irene Moreno" src="/adam-hayes/public/images/founder-profile-irene-planet-rocket.png">
                      <div class="abox about-orange-font founder-avatar-label-right">
                        <div class="row"><h2>IRENE MORENO</h2></div>
                        <div class="row"><h3>Chief Operating Officer</h3></div>
                      </div>

                    </div>
                </div>

                <div class="row about-orange-font"><h2>THE COO</h2></div>
                Irene Moreno brings several years of nonprofit and government experience to Planet Rocket. Irene has been working in the public sector since 2009. Her roles have included motivating others to reach their full potential, overcoming obstacles to reach goals, and mentoring youth to build their own businesses. Irene’s passions include uniting others and is a firm believer that anything can be accomplished when we work together.

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

<script type="text/javascript" src="/adam-hayes/public/js/loaders/loader-index-page.js"></script>

</body>
</html>
