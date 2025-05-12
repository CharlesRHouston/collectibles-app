import React from 'react';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackList } from '../../types/StackParamList';
import Screen, {screenStyles} from "../../components/Screen";
import {useUserContext} from "../../contexts/UserContext";
import {Image, ImageSourcePropType, Text, View} from "react-native";
import {fontStyles} from "../../styles/fontStyles";
import {useUserCollectibleContext} from "../../contexts/UserCollectibleContext";
import {useCollectionContext} from "../../contexts/CollectionContext";
import {Collection} from "../../types/Collection";

type HomeScreenNavProp = StackNavigationProp<HomeStackList, 'Home'>;

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavProp>();
    const { user } = useUserContext();
    const { userCollectibles } = useUserCollectibleContext();
    const { collections } = useCollectionContext();
    
    interface Scores {
        total: number;
        iconicPlaces: number;
        faunaAndFlora: number;
        foodAndCulture: number;
    }
    
    const calculateScores = () : Scores => {
        let scores = {
            total: 0,
            iconicPlaces: 0,
            faunaAndFlora: 0,
            foodAndCulture: 0,
        };
        
        if (!userCollectibles || !collections) {
            return scores;    
        }
        
        for (const userCollectible of userCollectibles){
            if (userCollectible.bonusAchieved === true){
                scores.total += 2;
            } else {
                scores.total += 1;
            }
        }
        
        return scores;
    }

    function getCollectibleCount(collection: Collection): number {
        return collection.categories.reduce((count, category) => {
            return count + category.collectibles.length;
        }, 0);
    }
    
    function getCollectibleScore(collectionId: string): number {
        if (!userCollectibles) return 0;
        return userCollectibles?.filter(collectible => collectible.collectionId === collectionId).length;
    }
    
    const scores = calculateScores();
    
    return (<>
                <View style={[screenStyles.containerWithoutNavigation, { paddingTop: 160, gap: 32 }]}>
                    <View>
                        <Text style={fontStyles.H1}>{user?.username.toUpperCase()}</Text>
                        <Text style={fontStyles.H1}>{scores.total}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 24}}>
                        <CategoryTypeScore 
                            label={"Iconic Places"}  
                            imagePath={require('../../../assets/images/gems/Sapphire.png')}
                            score={scores.iconicPlaces.toString()}
                        />
                        <CategoryTypeScore
                            label={"Fauna & Flora"}
                            imagePath={require('../../../assets/images/gems/Emerald.png')}
                            score={scores.faunaAndFlora.toString()}
                        />
                        <CategoryTypeScore
                            label={"Food & Culture"}
                            imagePath={require('../../../assets/images/gems/Ruby.png')}
                            score={scores.foodAndCulture.toString()}
                        />
                    </View>
                    <View style={{ width: '100%', gap: 8}}>
                        <Text style={[fontStyles.H3, {alignSelf: 'flex-start'}]}>COLLECTIONS</Text>
                        <View>
                            {
                                collections &&
                                    collections.map(collection => {
                                        return (
                                            <CollectionListItem 
                                                key={collection.id}
                                                label={collection.name}
                                                score={getCollectibleScore(collection.id).toString()}
                                                total={getCollectibleCount(collection).toString()}
                                                imagePath={require(`../../../assets/images/flags/South Africa.png`)}
                                            />
                                        )
                                    })
                            }
                        </View>
                    </View>
                </View>
        </>
    )
}

interface CategoryTypeScoreProps {
    label: string;
    imagePath: ImageSourcePropType;
    score: string;
}

const CategoryTypeScore: React.FC<CategoryTypeScoreProps> = ({ label, imagePath, score }) => {
    return (<View style={{justifyContent: 'flex-start', alignItems: 'center', gap: 8, maxWidth: 100 }}>
        <Text style={[fontStyles.L2, { textAlign: 'center'}]} >{label}</Text>
        <View style={{ flexDirection: 'row', gap: 8}}>
            <Image source={imagePath} />
            <Text style={fontStyles.H3}>{score}</Text>
        </View>
    </View>)
}

interface CollectionListItemProps {
    label: string;
    imagePath: ImageSourcePropType;
    score: string;
    total: string;
}

const CollectionListItem: React.FC<CollectionListItemProps> = ({ label, imagePath, score, total }) => {
    return <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 8}}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center'}}>
            <Image source={imagePath} />
            <Text style={fontStyles.H4}>{label}</Text>
        </View>
        <Text style={fontStyles.H5}>{score}/{total}</Text>
    </View>
}


export default HomeScreen;