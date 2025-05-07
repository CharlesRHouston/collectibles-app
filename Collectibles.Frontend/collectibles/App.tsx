import {NavigationContainer} from '@react-navigation/native';
import {AuthStack, MainStack} from './src/navigation/Navigation';
import {useEffect, useReducer, createContext} from 'react';
import {Text} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {authReducer} from "./src/reducers/AuthReducer";
import {RefreshAuthenticationTokens} from "./src/utils/auth/refreshAuthenticationTokens";
import {ValidateAccessTokenExpiration} from "./src/utils/auth/validateAccessTokenExpiration";
import {AuthContextType, AuthState} from "./src/types/Authentication";
import { useFonts } from 'expo-font';
import Loading from "./src/components/Loading";
import {BootstrapProvider} from "./src/context/BootstrapProvider";

const initialState = {
    isLoading: true,
    isSignedIn: false,
    isConnectionError: false,
};

export const AuthContext = createContext<AuthContextType>(
    {
        state: initialState, 
        dispatch: () => {} 
    }
);
export default function App() {
    
    const [fontsLoaded] = useFonts({
        'Retro Gaming': require('../collectibles/assets/fonts/Retro Gaming.ttf'),
        'C&C Red Alert [LAN]': require('../collectibles/assets/fonts/C&C Red Alert [LAN].ttf'),
        'PixelOperatorHBSC': require('../collectibles/assets/fonts/PixelOperatorHBSC.ttf'),
    });
    
    const [state, dispatch] = useReducer(authReducer, initialState);
    
    useEffect(() => {
        const AppLaunchAuthenticationLogic = async () => {
     
            let refreshToken = await SecureStore.getItemAsync('refreshToken');

            if (!refreshToken) {
                dispatch({ type: 'SIGN_OUT' });
                return;
            }

            let accessToken = await SecureStore.getItemAsync('accessToken');

            if (!accessToken){
                await RefreshAuthenticationTokens(dispatch, refreshToken);
                return;
            }

            const isValid = ValidateAccessTokenExpiration(accessToken);

            if (!isValid){
                await RefreshAuthenticationTokens(dispatch, refreshToken);
                return;
            }

            dispatch({ type: 'SIGN_IN' });
        }

        AppLaunchAuthenticationLogic();
    }, []);
    
    if (!fontsLoaded || state.isLoading) {
        return <Loading />;
    }

    if (state.isConnectionError) {
        return <Text>Connection error... Please try again later.</Text>;
    }
    
    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {
                state.isSignedIn ?
                    <NavigationContainer>
                        <BootstrapProvider>
                            <MainStack/>
                        </BootstrapProvider>
                    </NavigationContainer> :
                    <NavigationContainer>
                        <AuthStack/>
                    </NavigationContainer>
            }
        </AuthContext.Provider>
    );
}
