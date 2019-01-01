import { splitByte, Uint8ToUint16 } from "./binary_utils";

export default function getImage(
    buffer: Uint8Array,
    globalColorTable: ColorTable,
    startOffset: number,
) {
    const base = startOffset;

    // image separator always equals to 2C(hex)
    const ImageSeparator = buffer[base];

    // image position
    const ImageLeft = Uint8ToUint16(buffer.slice(base + 1, base + 3));
    const ImageTop = Uint8ToUint16(buffer.slice(base + 3, base + 5));
    const ImageWidth = Uint8ToUint16(buffer.slice(base + 5, base + 7));
    const ImageHeight = Uint8ToUint16(buffer.slice(base + 7, base + 9));

    // packed field
    const [LocalColorTableFlag, Interlace, Sort, Future, Size] = splitByte(buffer[base + 9], [
        1,
        1,
        1,
        2,
        3,
    ]);

    // Local Color Map
    if (LocalColorTableFlag !== 0) {
        // use Local Color Map
    }

    // Raster Data
    LZW(buffer, base + 10);
}

function LZW(buffer: Uint8Array, startOffset: number) {
    const seq: number[] = [];
    const minCodeSize = buffer[startOffset];

    while (buffer[++startOffset] !== 0) seq.push(buffer[startOffset]);

    let test = [
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        2,
        2,
        2,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        2,
        2,
        2,
    ];

    const ck = Compress(test, minCodeSize);

    const mk = DeCompress(ck, minCodeSize);

    console.log(test);
    console.log(ck);
    console.log(mk);
}

function DeCompress(compressedSeq: number[], minCodeSize: number): number[] {
    const IndexStream: number[] = [];

    return IndexStream;
}

function Compress(rawSeq: number[], minCodeSize: number): number[] {
    const ClearCode = Math.pow(2, minCodeSize);
    const CodeTable = new Map<string, number>();
    const CodeStream: number[] = [ClearCode];
    let CodeAdder = 1;

    let indexBuffer = `${rawSeq[0]}`;

    for (let i = 1; i < rawSeq.length; i++) {
        const K = rawSeq[i];
        if (!CodeTable.has(`${indexBuffer}${K}`)) {
            CodeTable.set(`${indexBuffer}${K}`, ClearCode + ++CodeAdder);
            if (CodeTable.has(`${indexBuffer}`)) CodeStream.push(CodeTable.get(`${indexBuffer}`));
            else CodeStream.push(parseInt(indexBuffer, 10));
            indexBuffer = `${K}`;
        } else {
            indexBuffer = `${indexBuffer}${K}`;
        }
    }
    return CodeStream;
}
