import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useCollectionContext} from "../../../contexts/CollectionContext";
import {useCollectContext} from "../../../contexts/CollectContext";
import {CollectStackList, MainStackList} from "../../../types/stackParamList";
import SelectField, {DropdownData} from "../../../components/fields/SelectField";
import Screen from "../../../components/Screen";
import Section from "../../../components/Section";
import Button from "../../../components/Button";
import {validateForm} from "../../../utils/validation/validateCollectForm";
import {buttonContainerStyles} from "../../../styles/buttonStyles";
import {errorStyles} from "../../../styles/errorStyles";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";

type ChooseScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<CollectStackList, 'Collect'>,
    BottomTabNavigationProp<MainStackList>
>;

const ChooseCollectibleScreen: React.FC = () => {
    const navigation = useNavigation<ChooseScreenNavigationProp>();
    const { collections } = useCollectionContext();
    const { form, setForm } = useCollectContext();
    const [errors, setErrors] = useState<string[]>([]);
    
    const collectionDropdownOptions = useMemo(() => {
        if (!collections) return [];
        
        return collections.map((collection) => {
            return {
                label: collection.name,
                value: collection.id,
            } as DropdownData
        });
    }, [collections]);
    
    //TODO: only show uncollected as options
    const getCollectibleDropdownOptions = () => {
        const category = collections
            ?.find(c => c.id === form.collectionId)
            ?.categories
            ?.find(c => c.id === form.categoryId);
        
        if (!category) return [];
        
        return category.collectibles.map(collectible => {
            return {
                label: collectible.name,
                value: collectible.id,
            } as DropdownData
        })
    };

    const getCategoryDropdownOptions = () => {
        const collection = collections
            ?.find(c => c.id === form.collectionId);

        if (!collection) return [];

        return collection.categories.map(category => {
            return {
                label: category.name,
                value: category.id,
            } as DropdownData
        })
    };
    
    return (
        <Screen 
            title={"Add to a collection"} 
            backNavigation={false} 
            dismissKeyboard={true}
        >
            <Section title={"Choose collectible"}>
                <SelectField
                    label={"Collection"} 
                    placeholder={"Select"}
                    data={collectionDropdownOptions}
                    value={form.collectionId!}
                    setValue={(value) => {
                        setForm({
                            ...form, 
                            collectionId: value
                        })
                    }}
                />
                <SelectField
                    label={"Category"} 
                    placeholder={"Select"}
                    data={getCategoryDropdownOptions()}
                    value={form.categoryId!}
                    setValue={(value) => {
                        setForm({
                            ...form, 
                            categoryId: value
                        })
                    }}
                />
                <SelectField
                    label={"Collectible"}
                    placeholder={"Select"}
                    data={getCollectibleDropdownOptions()}
                    value={form.collectibleId!}
                    setValue={(value) => {
                        setForm({
                            ...form, 
                            collectibleId: value
                        })
                    }}
                />
            </Section>
            <View style={buttonContainerStyles.multiple}>
                <Button 
                    label={"Cancel"} 
                    onPress={() => {
                        setForm({
                            bonus: null,
                            description: null,
                            dateCollected: new Date(),
                            collectibleId: null,
                            collectionId: null,
                            imageUri: null,
                        });
                        navigation.navigate('HomeStack',
                            {
                                screen: 'Home',
                            });
                    }} 
                    type={'secondary'} 
                />
                <Button 
                    label={"Next"} 
                    onPress={() => {
                        const isValid = validateForm(errors, setErrors, [
                            {
                                condition: form.collectionId === null,
                                message: "Collection must be selected.",
                            },
                            {
                                condition: form.categoryId === null,
                                message: "Category must be selected.",
                            },
                            {
                                condition: form.collectibleId === null,
                                message: "Collectible must be selected.",
                            },
                        ]);
                        if (isValid) {
                            navigation.navigate('UploadPhoto');
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
    error: {
        color: '#2A584F'
    }
})

export default ChooseCollectibleScreen;