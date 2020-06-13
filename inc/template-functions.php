<?php
/**
 * Hooks
 *
 * @package Sahar
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @since 1.0.0
 *
 * @param array $classes Classes for the body element.
 * @return array Classes.
 */
function sahar_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	return $classes;
}

add_filter( 'body_class', 'sahar_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 *
 * @since 1.0.0
 */
function sahar_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}

add_action( 'wp_head', 'sahar_pingback_header' );

/**
 * Customize main container status.
 *
 * @since 1.0.0
 *
 * @param  bool $status Status.
 * @return bool Modified status.
 */
function sahar_customize_main_container_status( $status ) {
	if ( is_page_template( 'templates/builder.php' ) ) {
		$status = false;
	}

	return $status;
}

add_filter( 'sahar_filter_main_container_status', 'sahar_customize_main_container_status' );

/**
 * Add go to top icon.
 *
 * @since 1.0.0
 */
function sahar_add_go_to_top() {
	?>
	<a href="#masthead" id="scrollup" class="backtotop"><?php echo sahar_get_svg( array( 'icon' => 'angle-down' ) ); ?><span class="screen-reader-text"><?php esc_html_e( 'Go to top', 'sahar' ); ?></span></a>
	<?php
}

add_action( 'wp_footer', 'sahar_add_go_to_top' );

/**
 * Add dropdown icon if menu item has children.
 *
 * @since 1.0.0
 *
 * @param  string $title The menu item's title.
 * @param  object $item  The current menu item.
 * @param  array  $args  An array of wp_nav_menu() arguments.
 * @param  int    $depth Depth of menu item. Used for padding.
 * @return string $title The menu item's title with dropdown icon.
 */
function sahar_dropdown_icon_to_menu_link( $title, $item, $args, $depth ) {
	if ( 'menu-1' === $args->theme_location ) {
		foreach ( $item->classes as $value ) {
			if ( 'menu-item-has-children' === $value || 'page_item_has_children' === $value ) {
				$title = $title . sahar_get_svg( array( 'icon' => 'angle-down' ) );
			}
		}
	}

	return $title;
}

add_filter( 'nav_menu_item_title', 'sahar_dropdown_icon_to_menu_link', 10, 4 );
