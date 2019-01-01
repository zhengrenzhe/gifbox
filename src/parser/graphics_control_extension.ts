import { splitByte, Uint8ToUint16 } from "./binary_utils";

export default function getGraphicsControlExtension(
    buffer: Uint8Array,
    startOffset: number,
): [GraphicsControlExtension, number] {
    const base = startOffset;

    // All extension blocks begin with 21(hex)
    const Introducer = buffer[base];

    // indicate the extension is Graphics Control Extension (F9 (hex))
    const GraphicControlLabel = buffer[base + 1];

    // total block size in bytes
    const ByteSize = buffer[base + 2];

    const [Future, Disposal, UserInputFlag, TransparentColorFlag] = splitByte(buffer[base + 3], [
        3,
        3,
        1,
        1,
    ]);

    const DelayTime = Uint8ToUint16(buffer.slice(base + 4, base + 6));

    const TransparentColorIndex = buffer[base + 6];

    // buffer[base + 7] is block terminator, always equal to 0

    return [
        {
            Introducer,
            GraphicControlLabel,
            ByteSize,
            Disposal,
            UserInputFlag,
            TransparentColorFlag,
            DelayTime,
            TransparentColorIndex,
        },
        base + 7,
    ];
}
