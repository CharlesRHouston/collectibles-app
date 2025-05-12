import {Image, ImageSourcePropType, StyleSheet, Text, View} from "react-native";
import React, {useMemo} from "react";
import {fontStyles} from "../../styles/fontStyles";
import {CategoryType} from "../../types/collection";
import {useUserCollectibleContext} from "../../contexts/UserCollectibleContext";

interface CategoryTypeScoreProps {
    label: string;
    imagePath: ImageSourcePropType;
    category: CategoryType;
}

const CategoryTypeScore: React.FC<CategoryTypeScoreProps> = ({ label, imagePath, category }) => {
    const { userCollectibles } = useUserCollectibleContext();
    
    const categoryScore = useMemo(() => {
        return userCollectibles?.reduce((total, collectible) => {
            if (collectible.categoryType === category) {
                return total + (collectible.bonusAchieved ? 2 : 1);
            }
            return total;
        }, 0) ?? 0;
    }, [userCollectibles])
    
    return (<View style={styles.container}>
        <Text style={styles.label} >{label}</Text>
        <View style={styles.scoreContainer}>
            <Image source={imagePath} />
            <Text style={fontStyles.H3}>{categoryScore}</Text>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        gap: 8, 
        maxWidth: 100
    },
    label: {
        ...fontStyles.L2, 
        textAlign: 'center'
    },
    scoreContainer: {
        flexDirection: 'row', 
        gap: 8
    }
})

export default CategoryTypeScore;