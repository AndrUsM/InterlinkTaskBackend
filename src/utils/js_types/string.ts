import path from 'path';

export function prepare_csv_file_path(name: string, extension?: boolean) {
    return path.join('public', `${name}${extension ? '.csv' : ''}`);
}

export function prepare_download_link(path: string) {
    return `static/${path}.csv`
}

export function parse_filename(path: string) {
    return path.split('.').slice(0, -1).join('.');
}