import { splitByte, Uint8ToUint16 } from "./binary";

function isGIF(signature: Uint8Array) {
    return (
        signature.length === 3 &&
        signature[0] === 71 &&
        signature[1] === 73 &&
        signature[2] === 70
    );
}

function getVersion(version: Uint8Array) {
    if (version[1] === 57) return "89a";
    if (version[1] === 55) return "87a";
    throw new Error("Error: unrecognized gif version.");
}

function parse(buffer: Uint8Array) {
    // Header 6 bytes
    const signature = buffer.slice(0, 3);
    const version = getVersion(buffer.slice(3, 6));

    if (!isGIF(signature)) throw new Error("Error: not gif.");

    // Logical Screen Descriptor 7 bytes
    const picWidth = Uint8ToUint16(buffer.slice(6, 8));
    const picHeight = Uint8ToUint16(buffer.slice(8, 10));
    const [
        globalTableFlag,
        colorResolution,
        globalTableSorted,
        globalTableSize,
    ] = splitByte(buffer[10], [1, 3, 1, 3]);
    const backgroundColorIndex = buffer[11];
    const pixelAspectRatio = buffer[12] === 0 ? 0 : (buffer[12] + 15) / 64;
}

export default parse;
