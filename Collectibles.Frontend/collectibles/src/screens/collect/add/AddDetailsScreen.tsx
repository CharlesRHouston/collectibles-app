import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Screen from "../../../components/Screen";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useCollectContext} from "../../../context/CollectContext";
import {CollectStackList} from "../../../types/StackParamList";
import Section from "../../../components/Section";
import DateField from "../../../components/fields/DateField";
import TextAreaField from "../../../components/fields/TextAreaField";
import RadioField from "../../../components/fields/RadioField";
import Button from "../../../components/Button";
import {fontStyles} from "../../../styles/fontStyles";
import {onSubmitCollect} from "../../../utils/collect/onSubmitCollect";
import {validateAddDetails} from "../../../utils/validation/validateCollectForm";
import Loading from "../../../components/Loading";

const AddDetailsScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<CollectStackList, 'AddDetails'>>();

    const [loading, setLoading] = useState(false);
    const { form, setForm } = useCollectContext();
    const [errors, setErrors] = useState<string[]>([]);
    
    return (<>
        {
            loading &&  <Loading />
        }
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
                    onPress={async () => {
                        setLoading(true)
                        const isValid = validateAddDetails(form, errors, setErrors);
                        if (isValid) {
                            await onSubmitCollect(form, errors, setErrors);
                        }
                        setForm({
                            bonus: null,
                            description: null,
                            dateCollected: new Date(),
                            collectible: null,
                            collection: null,
                            imageUrl: null,
                        })
                        setLoading(false);
                        navigation.navigate('ChooseCollectible');//TODO: navigate to collected collectible
                    }}
                    type={'primary'}
                />
            </View>
            <View style={{gap: 8, flexDirection: 'column', alignItems: 'center'}}>
                {errors.map((error) => (
                    <Text key={error} style={[fontStyles.L3, styles.error]}>
                        {error}
                    </Text>
                ))}
            </View>
        </Screen>
    </>)
}

const styles = StyleSheet.create({
    error: {
        color: '#2A584F'
    },
})

export default AddDetailsScreen;