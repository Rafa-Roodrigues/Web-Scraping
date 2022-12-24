import moment from 'moment';

export function dateBrazilian(date) {
    const [onlyDate, hour] = String(date).split('T');
    
    return moment(onlyDate).format("DD/MM/YYYY");
}

export function dateAmerican(date) {
    return moment(date).format("YYYY-MM-DD");
}