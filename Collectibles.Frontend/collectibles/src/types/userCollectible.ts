import {CategoryType} from "./Collection";

export interface UserCollectible {
    collectibleId: string;
    active?: boolean;
    description: string;
    collectedAt: string;
    imageUrl: string;
    bonusAchieved?: boolean;
    collectionId: string;
}

export interface PutCollectibleRequest {
    active?: boolean;
    description: string;
    collectedAt: string;
    imageUrl: string;
    bonusAchieved?: boolean;
    collectionId: string;
}
