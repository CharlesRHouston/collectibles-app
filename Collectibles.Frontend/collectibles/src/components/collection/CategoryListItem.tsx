import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Category, CategoryType} from "../../types/collection";
import {fontStyles} from "../../styles/fontStyles";
import CollectibleListItem from "./CollectibleListItem";
import {FC, useMemo} from "react";
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from "@react-navigation/stack";
import {HomeStackList} from "../../types/stackParamList";
import {useUserCollectibleContext} from "../../contexts/UserCollectibleContext";

interface CategoryListItemProps {
    category: Category
}

const CategoryListItem : FC<CategoryListItemProps> = ({ category }) => {
    
    const { userCollectibles } = useUserCollectibleContext();
    
    const categoryScore = useMemo(() => {
        return userCollectibles
            ?.filter(collectible => collectible.categoryId === category.id)
            .length ?? 0;
    }, [userCollectibles]);
    
    const gemImages = {
        [CategoryType.IconicPlaces]: require('../../../assets/images/gems/Sapphire.png'),
        [CategoryType.FoodAndCulture]: require('../../../assets/images/gems/Ruby.png'),
        [CategoryType.FaunaAndFlora]: require('../../../assets/images/gems/Emerald.png'),
    };

    return (<View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{category.name}</Text>
            <View style={styles.scoreContainer}>
                <Text style={styles.score}>{categoryScore}/{category.collectibles.length}</Text>
                <Image
                    source={gemImages[category.type]}
                />
            </View>
        </View>
        <View style={styles.collectibleViewContainer}>
            {
                category.collectibles.map(collectible => {
                    return (
                        <CollectibleListItem 
                            key={collectible.id} 
                            collectible={collectible} 
                        />
                    )
                })
            }
        </View>
    </View>)
}

const styles = StyleSheet.create({
    title: {
        ...fontStyles.H4
    },
    container: {
        gap: 16
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 8
    },
    score: {
        ...fontStyles.H5
    },
    collectibleViewContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 4
    }
});

export default CategoryListItem;