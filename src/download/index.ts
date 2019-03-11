function download(url: string): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "arraybuffer";
        xhr.send();
        xhr.onload = () => {
            resolve(new Uint8Array(xhr.response));
        };
        xhr.onerror = () => {
            reject();
        };
    });
}

export default download;
