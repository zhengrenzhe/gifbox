function parseGlobalColorTable(gifdata: IGifData, buffer: Uint8Array): number {
    const base = 13;

    if (!gifdata.GlobalColorTableExisted) return base;

    const totalBytes = Math.pow(2, gifdata.ColorResolution + 1) * 3;
    const table: Uint8Array[] = [];

    for (let offset = 0; offset < totalBytes; offset += 3) {
        table.push(buffer.slice(base + offset, base + offset + 3));
    }

    gifdata.GlobalColorTable = table;

    return base + totalBytes;
}

export default parseGlobalColorTable;
