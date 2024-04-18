
import { __ } from '@wordpress/i18n';

import { useBlockProps, InspectorControls, useInnerBlocksProps } from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	Panel,
	Dropdown,
	ColorPalette,
	SelectControl
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { ColorButton } from './components/ColorButton/Colorbutton';
import { dispatch, select } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";

import './editor.scss';

const colorPalette = select('core/block-editor').getSettings().colors;

export default function Edit(props) {

	const [color, setColor] = useState(props.attributes.color)

	const blockProps = useBlockProps({
		className: 'masonry'
	})
	const innerBlocksProps = useInnerBlocksProps({
		className: props.attributes.layout
	}, {
		allowedBlocks: ['pixelhero/grid-block']
	})

	const addItem = (props) => {
		console.log(props)
		const innerCount = select("core/block-editor").getBlocksByClientId(props.clientId)[0]
			.innerBlocks.length;
		let block = createBlock("pixelhero/grid-block");
		dispatch("core/block-editor").insertBlock(block, innerCount, props.clientId);
	}

	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody>
						<Dropdown
							className="my-container-class-name"
							contentClassName="my-popover-content-classname"
							renderToggle={({ isOpen, onToggle }) => (
								<ColorButton color={color} action={onToggle} label="Text Color" />
							)}
							renderContent={() => (
								<ColorPalette
									colors={colorPalette}
									value={color}
									onChange={(color) => { props.setAttributes({ color: color }), setColor(color) }}
								/>
							)}
						/>
					</PanelBody>
					<PanelBody>
						<SelectControl
							label="Content Position"
							value={props.attributes.contentPosition}
							options={[
								{ label: 'Middle Left', value: 'middle-left' },
								{ label: 'Middle Center', value: 'middle-center' },
								{ label: 'Middle Right', value: 'middle-right' },
								{ label: 'Middle Bottom', value: 'middle-bottom' },
								{ label: 'Bottom Left', value: 'bottom-left' },
								{ label: 'Bottom Right', value: 'bottom-right' },
							]}
							onChange={(newPos) => props.setAttributes({ contentPosition: newPos })}
							__nextHasNoMarginBottom
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div {...blockProps}>
				<div  {...innerBlocksProps} />
				<Button className='addItem' onClick={() => addItem(props)}>Add Item</Button>
			</div>

		</>
	);
}
