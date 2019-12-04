/**
 * External dependencies
 */
//import classnames from 'classnames';
//import jQuery from 'jquery';
import 'slick-carousel';

jQuery('.bokun-wp-product-images-carousel').slick({
    arrows: false,
    dots: true
});

//  Import CSS.
import './style.scss'
import './editor.scss'

const { __ } = wp.i18n;
const {InspectorControls} = wp.blockEditor;
const {Fragment, RawHTML} = wp.element;
const { registerBlockType } = wp.blocks;
const { TextControl, ToggleControl, Panel, PanelBody, PanelRow } = wp.components;

registerBlockType('bokun/product-widget', {
    title: __( 'Bokun product' ),
    category: 'widgets',
    keywords: [
        __( 'bokun' ),
    ],

    // Enable or disable support for low-level features
    supports: {
        html: false,
        reusable: true,
        align: ['full', 'wide']
    },

    // Set up data model for custom block
    attributes: {
        bookingChannelId: {
            type: 'string'
        },
        productIdMeta: {
            type: 'number',
            source: 'meta',
            meta: '_bokun_wp_bokun_id'
        },
        productId: {
            type: 'string'
        },
        useCustom: {
            type: 'boolean',
            default: false
        }
    },

    // The UI for the WordPress editor
    edit: props => {
        // Pull out the props we'll use
        const { attributes, className, setAttributes } = props;

        console.log(attributes);

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody>
                        <PanelRow>
                            <ToggleControl
                                label={__('Use custom styling')}
                                checked={ attributes.useCustom }
                                help={`Bokun plugin comes with default custom styling. You can overwrite the styling in your theme.`}
                                onChange={ () => setAttributes( { useCustom: ! attributes.useCustom } ) }
                            />
                        </PanelRow>
                        { ! attributes.useCustom && (
                            <PanelRow>
                                <TextControl
                                    value={attributes.productId}
                                    type="number"
                                    onChange={value => setAttributes({ productId: value })}
                                    placeholder="Product ID"
                                    label="Product ID"
                                />
                            </PanelRow>
                        )}
                        { ! attributes.useCustom && (
                            <PanelRow>
                                <TextControl
                                    value={attributes.bookingChannelId}
                                    type="text"
                                    onChange={value => setAttributes({ bookingChannelId: value })}
                                    placeholder="Booking channel ID"
                                    label="Booking channel ID"
                                />
                            </PanelRow>
                        )}
                    </PanelBody>
                </InspectorControls>
                <div className={className}>
                    { ( ! attributes.bookingChannelId || ! attributes.productId ) && <p>{ __('Widget settings NOK!') }</p> }
                    { attributes.bookingChannelId && attributes.productId && <p>{ __('Widget settings OK!') }</p> }
                </div>
            </Fragment>
        )
    },

    save: props => {
        //output via PHP
        return null;
    }
});