import { data } from "./data/export";

export interface Item {
    name: string;
    type: "item" | "fluid" | string;
    stack_size?: number;
}

export const ItemIndex = data.items;
