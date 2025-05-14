import {CategoryType} from "./collection";

export interface UserCollectible {
    collectionId: string;
    categoryId: string;
    collectibleId: string;
    active: boolean;
    description: string;
    collectedAt: string;
    imageUrl: string;
    bonusAchieved: boolean;
    categoryType: CategoryType;
}

export interface PutCollectibleRequest {
    collectionId: string;
    categoryId: string;
    active: boolean;
    description: string;
    collectedAt: string;
    imageUrl: string;
    bonusAchieved: boolean;
    categoryType: CategoryType;
}
