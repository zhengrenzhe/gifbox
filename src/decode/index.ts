import parseGlobalColorTable from "./color_table";
import parseHeader from "./header";
import parseLogicalScreenDescriptor from "./logical_screen_descriptor";

class Data implements IGifData {
    public Version = null;
    public LogicalScreenWidth = 0;
    public LogicalScreenHeight = 0;
    public GlobalColorTableExisted = false;
    public GlobalColorTableSorted = false;
    public GlobalColorTableSize = 0;
    public ColorResolution = 0;
    public BackgroundColorIndex = 0;
    public PixelAspectRatio = 0;
    public GlobalColorTable = [];
}

function decode(buffer: Uint8Array) {

    const gifdata = new Data();

    parseHeader(gifdata, buffer);
    parseLogicalScreenDescriptor(gifdata, buffer);

    let lastPosition;

    lastPosition = parseGlobalColorTable(gifdata, buffer);

    console.log(gifdata);
}

export default decode;
