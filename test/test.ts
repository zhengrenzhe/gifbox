import Gif from "../src";

Gif.download("./sample_1.gif").then(buffer => Gif.decode(buffer));
