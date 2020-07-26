import { FilteredDataType } from "../types";
import { parse_date } from "./date";

export function filter_array_by_key(array: any[], query: string, key: string) {
    // array = array.filter(onlyUnique);
    try {
        array = array.filter((value) => {
            let search_value: string = (
                value[key]
            )
    
            return search_value.indexOf(query) > -1
        });
    } catch (error) {
        return error
    }
    return array
}

export function distinct_array(array: any[]) {
    return Array.from(new Set(array));
}

export function sort_asc_filtered_data(array: FilteredDataType[]) {
    array.forEach((value) => {
        value.data.sort((value_a, value_b) => {
            if (parse_date(value_a.date, 'number') < parse_date(value_b.date, 'number')) {
                return -1
            } if (parse_date(value_a.date, 'number') > parse_date(value_b.date, 'number')) {
                return 1
            }
            return 0
        })
    });
    return array;
}

export function remove_item_from_array(array: any[], item: string | number) {
    if (array.length > 0 && item) {
        const index = array.indexOf(item);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    } else {
        return ''
    }
}