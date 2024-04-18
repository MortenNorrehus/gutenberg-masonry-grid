import {
    useBlockProps,
    BlockControls,
    MediaUpload,
    MediaUploadCheck,
    BlockIcon,
    RichText,
    useInnerBlocksProps,
    URLInput
} from '@wordpress/block-editor';
import {
    ToolbarButton,
    ToolbarGroup,
    Dropdown,
} from "@wordpress/components";

import { link, linkOff, trash } from '@wordpress/icons';
import { dispatch } from "@wordpress/data";

export const LayoutBlockEdit = (props) => {
    const { clientId } = props;
    const fontColor = props.context['norrehus/color'];
    const contentPosition = props.context['norrehus/contentPosition'];

    const blockProps = useBlockProps({
        className: `layout_item`,
    })

    const innerBlocksProps = useInnerBlocksProps({
        className: `layout_item_content ${contentPosition}`
    }, {
        allowedBlocks: ['core/paragraph'],
        template: [['core/paragraph', { placeholder: 'Title' }]],
        templateLock: 'all'
    })

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(newMedia) =>
                                props.setAttributes({
                                    media: {
                                        mediaMime: newMedia.mime,
                                        mediaId: newMedia.id,
                                        mediaUrl: newMedia.url
                                    }
                                })}
                            allowedTypes={["image", "video"]}
                            value={props.attributes.media.mediaId}
                            render={({ open }) => (
                                <ToolbarButton
                                    icon={<BlockIcon icon="format-gallery" />}
                                    label="Replace Image"
                                    onClick={open}>
                                </ToolbarButton>)}
                        />
                    </MediaUploadCheck>

                    <Dropdown
                        renderContent={() =>
                            <URLInput
                                __nextHasNoMarginBottom
                                value={props.attributes.url}
                                onChange={(url, post) => props.setAttributes({ url, text: (post && post.title) || 'Click here' })}
                            ></URLInput>
                        }
                        renderToggle={({ _isOpen, onToggle }) => (
                            <ToolbarButton icon={props.attributes.url ? linkOff : link} onClick={onToggle} />)}
                    />

                    <ToolbarButton
                        icon={trash}
                        label="Delete Grid Item"
                        onClick={() => dispatch('core/block-editor').removeBlock(clientId)}>
                    </ToolbarButton>

                </ToolbarGroup>
            </BlockControls >
            <div {...blockProps} style={{ color: fontColor }}>

                {!props.attributes.media.mediaUrl &&
                    <div className='grid-item_media no-media'></div>
                }
                {props.attributes.media.mediaUrl &&
                    <div className='grid-item_media'>
                        <img src={props.attributes.media.mediaUrl} />
                    </div>
                }
                <div className='hover-effect'>
                    <span className='effect-1'></span>
                    <span className='effect-2'></span>
                    <span className='effect-3'></span>
                    <span className='effect-4'></span>
                </div>

                <RichText
                    {...blockProps}
                    tagName='h2'
                    value={props.attributes.title}
                    className={`layout_item_content ${contentPosition}`}
                    allowedFormats={'none'}
                    onChange={(value) => props.setAttributes({ title: value })}
                    placeholder={props.attributes.title}
                />
            </div>
        </>
    )
}