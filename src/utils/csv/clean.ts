import fs from 'fs';
import { parse_filename, prepare_csv_file_path } from '../js_types/string';
import { remove_item_from_array } from '../js_types/array';

export function csv_clean() {

    let dirs: string[] = fs.readdirSync('public');
    let array_to_remove: string[] = dirs;
    if (dirs.length > 0) {
        dirs.forEach((item) => {
            let parsed_folder_name = +new Date(+parse_filename(item) + 10 * 60000);
            if (+new Date() < parsed_folder_name) {
                remove_item_from_array(array_to_remove, item);
            }
        })
        array_to_remove.forEach((item) => {
            fs.unlinkSync(prepare_csv_file_path(item, false));
        })
    }
}