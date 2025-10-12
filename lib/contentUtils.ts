type PortableTextBlock = {
	_type: string;
	style?: string;
	[key: string]: unknown;
};

/**
 * Split content blocks at intro section
 * @param blocks - Array of portable text blocks
 * @param paragraphCount - Number of paragraphs to include in intro (default: 2)
 * @returns Object with intro and rest blocks
 */
export function splitContentAtIntro(
	blocks: PortableTextBlock[],
	paragraphCount = 2,
) {
	const normalBlocks = blocks.filter(
		(b) => b._type === "block" && b.style === "normal",
	);

	if (normalBlocks.length < paragraphCount) {
		return { intro: blocks, rest: [] };
	}

	const lastIntroBlock = normalBlocks[paragraphCount - 1];
	const splitIndex = blocks.indexOf(lastIntroBlock) + 1;

	return {
		intro: blocks.slice(0, splitIndex),
		rest: blocks.slice(splitIndex),
	};
}
