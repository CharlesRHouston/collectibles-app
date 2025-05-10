import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
import {fontStyles} from "../../styles/fontStyles";
import DatabaseService from "../../api/DatabaseService";

const AddDetailsScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<CollectStackList, 'AddDetails'>>();

    const { form, setForm } = useCollectContext();
    const [errors, setErrors] = useState<string[]>([]);
    
    const validateForm = () => {
        const updatedErrors = new Set(errors);

        const rules = [
            {
                condition: form.dateCollected === null,
                message: "Date must be provided.",
            },
            {
                condition: form.description === null || form.description!.length === 0,
                message: "Description must be provided.",
            },
            {
                condition: form.bonus === null,
                message: "Bonus must be selected.",
            }
        ];

        rules.forEach(({ condition, message }) => {
            if (condition) {
                updatedErrors.add(message);
            } else {
                updatedErrors.delete(message);
            }
        });

        setErrors(Array.from(updatedErrors));

        return updatedErrors.size === 0;
    }
    
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
                    onPress={async () => {
                        const isValid = validateForm();
                        if (isValid) {
                            await DatabaseService.putCollectible(
                                form.collectible!, 
                                {
                                    collectedAt: form.dateCollected!.toString(),
                                    active: true, 
                                    description: form.description!,
                                    bonusAchieved: form.bonus!,
                                    imageUrl: form.imageUrl ?? "placeholder",
                                }
                            )
                        }
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
    )
}

const styles = StyleSheet.create({
    error: {
        color: '#2A584F'
    },
})

export default AddDetailsScreen;