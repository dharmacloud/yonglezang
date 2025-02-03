/*
from: https://docs.google.com/spreadsheets/d/1MVVBbS60aHA1QfQrj9n9ghuUiy5rx6F1rNDBKFa2Ti8/edit#gid=532868174

json generated from https://accelon.github.io/timestamper/
*/
import {writeChanged,nodefs} from 'ptk/nodebundle.cjs'
import {sktracks,tracks} from './tracks.js'
await nodefs

const parseTime=str=>{
    let m=0,s=0,h=0,frag=0;
    str=str.trim();
    if (~str.indexOf(':')) {
        [m,s]=str.trim().split(':');
    } else {
        const at=str.indexOf('.');
        if (~at) {
            frag=parseInt(str.slice(at+1));
            if (frag>99) frag=99;
            if (frag<0) frag=0;
            str=str.slice(0,at);

        }
        h=str.slice(0, str.length-4);
        m=str.slice(str.length-4,str.length-2);
        s=str.slice(str.length-2);
    }
    const t=(parseInt(h)||0)*3600+parseInt(m)*60+parseInt(s);
    return t*100 + frag;
}
const zhout=['^:<name=timestamp preload=true>vid\tvideohost\tbookid\tperformer\ttimestamp=numbers']
const skout=['^:<name=timestamp_sanskrit preload=true>vid\tvideohost\tbookid\tperformer\ttimestamp=numbers']
const dump=(book,_tracks,out)=>{
    let prev=0;
    for (let n in _tracks) {
        const lines=_tracks[n].split(/\r?\n/);
        const videohost=lines.shift();
        const audioid=lines.shift();
        const authorname=lines.shift();
        if (!lines[0]) {
            console.log('no data',book)
            continue;
        }
        prev=parseTime(lines[0]);
        const times=[];
        times.push(prev);
        for (let j=1;j<lines.length;j++) {
            const t=parseTime(lines[j]);
            if (t<prev) {
                throw n+' line:'+j+ " wrong time stamp "+lines[j]+' t=' +t+ ' previous '+lines[j-1]+ ' t='+prev;
            }
            times.push(t);
            prev=t;
            
        }
        out.push(audioid+'\t'+videohost+'\t'+book+'\t'+authorname+'\t'+times.join(','));
    }
}


for (let book in tracks) {
    dump(book,tracks[book],zhout)
    
}
writeChanged('../dharmacloud/off/timestamp.tsv', zhout.join('\n') ,true)

for (let book in sktracks) {
    
    dump(book,sktracks[book],skout)
}
writeChanged('../dharmacloud/off/timestamp_sanskrit.tsv', skout.join('\n') ,true)

