import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
	SliderWrapper,
	Track,
	Slide,
	Content,
	Tag,
	Heading,
	Text,
	CTAButton,
	Dots,
	Dot,
	ArrowButton,
	HoverGroup,
} from './index.style';

const DRAG_THRESHOLD = 60;

// Classic infinite-carousel "clone" trick: one real-looking dummy slide is
// appended at each end ([lastClone, ...real, firstClone]). The track can
// then always animate in one direction; when it lands on a clone, we jump
// straight to the matching real slide with the transition switched off for
// one frame, so the loop reads as seamless instead of snapping backwards.
const InfiniteSlider = ({ slides, interval = 5500, onSlideClick }) => {
	const count = slides.length;
	const extended = [slides[count - 1], ...slides, slides[0]];

	const [index, setIndex] = useState(1);
	const [withTransition, setWithTransition] = useState(true);
	const [isHovering, setIsHovering] = useState(false);

	const [isDragging, setIsDragging] = useState(false);
	const [dragX, setDragX] = useState(0);
	const startX = useRef(0);
	const draggedRef = useRef(false);

	const goTo = useCallback((next) => {
		setWithTransition(true);
		setIndex(next);
	}, []);

	const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
	const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

	// Autoplay — paused on hover/drag and whenever the tab isn't visible.
	useEffect(() => {
		if (isHovering || isDragging) return undefined;

		const id = setInterval(() => {
			setWithTransition(true);
			setIndex((i) => i + 1);
		}, interval);

		return () => clearInterval(id);
	}, [isHovering, isDragging, interval]);

	useEffect(() => {
		const onVisibility = () => setIsHovering(document.hidden);
		document.addEventListener('visibilitychange', onVisibility);
		return () => document.removeEventListener('visibilitychange', onVisibility);
	}, []);

	// Landed on a clone — snap to the real slide it stands in for, with the
	// transition off so the jump isn't visible, then re-enable it.
	useEffect(() => {
		if (withTransition) return undefined;

		const raf = requestAnimationFrame(() => {
			requestAnimationFrame(() => setWithTransition(true));
		});

		return () => cancelAnimationFrame(raf);
	}, [withTransition]);

	const handleTransitionEnd = () => {
		if (index === extended.length - 1) {
			setWithTransition(false);
			setIndex(1);
		} else if (index === 0) {
			setWithTransition(false);
			setIndex(count);
		}
	};

	const handlePointerDown = (e) => {
		startX.current = e.clientX;
		draggedRef.current = false;
		setIsDragging(true);
	};

	const handlePointerMove = (e) => {
		if (!isDragging) return;
		const diff = e.clientX - startX.current;
		if (Math.abs(diff) > 5) draggedRef.current = true;
		setDragX(diff);
	};

	const endDrag = () => {
		setIsDragging(false);
		setDragX(0);
	};

	const handlePointerUp = (e) => {
		if (!isDragging) return;

		const diff = e.clientX - startX.current;
		if (diff < -DRAG_THRESHOLD) goNext();
		else if (diff > DRAG_THRESHOLD) goPrev();

		endDrag();
	};

	// A dot represents a real slide; while sitting on a clone (mid-snap) the
	// matching real slide is still the correct one to show as active.
	const realIndex = ((index - 1 + count) % count + count) % count;

	const handleSlideClick = (slide) => {
		if (draggedRef.current) return;
		onSlideClick?.(slide);
	};

	return (
		<HoverGroup
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<SliderWrapper
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onPointerLeave={isDragging ? endDrag : undefined}
			>
				<Track
					$count={extended.length}
					$index={index}
					$dragX={isDragging ? dragX : 0}
					$withTransition={withTransition}
					onTransitionEnd={handleTransitionEnd}
				>
					{extended.map((slide, i) => (
						<Slide
							key={`${slide.id}-${i}`}
							$image={slide.image}
							$align={slide.align}
							$valign={slide.valign}
							$count={extended.length}
							onClick={() => handleSlideClick(slide)}
						>
							<Content $align={slide.align}>
								<Tag $accent={slide.accent}>{slide.tag}</Tag>
								<Heading>{slide.heading}</Heading>
								<Text>{slide.text}</Text>
								<CTAButton $accent={slide.accent}>{slide.cta}</CTAButton>
							</Content>
						</Slide>
					))}
				</Track>
			</SliderWrapper>

			<ArrowButton $side="left" onClick={goPrev} aria-label="Previous slide">
				‹
			</ArrowButton>
			<ArrowButton $side="right" onClick={goNext} aria-label="Next slide">
				›
			</ArrowButton>

			<Dots>
				{slides.map((slide, i) => (
					<Dot
						key={slide.id}
						$active={i === realIndex}
						onClick={() => goTo(i + 1)}
						aria-label={`Go to slide ${i + 1}`}
					/>
				))}
			</Dots>
		</HoverGroup>
	);
};

InfiniteSlider.propTypes = {
	slides: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			image: PropTypes.string.isRequired,
			tag: PropTypes.string,
			heading: PropTypes.node,
			text: PropTypes.string,
			cta: PropTypes.string,
			align: PropTypes.oneOf(['left', 'center', 'right']),
			valign: PropTypes.oneOf(['center', 'end']),
			accent: PropTypes.string,
			link: PropTypes.string,
		})
	).isRequired,
	interval: PropTypes.number,
	onSlideClick: PropTypes.func,
};

export default InfiniteSlider;
