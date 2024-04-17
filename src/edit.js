
import { __ } from '@wordpress/i18n';

import { useBlockProps, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
const ALLOWED_MEDIA_TYPES = ['image'];
import { Button, PanelBody, Panel, DropdownMenu } from '@wordpress/components';
import { useState } from '@wordpress/element';


import './editor.scss';

function updateGallery(media, props, setImages) {
	const images = media.map(image =>
	({
		url: image.url,
		id: image.id
	}));

	props.setAttributes({ images: images })
	setImages(images);
}

const svg = <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
	<path id="Path" fill="#dddddd" stroke="none" d="M 22.667 46 L 41.334 46 L 41.334 64 L 22.667 64 Z" />
	<path id="path1" fill="#dddddd" stroke="none" d="M 22.667 0 L 22.667 25.476414 L 22.667 27.51796 L 22.667 43 L 41.667 43 L 41.667 21.096283 L 41.667 19.054741 L 41.667 0 Z" />
	<path id="path2" fill="#dddddd" stroke="none" d="M 44.334 0 L 63.334 0 L 63.334 18.667 L 44.334 18.667 Z" />
	<path id="path3" fill="#dddddd" stroke="none" d="M 44.334 22 L 44.334 42.797913 L 44.334 44.736389 L 44.334 64 L 63.334 64 L 63.334 22 Z" />
	<path id="path4" fill="#dddddd" stroke="none" d="M 19 44.68409 L 19 42.740349 L 19 28 L 0 28 L 0 64 L 19 64 Z" />
	<path id="path5" fill="#dddddd" stroke="none" d="M 0 0 L 19 0 L 19 24.958 L 0 24.958 Z" />
</svg>


export default function Edit(props) {

	let index = 1;
	let row = 1;
	let className;
	const [images, setImages] = useState(props.attributes.images.slice(0, 19))
	return (
		<p {...useBlockProps()}>
			<InspectorControls>
				<Panel>
					<PanelBody>
						<DropdownMenu
							label="Layout"
							controls={
								[
									{
										title: 'Layout #1',
										icon: svg,
										onClick: () => console.log('layout 1'),
									},
								]
							}
						/>
					</PanelBody>
					<PanelBody>
						<MediaUploadCheck>
							<MediaUpload
								value={
									images?.map(image => image.id)}
								gallery
								multiple={true}
								onSelect={(media) => {
									updateGallery(media, props, setImages);

								}}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								render={({ open }) => (
									<Button className="is-primary" onClick={open}>Edit Gallery</Button>
								)}
							/>

						</MediaUploadCheck>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div className='masonry'>
				{images.map((image) => {
					index++;
					className = 'grid-item';

					if (row % 2 != 0) {
						if (index == 1 || index == 3 || index == 5) {
							className = 'grid-item tall ' + index;
							index++
						}
					} else {
						if (index == 2 || index == 4 || index == 6) {
							className = 'grid-item tall ' + index;
							index++
						}
					}
					if (index == 6) {
						index = 0;
						row++;
					}
					return (
						<div className={className}>
							<img src={image.url} />
						</div>
					)

				})}
			</div>
		</p>
	);
}
