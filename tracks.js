import { venxinding,dharmadrum,venjianhui,jiangxun,yangdeshi,
    vcpp_xuanzang,
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
import {timeStampFromJson} from './jsontimestamp.js'
import {existsSync} from 'fs'
export const tracks={
    'amtb_xuanzang':{xincheng_amtb_xuanzang},
    'amtb':{amtb_china},
    'lastword':{lastword},
     'vcpp':{venxinding,dharmadrum,venjianhui,jiangxun,yangdeshi,vcpp_fayewong},
     'vcpp_xuanzang':{vcpp_xuanzang},
     //'vcpp_yijing':{vcpp_yijing},
     'pumen':{fgs_pumen},
     'pph':{fayewong:fayewong_pph},
     'pphs':{fayewongzhang:fayewongzhang_pphs,sanskrit_pphs,kanhojp_pphs,chant_pphs,kwanyinchanlin},
     'bhaisajya':{ddm_bhaisajya,zhanyuan_bhaisajya,bhaisajya_huiping},
     'ksitigarbha1':{ksitigarbha1},'ksitigarbha2':{ksitigarbha2},
     'sdpdrk1':{sdpdrk1},
     'sdpdrk2':{sdpdrk2},
     'sdpdrk3':{sdpdrk3},
     'sdpdrk4':{sdpdrk4},
     'sdpdrk5':{sdpdrk5},
     'sdpdrk6':{sdpdrk6},
     'sdpdrk7':{sdpdrk7},
     //'svvy': {svvy:timeStampFromJson('timestamp/svvy.json','國家一級播音員|ATSZWvBxFO4')},
      'svv1': {svv1:timeStampFromJson('timestamp/svv1.json','道證法師|wUjw8py5M8I').timestamp},
      'svv2': {svv2:timeStampFromJson('timestamp/svv2.json','道證法師|0eXXOPpnfPs').timestamp},

      'ylp': {
        ylp_male:timeStampFromJson('timestamp/ylp_male.json','男聲').timestamp,
        ylp_female:timeStampFromJson('timestamp/ylp_female.json','女聲').timestamp
    }
     
 }
 const multijuan=(prefix,max)=>{
    let allfoliocount=0;
    for (let i=1;i<=max;i++) {
       const obj=[];
       const fn='timestamp/agama/'+prefix+i+'.json';
       if (!existsSync(fn)) continue;
       const {timestamp,foliocount}=timeStampFromJson(fn,'誦讀|');
       obj[prefix+i]=timestamp;
       //count page
       tracks[prefix+i]=obj
       allfoliocount+=foliocount;
       console.log(prefix+i,foliocount)
    }
    console.log('foliocount',allfoliocount)
 }
 multijuan('agmd',22)
 multijuan('agmm',60)
 multijuan('agms',50)

 //not yet
 //multijuan('agma',51)
 
export const sktracks={
     'pphs':{sanskrit_pphs_sanskrit,sanskrit_pphs_sanskrit2:sanskrit_pphs_sanskrit},
 }