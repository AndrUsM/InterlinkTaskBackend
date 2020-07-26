import { createObjectCsvWriter } from 'csv-writer';
import { DataType, GenerateCsvReturnType, StatusType } from '../types';
import { ObjectHeaderItem } from 'csv-writer/src/lib/record';
import { prepare_csv_file_path, prepare_download_link } from '../js_types/string';

export function csv_generate(header: ObjectHeaderItem[], data: DataType[], file_name: string): GenerateCsvReturnType {
    let file_path = prepare_csv_file_path(file_name, true);
    const csv_writer = createObjectCsvWriter({
        path: file_path,
        header: header
    })

    let status: StatusType = 'success';
    csv_writer.writeRecords(data)
        .then(() => {
            status = 'success';
        })
        .catch(() => {
            status = 'error';
        })
    switch (status) {
        case 'success': {
            return {
                status: status,
                link: prepare_download_link(file_name)
            }
        }
        default: {
            return {
                status: 'error'
            }
        }
    }
}