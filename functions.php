<?php
/**
 * Theme functions
 *
 * @package Sahar
 */

if ( ! defined( 'SAHAR_VERSION' ) ) {
	define( 'SAHAR_VERSION', '1.0.0' );
}

if ( ! function_exists( 'sahar_setup' ) ) :
	/**
	 * Theme setup.
	 *
	 * @since 1.0.0
	 */
	function sahar_setup() {
		// Make theme available for translation.
		load_theme_textdomain( 'sahar' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		// Let WordPress manage the document title.
		add_theme_support( 'title-tag' );

		// Enable support for Post Thumbnails on posts and pages.
		add_theme_support( 'post-thumbnails' );

		// Register menu locations.
		register_nav_menus(
			array(
				'menu-1' => esc_html__( 'Primary', 'sahar' ),
				'menu-2' => esc_html__( 'Footer', 'sahar' ),
			)
		);

		// Add HTML5 support.
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'sahar_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		// Load default block styles.
		add_theme_support( 'wp-block-styles' );

		// Add support for responsive embeds.
		add_theme_support( 'responsive-embeds' );

		// Add support for core custom logo.
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 100,
				'width'       => 100,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;

add_action( 'after_setup_theme', 'sahar_setup' );

/**
 * Content width.
 *
 * @since 1.0.0
 *
 * @global int $content_width
 */
function sahar_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'sahar_content_width', 640 );
}

add_action( 'after_setup_theme', 'sahar_content_width', 0 );

/**
 * Register widget area.
 *
 * @since 1.0.0
 */
function sahar_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'sahar' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'sahar' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}

add_action( 'widgets_init', 'sahar_widgets_init' );

/**
 * Enqueue scripts and styles.
 *
 * @since 1.0.0
 */
function sahar_scripts() {
	$fonts_url = sahar_fonts_url();

	if ( ! empty( $fonts_url ) ) {
		wp_enqueue_style( 'sahar-google-fonts', $fonts_url, array(), SAHAR_VERSION );
	}

	wp_enqueue_style( 'sahar-style', get_stylesheet_uri(), array(), SAHAR_VERSION );
	wp_style_add_data( 'sahar-style', 'rtl', 'replace' );

	wp_enqueue_script( 'sahar-navigation', get_template_directory_uri() . '/assets/js/navigation.js', array(), SAHAR_VERSION, true );

	wp_localize_script(
		'sahar-navigation',
		'saharScreenReaderText',
		array(
			'expand'   => esc_html__( 'expand child menu', 'sahar' ),
			'collapse' => esc_html__( 'collapse child menu', 'sahar' ),
		)
	);

	wp_enqueue_script( 'sahar-custom', get_template_directory_uri() . '/assets/js/custom.js', array( 'jquery' ), SAHAR_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}

add_action( 'wp_enqueue_scripts', 'sahar_scripts' );

// Custom template tags for this theme.
require_once get_template_directory() . '/inc/template-tags.php';

// Functions which enhance the theme by hooking into WordPress.
require_once get_template_directory() . '/inc/template-functions.php';

// Customizer additions.
require_once get_template_directory() . '/inc/customizer.php';

// Helpers.
require_once get_template_directory() . '/inc/helpers.php';

// Icons.
require_once get_template_directory() . '/inc/icons.php';
