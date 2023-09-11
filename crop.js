import sharp  from "sharp";
import {nodefs, writeChanged, readTextContent, readTextLines} from 'ptk/nodebundle.cjs'
import JSZip from 'jszip'
import path from "node:path";
import {exec} from 'child_process';
import {filerenames} from './cropfilerename.js'
await nodefs;

/*
11942811_46 ， 000012.jpg 000013.jpg 重覆
*/
const allinserts={
//     'vnydg7':{41:['vnydg7-41.png','vnydg7-42.png','vnydg7-43.png',
// 'vnydg7-44.png','vnydg7-45.png','vnydg7-46.png','vnydg7-47.png','vnydg7-48.png'
// ,'vnydg7-49.png','vnydg7-50.png']},
    'svv1':{73:['svv1-073.jpg','svv1-074.jpg','svv1-075.jpg']},
    'agms32':{ 67:['agms32-067.jpg','agms32-068.jpg'] },
    'agmm13':{ 82:['agmm13-082.jpg','agmm13-083.jpg','agmm13-084.jpg','agmm13-085.jpg','agmm13-086.jpg','agmm13-087.jpg','agmm13-088.jpg'] }
}
const tempdir="A:/crop/"
const deffile='./vcpp-yongle-versions/0010a-001羽08.zip'

let input=(process.argv[2]||deffile).replace('.json','.zip')//'E:/yongle-bei-3400/11864611_14普門品/'
let named=false;//name specified in json filename
const pageoffset=parseInt(process.argv[3]||'0'); 
let at2=input.lastIndexOf('/');
if (at2==-1) at2=input.lastIndexOf('\\');
let outfn=input.slice(at2+1).replace('.zip','');


let  cropfile=input.replace('.zip','')+'.json';
const at=input.indexOf('-');//json specific name
if (~at && input.match(/\-[a-z]/)) {
    outfn=input.match(/\-([^\.]+)/)[1]
    input=input.replace(/\-[^\.]+/,'');
    named=true;
}


const tasks=JSON.parse(readTextContent(cropfile));

const preparetempdir=()=>{
    if (fs.existsSync(tempdir)) {
        for (const file of fs.readdirSync(tempdir)) {
            fs.unlinkSync(path.join(tempdir, file));
        }
        // fs.rmdirSync(tempdir)
    } else {
        fs.mkdirSync(tempdir);
    }    
}
preparetempdir();

const W=720;
const H=1600;
const fit='fill';//contain'
const background={r:243, g:208, b:160};

const insertimage=async (img,nth,zipout)=>{
    const fn=path.dirname(input)+'/'+img;
    const buf=new sharp(fn);
    const outbuf=await buf.clone().resize(W,H,{fit}).jpeg({quality:30,mozjpeg:true}).toBuffer();
    zipout.file(nth+'.jpg',outbuf,{compression: "STORE"});
}
const dotask=async (buf,frame,nth,adjx,adjy,zipout)=>{  
    // console.log(buf)

    // const [buf, outfn, x,y,w,h]=t;
    // if (prevfn!==infn) {
    //     buf=await sharp(buf);
    // }
    const [left,top,width,height] =frame;
    
    const opts={left:left+adjx,top:top+adjy,width,height};
    //fix 450x1000, adjust ratio
    const quality=nth=='001'?50:15; //first page higher quality
    //const quality=50;

    
    let  outbuf=buf.clone().extract(opts)
    outbuf=await outbuf.resize(W,H,{fit,background}).jpeg({quality,mozjpeg:true}).toBuffer();
    const fn=tempdir+nth+'.jpg';
    if (zipout) {
        zipout.file(nth+'.jpg',outbuf,{compression: "STORE"});
    } else {
        writeChanged(fn,outbuf,false,'');//write binary buffer
    }
}



const data=fs.readFileSync(input);
async function runCommand(command) {
    const { stdout, stderr, error } = await exec(command);
    if(stderr){
        console.error('stderr:', stderr);
    }
    if(error){
        console.error('error:', error);
    }
    return stdout;
}

JSZip.loadAsync(data).then(async function (zip) {
    
    const images={};
    for (let zipfile in zip.files) {
        if (zip.files[zipfile].dir)continue;
        const buf = await zip.file(zipfile).async("arraybuffer");
        const at=zipfile.indexOf('/');
        const filename=zipfile.slice(at+1);
        images[filename]=buf
        // await dotask(buf);
    }
    let nth=0;
    const zipout=new JSZip();
    let extracted=null;

    if (!named){
        for (let i in filerenames) {
            if (~outfn.indexOf(i)) {
                outfn=filerenames[i];
                break
            }
        }
    }
    

    const inserts=allinserts[outfn];
    let insertcount=0;
    for (let i=0;i<tasks.length;i++) {
        const {name, frames,rotate} =tasks[i];
        const png=images[name];
        process.stdout.write('\r'+(i+1)+'/'+tasks.length+'   ')
        
        const buf=sharp(png);
        let adjy=0,adjx=0;
        if (rotate) {
            const angle=rotate/60; //60分之一
            const meta=await buf.metadata()
            const width=meta.width, height=meta.height;
            buf.rotate(angle);
            adjx = Math.round(0.5*Math.abs(width * Math.sin(rotate*Math.PI/(180*60))));//多出來的高
            adjy  = Math.round(0.5*Math.abs(height * Math.sin(rotate*Math.PI/(180*60))));//多出來的寬
        }
        for (let i=0;i<frames.length;i++) {
            nth++;
            if (inserts&&inserts[nth]) {
                for (let j=0;j<inserts[nth].length;j++) {
                    await insertimage( inserts[nth][j],(nth+pageoffset+insertcount).toString().padStart(3,'0'), zipout);
                    insertcount++;
                }
            }
            
            await dotask(buf, frames[i],(nth+insertcount+pageoffset).toString().padStart(3,'0'),adjx,adjy,zipout);
        }

        //append
        if (inserts&&inserts[nth+1]) {
            nth++;
            for (let j=0;j<inserts[nth].length;j++) {
                await insertimage( inserts[nth][j],(nth+pageoffset+insertcount).toString().padStart(3,'0'), zipout);
                insertcount++;
            }
        }

    }


    zipout.generateNodeStream({type:'nodebuffer',streamFiles:true,compression: "STORE"})
    .pipe(fs.createWriteStream(outfn+'.zip'))
    .on('finish', function () {
         console.log('done output ',outfn+'.zip')
    });


    // -g 1 create larget file, set min and max key frame interval
    const cmd='ffmpeg -r 1 -i '+tempdir+'%03d.jpg -b:v 0 -crf 45 -keyint_min 1 -g 5 '+outfn+'.webm';
    const cmd2='ffmpeg -r 1 -i '+tempdir+'%03d.jpg -b:v 512k -crf 40 -an  -x264opts keyint=1 -f mp4 -movflags +faststart -pix_fmt yuv420p -vf format=yuv420p -preset slow -profile:v main -level 3.0 '+outfn+'.mp4'

    //const cmd='ffmpeg -r 1 -i '+tempdir+'%03d.jpg -x265-params "crf=40:keyint=1"  -an -c:v libx265 -vtag hvc1 -vprofile main  -f mp4 -movflags +faststart -pix_fmt yuv420p  '+outfn+'.mp4'
    console.log('exec command: ',cmd)
     console.log('exec command: ',cmd2)
//    await runCommand(cmd)

});

