export type PizzaType = {
    id:string,
    title:string,
    price:number,
    imageUrl:string,
    sizes:Array<number>,
    types:Array<number>
}

export enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

export interface PizzaSliceStateType {
    items: PizzaType[];
    status: Status;
}

export type SearchPizzaParamsType = {
    categoryId?: string;
    order: string,
    sortBy: string,
    category: string,
    search: string,
    currentPage: string,
}
