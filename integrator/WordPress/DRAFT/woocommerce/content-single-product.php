//////////////////////////////////////////////////////////////////////////////////////////////////
<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	    https://docs.woocommerce.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

?>
<?php $product = wc_get_product( get_the_ID());
;?>
<?php $custom_fields = get_post_custom();?>
<?php $attributes = $product->get_attributes();?>
<h1 class="pageTitle"><?php echo get_the_title()?></h1>
      <div class="product">
        <div class="row">
          <div class="col-7-m">
            <div class="product__image_ctn" style="background-image:url(<?php echo wp_get_attachment_url($product->get_image_id())?>)"></div>
          </div>
          <div class="col-5-m">
            <div class="product__info">
                <?php echo get_the_content();?>
            </div>
          </div>
        </div>
      </div>