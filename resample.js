/* resample to 720x1600 
resample inputfolder [outputzip]

*/
import JSZip from 'jszip'
import sharp  from "sharp";
import {glob,nodefs, writeChanged} from "ptk/nodebundle.cjs"

await nodefs;

let folder=process.argv[2]||".";
let outfile=process.argv[3]||".";

const files=glob(folder,".jpg");
const W=720;
const H=1600;
const fit='fill';//contain'

let zipout;
if (outfile) zipout=new JSZip();

const outfolder="Z:/"
const dofile=async fn=>{
    const buf=new sharp(fn);
    const outbuf=await buf.clone().resize(W,H,{fit}).jpeg({quality:30,mozjpeg:true}).toBuffer();    
    return outbuf;
}
for (let i=0;i<files.length;i++) {
    const fn=folder+'/'+files[i];
    const buf=await dofile(fn)
    if (outfile) {
        process.stdout.write('\r'+(i+1)+'/'+files.length)
        zipout.file(files[i],buf,{compression: "STORE"});
    } else {
        writeChanged(outfolder+files[i],buf,true)
    }
}

if (outfile) {
    zipout.generateNodeStream({type:'nodebuffer',streamFiles:true,compression: "STORE"})
    .pipe(fs.createWriteStream(outfile+'.zip'))
    .on('finish', function () {
         console.log('done output ',outfile+'.zip')
    });
}