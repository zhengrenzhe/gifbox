import download from "./download";
import parse from "./parser/index";

async function gif(url: string) {
    const buffer = await download(url);
    parse(buffer);
}

export default gif;
