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

    //remove tailing null data
    while (json.timestamps.length && 0==json.timestamps[json.timestamps.length-1].filter(it=>!!it).length) {
        json.timestamps.pop();
    }

    for (let i=0; i<json.timestamps.length;i++) {
        const timestamp=json.timestamps[i].filter(it=>!!it);
        if (timestamp.length!==lines && timestamp.length) {
            while (timestamp.length<lines) {
                timestamp.push( timestamp[timestamp.length-1]+1 ) ;//補足
            }
            //console.log('invalid',fn,i,timestamp.length,lines,timestamp)
            //continue;
        }
        if (!timestamp.length) {
            throw "empty data"
        }

        for (let j=0;j<lines;j++) {
            const ts=timestamp[j]||-1;
            out.push(tofix(ts));
        }
    }
    return {timestamp:out.join('\n'),foliocount:json.timestamps.length };
}