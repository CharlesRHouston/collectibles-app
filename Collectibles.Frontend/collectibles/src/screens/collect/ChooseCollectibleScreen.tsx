import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Screen from "../../components/Screen";
import Section from "../../components/Section";
import Button from "../../components/Button";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {CollectStackList} from "../../types/StackParamList";
import SelectField, {DropdownData} from "../../components/fields/SelectField";
import {useCollectionContext} from "../../context/CollectionContext";
import {useCollectContext} from "../../context/CollectContext";
import {fontStyles} from "../../styles/fontStyles";

const ChooseCollectibleScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<CollectStackList, 'Collect'>>();

    const { collections } = useCollectionContext();
    const { form, setForm } = useCollectContext();
    const [errors, setErrors] = useState<string[]>([]);
    
    const getCollectibleDropdownOptions = () => {
        const collection = collections?.find(c => c.id === form.collection);
        
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
    
    const validateForm = () => {
        const updatedErrors = new Set(errors);

        const rules = [
            {
                condition: form.collection === null,
                message: "Collection must be selected.",
            },
            {
                condition: form.collectible === null,
                message: "Collectible must be selected.",
            },
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
            <Section title={"Choose collectible"}>
                <SelectField 
                    label={"Collection"} 
                    placeholder={"Select"}
                    data={collections!.map((collection) => { 
                        return {
                            label: collection.name,
                            value: collection.id,
                        } as DropdownData
                    })}
                    value={form.collection!}
                    setValue={(value) => setForm({...form, collection: value})}
                />
                <SelectField
                    label={"Collectible"}
                    placeholder={"Select"}
                    data={getCollectibleDropdownOptions()}
                    value={form.collectible!}
                    setValue={(value) => setForm({...form, collectible: value})}
                />
            </Section>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12 }}>
                <Button 
                    label={"Cancel"} 
                    onPress={() => {navigation.goBack()}} 
                    type={'secondary'} 
                />
                <Button 
                    label={"Next"} 
                    onPress={() => {
                        const isValid = validateForm();
                        if (isValid) {
                            navigation.navigate('UploadPhoto');
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

export default ChooseCollectibleScreen;