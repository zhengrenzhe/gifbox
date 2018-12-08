import { splitByte, Uint8ToUint16 } from "./binary_utils";

export default function getScreenDescriptor(
    buffer: Uint8Array,
    startOffset: number,
): [LogicalScreenDescriptor87, number] {
    const base = startOffset;
    const width = Uint8ToUint16(buffer.slice(base, base + 2));
    const height = Uint8ToUint16(buffer.slice(base + 2, base + 4));
    const [M, cr, _, pixle] = splitByte(buffer[base + 4], [1, 3, 1, 3]);
    const backgroundColorIndex = buffer[base + 5];
    return [
        {
            screenWidth: width,
            screenHeight: height,
            hasGlobalColorTable: M === 1,
            colorResolution: cr + 1,
            pixle: pixle + 1,
            backgroundColorIndex,
        },
        base + 6,
    ];
}
