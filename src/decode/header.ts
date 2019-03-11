function parseHeader(gifdata: IGifData, buffer: Uint8Array) {
    if (
        String.fromCharCode(buffer[0]) === "G" &&
        String.fromCharCode(buffer[1]) === "I" &&
        String.fromCharCode(buffer[2]) === "F" &&
        String.fromCharCode(buffer[3]) === "8" &&
        String.fromCharCode(buffer[5]) === "a"
    ) {
        if (String.fromCharCode(buffer[4]) === "7") {
            gifdata.Version = "87a";
            return;
        } else if (String.fromCharCode(buffer[4]) === "9") {
            gifdata.Version = "89a";
            return;
        } else {
            throw new Error("Error: unrecognized gif version.");
        }
    }

    throw new Error("Error: unrecognized gif version.");
}

export default parseHeader;
