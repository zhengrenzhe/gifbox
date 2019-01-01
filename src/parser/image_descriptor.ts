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

    // parse data sub-blocks
    parseImage(buffer, base + 10);
}

function parseImage(buffer: Uint8Array, offset: number) {
    const minCodeSize = buffer[offset];
    const SubBlocks: Uint8Array[] = [];

    while (buffer[++offset] !== 0) {
        // each sub block
        const blockSize = buffer[offset];
        const subBlock = new Uint8Array(blockSize);
        ++offset;
        for (let i = 0; i < blockSize; i++) subBlock[i] = buffer[offset + i];
        SubBlocks.push(subBlock);
        offset += blockSize - 1;
    }
}

function LZW(buffer: Uint8Array, startOffset: number) {
    const seq: number[] = [];

    while (buffer[++startOffset] !== 0) seq.push(buffer[startOffset]);

    // const ck = Compress(seq, minCodeSize);
    // const mk = DeCompress(seq, minCodeSize);

    console.log(seq);
    // console.log(ck);
    // console.log(mk);
}

function DeCompress(compressedSeq: number[], minCodeSize: number): number[] {
    const ClearCode = Math.pow(2, minCodeSize);
    function resetCodeTable() {
        const m = new Map<number, number[]>();
        for (let i = 0; i < ClearCode; i++) m.set(i, [i]);
        m.set(ClearCode, [ClearCode]).set(ClearCode + 1, [ClearCode + 1]);
        return m;
    }
    const IndexStream: number[] = [];
    const ColorTable = resetCodeTable();
    let CodeAdder = 1;

    // ignore clear code
    IndexStream.push(compressedSeq[1]);

    for (let i = 2; i < compressedSeq.length; i++) {
        const CODE = compressedSeq[i];
        if (ColorTable.has(CODE)) {
            IndexStream.push(...ColorTable.get(CODE));
            const K = ColorTable.get(CODE)[0];
            ColorTable.set(ClearCode + ++CodeAdder, [...ColorTable.get(compressedSeq[i - 1]), K]);
        } else {
            const K = ColorTable.get(compressedSeq[i - 1])[0];
            IndexStream.push(...ColorTable.get(compressedSeq[i - 1]), K);
            ColorTable.set(ClearCode + ++CodeAdder, [...ColorTable.get(compressedSeq[i - 1]), K]);
        }
    }

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
