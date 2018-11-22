import download from "./download";
import parse from "./parse";

async function gif(url: string) {
    const buffer = await download(url);
    parse(buffer);
}

export default gif;
