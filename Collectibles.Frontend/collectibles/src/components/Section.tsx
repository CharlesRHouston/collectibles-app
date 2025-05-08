import React from "react";
import {Text, View} from "react-native";
import {fontStyles} from "../styles/fontStyles";

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

const Section : React.FC<SectionProps> = ({title, children}) => {
    
    return (<View style={{ width: '100%', gap: 16 }}>
        <View>
            <Text style={[fontStyles.L2, {color: '#2A584F'}]}>
                {title}
            </Text>
            <View style={{ height: 1, backgroundColor: '#2A584F', marginVertical: 4 }} />
        </View>
        {children}
    </View>)
}

export default Section;