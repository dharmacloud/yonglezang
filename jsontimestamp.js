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
            //console.log('incomplete',fn,i,timestamp.length,lines,timestamp)
            //continue;
        }
        if (!timestamp.length) {
            throw "empty data"
        }
        let prev=0;
        for (let j=0;j<lines;j++) {
            const ts=timestamp[j]||-1;
            const fixed=tofix(ts);
            if (prev>ts) console.log('wrong delta',ts,fixed,timestamp.slice(j-10,j+10))
            out.push(fixed);
            prev=ts;
        }
    }
    //console.log(fn, out[3], out[4],out[out.length-1],json.timestamps.length)
    return {timestamp:out.join('\n'),foliocount:json.timestamps.length };
}