import {Image, ImageSourcePropType, StyleSheet, Text, View} from "react-native";
import React, {useMemo} from "react";
import {fontStyles} from "../../styles/fontStyles";
import {useUserCollectibleContext} from "../../contexts/UserCollectibleContext";
import {useCollectionContext} from "../../contexts/CollectionContext";

interface CollectionListItemProps {
    label: string;
    imagePath: ImageSourcePropType;
    collectionId: string;
}

const CollectionListItem: React.FC<CollectionListItemProps> = ({ label, imagePath, collectionId }) => {
    const { userCollectibles } = useUserCollectibleContext();
    const { collections } = useCollectionContext();

    const collectionScore = useMemo(() => {
        return userCollectibles?.reduce((total, collectible) => {
            if (collectible.collectionId === collectionId){
                return total + 1;
            }
            return total;
        }, 0) ?? 0;
    }, [userCollectibles]);
    
    const collectionTotal = useMemo(() => {
        return collections
            ?.find((collection) => collection.id === collectionId)
            ?.categories.flatMap((category) => category.collectibles)
            .length ?? 0;
    }, [collections]);
    
    return <View style={styles.container}>
        <View style={styles.nameContainer}>
            <Image source={imagePath} />
            <Text style={fontStyles.H4}>{label.toUpperCase()}</Text>
        </View>
        <Text style={fontStyles.H5}>{collectionScore}/{collectionTotal}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingLeft: 8
    },
    nameContainer: {
        flexDirection: 'row', 
        gap: 8, 
        alignItems: 'center'
    }
});

export default CollectionListItem;