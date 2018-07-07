<?php 

namespace Resources\Templates;

class SideNavUserWidget {

private $_user;

	public function __construct($user) {

	$this->_user = $user;

	}

	public static function go($user) {
	$n = new SideNavUserWidget($user);
	echo $n->concatenate();
	}

	public function concatenate() {  ob_start(); 

        $linkElement = '';

        	if($this->_user) {
        	$emailEx = explode("@", $this->_user->email);
        	$name = $emailEx[0];

        	?> 

                <li class="row">
                    <div id="sidebar_nav_widget_name" class="row styled_sidebar_item">
                    <?php echo $name; ?>
                    </div>
                    <ul id="side-nav-notifications-container" class="row mobile_ul">
                        <li class="row">
                            <a href="<?php echo APP_BASE; ?>/user/projects" class="row styled_sidebar_item">
                            Your projects
                            </a>
                        </li>
                        <li class="row">
                            <a href="<?php echo APP_BASE; ?>/user/new-project" class="row styled_sidebar_item">
                            Start a new project
                            </a>
                        </li>
                        <li class="row">
                            <a href="<?php echo APP_BASE; ?>/logout" class="row styled_sidebar_item">
                            Logout
                            </a>
                        </li>
                    </ul>
                </li>

        		<?php

        	} else {

        	?>

                <li class="row">
                    <a href="<?php echo APP_BASE; ?>/login" class="row styled_sidebar_item">
                    Login
                    </a>
                </li>
                <li class="row">
                    <a href="<?php echo APP_BASE; ?>/register" class="row styled_sidebar_item">
                    Register
                    </a>
                </li>

        	<?php

        	}

	    $linkElement = ob_get_clean();
	
    return $linkElement;
	}


}