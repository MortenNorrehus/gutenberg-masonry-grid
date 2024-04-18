import { useBlockProps, RichText, BlockControls, useInnerBlocksProps } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { Icon, check, link } from '@wordpress/icons';
import domReady from '@wordpress/dom-ready';

import { dispatch, select, getBlockContent } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";


const { parse } = wp.blockSerializationDefaultParser;
const { RawHTML } = wp.element;
export const Layout_1 = (props) => {

    const { clientId } = props;

    const sliderBlocks = select("core/block-editor").getBlocksByClientId(props.children.props.clientId)[0].innerBlocks;

    console.log(select("core/block-editor"))
    console.log(props.children.props.clientId)
    console.log('allBlocks', sliderBlocks)

    return (
        <>
            <div className='layout_1'>
                {
                    sliderBlocks.map((block, index) => {

                        const blocky = select('core/block-editor').getBlock(block.clientId)

                        console.log('blocky', blocky)


                        const blockProps = useBlockProps({
                            className: `KÆMPEPRUT-${index}`
                        })

                        const innerBlockProps = useInnerBlocksProps({ blocky })

                        return (
                            <>

                                <div>

                                    {innerBlockProps.children}

                                </div>
                            </>
                        )

                    })
                }
            </div>
        </>
    )

}