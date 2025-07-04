import React, {useEffect, useState} from 'react';
import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackList} from "../../types/stackParamList";
import Screen from "../../components/Screen";
import {useUserCollectibleContext} from "../../contexts/UserCollectibleContext";
import {Image, StyleSheet, Text, View} from "react-native";
import {fontStyles} from "../../styles/fontStyles";
import ApiService from "../../services/apiService";
import * as FileSystem from 'expo-file-system';
type Props = StackScreenProps<HomeStackList, 'CollectibleLog'>;

const CollectibleLogScreen: React.FC<Props> = ({ route }) => {
    const { collectible } = route.params;
    const { userCollectibles } = useUserCollectibleContext();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);


    const userCollectible = userCollectibles
        ?.find(c => c.collectibleId === collectible.id)!;

    useEffect(() => {
        const loadImage = async () => {
            try {
                const fileUri = `${FileSystem.cacheDirectory}${userCollectible.collectibleId}.jpg`;
                const metadata = await FileSystem.getInfoAsync(fileUri);
                
                if (metadata.exists) {
                    setImageUri(fileUri);
                    getImageAspectRatio(fileUri)
                } else {
                    const response = await ApiService.getSignedUrlForDownload(userCollectible.collectibleId);
                    const remoteUrl = response.data.data.url;
                    const downloaded = await FileSystem.downloadAsync(remoteUrl, fileUri);
                    setImageUri(downloaded.uri);
                    getImageAspectRatio(downloaded.uri)
                }
            } catch (error) {
                console.error("Failed to load image:", error);
            }
        };

        loadImage();
    }, []);

    const getImageAspectRatio = (uri: string) => {
        Image.getSize(uri, (width, height) => {
            setAspectRatio(width / height);
        }, (error) => {
            console.error("Failed to get image size", error);
        });
    }

    return (
        <Screen
            title={collectible.name}
            backNavigation={true}
            dismissKeyboard={false}
        >
            <View style={styles.container}>
                {
                    imageUri ?
                        <Image source={{ uri: imageUri }} style={[styles.image, aspectRatio ? { aspectRatio } : {}]} /> :
                        <Text>Loading...</Text>
                }
                <Text style={styles.text}>
                    {userCollectible?.collectedAt.substring(0, 10)} - {userCollectible?.description}
                </Text>
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        alignItems: "center",
    },
    image: {
        borderRadius: 8,
        width: '100%',
    },
    text: {
        ...fontStyles.B3,
        borderBottomWidth: 1,
        borderColor: 'rgba(42, 88, 79, 0.5)',
    }
});

export default CollectibleLogScreen;