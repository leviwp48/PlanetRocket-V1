<?php

namespace Resources\Templates;

use Resources\Templates\SideNavUserWidget;

class SideNavBar {

private $_user;

	public function __construct($user) {

	$this->_user = $user;

	}

	public static function go($user) {
	$n = new SideNavBar($user);
	echo $n->concatenate();
	}

	public function concatenate() {  ob_start(); ?>

	    <div id="nav_sidebar_content" style="position:fixed; display:none; height:0px; width:0px;">

	        <div id="sidenav_header" class="row" style="background:#333333; color:#FFFFFF; padding:15px;">
	            <div class="box back_facing_chevron" style="vertical-align:middle;"></div><div class="box" style="vertical-align:middle; left:5px; font-size:2.3em; color:#03C7F4;"><b>BACK</b></div>
	        </div>

	        <ul id="top-xyz" class="row mobile_ul sidenav_menu_container">

	        			<?php SideNavUserWidget::go($this->_user); ?>

	        	        <li class="row">
	                    <a href="<?php echo APP_BASE; ?>" class="row styled_sidebar_item">
	            					Home
	            				</a>
	                  </li>
	                  <li class="row">
	                  	<a href="<?php echo APP_BASE; ?>/projects/all" class="row styled_sidebar_item">
	            					Projects
	            				</a>
	                  </li>
										<!--<li class="row">
											<a href="<?php echo APP_BASE; ?>/calendar" class="row styled_sidebar_item">
												Calendar
											</a>
										</li>-->
										<li class="row">
											<a href="<?php echo APP_BASE; ?>/Training" class="row styled_sidebar_item">
												Training
											</a>
										</li>
	                  <li class="row">
	                  	<a href="<?php echo APP_BASE; ?>/about" class="row styled_sidebar_item">
	            					About
	            				</a>
	                 	</li>
	                  <!--<li class="row">
	                  	<a href="/contact" class="row styled_sidebar_item">
	                    	Contact
	                    </a>
	                  </li>

	        	<li class="row">
	        		<div class="row styled_sidebar_item">
	          		Categories
	         		</div>
	         		<ul class="row mobile_ul">
	         			<li class="row">
	         				<div class="row styled_sidebar_item">
	          				Sci Fi
	         				</div>
	         				<ul class="row mobile_ul">
	         					<li class="row">
	         						<a href="http://glowingbluecore.com/category/sci-fi/" class="row styled_sidebar_item">
	            					ALL Sci Fi
	            					</a>
	            				</li>
	            				<li class="row">
	            					<a href="http://glowingbluecore.com/category/sci-fi/lazy-nerd-reviews/" class="row styled_sidebar_item">
	          						Lazy Nerd Reviews
	         						</a>
	         					</li>
	         					<li class="row">
	         						<a href="http://glowingbluecore.com/category/sci-fi/tropes/" class="row styled_sidebar_item">
	          						Tropes
	         					</a>
	         					</li>
	         					<li class="row">
	         						<a href="http://glowingbluecore.com/category/sci-fi/short-fiction/" class="row styled_sidebar_item">
	          						Short Fiction
	         						</a>
	         					</li>
	         					<li class="row">
	         						<a href="http://glowingbluecore.com/category/sci-fi/art/" class="row styled_sidebar_item">
	          						Art
	         						</a>
	         					</li>
	         				</ul>
	         			</li>
	         			<li class="row">
	         				<div class="row styled_sidebar_item">
	          				Culture
	         				</div>

	         			</li>
	         		</ul>
	         	</li>
	         	<li class="row">
	         		<div class="row styled_sidebar_item">
	          		Authors
	         		</div>
	     		</li>
	     		<li class="row">
	     			<a href="http://glowingbluecore.com/about/" class="row styled_sidebar_item">
	          		Why Cores?
	         		</a>
	         	</li>
	         	<li class="row">
	         		<a href="http://glowingbluecore.com/contact/" class="row styled_sidebar_item">
	          		Contact
	         		</a>
	         	</li>
	         	<li class="row">
	         		<a href="http://glowingbluecore.com" class="row styled_sidebar_item">
	          		Home
	         		</a>
	         	</li>
				-->

	        </ul>

	    </div>



	<?php
	    return ob_get_clean();
	}


}
