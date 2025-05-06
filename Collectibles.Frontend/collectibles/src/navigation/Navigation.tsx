import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import {
    AuthStackList,
    CollectibleStackList,
    CollectStackList,
    HomeStackList, MainStackList,
    SettingsStackList
} from "../types/StackParamList";
import CollectibleDetailScreen from "../screens/home/CollectibleDetailScreen";
import CollectibleLogScreen from "../screens/home/CollectibleLogScreen";
import HomeScreen from "../screens/home/HomeScreen";
import CollectionScreen from "../screens/home/CollectionScreen";
import ClueScreen from "../screens/home/ClueScreen";
import ChooseCollectibleScreen from "../screens/collect/ChooseCollectibleScreen";
import UploadPhotoScreen from "../screens/collect/UploadPhotoScreen";
import AddDetailsScreen from "../screens/collect/AddDetailsScreen";
import ChangePhotoScreen from "../screens/collect/ChangePhotoScreen";
import EditDetailsScreen from "../screens/collect/EditDetailsScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import ChangePasswordScreen from "../screens/settings/ChangePasswordScreen";
import ChangeUsernameScreen from "../screens/settings/ChangeUsernameScreen";

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

const TopTab = createMaterialTopTabNavigator<CollectibleStackList>();

function CollectibleStack() {
  return (
    <TopTab.Navigator initialRouteName="CollectibleDetails">
      <TopTab.Screen name="CollectibleDetails" component={CollectibleDetailScreen} />
      <TopTab.Screen name="CollectibleLog" component={CollectibleLogScreen} />
    </TopTab.Navigator>
  );
}

const Home = createStackNavigator<HomeStackList>();

function HomeStack() {
  return (
    <Home.Navigator initialRouteName="Home">
      <Home.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Home.Screen name="Collection" component={CollectionScreen} options={{ headerShown: false }}/>
      <Home.Screen name="CollectibleClue" component={ClueScreen} options={{ headerShown: false }}/>
      <Home.Screen name="CollectibleStack" component={CollectibleStack} options={{ headerShown: false }}/>
    </Home.Navigator>
  );
}

const Collect = createStackNavigator<CollectStackList>();

function CollectStack() {
  return (
    <Collect.Navigator initialRouteName="ChooseCollectible">
      <Collect.Screen name="ChooseCollectible" component={ChooseCollectibleScreen} options={{ headerShown: false }}/>
      <Collect.Screen name="UploadPhoto" component={UploadPhotoScreen} options={{ headerShown: false }}/>
      <Collect.Screen name="AddDetails" component={AddDetailsScreen} options={{ headerShown: false }}/>
      <Collect.Screen name="ChangePhoto" component={ChangePhotoScreen} options={{ headerShown: false }}/>
      <Collect.Screen name="EditDetails" component={EditDetailsScreen} options={{ headerShown: false }}/>
    </Collect.Navigator>
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
    <BottomTab.Navigator initialRouteName="HomeStack">
      <BottomTab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }}  />
      <BottomTab.Screen name="CollectStack" component={CollectStack} options={{ headerShown: false }} />
      <BottomTab.Screen name="SettingsStack" component={SettingsStack} options={{ headerShown: false }} />
    </BottomTab.Navigator>
  )
}