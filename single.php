<?php
/**
 * The template for displaying all single posts
 *
 * @package Sahar
 */

get_header();
?>

	<main id="primary" class="site-main">

		<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/content', get_post_type() );

			the_post_navigation(
				array(
					'prev_text' => '<span class="screen-reader-text">' . esc_html__( 'Previous Post', 'sahar' ) . '</span><span class="nav-title"><span class="nav-title-icon-wrapper">' . sahar_get_svg( array( 'icon' => 'long-arrow-left' ) ) . '</span><span class="nav-title-text">%title</span></span>',
					'next_text' => '<span class="screen-reader-text">' . esc_html__( 'Next Post', 'sahar' ) . '</span><span class="nav-title"><span class="nav-title-text">%title</span><span class="nav-title-icon-wrapper">' . sahar_get_svg( array( 'icon' => 'long-arrow-right' ) ) . '</span></span>',
				)
			);

			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		endwhile;
		?>

	</main><!-- #main -->

<?php
get_sidebar();
get_footer();
