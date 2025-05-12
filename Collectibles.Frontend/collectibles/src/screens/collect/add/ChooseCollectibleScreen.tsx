import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useCollectionContext} from "../../../contexts/CollectionContext";
import {useCollectContext} from "../../../contexts/CollectContext";
import {CollectStackList} from "../../../types/stackParamList";
import SelectField, {DropdownData} from "../../../components/fields/SelectField";
import Screen from "../../../components/Screen";
import Section from "../../../components/Section";
import {fontStyles} from "../../../styles/fontStyles";
import Button from "../../../components/Button";
import {validateChooseCollectible} from "../../../utils/validation/validateCollectForm";
import {buttonContainerStyles} from "../../../styles/buttonStyles";
import {errorStyles} from "../../../styles/errorStyles";


const ChooseCollectibleScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<CollectStackList, 'Collect'>>();
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
    
    const getCollectibleDropdownOptions = () => {
        const collection = collections?.find(c => c.id === form.collectionId);
        
        if (!collection) return [];
        
        return collection.categories.flatMap(category => {
            return category.collectibles.map(collectible => {
                return {
                    label: collectible.name,
                    value: collectible.id,
                } as DropdownData
            })
        })
    };
    
    return (
        <Screen 
            title={"Add to your collection"} 
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
                            imageUrl: null,
                        });
                        navigation.goBack();
                    }} 
                    type={'secondary'} 
                />
                <Button 
                    label={"Next"} 
                    onPress={() => {
                        const isValid = validateChooseCollectible(form, errors, setErrors);
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