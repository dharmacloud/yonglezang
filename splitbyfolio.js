/* split big offtext into smaller files, 
for assigning job*/
import { readTextLines, writeChanged,nodefs} from 'ptk/nodebundle.cjs'
await nodefs;

const fn=process.argv[2]
const lines=readTextLines(fn);
let out=[]
let outfn='';

const flush=()=>{
            writeChanged(outfn+'.off',out.join('\n'),true)
            out.length=0;
}
for (let i=0;i<lines.length;i++) {
    const m=lines[i].match(/folio#([a-z\d]+)/);
    let l=lines[i]
    if (m){
        if (out.length) flush();
        outfn=m[1];
        l='^pb1'+lines[i]
    }
    out.push(l);
}
flush();