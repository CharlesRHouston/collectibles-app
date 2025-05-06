import {StyleSheet} from "react-native";

const FONT_RETRO_GAMING = 'Retro Gaming';
const FONT_RED_ALERT = 'C&C Red Alert [LAN]';
const FONT_PIXEL_OPERATOR = 'PixelOperatorHBSC';

export const fontStyles = StyleSheet.create({
    H1: {
        fontSize: 40,
        fontFamily: FONT_RETRO_GAMING,
        textAlign: 'center'
    },
    H2: {
        fontSize: 32,
        fontFamily: FONT_RETRO_GAMING,
        textAlign: 'center'
    },
    H3: {
        fontSize: 24,
        fontFamily: FONT_RETRO_GAMING,
        textAlign: 'center'
    },
    H4: {
        fontSize: 20,
        fontFamily: FONT_RETRO_GAMING,
        textAlign: 'center'
    },
    H5: {
        fontSize: 16,
        fontFamily: FONT_RETRO_GAMING,
        textAlign: 'center'
    },
    B1: {
        fontSize: 32,
        fontFamily: FONT_RED_ALERT,
        letterSpacing: 1
    },
    B2: {
        fontSize: 24,
        fontFamily: FONT_RED_ALERT,
        letterSpacing: 1
    },
    B3: {
        fontSize: 16,
        fontFamily: FONT_RED_ALERT,
        letterSpacing: 1.5
    },
    L1: {
        fontSize: 24,
        fontFamily: FONT_PIXEL_OPERATOR,
    },
    L2: {
        fontSize: 20,
        fontFamily: FONT_PIXEL_OPERATOR,
    },
    L3: {
        fontSize: 16,
        fontFamily: FONT_PIXEL_OPERATOR,
    },
    L4: {
        fontSize: 12,
        fontFamily: FONT_PIXEL_OPERATOR,
    }
})