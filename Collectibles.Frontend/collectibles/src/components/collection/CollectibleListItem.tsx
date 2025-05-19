import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Collectible} from "../../types/collection";
import {fontStyles} from "../../styles/fontStyles";
import {useUserCollectibleContext} from "../../contexts/UserCollectibleContext";
import {useNavigation} from "@react-navigation/native";
import type {StackNavigationProp} from "@react-navigation/stack";
import {HomeStackList} from "../../types/stackParamList";

interface CollectibleListItemProps {
    collectible: Collectible
}

type CollectScreenNavProp = StackNavigationProp<HomeStackList, 'Collection'>;

const CollectibleListItem : React.FC<CollectibleListItemProps> = ({ collectible }) => {
    const { userCollectibles } = useUserCollectibleContext();
    
    const userCollectible = userCollectibles
        ?.find(c => c.collectibleId === collectible.id)
    
    const navigation = useNavigation<CollectScreenNavProp>();
    
    const collectibleItem = <View 
        style={userCollectible ? 
            styles.activeContainer : 
            styles.inactiveContainer}
    >
        <Text style={userCollectible ? styles.activeLabel : styles.inactiveLabel}>
            {collectible.name}
        </Text>
        {
            userCollectible ?
                <Image
                    source={require('../../../assets/images/icons/Trophy - Active.png')}
                    resizeMode="contain"
                />
                 :
                <Image
                    source={require('../../../assets/images/icons/Trophy - Inactive.png')}
                    resizeMode="contain"
                    style={styles.inactiveTrophy}
                />
        }
    </View>;
    
    return (<>
        {
            userCollectible ?
                <TouchableOpacity onPress={() => navigation.navigate('CollectibleLog', { collectible })}>
                    {collectibleItem}
                </TouchableOpacity> : 
                <TouchableOpacity onPress={() => navigation.navigate('CollectibleClue', { collectible })}>
                    {collectibleItem}
                </TouchableOpacity>
                
        }
    </>)
}

const styles = StyleSheet.create({
    activeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#2A584F',
        backgroundColor: '#96E6D4',
        borderRadius: 4,
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    inactiveContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(42, 88, 79, 0.5)',
        backgroundColor: 'rgba(150, 230, 212, 0.5)',
        borderRadius: 4,
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    activeLabel: {
        ...fontStyles.H5
    },
    inactiveLabel: {
        ...fontStyles.H5,
        opacity: 0.5
    },
    inactiveTrophy: {
        opacity: 0.5
    }
});

export default CollectibleListItem;