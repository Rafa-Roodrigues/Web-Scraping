import moment from "moment";

function getDate(i) {
    let date = moment().subtract(8, 'days');
    date.add(i, 'day');

    return date;
}

export function getDatesWeekday() {
    const arrayOfDates = [];
    for(let i = 1; i < 6; i++) {
        const date = getDate(i);

        arrayOfDates.push({
            dateUrl: date.format("YYYYMMDD"),
            dateAmerican: date.format("YYYY-MM-DD")
        });
    }

    return arrayOfDates;
}