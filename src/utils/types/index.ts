export type DataType = {
    [key: string]: string
}

export type FilteredDataType<T = string> = {
    name: T,
    data: {
        date: T,
        hour: T
    }[]
}

export type WorkersDateType<T = string> = {
    "Employee Name": T,
    Date: T,
    "Work Hours": T
}

export type CSV_GENERATE_HEADER<T = String> = {
    id: T,
    title: T
}

export type ParseDateReturnType = 'date' | 'string' | 'number';

export type StatusType = 'success' | 'error';
export type GenerateCsvReturnType = {
    status: StatusType,
    link?: string
}