import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {fontStyles} from "../styles/fontStyles";

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

const Section : React.FC<SectionProps> = ({title, children}) => {
    
    return (<View style={styles.container}>
        <View>
            <Text style={[fontStyles.L2, {color: '#2A584F'}]}>
                {title}
            </Text>
            <View style={styles.line} />
        </View>
        {children}
    </View>)
}

const styles = StyleSheet.create({
    container: {
        width: '100%', gap: 16
    },
    line: {
        height: 1, 
        backgroundColor: '#2A584F', 
        marginVertical: 4
    }
})

export default Section;