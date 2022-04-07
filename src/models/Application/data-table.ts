export interface TableHeader {
    name: string | JSX.Element | Element | (() => JSX.Element) | (() => Element);
    key: string;
    cellProps?: any;
    rowTemplate?: (value: any, currentTrackId?: string, isPlaying?: boolean) => JSX.Element | Element;
    favButtonTemplate?: (value: any, currentTrackId?: string, isTracksSaved?: boolean) => JSX.Element | Element;
}

export interface tableRow {
    [key: string]: number | string | JSX.Element | Element
}