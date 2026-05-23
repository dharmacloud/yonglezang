/* add 函號 to taisho-qianlong.tsv*/ 

import {nodefs,readTextLines,writeChanged} from 'ptk/nodebundle.cjs'
await nodefs;
const toc=readTextLines('toc.tsv');
const name_hanhao={};
const normalize=s=>{//去掉卷名中的卷数标记
    let skip=false;
    if (s.match(/[\(（][23456789][\)）]$/)) skip=true;//不是第一卷，跳過
    if (s.match(/[\(（]01/)) skip=true;// 01-02 要保留，如阿育王經

    if (!skip) {
        s=s.replace(/[\(（][\d\-]+[\)）]$/,'').replace(/[一二三四五六七八九十百]+卷$/,'').replace('佛說','');
        return s;
    }
    return '';
}
for (let i=0;i<toc.length;i++) {
    //山東2025版編號，ylz編號,折數，函號,卷名,作者，類別
    //未處理同名經
    const [shangtong,ylz,foliocount,han,juanname,author,catagery]=toc[i].split('\t');
    const names=juanname.split(/[①②③④⑤⑥⑦⑧⑨]+/);//同一卷名中有多个经名
    if (names.length>1) {
        for (let name of names) {
            if (!name_hanhao[normalize(name)]) name_hanhao[normalize(name)]=han;
        } 
    } else {
        if (!name_hanhao[normalize(juanname)])  name_hanhao[normalize(juanname)]=han;
    }
}
const taisho_qianlong=readTextLines('taisho-qianlong.tsv');
const hanhaotsv=readTextLines('taisho-qianlong.tsv');

let count=0,total=0;
for (let i=1;i<taisho_qianlong.length;i++) {
    //大正號,永樂北編號,永樂北函號,乾隆編號,乾隆函號,卷名,作者，卷數
    const [slot,taisho,ylb,ylb_han,ql,ql_han, sutraname,author,juancount]=taisho_qianlong[i].split('\t');

    if (!ylb) continue;
    const hanhao=name_hanhao[sutraname.replace("佛說","")];
    
    total++;
    if (hanhao) {
        hanhaotsv[i]=hanhao+taisho_qianlong[i];
        count++;
    }

}
console.log('total',total,'matched',count);
const tsv=hanhaotsv.filter( s=>!!s.split('\t')[2]);//只輸出永樂北藏
writeChanged('hanhaotsv.tsv!', tsv.join('\n'),true);    