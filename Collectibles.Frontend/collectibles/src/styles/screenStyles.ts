import {StyleSheet} from "react-native";

export const screenStyles = StyleSheet.create({
    containerWithNavigation: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#6EB8A8',
        paddingTop: 56,
        paddingHorizontal: 16,
        gap: 24,
        width: '100%',
    },
    containerWithoutNavigation: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#6EB8A8',
        paddingTop: 80,
        paddingHorizontal: 16,
        gap: 24,
        width: '100%',
    }
})