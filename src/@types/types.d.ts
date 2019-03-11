type Version = "87a" | "89a";

interface IGifData {
    Version: Version;

    LogicalScreenWidth: number;
    LogicalScreenHeight: number;
    GlobalColorTableExisted: boolean;
    GlobalColorTableSorted: boolean;
    GlobalColorTableSize: number;
    ColorResolution: number;
    BackgroundColorIndex: number;
    PixelAspectRatio: number;

    GlobalColorTable: Uint8Array[];
}

// type GIF = "GIF87a" | "GIF89a";
//
// type LogicalScreenDescriptor = {
//     screenWidth: number;
//     screenHeight: number;
//
//     /**
//      * the maximum number of colors within an image.
//      */
//     pixle: number;
//
//     hasGlobalColorTable: boolean;
//
//     /**
//      * bits of color resolution
//      */
//     colorResolution: number;
//
//     backgroundColorIndex: number;
//
//     sort: boolean;
//
//     pixelAspectRatio: number;
// };
//
// type ColorTable = Uint8Array[];
//
// type GraphicsControlExtension = {
//     Introducer: number;
//     GraphicControlLabel: number;
//     ByteSize: number;
//     Disposal: number;
//     UserInputFlag: number;
//     TransparentColorFlag: number;
//     DelayTime: number;
//     TransparentColorIndex: number;
// };
