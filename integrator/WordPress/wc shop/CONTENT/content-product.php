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
<?php
$attributes = $product->get_attributes();
$custom_fields = get_post_custom();

$terms = get_the_terms( $product->ID, 'product_cat' );
foreach ($terms as $term) {
$product_cat_id = $term->term_id;
    break;
}
?>
<?php if($product_cat_id == 7): ?>
<div class="catalog__item">

	<?php

	/**
	 * woocommerce_before_shop_loop_item hook.
	 *
	 * @hooked woocommerce_template_loop_product_link_open - 10
	 */
	do_action( 'woocommerce_before_shop_loop_item' );

	/**
	 * woocommerce_before_shop_loop_item_title hook.
	 *
	 * @hooked woocommerce_show_product_loop_sale_flash - 10
	 * @hooked woocommerce_template_loop_product_thumbnail - 10
	 */
	?>
    <div class="catalog__item__photoTitle">
        <div class="catalog__item__photoContainer">
            <?php do_action( 'woocommerce_before_shop_loop_item_title' );?>
        </div>
        <div class="catalog__item__title">
            <?php do_action( 'woocommerce_shop_loop_item_title',$custom_fields );?>
        </div>
    </div>
    <div class="catalog__item__charsOption">
        <dl><?php
            echo '<dt>Длинна</dt><dd>'.$custom_fields["_length"][0].' мм</dd>';
            echo '<dt>Ширина</dt><dd>'.$custom_fields["_width"][0].' мм</dd>';
            echo '<dt>Высота</dt><dd>'.$custom_fields["_height"][0].' мм</dd>';
            foreach ( $attributes  as $attribute ){
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


            }
            ?>

        </dl>
        <div class="catalog__item__options">
            <?php if(isset($dops)):?>
            <?php if(in_array("ГМ", $dops)):?><div class="catalog__item__option catalog__item__option--hydro tooltip" data-tooltip-content="#tooltip_hydro"></div><?php endif; ?>
            <?php if(in_array("Хромотерапия", $dops)):?><div class="catalog__item__option catalog__item__option--chrom tooltip" data-tooltip-content="#tooltip_ch"></div><?php endif; ?>
            <?php if(in_array("Смеситель", $dops)):?><div class="catalog__item__option catalog__item__option--plum tooltip" data-tooltip-content="#tooltip_pl"></div><?php endif; ?>
                <!--Tooltips-->
                <div style="display: none;">
                <div class="tooltip_templates">
                    <span id="tooltip_hydro">
                        Возможна Установка Системы массажей
                    </span>
                </div>
                <div class="tooltip_templates">
                    <span id="tooltip_ch">
                        Возможна Установка Хромотерапии
                    </span>
                </div>
                    <div class="tooltip_templates">
                    <span id="tooltip_pl">
                        Возможна Установка Cмесителя
                    </span>
                    </div>
                </div>
            <?endif;?>
        </div>
    </div>

	<?php
    /**
	 * woocommerce_shop_loop_item_title hook.
	 *
	 * @hooked woocommerce_template_loop_product_title - 10
	 */


	/**
	 * woocommerce_after_shop_loop_item_title hook.
	 *
	 * @hooked woocommerce_template_loop_rating - 5
	 * @hooked woocommerce_template_loop_price - 10
	 */
	//do_action( 'woocommerce_after_shop_loop_item_title' );

	/**
	 * woocommerce_after_shop_loop_item hook.
	 *
	 * @hooked woocommerce_template_loop_product_link_close - 5
	 * @hooked woocommerce_template_loop_add_to_cart - 10
	 */
	do_action( 'woocommerce_after_shop_loop_item' );
	?>
</div>
<?php elseif($product_cat_id == 8): ?>
    <li class="dops__info_container <?php if($product->get_title() == "Базовый Гидро"):?> dops__info_container--active <?php endif;?> dops__info_container--<?php echo $product->get_id()?>" >
        <div class="dops__info_complects">
            <div class="dops__info_description">
                <h5><?php echo $product->get_post_data()->post_content;?></h5>
                <table>
                    <tr>
                        <td colspan="2">
                            <h6>Технические Характеристики.</h6>
                        </td>
                    </tr>
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
                    echo '<tr><td><strong>'.$name.'</strong></td><td>'.$val.'</td></tr>';
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
                </table>
            </div>
            <div class="dops__info_graphyc"><?php echo $product->get_image('full');?></div>
        </div>
        <?php $crosSels= $product->get_cross_sells();
            if($crosSels):?>
        <div class="dops__info_dops">
            <ul><?php
                $_pf = new WC_Product_Factory();
                foreach ($crosSels as $crosSel) {

                    $_product = $_pf->get_product($crosSel);?>
                    <li class="dops__info_dop" style="background-image: url(<?php echo wp_get_attachment_url($_product->get_image_id())?>)"><span><?php echo $_product->get_title();?></span></li>
                <?php }?>
            </ul>
        </div>
        <?php endif;?>
        </li>
    <?php else:?>
    <div class="catalog__item">

        <?php

        /**
         * woocommerce_before_shop_loop_item hook.
         *
         * @hooked woocommerce_template_loop_product_link_open - 10
         */
        do_action( 'woocommerce_before_shop_loop_item' );?>
    <div class="catalog__item__photoTitle">
        <div class="catalog__item__photoContainer">
            <?php do_action( 'woocommerce_before_shop_loop_item_title' );?>
        </div>
        <div class="catalog__item__title">
            <?php do_action( 'woocommerce_shop_loop_item_title',$custom_fields );?>
        </div>
    </div>

    <?php
    /**
     * woocommerce_shop_loop_item_title hook.
     *
     * @hooked woocommerce_template_loop_product_title - 10
     */


    /**
     * woocommerce_after_shop_loop_item_title hook.
     *
     * @hooked woocommerce_template_loop_rating - 5
     * @hooked woocommerce_template_loop_price - 10
     */
    //do_action( 'woocommerce_after_shop_loop_item_title' );

    /**
     * woocommerce_after_shop_loop_item hook.
     *
     * @hooked woocommerce_template_loop_product_link_close - 5
     * @hooked woocommerce_template_loop_add_to_cart - 10
     */
    do_action( 'woocommerce_after_shop_loop_item' );
    ?>
    </div>
<?php endif;?>