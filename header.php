<?php
/**
 * The header for our theme
 *
 * @package Sahar
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'sahar' ); ?></a>

	<header id="masthead" class="site-header">
		<div class="container">
			<div class="site-branding">
				<?php
				the_custom_logo();

				echo '<div class="site-identity-wrapper">';
				if ( is_front_page() && is_home() ) :
					?>
					<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
					<?php
				else :
					?>
					<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
					<?php
				endif;
				$sahar_description = get_bloginfo( 'description', 'display' );
				if ( $sahar_description || is_customize_preview() ) :
					?>
					<p class="site-description"><?php echo $sahar_description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
				<?php endif; ?>
				<?php echo '</div><!-- .site-identity-wrapper -->'; ?>
			</div><!-- .site-branding -->

			<div class="main-right-header">

				<div id="main-nav">
					<button id="menu-toggle" class="menu-toggle"><?php esc_html_e( 'Menu', 'sahar' ); ?></button>
					<div id="site-header-menu" class="site-header-menu clear-fix">
						<nav id="site-navigation" class="main-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Primary Menu', 'sahar' ); ?>">
							<?php
							wp_nav_menu(
								array(
									'theme_location' => 'menu-1',
									'menu_class'     => 'primary-menu',
									'fallback_cb'    => 'sahar_primary_navigation_fallback',
								)
							);
							?>
						</nav><!-- .main-navigation -->
					</div><!-- #site-header-menu -->
				</div><!-- .main-nav -->

			</div><!-- .main-right-header -->

		</div><!-- .container -->
	</header><!-- #masthead -->

	<div id="content" class="site-content">
		<?php sahar_render_main_container_markup( 'open' ); ?>
