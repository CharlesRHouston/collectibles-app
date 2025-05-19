import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import {
    AuthStackList,
    CollectStackList,
    HomeStackList, MainStackList,
    SettingsStackList
} from "../types/stackParamList";
import CollectibleLogScreen from "../screens/home/CollectibleLogScreen";
import HomeScreen from "../screens/home/HomeScreen";
import CollectionScreen from "../screens/home/CollectionScreen";
import CollectibleClueScreen from "../screens/home/CollectibleClueScreen";
import ChooseCollectibleScreen from "../screens/collect/add/ChooseCollectibleScreen";
import UploadPhotoScreen from "../screens/collect/add/UploadPhotoScreen";
import AddDetailsScreen from "../screens/collect/add/AddDetailsScreen";
import ChangePhotoScreen from "../screens/collect/edit/ChangePhotoScreen";
import EditDetailsScreen from "../screens/collect/edit/EditDetailsScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import ChangePasswordScreen from "../screens/settings/ChangePasswordScreen";
import ChangeUsernameScreen from "../screens/settings/ChangeUsernameScreen";
import {Image, StyleSheet, View} from "react-native";
import {fontStyles} from "../styles/fontStyles";
import {CollectProvider} from "../contexts/CollectProvider";

const Auth = createStackNavigator<AuthStackList>();

export function AuthStack() {
    return (
        <Auth.Navigator initialRouteName="Welcome">
            <Auth.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
            <Auth.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
            <Auth.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        </Auth.Navigator>
    );
}

const Home = createStackNavigator<HomeStackList>();

function HomeStack() {
    return (
        <Home.Navigator initialRouteName="Home">
            <Home.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <Home.Screen name="Collection" component={CollectionScreen} options={{ headerShown: false }}/>
            <Home.Screen name="CollectibleClue" component={CollectibleClueScreen} options={{ headerShown: false }}/>
            <Home.Screen name="CollectibleLog" component={CollectibleLogScreen} options={{ headerShown: false }}/>
        </Home.Navigator>
    );
}

const Collect = createStackNavigator<CollectStackList>();

function CollectStack() {
    return (
        <CollectProvider>
            <Collect.Navigator initialRouteName="ChooseCollectible">
                <Collect.Screen name="ChooseCollectible" component={ChooseCollectibleScreen} options={{ headerShown: false }}/>
                <Collect.Screen name="UploadPhoto" component={UploadPhotoScreen} options={{ headerShown: false }}/>
                <Collect.Screen name="AddDetails" component={AddDetailsScreen} options={{ headerShown: false }}/>
                <Collect.Screen name="ChangePhoto" component={ChangePhotoScreen} options={{ headerShown: false }}/>
                <Collect.Screen name="EditDetails" component={EditDetailsScreen} options={{ headerShown: false }}/>
            </Collect.Navigator>
        </CollectProvider>
    );
}

const Settings = createStackNavigator<SettingsStackList>();

function SettingsStack() {
    return (
        <Settings.Navigator initialRouteName={"Settings"}>
            <Settings.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            <Settings.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }} />
            <Settings.Screen name="ChangeUsername" component={ChangeUsernameScreen} options={{ headerShown: false }} />
        </Settings.Navigator>
    );
}

const BottomTab = createBottomTabNavigator<MainStackList>();

export function MainStack() {
    return (
        <View style={{ flex: 1 }}>
            <Image
                source={require('../../assets/images/environment/Grass.png')}
                style={styles.grassImage}
                resizeMode="contain"
            />
            <BottomTab.Navigator
                initialRouteName="HomeStack"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconSource;

                        if (route.name === 'HomeStack') {
                            iconSource = focused ?
                                require('../../assets/images/icons/Home - Active.png') :
                                require('../../assets/images/icons/Home - Inactive.png');
                        } else if (route.name === 'CollectStack') {
                            iconSource = focused ?
                                require('../../assets/images/icons/Collect - Active.png') :
                                require('../../assets/images/icons/Collect - Inactive.png');
                        } else if (route.name === 'SettingsStack') {
                            iconSource = focused ?
                                require('../../assets/images/icons/Settings - Active.png') :
                                require('../../assets/images/icons/Settings - Inactive.png');
                        }

                        return (
                            <Image
                                source={iconSource}
                                style={{
                                    width: size,
                                    height: size,
                                    tintColor: color,
                                    marginBottom: 4
                                }}
                                resizeMode="contain"
                            />
                        );
                    },
                    tabBarActiveTintColor: '#FCFFC0',
                    tabBarInactiveTintColor: '#FCFFC0',
                    tabBarStyle: styles.tabBar,
                    tabBarLabelStyle: styles.tabBarLabel
                })
                }
            >
                <BottomTab.Screen
                    name="HomeStack"
                    component={HomeStack}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Home"
                    }}
                />
                <BottomTab.Screen
                    name="CollectStack"
                    component={CollectStack}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Collect"
                    }}
                />
                <BottomTab.Screen
                    name="SettingsStack"
                    component={SettingsStack}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Settings"
                    }}
                />
            </BottomTab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    grassImage: {
        position: 'absolute',
        bottom: 80,
        zIndex: 999,
    },
    tabBar: {
        backgroundColor: '#774448',
        borderTopWidth: 0,
        elevation: 0,
        height: 104,
        paddingTop: 24
    },
    tabBarLabel: {
        ...fontStyles.L4,
        fontSize: 14
    }
});