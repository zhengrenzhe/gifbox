const littleEndian: boolean = (() => {
    const buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true);
    return new Int16Array(buffer)[0] === 256;
})();

/**
 * merge Uint8 to an Uint16
 *
 * for example:
 * ```
 *  an Uint8 array contains two 8 bit number
 *  +---------------+     +---------------+
 *  |7 6 5 4 3 2 1 0|     |7 6 5 4 3 2 1 0|
 *  +---------------+     +---------------+
 *
 *  an Uint16 array contains one 16bit number
 *  +-------------------------------------+
 *  |15 14 13 12 11 10 9 8 7 6 5 4 3 2 1 0|
 *  +-------------------------------------+
 * ```
 */
function Uint8ToUint16(buffer: Uint8Array): number {
    const buf = new ArrayBuffer(buffer.length);
    const dv = new DataView(buf);
    for (let i = 0; i < buffer.length; i++) dv.setUint8(i, buffer[i]);
    return dv.getUint16(0, littleEndian);
}

/**
 * split byte to some bits by indicate position
 *
 * @param byte any number that want to be split
 * @param pos split position. eg: [1, 3, 1, 3] will split 247(1|111|0|111) to [1, 7, 1, 0]
 */
function splitByte(byte: number, pos: number[]): number[] {
    const res: number[] = [];
    for (let i = pos.length - 1; i >= 0; i--) {
        const cover = Math.pow(2, pos[i]) - 1;
        res.unshift(byte & cover);
        byte >>>= pos[i];
    }
    return res;
}

export { littleEndian, Uint8ToUint16, splitByte };
