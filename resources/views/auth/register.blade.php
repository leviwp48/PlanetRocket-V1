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

<title>Planet Rocket - Register</title>

<link rel="stylesheet" id="alex-lowe-core-layout" href="css/alex-lowe-core-layout.css" type="text/css" media="all">
<link rel="stylesheet" id="about-page" href="css/index-page.css" type="text/css" media="all">
<link rel="stylesheet" id="gbc-main" href="css/gbc-css/gbc-main.css" type="text/css" media="all">
<link rel="stylesheet" id="form-styles" href="css/form-styles.css" type="text/css" media="all">
<script type="text/javascript" src="js/lib/html5.js"></script>

<meta name="viewport" content="width=device-width">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta name="csrf-token" content="{!! csrf_token() !!}">
<body>

    <!-- These guys are hidden and fixed rows -->
    <div id="js_responsive_device_width" style="height:0px; position:absolute;"></div>

    <div id="fixed_row" class="fixed_row top_nav_bar_blue_rgba2" style="z-index: 3; display: none;"></div>

    <?php
    $user = NULL;
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


                <div class="card">
                    <div class="card-header" style="margin-top:20px;"><h2>{{ __('Register') }}</h2></div>

                    <a class="row" style="margin-top:20px;" href="<?php echo APP_BASE; ?>/login"><h3>Already registered? Login now!</h3></a>


                    <div class="card-body">
                        <form method="POST" action="{{ route('register') }}">
                            @csrf

                            <div class="form-group row" style="margin-top:20px;">
                                <label for="name" class="col-md-4 col-form-label text-md-right"><h3>{{ __('Name') }}</h3></label>

                                <div class="col-md-6">
                                    <input id="name" type="text" class="row formstyles-text-input form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" value="{{ old('name') }}" required autofocus>

                                    @if ($errors->has('name'))
                                        <span class="invalid-feedback">
                                            <strong>{{ $errors->first('name') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row" style="margin-top:20px;">
                                <label for="email" class="col-md-4 col-form-label text-md-right"><h3>{{ __('E-Mail Address') }}</h3></label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="row formstyles-text-input form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>

                                    @if ($errors->has('email'))
                                        <span class="invalid-feedback">
                                            <strong>{{ $errors->first('email') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row" style="margin-top:20px;">
                                <label for="password" class="col-md-4 col-form-label text-md-right"><h3>{{ __('Password') }}</h3></label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="row formstyles-text-input form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

                                    @if ($errors->has('password'))
                                        <span class="invalid-feedback">
                                            <strong>{{ $errors->first('password') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row" style="margin-top:20px;">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right"><h3>{{ __('Confirm Password') }}</h3></label>

                                <div class="col-md-6">
                                    <input id="password-confirm" type="password" class="row formstyles-text-input form-control" name="password_confirmation" required>
                                </div>
                            </div>

                            <div class="form-group row mb-0" style="margin-top:30px;">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary formstyles-submit-button">
                                        {{ __('Register') }}
                                    </button>
                                </div>
                            </div>
                        </form>
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

<script src="js/app.js"></script>
<script type="text/javascript" src="js/loaders/loader-index-page.js"></script>

</body>
</html>
