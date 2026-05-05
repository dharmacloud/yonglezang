import {nodefs,filesFromPattern, readTextContent} from 'ptk/nodebundle.cjs'
await nodefs;
const folder='ylz-prjn.offtext/ok/'
const files=await filesFromPattern('*.off',folder);


const dofile=f=>{
    const content=readTextContent(folder+f);
    let prevpn=0;
    content.replace(/\^pb(\d+)/g,(m,m1)=>{
        const pn=parseInt(m1);
        if (pn!=prevpn+1) console.log(f,prevpn,pn);
        prevpn=pn;
    });
    if (prevpn<80) console.log(f,prevpn)
}

files.forEach(dofile)
