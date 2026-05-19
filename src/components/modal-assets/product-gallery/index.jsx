import React, { useState, useRef, useEffect } from 'react';
import Modal from '../../modal/index_modal';
import { IoClose } from 'react-icons/io5';
import { GalleryWrapper, MainImage, ThumbList } from './index.style';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

function ProductGallery({ images = [], startIndex = 0, ref }) {
	const [current, setCurrent] = useState(startIndex);

	useEffect(() => {
		setCurrent(startIndex);
	}, [startIndex]);

	const next = () => {
		if (current < images.length - 1) setCurrent((prev) => prev + 1);
	};

	const prev = () => {
		if (current > 0) setCurrent((prev) => prev - 1);
	};

	return (
		<Modal.Center
			refName={ref}
			width="98vw"
			maxWidth="100vw"
			animation
			onClose={() => {}}
			onOpen={() => {}}
            borderPaddingY="0"
		>
			<GalleryWrapper>
				<header>
					<button type='button' onClick={() => ref.current.close()}>
						<IoClose />
					</button>

					<span>
						{current + 1}/{images.length}
					</span>
				</header>

				<button className="left" onClick={prev}>
					‹
				</button>

				<MainImage>
					<TransformWrapper>
						<TransformComponent>
							<div className="imageHolder rounded-[inherit]">
								<img src={images[current]?.url} />
							</div>
						</TransformComponent>
					</TransformWrapper>
				</MainImage>

				<button className="right" onClick={next}>
					›
				</button>

				<ThumbList>
					{images.map((x, i) => (
						<button
							key={i}
							className={i === current ? 'active' : ''}
							onClick={() => setCurrent(i)}
						>
							<img src={x.url} />
						</button>
					))}
				</ThumbList>
			</GalleryWrapper>
		</Modal.Center>
	);
}

export default ProductGallery;
