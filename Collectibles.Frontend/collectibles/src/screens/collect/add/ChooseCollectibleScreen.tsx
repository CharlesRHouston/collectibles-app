import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useCollectionContext} from "../../../contexts/CollectionContext";
import {useCollectContext} from "../../../contexts/CollectContext";
import {CollectStackList} from "../../../types/StackParamList";
import SelectField, {DropdownData} from "../../../components/fields/SelectField";
import Screen from "../../../components/Screen";
import Section from "../../../components/Section";
import {fontStyles} from "../../../styles/fontStyles";
import Button from "../../../components/Button";
import {validateChooseCollectible} from "../../../utils/validation/validateCollectForm";


const ChooseCollectibleScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<CollectStackList, 'Collect'>>();

    const { collections } = useCollectionContext();
    const { form, setForm } = useCollectContext();
    const [errors, setErrors] = useState<string[]>([]);
    
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
                    value={form.collectionId!}
                    setValue={(value) => setForm({...form, collectionId: value})}
                />
                <SelectField
                    label={"Collectible"}
                    placeholder={"Select"}
                    data={getCollectibleDropdownOptions()}
                    value={form.collectibleId!}
                    setValue={(value) => setForm({...form, collectibleId: value})}
                />
            </Section>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12 }}>
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