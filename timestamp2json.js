/*convert old timestamp format to json */

import {nodefs,readTextLines, writeChanged} from 'ptk/nodebundle.cjs'
await nodefs;

import { venxinding,dharmadrum,venjianhui,jiangxun,yangdeshi,
    vcpp_xuanzang,
    vcpp_fayewong} from './timestamp/vcpp.js'
import { fayewong_pph} from './timestamp/pph.js'
import { fayewongzhang_pphs, sanskrit_pphs_sanskrit
    ,jackychang_pphs,kanhojp_pphs,kanhozh_pphs,chant_pphs,kwanyinchanlin   } from './timestamp/pphs.js'
import {ddm_bhaisajya,zhanyuan_bhaisajya, bhaisajya_huiping} from './timestamp/bhaisajya.js'
import {xincheng_amtb_xuanzang} from './timestamp/amtb_xuanzang.js'
import {amtb_china} from './timestamp/amtb.js'
import {ksitigarbha1,ksitigarbha2} from './timestamp/ksitigarbha.js'
import {fgs_pumen} from './timestamp/pumen.js'
import {lastword} from './timestamp/lastword.js'
import {sdpdrk1,sdpdrk2,sdpdrk3,sdpdrk4,sdpdrk5,sdpdrk6,sdpdrk7} from './timestamp/sdpdrk.js'
import { write } from 'fs';

const tracks=[sdpdrk1,sdpdrk2,sdpdrk3,sdpdrk4,sdpdrk5,sdpdrk6,sdpdrk7,lastword,venxinding,dharmadrum,venjianhui,jiangxun,yangdeshi,
    vcpp_xuanzang,vcpp_fayewong,fayewong_pph,fayewongzhang_pphs,
     sanskrit_pphs_sanskrit,jackychang_pphs,kanhojp_pphs,kanhozh_pphs,chant_pphs,kwanyinchanlin,
ddm_bhaisajya,zhanyuan_bhaisajya, bhaisajya_huiping,xincheng_amtb_xuanzang,amtb_china,ksitigarbha1,ksitigarbha2,fgs_pumen];
const nanzang=['sdpdrk1','sdpdrk2','sdpdrk3','sdpdrk4','sdpdrk5','sdpdrk6','sdpdrk7',
'amtb','amtb_xuanzang'];
const foliomp3={};

for (let k in tracks) {
    const lines=tracks[k].split(/\r?\n/); 
    const lang=lines.shift();
    const id=lines.shift();
    const [title,youtube]=lines.shift().split('|');

    const audio=id.replace(/\^.+$/,''); //sdpdrk^2 convert to sdpdrk
    let folio=id.replace(/\^(.+)$/,'$1').replace(/\_([^_]+)$/,''); //sdpdrk^2 convert to  sdpdrk2 

    if (!foliomp3[folio]) foliomp3[folio]=[];
    foliomp3[folio].push({title,audio,youtube});

    const foliolines=~nanzang.indexOf(folio)?6:5;

    if (folio=='sdpdrk') folio='sdpdrk1';//special case for sdpdrk
    if (folio=='ksitigarbha') folio='ksitigarbha1';//special case for ksitigarbha
    
    const timestamps=[]
    const json={ folio, audio, foliolines,timestamps};
    let stamps=[];
    for (let i=0;i<lines.length;i++) {
        if (i&& (i % foliolines==0)) {
            timestamps.push(stamps);
            stamps=[];
        }
        const seconds=parseInt(lines[i].slice(-2));
        const minutes=parseInt(lines[i].slice(0,-2));

        stamps.push( minutes*60+seconds);
    }
    writeChanged('timelinejson/'+audio+'.json',JSON.stringify(json,null,2),true);
}
//ylz read alltracks.json, update with new data, and write to alltracks_gen.json
writeChanged('timelinejson/alltracks_gen.json',JSON.stringify(foliomp3,null,2),true);
