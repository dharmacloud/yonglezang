/* resample to 720x1600 */

import sharp  from "sharp";
import {glob,nodefs, writeChanged} from "ptk/nodebundle.cjs"
import path from "node:path";

await nodefs;

let folder=process.argv[2]||".";

const files=glob(folder,".jpg");
const W=720;
const H=1600;
const fit='fill';//contain'

const outfolder="Z:/"
const dofile=async fn=>{
    const buf=new sharp(fn);
    const outbuf=await buf.clone().resize(W,H,{fit}).jpeg({quality:30,mozjpeg:true}).toBuffer();    
    return outbuf;
}
for (let i=0;i<files.length;i++) {
    const fn=folder+'/'+files[i];
    const buf=await dofile(fn)
    writeChanged(outfolder+files[i],buf,true)
}
