////////////////////////////////////////////////////////////////////////////////////////////////////
<?php
/**
 * The template for displaying product category thumbnails within loops
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-product_cat.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 2.6.1
 */

if ( ! defined( 'ABSPATH' ) ) {
  exit;
}
?>
<?php do_action( 'woocommerce_before_subcategory', $category ); ?>
      <div class="categories clearfix">
        <div class="row">
        <div class="col-4-m">
          <div class="categories__item">
            <?php do_action( 'woocommerce_shop_loop_subcategory_title', $category );?>
           <?php do_action( 'woocommerce_after_subcategory_title', $category );?>
            <h2 class="categories__item__title">Baciano</h2> <?php do_action( 'woocommerce_before_subcategory_title', $category );?>
          </div>
        </div>
        </div>
      </div>
<?php do_action( 'woocommerce_after_subcategory', $category ); ?>