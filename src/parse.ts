const GIF89a = "717370565797";
const GIF87a = "717370565597";

function parse(buffer: Uint8Array) {
    const signature = buffer.slice(0, 6).join("");
    console.log(signature === GIF89a);
}

export default parse;
