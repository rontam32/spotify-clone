export function convertMilliSecToDisplayTime(duration: number) {
    const sec = Math.floor(duration % 60000 / 1000);
    const exactHour = duration/60000/60;
    const hour = exactHour > 1 ? Math.floor(exactHour) : 0;
    const min = exactHour > 1 ? Math.floor(duration % (60000*60) / 60000) : Math.floor(duration/60000);
    return !duration ? {
        min: '0',
        sec: '00',
        hour: '0'
    } : {
        min: min.toString(),
        sec: sec.toString().length === 1 ? ('0' + sec) : sec.toString(),
        hour: hour.toString() 
    }
}