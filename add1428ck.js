import {readTextLines, writeChanged,nodefs, fromObj, alphabetically0, readTextContent} from 'ptk/nodebundle.cjs'
await nodefs;
import {chunkprefix_1428} from '../../2022/cvny/chunkprefix-1428.js'
const content=readTextContent('ylz-vny.offtext/1vnydg.off');


const newcontent=content.replace(/\^cb([\d]+)([a-d])(\d+)/g,(m, page,col,line)=>{
    page=page.padStart(4,'0')
    line=line.padStart(2,'0')
    const key='T22p'+page+col+line;
    const ckid=chunkprefix_1428[key];
    if (ckid) {
        delete chunkprefix_1428[key];
        return '^n#'+ckid+m;
    } else {
        return m;
    }
})

console.log('remain',chunkprefix_1428)
writeChanged('ylz-vny.offtext/1vnydg.off2',newcontent,true)