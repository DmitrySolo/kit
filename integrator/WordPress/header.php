<html <?php language_attributes(); ?>>
<title><?php  bloginfo('name'); wp_title( '|', true, 'right' ); ?></title>
<?php wp_head(); ?>
<body <?php body_class(); ?> >
<nav>
    <?php
    $args = array(
        'theme_location' => 'primary',
        'menu_class'=>'',
        'container'=>'',
        'container_class'=>''

    );
    wp_nav_menu($args);
    ?>
    <?php get_search_form(); ?>
/////////////////////////////////////////////////////////////////////////////////////////////////
