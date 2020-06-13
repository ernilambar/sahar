<?php
/**
 * Search form
 *
 * @package Sahar
 */

?>

<form action="<?php echo esc_url( home_url( '/' ) ); ?>" method="get" class="search-form" role="search">
	<div>
		<label for="s" class="screen-reader-text"><?php esc_html_e( 'Search for:', 'sahar' ); ?></label>
		<input type="search" id="<?php echo esc_attr( wp_unique_id( 's' ) ); ?>" class="search-field" name="s" value="<?php the_search_query(); ?>" placeholder="<?php echo esc_attr_x( 'Search&hellip;', 'search box placeholder', 'sahar' ); ?>">
		<button class="search-submit" type="submit"><?php echo sahar_get_svg( array( 'icon' => 'search' ) ); ?><span class="screen-reader-text"> <?php echo esc_html_x( 'Search', 'submit button', 'sahar' ); ?></span></button>
	</div>
</form>
