import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import Screen from "../../../components/Screen";
import Section from "../../../components/Section";
import Button from "../../../components/Button";
import {CollectStackList} from "../../../types/stackParamList";
import {buttonContainerStyles} from "../../../styles/buttonStyles";
import {fontStyles} from "../../../styles/fontStyles";
import * as ImagePicker from 'expo-image-picker';
import {useCollectContext} from "../../../contexts/CollectContext";
import {validateForm} from "../../../utils/validation/validateCollectForm";
import {errorStyles} from "../../../styles/errorStyles";

const UploadPhotoScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<CollectStackList, 'UploadPhoto'>>();
    const { form, setForm } = useCollectContext();
    const [errors, setErrors] = useState<string[]>([]);
    
    const handleSelectImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.status !== 'granted') {
            alert("Permission to access media library is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
        });

        if (!result.canceled) {
            setForm({...form, imageUrl: result.assets[0].uri});
        }
    }
    
    return (
        <Screen title={"Add to your collection"} backNavigation={false} dismissKeyboard={true}>
            <Section title={"Upload photo"}>
                <View style={styles.uploadPhoto}>
                    {
                        form.imageUrl ? 
                            <>
                                <Text style={styles.label}>Image selected successfully</Text>
                            </> :
                            <>
                                <Text style={styles.label}>10MB Maximum file size</Text>
                                <Button label={"Select photo"} onPress={handleSelectImage} type={'secondary'} />
                            </>
                    }
                </View>
            </Section>
            <View style={buttonContainerStyles.multiple}>
                <Button
                    label={"Back"}
                    onPress={() => {navigation.goBack()}}
                    type={'secondary'}
                />
                <Button
                    label={"Next"}
                    onPress={() => {
                        const isValid = validateForm(errors, setErrors, [
                            {
                                condition: form.imageUrl === null,
                                message: "Image must be selected from library.",
                            }
                        ]);
                        if (isValid) {
                            navigation.navigate('AddDetails')
                        }
                    }}
                    type={'primary'}
                />
            </View>
            <View style={errorStyles.container}>
                {errors.map((error) => (
                    <Text key={error} style={errorStyles.text}>
                        {error}
                    </Text>
                ))}
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    uploadPhoto: {
        width: '100%',
        backgroundColor: '#96E6D4',
        borderWidth: 1,
        borderColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        paddingVertical: 24,
        borderStyle: 'dashed',
        borderRadius: 4
    },
    label: {
        ...fontStyles.L3,
        color: '#2A584F'
    },
    image: {
        width: 200,
        height: 200,
    }
});

export default UploadPhotoScreen;