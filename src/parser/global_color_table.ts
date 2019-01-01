export default function getGlobalColorTable(
    hasGlobalColorTable: boolean,
    colorResolution: number,
    buffer: Uint8Array,
    startOffset: number,
): [ColorTable, number] {
    const base = startOffset;

    if (!hasGlobalColorTable) return [[], base - 1];

    const table: Uint8Array[] = [];

    // global color table total bytes
    const total = Math.pow(2, colorResolution + 1) * 3;

    for (let offset = 0; offset < total; offset += 3)
        table.push(buffer.slice(base + offset, base + offset + 3));

    return [table, base + total - 1];
}
