type GIF = "GIF87a" | "GIF89a";

type LogicalScreenDescriptor87 = {
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
};

type ColorTable = Uint8Array[];
