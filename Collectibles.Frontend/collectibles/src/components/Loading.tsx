import {StyleSheet, ActivityIndicator, View} from "react-native";
import React from "react";


const Loading : React.FC = () => {
    return (<View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#2A584F" />
    </View>)
}

const styles = StyleSheet.create({
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    }
})

export default Loading;