<?php
/**
 * Helper functions
 *
 * @package Sahar
 */

/**
 * Fallback for primary navigation.
 *
 * @since 1.0.0
 */
function sahar_primary_navigation_fallback() {
	echo '<div>';
	echo '<ul class="primary-menu">';
	echo '<li><a class="menu-item" href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'Home', 'sahar' ) . '</a></li>';

	$qargs = array(
		'posts_per_page' => 4,
		'post_type'      => 'page',
		'orderby'        => 'name',
		'order'          => 'ASC',
	);

	$the_query = new WP_Query( $qargs );

	if ( $the_query->have_posts() ) {

		while ( $the_query->have_posts() ) {
			$the_query->the_post();

			echo '<li>';
			the_title( '<a class="navbar-item" href="' . esc_url( get_permalink() ) . '">', '</a>' );
			echo '</li>';
		}

		wp_reset_postdata();
	}

	echo '</ul>';
	echo '</div>';
}

/**
 * Return fonts URL.
 *
 * @since 1.0.0
 *
 * @return string Fonts URL.
 */
function sahar_fonts_url() {
	$fonts_url = '';

	$fonts   = array();
	$subsets = 'latin,latin-ext';

	/* translators: If there are characters in your language that are not supported by Roboto Slab, translate this to 'off'. Do not translate into your own language. */
	if ( 'off' !== _x( 'on', 'Roboto Slab font: on or off', 'sahar' ) ) {
		$fonts[] = 'Roboto Slab';
	}

	/* translators: If there are characters in your language that are not supported by Muli, translate this to 'off'. Do not translate into your own language. */
	if ( 'off' !== _x( 'on', 'Muli font: on or off', 'sahar' ) ) {
		$fonts[] = 'Muli';
	}

	if ( $fonts ) {
		$fonts_url = add_query_arg(
			array(
				'family'  => rawurlencode( implode( '|', $fonts ) ),
				'subset'  => rawurlencode( $subsets ),
				'display' => 'swap',
			),
			'https://fonts.googleapis.com/css'
		);
	}

	return esc_url_raw( $fonts_url );
}

/**
 * Render container markup.
 *
 * @since 1.0.0
 *
 * @param string $type Type.
 */
function sahar_render_main_container_markup( $type = 'open' ) {
	if ( ! in_array( $type, array( 'open', 'close' ), true ) ) {
		return;
	}

	$status = apply_filters( 'sahar_filter_main_container_status', true );

	if ( true !== $status ) {
		return;
	}

	switch ( $type ) {
		case 'open':
			echo '<div class="container">';
			break;

		case 'close':
			echo '</div><!-- .container -->';
			break;

		default:
			break;
	}
}

/**
 * Render posts navigation.
 *
 * @since 1.0.0
 */
function sahar_render_posts_navigation() {
	the_posts_navigation(
		array(
			'prev_text' => '<span class="meta-nav">' . sahar_get_svg( array( 'icon' => 'long-arrow-left' ) ) . '</span><span class="nav-title-text">' . esc_html__( 'Older posts', 'sahar' ) . '</span>',
			'next_text' => '<span class="nav-title-text">' . esc_html__( 'Newer posts', 'sahar' ) . '</span><span class="meta-nav">' . sahar_get_svg( array( 'icon' => 'long-arrow-right' ) ) . '</span>',
		)
	);
}
