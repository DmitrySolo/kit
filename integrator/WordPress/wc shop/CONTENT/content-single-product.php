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
<div class="container">
<div class="row product">
	<div class="product__title">
		<h2><?php echo get_the_title()?></h2>
		<p><?php echo round($custom_fields['_length'][0]/10).' * '.round($custom_fields['_width'][0]/10);?><span></span></p>
	</div>
	<div class="product__info_wrapper">
		<div class="product__info">
			<div class="product__info__charsOption">
				<h5>Характеристики:</h5>
				<dl>
					<dt>Длина</dt>
					<dd> <?php echo $custom_fields['_length'][0];?> мм</dd>
					<dt>Ширина</dt>
					<dd><?php echo $custom_fields['_width'][0];?> мм</dd>
					<dt>Высота</dt>
					<dd><?php echo $custom_fields['_height'][0];?> мм</dd>
					<?php foreach ( $attributes  as $attribute ){
					$name = wc_attribute_label( $attribute['name'] );
					if ($name != 'Комплектация' && $name != 'Дополнительное оборудование') {//тут пишем условия что бы не выводить ненужный атрибут
					if ( $attribute['is_taxonomy'] ) {
					$values = wc_get_product_terms( $product->id, $attribute['name'], array( 'fields' => 'names' ) );
					$val = apply_filters( 'woocommerce_attribute', wpautop( wptexturize( implode( ', ', $values ) ) ), $attribute, $values );
					} else {
					$values = array_map( 'trim', explode( WC_DELIMITER, $attribute['value'] ) );
					$val = apply_filters( 'woocommerce_attribute', wpautop( wptexturize( implode( ', ', $values ) ) ), $attribute, $values );
					}
					echo '<dt>'.$name.'</dt><dd>'.$val.'</dd>';
					}
					elseif( $name == 'Дополнительное оборудование') {
					if ( $attribute['is_taxonomy'] ) {
					$dops = $values = wc_get_product_terms( $product->id, $attribute['name'], array( 'fields' => 'names' ) );
					//echo $val = apply_filters( 'woocommerce_attribute', wpautop( wptexturize( implode( ', ', $values ) ) ), $attribute, $values );
					} else {
					$values = array_map( 'trim', explode( WC_DELIMITER, $attribute['value'] ) );
					$val = apply_filters( 'woocommerce_attribute', wpautop( wptexturize( implode( ', ', $values ) ) ), $attribute, $values );
					}
					}


					}?>
				</dl>
				<h5>Комплектация:</h5>
				<ul>
					<li><span>Ванна</span></li>
					<li><span>Каркас</span></li>
					<li><span>Фронтальная панель</span></li>
				</ul>
			</div>
		</div>
		<div class="product__Image_container" style="background-image:url(<?php echo wp_get_attachment_url($product->get_image_id())?>)"></div>
		<div class="product__sup_photoes">
			<?php $gals = $product->get_gallery_attachment_ids();
				foreach ($gals as $gal){
					echo "<a class='gallery' href='".wp_get_attachment_url($gal)."'><img src='".wp_get_attachment_url($gal)."' rel='gal'></a>";
				}
			?>
		</div>
	</div>
</div>
</div>
<div class="wrapper prod__description_wrapper">
	<div class="container">
		<!--Product Description-->
		<p class="product__description_description">
			<?php echo get_the_content();?>
		</p>
		<div class="product__order">
			<button>Заказать</button>
		</div>
	</div>
</div>
<div class="wrapper">
	<div class="container"><h2 class="block_title">Массажное оборудование</h2></div>
    <div class="dops__wrapper row">
        <div class="container">

            <div class="dops">
                <ul class="dops__menu">
                    <?php $args = array(
                        'posts_per_page' => -1,
                        'product_cat' => 'dopps',
                        'post_type' => 'product',
                        'orderby' => 'menu_order',
                        'order' => 'asc'
                    );
                    $the_query = new WP_Query( $args );
                    // The Loop
                    while ( $the_query->have_posts() ) {
                        $the_query->the_post();?>
                        <li class="dops__menu_item  <?php if(get_the_title() == "БАЗОВЫЙ Гидро"):?>dops__menu_item--selected<?php endif;?>" data-prid="<?php echo ltrim(get_the_ID());?>"><?php echo get_the_title();?></li>
                    <?php  } ?>
                </ul>
                <ul class="dops__info">
                    <?php echo do_shortcode('[product_category category="dopps" orderby = "menu_order" , order = "asc"]'); ?>
                </ul>
            </div>
        </div>
    </div>
</div>
</div>
