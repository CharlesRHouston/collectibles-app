import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Screen from "../../../components/Screen";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useCollectContext} from "../../../contexts/CollectContext";
import {CollectStackList} from "../../../types/stackParamList";
import Section from "../../../components/Section";
import DateField from "../../../components/fields/DateField";
import TextAreaField from "../../../components/fields/TextAreaField";
import RadioField from "../../../components/fields/RadioField";
import Button from "../../../components/Button";
import {fontStyles} from "../../../styles/fontStyles";
import {onSubmitCollect} from "../../../utils/collect/onSubmitCollect";
import {validateAddDetails} from "../../../utils/validation/validateCollectForm";
import Loading from "../../../components/Loading";
import {useCollectionContext} from "../../../contexts/CollectionContext";
import {buttonContainerStyles, buttonStyles} from "../../../styles/buttonStyles";
import {errorStyles} from "../../../styles/errorStyles";

const AddDetailsScreen: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const navigation = useNavigation<StackNavigationProp<CollectStackList, 'AddDetails'>>();
    const { form, setForm } = useCollectContext();
    
    const { collections } = useCollectionContext();
    
    const question = collections!
        .find(collection => collection.id === form?.collectionId)
        ?.categories
        ?.flatMap(category => category.collectibles)
        ?.find(collectible => collectible.id === form.collectibleId)
        ?.bonus?.question;
    
    return (<>
        {
            loading &&  <Loading />
        }
        <Screen 
            title={"Add to your collection"} 
            backNavigation={false} 
            dismissKeyboard={true}
        >
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
                {
                    question !== null &&
                        <RadioField 
                            label={"Bonus gem: did you take a swim?"} 
                            value={form.bonus} 
                            setValue={(value) => setForm({...form, bonus: value})} 
                            optionOneText={"Yes"} 
                            optionTwoText={"No"}
                        />
                }
            </Section>
            <View style={buttonContainerStyles.multiple}>
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
                            await onSubmitCollect(form, errors, setErrors, collections!);
                        }
                        setForm({
                            bonus: null,
                            description: null,
                            dateCollected: new Date(),
                            collectibleId: null,
                            collectionId: null,
                            imageUrl: null,
                        })
                        setLoading(false);
                        navigation.navigate('ChooseCollectible');//TODO: navigate to collected collectible
                        //TODO: refresh APIs
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
    </>)
}

export default AddDetailsScreen;