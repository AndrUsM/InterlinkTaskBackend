import { new_line_regex } from "../constants/regex";
import { DataType, FilteredDataType, WorkersDateType } from "../types";
import { filter_array_by_key, distinct_array, sort_asc_filtered_data } from "../js_types/array";
import { ObjectHeaderItem } from "csv-writer/src/lib/record";
import { parse_date } from "../js_types/date";

// transform Buffer type data to array of objects
export function csv_parser(data: Buffer, separator: string) {
    let headers: ObjectHeaderItem[] = [];
    let export_data: DataType[] = [];

    data.toString().trim().split(new_line_regex).forEach((item, index) => {
        // get header keys
        if (index === 0) {
            item.split(separator).forEach((header) => {
                headers.push({
                    id: header,
                    title: header
                })
            });
        } else {
            // parse data to json format
            let temp_data_variable: DataType = {};
            item.split(separator).forEach((data_part, data_index) => {
                let key = headers[data_index];
                Object.assign(temp_data_variable, {
                    [key.id]: data_part
                })
            });
            export_data.push(temp_data_variable);
        }
    });

    return {
        header: headers,
        data: export_data
    };
}

// transform json type array to final structure: name, date.
// return new headers and data for generation csv file
export function csv_filter(array: any[], key: string) {
    let employee_names: string[] = [];
    let export_data: FilteredDataType[] = [];

    array.forEach((item) => {
        employee_names.push(item[key]);
    });

    employee_names = distinct_array(employee_names);
    employee_names.forEach((name) => {
        export_data.push(
            generate_new_data(
                filter_array_by_key(array, name, 'Employee Name')
            )
        );
    })

    return {
        sorted_data: sort_asc_filtered_data(export_data),
        headers: generate_new_header(export_data)
    };
}

// generate new headers for csv-writer
export function generate_new_header(array: FilteredDataType[]) {
    let headers: ObjectHeaderItem[] = [];

    headers.push({
        id: 'Employee Name',
        title: 'Name/Date'
    });

    if (array.length) {
        array[0].data.forEach((value) => {
            headers.push({
                id: "Work Hours",
                title: parse_date(value.date, 'string') as string
            });
        })
    }
    return headers;
}

// create one item: name, workers hours
export function generate_new_data(array: WorkersDateType[]) {


    let export_data: FilteredDataType = {
        name: '',
        data: []
    }

    array.forEach((value, index) => {
        if (index === 0) {
            export_data.name = value["Employee Name"]
        } else {
            export_data.data.push({
                date: value.Date,
                hour: value["Work Hours"]
            })
        }
    })

    return export_data;
}