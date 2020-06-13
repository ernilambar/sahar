<?php
/**
 * Template for Page Builder
 *
 * Template Name: Page Builder
 *
 * @package Sahar
 */

get_header();

if ( have_posts() ) :
	while ( have_posts() ) :
		the_post();
		the_content();
	endwhile;
endif;

get_footer();
