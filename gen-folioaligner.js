import {meta_cbeta, readTextLines, writeChanged,nodefs, fromObj, alphabetically0, readTextContent} from 'ptk/nodebundle.cjs'
await nodefs;
/* generate off format for folioaligner*/
/* not cb-t\gen.js to get T01. T02 */
const sid=parseInt(process.argv[2])||1

const filenames={
    1:'agmd',
    26:'agmm',
    99:'agms',
    100:'agmss',
    125:'agmu',
    361:'svv_ls',//無量清淨平等覺經
    362:'svv_zq',//佛說阿彌陀三耶三佛薩樓佛檀過度人道經
    363:'svv_fx',
    310:'svv_ruci',//無量壽如來會
    1428:'vnydg', //四分律
    1484:'vnybss',//梵網經
    1500:'vnybss_ksema',//菩薩戒本經北涼曇無讖
    1501:'vnybss_xuanzang',//菩薩戒玄奘 
    1499:'vnybsskv',//《菩薩戒羯磨文》玄奘譯
    1909:'mettaksama',
    685:'ylp',//盂蘭盆經
}    
const replace=(sid,str)=>{
    const bkid=filenames[sid]
    return str
    .replace(/\^bk\d+【([^】]+)】/g,(m,m1)=>"^bk#"+bkid+"〔"+m1+"〕")
    .replace(/\^h<o=(translator|author)>(.+)\n/g,"^au〔$2〕\n")
    .replace(/\^ck(\d+)【卷\d+】.*\n/g,(m,m1)=>"^pb1^folio#"+bkid+m1+"\n")
}
if (!filenames[sid]) {
    console.log('unknown sutra',sid)
} else {
    const [vol]=meta_cbeta.TaishoPageFromJuan(sid);
    const content=readTextContent('../cb-t/off/T'+vol.toString().padStart(2,'0')+".off");
    const start=content.indexOf('^bk'+sid);
    let end=content.indexOf('^bk'+(sid+1));
    if (end==-1) end=content.length;
    
    let sutratext=replace(sid,content.slice(start,end));

    writeChanged(filenames[sid]+'.ori.off',sutratext,true);
}

