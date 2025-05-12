import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import Screen from "../../../components/Screen";
import Section from "../../../components/Section";
import Button from "../../../components/Button";
import {CollectStackList} from "../../../types/stackParamList";
import {buttonContainerStyles} from "../../../styles/buttonStyles";

const UploadPhotoScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<CollectStackList, 'UploadPhoto'>>();
    
    return (
        <Screen title={"Add to your collection"} backNavigation={false} dismissKeyboard={true}>
            <Section title={"Upload photo"}>
                <></>
            </Section>
            <View style={buttonContainerStyles.multiple}>
                <Button
                    label={"Back"}
                    onPress={() => {navigation.goBack()}}
                    type={'secondary'}
                />
                <Button
                    label={"Next"}
                    onPress={() => {navigation.navigate('AddDetails')}}
                    type={'primary'}
                />
            </View>
        </Screen>
    )
}

export default UploadPhotoScreen;