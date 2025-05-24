import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Screen from "../../../components/Screen";
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useCollectContext} from "../../../contexts/CollectContext";
import {CollectStackList, MainStackList} from "../../../types/stackParamList";
import Section from "../../../components/Section";
import DateField from "../../../components/fields/DateField";
import TextAreaField from "../../../components/fields/TextAreaField";
import RadioField from "../../../components/fields/RadioField";
import Button from "../../../components/Button";
import {validateForm} from "../../../utils/validation/validateCollectForm";
import Loading from "../../../components/Loading";
import {useCollectionContext} from "../../../contexts/CollectionContext";
import {buttonContainerStyles, buttonStyles} from "../../../styles/buttonStyles";
import {errorStyles} from "../../../styles/errorStyles";
import {useUserCollectibleContext} from "../../../contexts/UserCollectibleContext";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {Collection} from "../../../types/collection";
import {PutCollectibleRequest, UserCollectible} from "../../../types/userCollectible";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import ApiService from "../../../services/apiService";

type CollectScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<CollectStackList, 'AddDetails'>,
    BottomTabNavigationProp<MainStackList>
>;

const AddDetailsScreen: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const { form, setForm } = useCollectContext();
    const navigation = useNavigation<CollectScreenNavigationProp>();
    const { collections } = useCollectionContext();
    const { userCollectibles, setUserCollectibles } = useUserCollectibleContext();

    const getBonusQuestion = () => {
        const question = collections!
            .find(collection => collection.id === form?.collectionId)
            ?.categories
            ?.flatMap(category => category.collectibles)
            ?.find(collectible => collectible.id === form.collectibleId)
            ?.bonus?.question;

        return question ? `Bonus gem: ${question?.toLowerCase()}` : null;
    }

    const bonusQuestion = getBonusQuestion();
    
    const getCategoryType = (collectionId: string, categoryId: string ) => {
        const category = collections!
            .find(collection => collection.id === collectionId)!
            .categories
            .find(category => category.id === categoryId)!;

        return category.type;
    }

    const updateAndResetStates = (request: PutCollectibleRequest) => {
        setUserCollectibles(prev => {
            if (prev) {
                return [
                    ...prev.filter(item => item.collectibleId !== form.collectibleId),
                    {
                        collectibleId: form.collectibleId!,
                        ...request,
                    }
                ]
            }

            return [
                {
                    collectibleId: form.collectibleId!,
                    ...request,
                }
            ]
        });

        setForm({
            collectionId: null,
            categoryId: null,
            collectibleId: null,
            imageUri: null,
            dateCollected: new Date(),
            description: null,
            bonus: null,
        });

        setErrors([]);
    }

    const uploadImageToS3 = async (presignedUrl: string, fileUri: string) => {
        const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        const binaryData = base64ToArrayBuffer(fileBase64);

        const response = await axios.put(presignedUrl, binaryData, {
            headers: {
                'Content-Type': 'image/jpeg', //TODO: consider other file types
            },
        });
    };

    const base64ToArrayBuffer = (base64: string) => {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    };

    const validateAddDetailsForm = () => {
        const isValid = validateForm(errors, setErrors, [
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
        ]);

        return isValid;
    }
    
    const onSubmitCollect = async () => {
        setLoading(true)
        
        try {
            const isValid = validateAddDetailsForm();

            if (isValid) {
                const presignedResponse = await ApiService.getSignedUrlForUpload(form.collectibleId!);

                await uploadImageToS3(presignedResponse.data.data.url, form.imageUri!);

                const request: PutCollectibleRequest = {
                    collectionId: form.collectionId!,
                    categoryId: form.categoryId!,
                    collectedAt: form.dateCollected!.toISOString(),
                    active: true,
                    description: form.description!,
                    bonusAchieved: form.bonus!,
                    categoryType: getCategoryType(form.collectionId!, form.categoryId!)!
                }
                
                await ApiService.putCollectible(form.collectibleId!, request);

                updateAndResetStates(request);

                navigation.navigate('HomeStack');
            }
        } catch (error) {
            let errorMessage = "An unexpected error occurred.";

            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data;
            }

            setErrors(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false)
        }
    }
    
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
                    bonusQuestion !== null &&
                        <RadioField 
                            label={bonusQuestion} 
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
                    onPress={async () => await onSubmitCollect()}
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