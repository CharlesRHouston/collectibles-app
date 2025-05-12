import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackList} from '../../types/stackParamList';
import {screenStyles} from "../../components/Screen";
import {StyleSheet, Text, View} from "react-native";
import {fontStyles} from "../../styles/fontStyles";
import {useCollectionContext} from "../../contexts/CollectionContext";
import {CategoryType} from "../../types/collection";
import CategoryTypeScore from "../../components/home/CategoryTypeScore";
import CollectionListItem from "../../components/home/CollectionListItem";
import TotalScore from "../../components/home/TotalScore";
type HomeScreenNavProp = StackNavigationProp<HomeStackList, 'Home'>;

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavProp>();
    const { collections } = useCollectionContext();
    
    return (<>
        <View style={styles.screen}>
            <TotalScore />
            <View style={{ flexDirection: 'row', gap: 24}}>
                <CategoryTypeScore 
                    label={"Iconic Places"}  
                    imagePath={require('../../../assets/images/gems/Sapphire.png')}
                    category={CategoryType.IconicPlaces}
                />
                <CategoryTypeScore
                    label={"Fauna & Flora"}
                    imagePath={require('../../../assets/images/gems/Emerald.png')}
                    category={CategoryType.FaunaAndFlora}
                />
                <CategoryTypeScore
                    label={"Food & Culture"}
                    imagePath={require('../../../assets/images/gems/Ruby.png')}
                    category={CategoryType.FoodAndCulture}
                />
            </View>
            <View style={{ width: '100%', gap: 8}}>
                <Text style={styles.collectionHeading}>COLLECTIONS</Text>
                <View>
                    {
                        collections &&
                            collections.map(collection => {
                                return (
                                    <CollectionListItem 
                                        key={collection.id}
                                        label={collection.name}
                                        imagePath={require(`../../../assets/images/flags/South Africa.png`)}
                                        collectionId={collection.id}
                                    />
                                )
                            })
                    }
                </View>
            </View>
        </View>
    </>)
}

const styles = StyleSheet.create({
    collectionHeading: {
        ...fontStyles.H3,
        alignSelf: 'flex-start'
    },
    screen: {
        ...screenStyles.containerWithoutNavigation, 
        paddingTop: 160, 
        gap: 32
    }
})

export default HomeScreen;