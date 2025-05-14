import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import {Collectible} from "../../types/collection";
import {fontStyles} from "../../styles/fontStyles";

interface CollectibleListItemProps {
    collectible: Collectible
}

const CollectibleListItem : React.FC<CollectibleListItemProps> = ({ collectible }) => {
    return (<View style={styles.container}>
        <Image 
            source={require('../../../assets/images/collectibles/Locked.png')}
            resizeMode="contain"
        />
        <Text 
            style={styles.label}
        >
            {collectible.name}
        </Text>
    </View>)
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