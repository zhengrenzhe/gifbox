import { splitByte, Uint8ToUint16 } from "./binary";

export default function parse(buffer: Uint8Array) {
    // GIF Signature 6 bytes(gif87a, gif89a)
    const signature = getSignature(buffer);
    if (signature !== "GIF87a" && signature !== "GIF89a")
        throw new Error("Error: unrecognized gif version.");

    // Logical Screen Descriptor 7 bytes(gif87a, gif89a)
    const screenDescriptor = getScreenDescriptor(buffer);
    console.log(screenDescriptor);
}

function getSignature(buffer: Uint8Array): GIF {
    return Array.from(buffer.slice(0, 6))
        .map(b => String.fromCharCode(b))
        .join("") as GIF;
}

function getScreenDescriptor(buffer: Uint8Array): LogicalScreenDescriptor87 {
    const width = Uint8ToUint16(buffer.slice(6, 8));
    const height = Uint8ToUint16(buffer.slice(8, 10));
    const [M, cr, _, pixle] = splitByte(buffer[10], [1, 3, 1, 3]);
    const backgroundColorIndex = buffer[11];
    return {
        screenWidth: width,
        screenHeight: height,
        hasGlobalColorTable: M === 1,
        colorResolution: cr + 1,
        pixle: pixle + 1,
        backgroundColorIndex,
    };
}
