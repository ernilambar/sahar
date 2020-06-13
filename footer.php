<?php
/**
 * The template for displaying the footer
 *
 * @package Sahar
 */

?>

	<?php sahar_render_main_container_markup( 'close' ); ?>
	</div><!-- #content -->

	<footer id="colophon" class="site-footer">
		<div class="container">
			<?php if ( has_nav_menu( 'menu-2' ) ) : ?>
				<nav class="footer-menu-wrapper" role="navigation" aria-label="<?php esc_attr_e( 'Footer Menu', 'sahar' ); ?>">
					<?php
					wp_nav_menu(
						array(
							'theme_location' => 'menu-2',
							'depth'          => 1,
							'menu_class'     => 'footer-menu',
						)
					);
					?>
				</nav>
			<?php endif; ?>

			<div class="site-copyright">
				<div class="site-copyright-content">
					&copy; <?php echo esc_html( wp_date( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. <?php echo esc_html_e( 'All rights reserved.', 'sahar' ); ?>
					<span class="sep"> | </span>
					<?php
					/* translators: 1: Theme name, 2: Theme author. */
					printf( esc_html__( '%1$s by %2$s', 'sahar' ), 'Sahar', '<a href="https://www.nilambar.net/">Nilambar</a>' );
					?>
				</div><!-- .site-copyright-content -->
			</div><!-- .site-copyright -->
		</div><!-- .container -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
