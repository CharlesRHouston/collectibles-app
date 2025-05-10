export interface UserCollectible {
    collectibleId: string;
    active?: boolean;
    description: string;
    collectedAt: string;
    imageUrl: string;
    bonusAchieved?: boolean;
}

export interface PutCollectibleRequest {
    active?: boolean;
    description: string;
    collectedAt: string;
    imageUrl: string;
    bonusAchieved?: boolean;
}
