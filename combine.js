import {nodefs,filesFromPattern, readTextLines, writeChanged} from 'ptk/nodebundle.cjs'
await nodefs;
const folder='ylz-prjn.offtext/ok/'
const files=await filesFromPattern('*.off',folder);

files.sort((a,b)=>{
    return parseInt(a.slice(3))-parseInt(b.slice(3));
})
const out=[]
const breaks=[100,200,300,400,477,536,555,565,573,575,576,577,578,600];
let bkid=0;
const dofile=f=>{
    const content=readTextLines(folder+f);
    const i=parseInt(f.slice(3));
    out.push(content.join('\n'))

    if (~breaks.indexOf(i)) {
        writeChanged('mpp'+(bkid+1)+'v.off',out.join('\n'),true);
        bkid=i;
        out.length=0;
    }

}

files.forEach(dofile)
