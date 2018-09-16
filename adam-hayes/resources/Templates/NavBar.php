<?php

namespace Resources\Templates;

use Resources\Templates\NavBarUserDropDownWidget;

class NavBar {

private $_user;

private $_forHomePage = false;


	public function __construct($user, $forHomePage) {

	$this->_user = $user;

		if($forHomePage) {
		$this->_forHomePage = $forHomePage;
		}

	}

	public static function go($user, $forHomePage=false) {
	$n = new NavBar($user, $forHomePage);
	echo $n->concatenate();
	}
	
	


	public function concatenate() {  ob_start(); ?>
		<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,700" rel="stylesheet">
		

	        <div class="row top_nav_bar_blue_rgba  <?php echo (!$this->_forHomePage) ? "top_nav_negative_margin" : ""; ?>">

	          <div class="box top_nav_bar visible_at_screen_gt_size1" id="nav_bar">

	            <div class="center_column" style="width:80%; max-width:900px; color:#FFFFFF;">

	              <nav class="row styled_dropdowns" style="z-index:4;">
	                 <ul id="top-xyz" class="h-group">
	                 <?php
	                 	$currurl = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	                	if(('https://planetrocket.com/' === $currurl) or ('https://127.0.0.1/adam-hayes/public/' === $currurl))
						{
							?>
		                    <li class="box top-nav-item">
	                       		<a class="row" href="<?php echo APP_BASE; ?>" style="padding:8px; padding-left:20px; padding-right:20px;font-family: 'Open Sans', sans-serif; ">Home</a>
	                    	</li>
	                    	<?php		
						}
	                 	else
	                 	{
	                 		?>
	                    	<li class="box top-nav-item">
	                       		<a class="row" href="<?php echo APP_BASE; ?>" style="padding:8px; padding-left:20px; padding-right:20px;font-family: 'Open Sans', sans-serif;">Home</a>
	                    	</li>
	                    	<?php
	                    }
	                    
	                    
	                    
	                    
	                    
	                	if((strpos($currurl, 'projects') !== false) and (strpos($currurl,'public/user/projects') === false))
						{
							?>	
	                    	<li class="box top-nav-item">
	                       		<a class="row" href="<?php echo APP_BASE; ?>/projects/all" style="padding:8px; padding-left:20px; padding-right:20px;font-family: 'Open Sans', sans-serif;background-color:rgba(6, 157, 255, 0.5);">Projects</a>
	                    	</li>
	                    	<?php
	                    }
	                    
	                    else
	                    {
	                    	?>
	                    	<li class="box top-nav-item">
	                       		<a class="row" href="<?php echo APP_BASE; ?>/projects/all" style="padding:8px; padding-left:20px; padding-right:20px; font-family: 'Open Sans', sans-serif;">Projects</a>
	                    	</li>
	                    	<?php
	                    }
	                   
	                   
	                    
	                    
	                    if(strpos($currurl, 'training') !== false)
						{
							?>
							<li class="box top-nav-item">
								<a class="row" href="<?php echo APP_BASE; ?>/training" style="padding:8px; padding-left:20px; padding-right:20px;background-color:rgba(6, 157, 255, 0.5);font-family: 'Open Sans', sans-serif;">Training</a>
							</li>
							<?php
						}
						
						else
						{	
							?>
							<li class="box top-nav-item">
								<a class="row" href="<?php echo APP_BASE; ?>/training" style="padding:8px; padding-left:20px; padding-right:20px;font-family: 'Open Sans', sans-serif;">Training</a>
							</li>
							<?php
						}
						
						?>
						<!--<li class="box top-nav-item">
	                       <a class="row" href="/calendar" style="padding:8px; padding-left:20px; padding-right:20px;">Calendar</a>
	                    </li>-->
						
						
						<?php
						if(strpos($currurl, 'resources') !== false)
						{
							?>
	                    	 <li class="box top-nav-item">
	                       		<a class="row" href="<?php echo APP_BASE; ?>/resources" style="padding:8px; padding-left:20px; padding-right:20px;background-color:rgba(6, 157, 255, 0.5);font-family: 'Open Sans', sans-serif;">Resources</a>
	                    	</li>
	                    	<?php
	                    }
	                    
	                    else
	                    {
	                    	?>
	                    	<li class="box top-nav-item">
	                       		<a class="row" href="<?php echo APP_BASE; ?>/resources" style="padding:8px; padding-left:20px; padding-right:20px;font-family: 'Open Sans', sans-serif;">Resources</a>
	                    	</li>
	                    	<?php
	                    }	
	                    
	                    
	                    
	                    if(strpos($currurl, 'about') !== false)
						{
	                    	?>
	                    	<li class="box top-nav-item">
	                       		<a class="row" href="<?php echo APP_BASE; ?>/about" style="padding:8px; padding-left:20px; background-color:rgba(6, 157, 255, 0.5); padding-right:20px;font-family: 'Open Sans', sans-serif;">About</a>
	                    	</li>
	                    	<?php
	                    }
	                    
	                    else
	                    {
	                    	?>
	                    	<li class="box top-nav-item">
	                       		<a class="row" href="<?php echo APP_BASE; ?>/about" style="padding:8px; padding-left:20px; padding-right:20px;font-family: 'Open Sans', sans-serif;">About</a>
	                    	</li>
	                    	<?php
	                    }
	                    ?>
	                    <!--<li class="box top-nav-item"><a class="row" href="/contact" style="padding:8px; padding-left:20px; padding-right:20px;">Contact</a></li>-->

	                    <?php
	                    NavBarUserDropDownWidget::go($this->_user);
	                    ?>

	                 </ul>
	              </nav>

	            </div>

	          </div>

	        </div>


	<?php
	    return ob_get_clean();
	}


}
