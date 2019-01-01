import getGlobalColorTable from "./global_color_table";
import getGraphicsControlExtension from "./graphics_control_extension";
import getImage from "./image_descriptor";
import getScreenDescriptor from "./screen_descriptor";
import getSignature from "./signature";

export default function parse(buffer: Uint8Array) {
    // GIF Signature 6 bytes (gif87a, gif89a)
    const [signature, signatureEndOffset] = getSignature(buffer);
    if (signature !== "GIF87a" && signature !== "GIF89a")
        throw new Error("Error: unrecognized gif version.");

    // Logical Screen Descriptor 7 bytes (gif87a, gif89a)
    const [screenDescriptor, screenDescriptorEndOffset] = getScreenDescriptor(
        buffer,
        signatureEndOffset + 1,
    );

    // Global Color Table (gif87a, gif89a)
    const [globalColorTable, globalColorTableEndOffset] = getGlobalColorTable(
        screenDescriptor.hasGlobalColorTable,
        screenDescriptor.colorResolution,
        buffer,
        screenDescriptorEndOffset + 1,
    );

    // Graphics Control Extension (gif89a)
    const [
        graphicsControlExtension,
        graphicsControlExtensionEndOffset,
    ] = getGraphicsControlExtension(buffer, globalColorTableEndOffset + 1);

    // Image Descriptor (gif87a, gif89a)
    getImage(buffer, globalColorTable, graphicsControlExtensionEndOffset + 1);
}
