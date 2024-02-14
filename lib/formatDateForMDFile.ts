import { format } from 'date-fns';

export default function formatDateForMDFile(date: string) {

    let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if(Number(day) < 10){
        day = '0' + day
    } else if(Number(month) < 10) {
        month = '0' + month
    }

    return [year, month, day].join('-');

}