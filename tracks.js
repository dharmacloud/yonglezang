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
    'amtb':{amtb_china,
    	 //amtb_yuanguang   :timeStampFromJson('timestamp/amtb_yuanguang.json','圓光佛學院|5O_D-KXOclw').timestamp
    	 	 },
    'lastword':{lastword},
     'vcpp':{venxinding,dharmadrum,venjianhui,jiangxun,yangdeshi,vcpp_fayewong, 
     vcpp_daolang   :timeStampFromJson('timestamp/vcpp_daolang.json','刀郎|yiqyx1sllU8').timestamp,
        //vcpp_yuanguang:timeStampFromJson('timestamp/vcpp_yuanguang.json','圓光佛學院|hT928y_BJaM').timestamp,
        vcpp_korean:timeStampFromJson('timestamp/vcpp_korean.json','韓語|MiNt-iGZLJU').timestamp
	        },
     'vcpp_xuanzang':{vcpp_xuanzang},
        
     //'vcpp_yijing':{vcpp_yijing},
     'pumen':{fgs_pumen,
     	 //pumen_yuanguang   :timeStampFromJson('timestamp/pumen_yuanguang.json','圓光佛學院|2wgFgcp2G6M').timestamp
     	 },
     'pph':{fayewong:fayewong_pph},
     'pphs':{fayewongzhang:fayewongzhang_pphs,sanskrit_pphs,kanhojp_pphs,chant_pphs,kwanyinchanlin,
     	//pphs_yuanguang   :timeStampFromJson('timestamp/pphs_yuanguang.json','圓光佛學院|90iNpAqlW7E').timestamp 
        //
     },

     'bhaisajya':{ddm_bhaisajya,zhanyuan_bhaisajya,bhaisajya_huiping,
     		//bhaisajya_yuanguang :timeStampFromJson('timestamp/bhaisajya_kaisong.json','開松法師|PqhMhc6ColY').timestamp 
	},
    'ksitigarbha1': {ksitigarbha1,
     //ksitigarbha1_daguan:timeStampFromJson('timestamp/ksitigarbha1_daguan.json','達觀法師|HNzFidHtoMk').timestamp 
	},'ksitigarbha2':{ksitigarbha2,
           //  ksitigarbha2_daguan   :timeStampFromJson('timestamp/ksitigarbha2_daguan.json','達觀法師|HNzFidHtoMk').timestamp 
    } ,
	
     	
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
       
       const {timestamp,foliocount}=timeStampFromJson(fn,'誦讀|',prefix+i);
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
 multijuan('agmu',50)
 
export const sktracks={
     'pphs':{sanskrit_pphs_sanskrit,sanskrit_pphs_sanskrit2:sanskrit_pphs_sanskrit},
 }