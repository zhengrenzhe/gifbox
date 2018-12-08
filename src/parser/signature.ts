export default function getSignature(buffer: Uint8Array): [GIF, number] {
    const signature = Array.from(buffer.slice(0, 6))
        .map(b => String.fromCharCode(b))
        .join("") as GIF;
    return [signature, 5];
}
