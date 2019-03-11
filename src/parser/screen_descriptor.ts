import { splitByte, Uint8ToUint16 } from "../decode/utils";

export default function getScreenDescriptor(
    buffer: Uint8Array,
    startOffset: number,
): [LogicalScreenDescriptor, number] {
    const base = startOffset;

    /**
     * canvas width, height
     */
    const Width = Uint8ToUint16(buffer.slice(base, base + 2));
    const Height = Uint8ToUint16(buffer.slice(base + 2, base + 4));

    /**
     * packed field
     *
     * if GlobalColorTableFlag is 1, a global color table will follow logical screen descriptor
     *
     * ColorResolution indicate the bits of the color(if global color table existed)
     * the bits of the color is 2^(ColorResolution+1)
     *
     * if SortFlag is 1, the colors in the global color table are sorted in order of "decreasing importance,"
     *
     * Pixle is the size of global color table
     */
    const [GlobalColorTableFlag, ColorResolution, SortFlag, Pixel] = splitByte(buffer[base + 4], [
        1,
        3,
        1,
        3,
    ]);

    /**
     * indicate the background color index in the global color table
     * if the image has no global color tabl, this byte should be 0
     */
    const BackgroundColorIndex = buffer[base + 5];

    /**
     * PixelAspectRatio
     */
    const PixelAspectRatio = buffer[base + 6];

    return [
        {
            screenWidth: Width,
            screenHeight: Height,
            hasGlobalColorTable: GlobalColorTableFlag === 1,
            colorResolution: ColorResolution,
            pixle: Pixel,
            backgroundColorIndex: BackgroundColorIndex,
            sort: SortFlag === 1,
            pixelAspectRatio: PixelAspectRatio,
        },
        base + 6,
    ];
}
