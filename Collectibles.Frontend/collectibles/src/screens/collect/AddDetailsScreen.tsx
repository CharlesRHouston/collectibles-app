import React from 'react';
import {Text, View} from 'react-native';
import Screen from "../../components/Screen";
import Section from "../../components/Section";
import DateField from "../../components/fields/DateField";
import TextAreaField from "../../components/fields/TextAreaField";
import Button from "../../components/Button";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {CollectStackList} from "../../types/StackParamList";
import RadioField from "../../components/fields/RadioField";
import {useCollectContext} from "../../context/CollectContext";

const AddDetailsScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<CollectStackList, 'AddDetails'>>();

    const { form, setForm } = useCollectContext();
    
    return (
        <Screen title={"Add to your collection"} backNavigation={false} dismissKeyboard={true}>
            <Section title={"Add details"}>
                <DateField
                    label={"Date Collected"}
                    date={form.dateCollected!}
                    onDateChange={(date) => setForm({...form, dateCollected: date})}
                />
                <TextAreaField
                    label={"Describe your experience"}
                    value={form.description!}
                    onTextChange={(text) => setForm({...form, description: text})} />
                <RadioField 
                    label={"Bonus gem: did you take a swim?"} 
                    value={form.bonus} 
                    setValue={(value) => setForm({...form, bonus: value})} 
                    optionOneText={"Yes"} 
                    optionTwoText={"No"} 
                />
            </Section>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12 }}>
                <Button
                    label={"Back"}
                    onPress={() => {navigation.goBack()}}
                    type={'secondary'}
                />
                <Button
                    label={"Submit"}
                    onPress={() => {}}
                    type={'primary'}
                />
            </View>
        </Screen>
    )
}

export default AddDetailsScreen;