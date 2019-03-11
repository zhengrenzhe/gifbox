import { splitByte, Uint8ToUint16 } from "./utils";

function parseLogicalScreenDescriptor(gifdata: IGifData, buffer: Uint8Array) {
    // canvas width and height
    gifdata.LogicalScreenWidth = Uint8ToUint16(buffer.slice(6, 8));
    gifdata.LogicalScreenHeight = Uint8ToUint16(buffer.slice(8, 10));

    // logical screen descriptor
    const [exist, cr, sort, size] = splitByte(buffer[10], [1, 3, 1, 3]);
    gifdata.GlobalColorTableExisted = exist === 1;
    gifdata.ColorResolution = cr;
    gifdata.GlobalColorTableSorted = sort === 1;
    gifdata.GlobalColorTableSize = size;

    gifdata.BackgroundColorIndex = buffer[11];
    gifdata.PixelAspectRatio = buffer[12];
}

export default parseLogicalScreenDescriptor;
