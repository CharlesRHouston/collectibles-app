import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackList} from "../../types/stackParamList";
import Screen from "../../components/Screen";
import {fontStyles} from "../../styles/fontStyles";

type Props = StackScreenProps<HomeStackList, 'CollectibleClue'>;

const ClueScreen: React.FC<Props> = ({ route }) => {
    const { collectible } = route.params;
    
    return (
        <Screen 
            title={collectible.name}
            backNavigation={true}
            dismissKeyboard={false}
        >
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Image source={require("../../../assets/images/icons/Magnifying Glass.png")} />
                    <Text style={styles.text}>{collectible.clue}</Text>
                </View>
                {
                    collectible?.bonus?.description &&
                    <View style={styles.subContainer}>
                        <Image source={require("../../../assets/images/icons/Trophy.png")} />
                        <Text style={styles.text}>{collectible.bonus.description}</Text>
                    </View>
                }
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 16
    },
    subContainer: {
        borderRadius: 16,
        backgroundColor: '#96E6D4',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        gap: 8
    },
    text: {
        ...fontStyles.B3
    }
});

export default ClueScreen;