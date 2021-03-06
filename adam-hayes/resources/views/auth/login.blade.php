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

<title>Planet Rocket - Login</title>

<link rel="stylesheet" id="normalize" href="/css/normalize.css" type="text/css" media="all">
<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,700" rel="stylesheet">
<link rel="stylesheet" id="alex-lowe-core-layout" href="/css/alex-lowe-core-layout.css" type="text/css" media="all">
<link rel="stylesheet" id="about-page" href="/css/index-page.css" type="text/css" media="all">
<link rel="stylesheet" id="gbc-main" href="/css/gbc-css/gbc-main.css" type="text/css" media="all">
<link rel="stylesheet" id="form-styles" href="/css/form-styles.css" type="text/css" media="all">
<link rel="stylesheet" href="/css/login-page.css" type="text/css" media="all">

<script type="text/javascript" src="/js/lib/html5.js"></script>

<meta name="viewport" content="width=device-width">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta name="csrf-token" content="{!! csrf_token() !!}">
</head>
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
      <div class="v-inner" style="font-family: 'Open Sans', sans-serif;">
        <div class="box">

          <!-- This be the featured posts section -->
          <div class="center_column" style="width:90%; max-width:900px; background:#FFFFFF;">
          </div>

        </div>
      </div>

      <!-- vertical conservation element- the container for the regular posts as well as the left column for ads. -->
      <div class="v-inner" style="font-family: 'Open Sans', sans-serif;">
          <div class="box" style="height:100%; background:#FFFFFF;">

            <!-- This be the regular posts section -->
            <div class="center_column" style="width:90%; max-width:800px; height:100%;">
             <div class="shadowbox_panel">
                <div class="shadowbox_content">

                    <div class="row" style="margin-top:20px;"><h2>{{ __('Login') }}</h2></div>

                    <a class="row" style="margin-top:20px;" href="<?php echo APP_BASE; ?>/register"><h3>Not registered? Sign up now!</h3></a>

                    <div class="card-body">
                        <form method="POST" action="{{ route('login') }}">
                            @csrf

                            <div class="form-group row" style="margin-top:20px;">
                                <label for="email" class="col-sm-4 col-form-label text-md-right"><h3>{{ __('E-Mail Address') }}</h3></label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="row formstyles-text-input form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>

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
                                <div class="col-md-6 offset-md-4">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> {{ __('Remember Me') }}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" style="margin-top:20px;" class="btn btn-primary formstyles-submit-button" id="login">
                                        {{ __('Login') }}
                                    </button>

                                <!-- <a class="row" style="margin-top:20px; margin-bottom:20px;" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a> -->
                                </div>
                            </div>
                        </form>
                    </div>
              </div>
            </div>
                <div class="row" style="margin-top:40px;"></div>


            </div>
            <!-- End of Center column -->

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

<script src="/js/app.js"></script>
<script type="text/javascript" src="/js/loaders/loader-index-page.js"></script>

</body>
</html>
