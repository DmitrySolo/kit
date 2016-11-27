<?php
/**
 * The template for displaying product content within loops
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-product.php.
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
?>
<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

global $product;

// Ensure visibility
if ( empty( $product ) || ! $product->is_visible() ) {
    return;
}?>
          <div class="col-4-m">
            <div class="category__product">
              <div class="category__product__image_ctn"><?php do_action( 'woocommerce_before_shop_loop_item_title' );?></div>
              <div class="category__product__title">
                <h3><?php do_action( 'woocommerce_shop_loop_item_title',$custom_fields );?></h3>
              </div>
            </div>
          </div>