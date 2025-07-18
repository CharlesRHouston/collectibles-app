import React from 'react';
import {type StackNavigationProp, StackScreenProps} from "@react-navigation/stack";
import {HomeStackList} from "../../types/stackParamList";
import Screen from "../../components/Screen";
import CategoryListItem from "../../components/collection/CategoryListItem";
import {ScrollView} from "react-native";

type Props = StackScreenProps<HomeStackList, 'Collection'>;

const CollectionScreen: React.FC<Props> = ({ route }) => {
    const { collection } = route.params;
    
    return (
        <Screen 
            title={collection.name.toUpperCase()} 
            backNavigation={true} 
            dismissKeyboard={false} 
        >
            <ScrollView contentContainerStyle={{gap: 16, paddingBottom: 16}} showsVerticalScrollIndicator={false} >
                {
                    collection.categories.map((category) => (
                        <CategoryListItem 
                            key={category.id}
                            category={category} 
                        />
                    ))
                }
            </ScrollView>
        </Screen>
    )
}

export default CollectionScreen;