import { ParseDateReturnType } from '../types';
export function parse_date(line: string, return_type?: ParseDateReturnType) {
    let month: string = '';
    let day: string = '';
    let year: string = '';

    line.split(' ').forEach((value, index) => {
        switch (index) {
            case 0: {
                month = month_convertor(value);
                break;
            }
            case 1: {
                day = prepare_day(value);
                break;
            }
            case 2: {
                year = value.toString();
                break;
            }
        }
    })

    switch (return_type) {
        case 'number':
            return +new Date(+`${year}-${month}-${day}`);
        case 'string':
            return `${year}-${month}-${day}`;
        case 'date':
        default:
            return new Date(+`${year}-${month}-${day}`);
    }
}

export function prepare_day(srt_day: string) {
    let value = +srt_day;
    return value < 10 ?
        `0${value}` : value.toString()
}

export function month_convertor(str_month: string) {
    let month_list: string[] = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"
    ]
    if (month_list.includes(str_month)) {
        let value = month_list.indexOf(str_month);
        return value < 10 ?
            `0${value}` : value.toString();
    } else {
        return '0';
    }
}