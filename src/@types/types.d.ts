type GIF = "GIF87a" | "GIF89a";

type LogicalScreenDescriptor = {
    screenWidth: number;
    screenHeight: number;

    /**
     * the maximum number of colors within an image.
     */
    pixle: number;

    hasGlobalColorTable: boolean;

    /**
     * bits of color resolution
     */
    colorResolution: number;

    backgroundColorIndex: number;

    sort: boolean;

    pixelAspectRatio: number;
};

type ColorTable = Uint8Array[];

type GraphicsControlExtension = {
    Introducer: number;
    GraphicControlLabel: number;
    ByteSize: number;
    Disposal: number;
    UserInputFlag: number;
    TransparentColorFlag: number;
    DelayTime: number;
    TransparentColorIndex: number;
};
