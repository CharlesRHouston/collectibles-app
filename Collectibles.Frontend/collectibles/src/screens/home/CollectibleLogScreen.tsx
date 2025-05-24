import React, {useEffect} from 'react';
import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackList} from "../../types/stackParamList";
import Screen from "../../components/Screen";
import {useUserCollectibleContext} from "../../contexts/UserCollectibleContext";
import {Image, StyleSheet, Text} from "react-native";
import {fontStyles} from "../../styles/fontStyles";
import ApiService from "../../services/apiService";

type Props = StackScreenProps<HomeStackList, 'CollectibleLog'>;

const CollectibleLogScreen: React.FC<Props> = ({ route }) => {
    const { collectible } = route.params;
    const { userCollectibles } = useUserCollectibleContext();
    
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    
    const userCollectible = userCollectibles
        ?.find(c => c.collectibleId === collectible.id)!;
    
    useEffect(() => {
        const getCollectibleImage = async () => {
            try {
                const response = await ApiService.getSignedUrlForDownload(userCollectible.collectibleId);
                
                setImageUrl(response.data.data.url);
            }
            catch (error) {
                console.error(error);
            }
        }
        getCollectibleImage();
    }, []);
    
    return (
        <Screen
            title={collectible.name}
            backNavigation={true}
            dismissKeyboard={false}
        >
            {
                imageUrl ?
                    <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} /> :
                    <Text>Loading...</Text>
            }
            <Text style={styles.text}>
                {userCollectible?.collectedAt.substring(0, 10)} - {userCollectible?.description}
            </Text>
        </Screen>
    )
}

const styles = StyleSheet.create({
    text: {
        ...fontStyles.B3
    }
});

export default CollectibleLogScreen;