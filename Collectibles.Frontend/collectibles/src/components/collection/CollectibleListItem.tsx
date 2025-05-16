import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Collectible} from "../../types/collection";
import {fontStyles} from "../../styles/fontStyles";
import {useUserCollectibleContext} from "../../contexts/UserCollectibleContext";
import {collectibleImages} from "../../utils/images/imageMap";
import {useNavigation} from "@react-navigation/native";
import type {StackNavigationProp} from "@react-navigation/stack";
import {HomeStackList} from "../../types/stackParamList";

interface CollectibleListItemProps {
    collectible: Collectible
}

type CollectScreenNavProp = StackNavigationProp<HomeStackList, 'Collection'>;

const CollectibleListItem : React.FC<CollectibleListItemProps> = ({ collectible }) => {
    const { userCollectibles } = useUserCollectibleContext();
    
    const userCollectible = userCollectibles?.find(c => c.collectibleId === collectible.id)
    
    const navigation = useNavigation<CollectScreenNavProp>();
    
    const collectibleImage = <View style={styles.container}>
        {
            userCollectible ?
                <Image
                    source={collectibleImages['boulders-beach.png']}
                    resizeMode="contain"
                /> :
                <Image
                    source={collectibleImages['locked.png']}
                    resizeMode="contain"
                />
        }
        <Text style={styles.label}>
            {collectible.name}
        </Text>
    </View>;
    
    return (<>
        {
            userCollectible ?
                <TouchableOpacity onPress={() => navigation.navigate('CollectibleStack', { collectible })}>
                    {collectibleImage}
                </TouchableOpacity> : 
                <TouchableOpacity onPress={() => navigation.navigate('CollectibleClue', { collectible })}>
                    {collectibleImage}
                </TouchableOpacity>
                
        }
    </>)
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 8,
        width: 152
    },
    label: {
        ...fontStyles.H5,
        textAlign: 'center',
        flexWrap: 'wrap',
    }
});

export default CollectibleListItem;