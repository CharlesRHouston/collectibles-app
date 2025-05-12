export interface Collection {
    id: string;
    name: string;
    country: string;
    categories: Category[];
}

export interface Category {
    id: string;
    name: string;
    type: CategoryType;
    collectibles: Collectible[];
}

export enum CategoryType {
    IconicPlaces = "IconicPlaces",
    FaunaAndFlora = "FaunaAndFlora",
    FoodAndCulture = "FoodAndCulture",
}

export interface Collectible {
    id: string;
    name: string;
    clue: string;
    pixelArtFilename: string;
    bonus: Bonus;
}

export interface Bonus {
    description?: string;
    question?: string;
}
