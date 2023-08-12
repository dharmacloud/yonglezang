/*
from: https://docs.google.com/spreadsheets/d/1MVVBbS60aHA1QfQrj9n9ghuUiy5rx6F1rNDBKFa2Ti8/edit#gid=532868174
*/
import { venxinding,dharmadrum,venjianhui,jiangxun,yangdeshi,
    vcpp_xuanzang,vcpp_yijing,
    vcpp_fayewong} from './timestamp/vcpp.js'
import { fayewong_pph} from './timestamp/pph.js'
import { fayewongzhang_pphs,sanskrit_pphs, sanskrit_pphs_sanskrit
    ,jackychang_pphs,kanhojp_pphs,kanhozh_pphs,chant_pphs,kwanyinchanlin} from './timestamp/pphs.js'
import {ddm_bhaisajya,zhanyuan_bhaisajya, bhaisajya_huiping} from './timestamp/bhaisajya.js'
import {xincheng_amtb_xuanzang} from './timestamp/amtb_xuanzang.js'
import {amtb_china} from './timestamp/amtb.js'
import {ksitigarbha1,ksitigarbha2} from './timestamp/ksitigarbha.js'
import {fgs_pumen} from './timestamp/pumen.js'
import {lastword} from './timestamp/lastword.js'
import {sdpdrk1,sdpdrk2,sdpdrk3,sdpdrk4,sdpdrk5,sdpdrk6,sdpdrk7} from './timestamp/sdpdrk.js'
import {writeChanged,nodefs} from 'ptk/nodebundle.cjs'

await nodefs
const parseTime=str=>{
    let m=0,s=0,h=0;
    str=str.trim();
    if (~str.indexOf(':')) {
        [m,s]=str.trim().split(':');
    } else {
        h=str.slice(0, str.length-4);
        m=str.slice(str.length-4,str.length-2);
        s=str.slice(str.length-2);
    }
    const t=(parseInt(h)||0)*3600+parseInt(m)*60+parseInt(s);
    return t;
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
        prev=parseTime(lines[0]);
        const times=[];
        times.push(prev);
        for (let j=1;j<lines.length;j++) {
            const t=parseTime(lines[j]);
            if (t<prev) {
                throw "wrong time stamp "+lines[j]+' t=' +t+ ' previous '+lines[j-1]+ ' t='+prev;
            }
            times.push(t);
            prev=t;
            
        }
        out.push(audioid+'\t'+videohost+'\t'+book+'\t'+authorname+'\t'+times.join(','));
    }
}


const tracks={
   'amtb_xuanzang':{xincheng_amtb_xuanzang},
   'amtb':{amtb_china},
   'lastword':{lastword},
    'vcpp':{venxinding,dharmadrum,venjianhui,jiangxun,yangdeshi,vcpp_fayewong},
    'vcpp_xuanzang':{vcpp_xuanzang},
    'vcpp_yijing':{vcpp_yijing},
    'pumen':{fgs_pumen},
    'pph':{fayewong:fayewong_pph},
    'pphs':{fayewongzhang:fayewongzhang_pphs,sanskrit_pphs,jackychang_pphs,kanhojp_pphs,kanhozh_pphs,chant_pphs,kwanyinchanlin},
    'bhaisajya':{ddm_bhaisajya,zhanyuan_bhaisajya,bhaisajya_huiping},
    'ksitigarbha1':{ksitigarbha1},'ksitigarbha2':{ksitigarbha2},
    'sdpdrk1':{sdpdrk1},
    'sdpdrk2':{sdpdrk2},
    'sdpdrk3':{sdpdrk3},
    'sdpdrk4':{sdpdrk4},
    'sdpdrk5':{sdpdrk5},
    'sdpdrk6':{sdpdrk6},
    'sdpdrk7':{sdpdrk7},

}
const sktracks={
    'pphs':{sanskrit_pphs_sanskrit,sanskrit_pphs_sanskrit2:sanskrit_pphs_sanskrit},
}
for (let book in tracks) {
    dump(book,tracks[book],zhout)
}
writeChanged('off/timestamp.tsv', zhout.join('\n') ,true)

for (let book in sktracks) {
    dump(book,sktracks[book],skout)
}
writeChanged('off/timestamp_sanskrit.tsv', skout.join('\n') ,true)

