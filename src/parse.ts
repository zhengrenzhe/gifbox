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

const littleEndian = (() => {
    const buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true);
    return new Int16Array(buffer)[0] === 256;
})();

function Uint8ToUint16(buffer: Uint8Array) {
    const buf = new ArrayBuffer(buffer.length);
    const dv = new DataView(buf);
    for (let i = 0; i < buffer.length; i++) dv.setUint8(i, buffer[i]);
    return dv.getUint16(0, littleEndian);
}

function parse(buffer: Uint8Array) {
    // Header 6 bytes
    const signature = buffer.slice(0, 3);
    const version = getVersion(buffer.slice(3, 6));

    if (!isGIF(signature)) throw new Error("Error: not gif.");

    // Logical Screen Descriptor 7 bytes
    const width = Uint8ToUint16(buffer.slice(6, 8));
    const height = Uint8ToUint16(buffer.slice(8, 10));

    console.log(buffer.slice(10, 11));
}

export default parse;
