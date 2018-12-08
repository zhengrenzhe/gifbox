import { splitByte, Uint8ToUint16 } from "./binary_utils";

export default function getImage(
    buffer: Uint8Array,
    globalColorTable: ColorTable,
    startOffset: number,
) {
    const base = startOffset;

    // Image Descriptor
    const imageLeft = Uint8ToUint16(buffer.slice(base + 1, base + 3));
    const imageTop = Uint8ToUint16(buffer.slice(base + 3, base + 5));
    const imageWidth = Uint8ToUint16(buffer.slice(base + 5, base + 7));
    const imageHeight = Uint8ToUint16(buffer.slice(base + 7, base + 9));
    const [tableFlag, orderFlag, _, p] = splitByte(buffer[base + 9], [1, 1, 3, 3]);

    // Local Color Map
    if (tableFlag !== 0) {
        // use Local Color Map
    }

    // Raster Data
}
