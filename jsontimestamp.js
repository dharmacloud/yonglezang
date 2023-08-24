import {readFileSync} from 'fs';
const tofix=ts=>{
    const secs=Math.floor(ts);
    const frag=(ts-secs).toFixed(2);
    const hour=Math.floor(secs/3600);
    const minutes= Math.floor((secs-hour*3600)/60);
    const seconds= secs- hour*3600 - minutes*60;

    return (hour?hour:'')+minutes.toString().padStart(2,'0')+seconds.toString().padStart(2,'0')+'.'+frag.slice(2);
}
export const timeStampFromJson=(fn,title)=>{
    const json=JSON.parse(readFileSync(fn,'utf8'));
    const out=['cn',json.folio,title];
    let lines=parseInt(json.foliolines)||5;

    for (let i=0; i<json.timestamps.length;i++) {
        for (let j=0;j<lines;j++) {
            const ts=json.timestamps[i][j]||-1;
            if (ts==-1) break;
            out.push(tofix(ts));
        }
    }
    return out.join('\n');
}