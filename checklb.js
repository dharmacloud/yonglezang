import {nodefs,filesFromPattern, readTextContent} from 'ptk/nodebundle.cjs'
await nodefs;
const folder='ylz-prjn.offtext/ok/'
const files=await filesFromPattern('*.off',folder);
/* 检查pb之间的lb数量，原则上应该是4，如果不是4，且pb编号小于10，则输出警告。因为前面几折的pb数量不多，如果lb数量不对，可能是文本错误。*/

const dofile=f=>{
    const content=readTextContent(folder+f);
    const blocks=content.split(/\^pb(\d+)/);
    let pb='';
    for (let i=0;i<blocks.length;i++) {
        let lbcount=0;
        if (parseInt(blocks[i])) {
            pb=parseInt(blocks[i]);
            continue;
        }
        blocks[i].replace(/\^lb/g,m=>lbcount++);
        if (lbcount&&lbcount!=4 && pb<10) console.log(f,pb,lbcount)
    };
}

files.forEach(dofile)
