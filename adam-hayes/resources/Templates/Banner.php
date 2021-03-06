<?php

namespace Resources\Templates;

class Banner {

private $_user;

private $_forHomePage = false;

	public function __construct($forHomePage) {

    if($forHomePage) {
    $this->_forHomePage = true;
    }

  }

	public static function go($forHomePage=false) {
	$n = new Banner($forHomePage);
	echo $n->concatenate();
	}

	public function concatenate() {  ob_start(); ?>

  <?php $styleString = (!$this->_forHomePage) ? 'style="background:#000000;"' : ""; ?>

        <div class="row" <?php echo $styleString; ?>>



            <?php if(!$this->_forHomePage) { ?>
            <div class="row main_title_height">


							<iframe src="/header.html"
								style="width:100%; height:100%;">
							</iframe>

							<a href="<?php echo APP_BASE; ?>"><img class="box" style="max-width:100%; max-height:100%;"
              						id="logo_main" src="/images/logo_white_PlanetRocket.png"/> </a>

              <div class="visible_at_screen_gt_size1">
              </div>

              <div class="visible_at_screen_lt_size1">
                <div id="hamburger_menu_icon" class="hamburger_menu_icon"></div>
              </div>

            </div>
            <?php } else { ?>

            <div class="row">

              <div class="visible_at_screen_lt_size1">
                <div class="row" style="height:100px;">
                  <div id="hamburger_menu_icon" class="hamburger_menu_icon"></div>
                </div>
              </div>

            </div>

            <?php } ?>



        </div>


      <?php

    return ob_get_clean();
	}


}
