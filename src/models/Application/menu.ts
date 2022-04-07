export interface MenuOptionItem {
    id: string;
    onClick: () => void;
    name: string;
    subItems?: {
        id: string;
        onClick: () => void;
        name: string;
    }[];
}