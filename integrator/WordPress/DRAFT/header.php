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

<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Гарантия и сервис</title>
    <meta name="description" content="This is test framework application">
    <meta name="keywords" content="application, test , hurray!!!">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:700|Tinos:400,400i,700&amp;amp;subset=cyrillic" rel="stylesheet" type="text/css">
    <link href="main.css" rel="stylesheet" type="text/css">
  </head>
  <body>
    <div class="container">
      <header class="mainHeader">
        <div class="row">
          <div class="col-4-l">
            <div class="logo"></div>
          </div>
          <div class="col-8-l">
            <nav class="lightMenu" role="navigation">
              <ul class="lightMenu__list">
                <li><a href="/production.html">Продукция</a></li>
                <li><a href="service.html">Гарантия и сервис</a></li>
                <li><a href="partners.html">Партнерам</a></li>
                <li><a href="buy.html">Где купить</a></li>
                <li class="lightmenu__item--active"><a href="sale.html">Акции</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <nav class="breadCrumb visible-l"><a class="breadcrumb__section breadCrumb__section--home" href="/">Главная</a><a class="breadcrumb__section" href="/">Другая страница</a><a class="breadcrumb__section" href="/">Другая страница</a>
      </nav>