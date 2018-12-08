export default function getGlobalColorTable(
    hasGlobalColorTable: boolean,
    size: number,
    colorResolution: number,
    buffer: Uint8Array,
    startOffset: number,
): [ColorTable, number] {
    const base = startOffset;

    if (!hasGlobalColorTable) return [[], base - 1];

    const table: Uint8Array[] = [];
    const total = Math.pow(2, size) * 3;
    for (let offset = 0; offset < total; offset += 3) {
        let slice = buffer.slice(13 + offset, 13 + offset + 3);
        if (colorResolution !== 8)
            slice = slice.map(b => (b * 255) / Math.pow(2, colorResolution - 1));
        table.push(slice);
    }

    return [table, base + total - 1];
}
