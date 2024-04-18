/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save.js';
import metadata from './block.json';
import { LayoutBlockEdit } from './components/blocks/LayoutBlock/LayoutBlock.js';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

registerBlockType('pixelhero/grid-block', {
	apiVersion: 3,
	title: 'Grid Item Block',
	category: 'media',
	icon: "grid-view",
	supports: {
		html: false,
		inserter: false,
		defaultStylePicker: false,
	},
	usesContext: ['norrehus/color', 'norrehus/contentPosition'],
	attributes: {
		"media": {
			"type": "object",
			"default": {}
		},
		"title": {
			"type": "string",
			"default": "Title"
		},
		"url": {
			"type": "string",
			"default": ""
		},
	},
	edit: LayoutBlockEdit
})

registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	save: Save,
});

