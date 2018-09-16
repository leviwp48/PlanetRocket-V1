<?php

namespace Resources\Templates;

class NavBarUserDropDownWidget {

private $_user;

	public function __construct($user) {

	$this->_user = $user;

	}

	public static function go($user) {
	$n = new NavBarUserDropDownWidget($user);
	echo $n->concatenate();
	}

	public function concatenate() {  ob_start();

        $linkElement = '';

        	if($this->_user) {
        	$emailEx = explode("@", $this->_user->email);
        	$name = $emailEx[0];
        	

        	$currurl = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
			if(strpos($currurl, 'user') !== false)
			{
				?>

			 	    <li class="box top-nav-item" id="user-nav-widget" style="background-color:rgba(6, 157, 255, 0.5);">
			 	 <?php
			}
			
			else
			{
				?>
				<li class="box top-nav-item" id="user-nav-widget">
				<?php
			}  
			?>
			 	    
        			<div class="row" style="padding:8px; padding-left:20px; padding-right:20px;">
                        <div class="box" id="user-nav-widget-name-container">
        			         <?php echo $name; ?>
                        </div>
        			</div>

        			<ul class="abox hidden dropdown-nav-menu-container" id="user-widget-dropdown-container"
        			style="top:100%; right:0px; left:auto; min-width:100%; width:auto; white-space:normal;">

        			    
        		 <?php
        		 	$currurl = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        		 	if(strpos($currurl,'user/projects') !== false)
        		 	{
        			   ?> 
        			    <a class="sidebar_link" href="<?php echo APP_BASE; ?>/user/projects">
                          		<li class="row dropdown-nav-menu-item" style="max-width:300px; background:#EFEFEF;">

								<div class="abox left-decorator"></div>

								<div class="row" style="white-space:nowrap; height:0px; overflow:hidden;">
								Your projects
								</div>
								<div class="row" style="white-space:normal;">
								Your projects
								</div>

                    		</li>
                		</a>
                		<?php
                	}
                	
                	else
                	{
                		?>
                		<a class="sidebar_link" href="<?php echo APP_BASE; ?>/user/projects">
                          		<li class="row dropdown-nav-menu-item" style="max-width:300px;">

								<div class="abox left-decorator"></div>

								<div class="row" style="white-space:nowrap; height:0px; overflow:hidden;">
								Your projects
								</div>
								<div class="row" style="white-space:normal;">
								Your projects
								</div>

                    		</li>
                		</a>
                		<?php
                	}
                	
					if(strpos($currurl,'user/new-project') !== false)
        		 	{
        		 		?>
                		<a class="sidebar_link" href="<?php echo APP_BASE; ?>/user/new-project">
                    		<li class="row dropdown-nav-menu-item" style="max-width:300px;background:#EFEFEF;">

                    			<div class="abox left-decorator"></div>

                    			<div class="row" style="white-space:nowrap; height:0px; overflow:hidden;">
								Start a new project
								</div>
								<div class="row" style="white-space:normal;">
								Start a new project
								</div>

                    		</li>
                		</a>
                		<?php
                	}
                	else
                	{
                		?>
                		<a class="sidebar_link" href="<?php echo APP_BASE; ?>/user/new-project">
                    		<li class="row dropdown-nav-menu-item" style="max-width:300px;">

                    			<div class="abox left-decorator"></div>

                    			<div class="row" style="white-space:nowrap; height:0px; overflow:hidden;">
								Start a new project
								</div>
								<div class="row" style="white-space:normal;">
								Start a new project
								</div>

                    		</li>
                		</a>
                		<?php
                	}
					?>
                		<a class="sidebar_link" href="<?php echo APP_BASE; ?>/logout">
                   			<li class="row dropdown-nav-menu-item" style="max-width:300px;">
                    			<div class="abox left-decorator"></div>

                    			<div class="row" style="white-space:nowrap; height:0px; overflow:hidden;">
								Logout
								</div>
								<div class="row" style="white-space:normal;">
								Logout
								</div>

                    		</li>
                		</a>


                	</ul>

                </li>

        		<?php

        	} else {

        	?>
					<!-- Levi Edit 7/23/18: Added the link to OpenSans font and adding font-family styling -->
					<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,700" rel="stylesheet">
					
		<?php
		$currurl = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
			if(strpos($currurl, 'register')!== false)
			{
				?>			
				<li class="box top-nav-item">
            		<a class="row" href="<?php echo APP_BASE; ?>/register" style="background-color:rgba(6, 157, 255, 0.5);padding:8px; padding-left:20px; padding-right:20px; font-family: 'Open Sans', sans-serif;">
            			Register
            		</a>
            	</li>
            <?php
            }
            
            else
            {
            	?>
            	<li class="box top-nav-item">
            		<a class="row" href="<?php echo APP_BASE; ?>/register" style="padding:8px; padding-left:20px; padding-right:20px; font-family: 'Open Sans', sans-serif;">
            			Register
            		</a>
            	</li>
            	<?php
            }
            	
            
            
            
            if(strpos($currurl, 'login')!== false)
			{
				?>	
            	<li class="box top-nav-item">
            		<a class="row"
            		href="<?php echo APP_BASE; ?>/login"
            		style="padding:8px; padding-left:20px;background-color:rgba(6, 157, 255, 0.5); padding-right:20px; font-family: 'Open Sans', sans-serif;">
            			Login
            		</a>
            	</li>
            	<?php
            }
            else
            {
            	?>
            	<li class="box top-nav-item">
            		<a class="row"
            		href="<?php echo APP_BASE; ?>/login"
            		style="padding:8px; padding-left:20px; padding-right:20px; font-family: 'Open Sans', sans-serif;">
            			Login
            		</a>
            	</li>
            	<?php
            }



        	

        	}

	    $linkElement = ob_get_clean();

    return $linkElement;
	}


}
