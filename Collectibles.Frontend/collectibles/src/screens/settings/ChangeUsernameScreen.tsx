import React, {useState} from 'react';
import Screen from "../../components/Screen";
import TextField from "../../components/fields/TextField";
import Button from "../../components/Button";
import {View} from "react-native";
import {useUserContext} from "../../contexts/UserContext";
import {useNavigation} from "@react-navigation/native";
import Loading from "../../components/Loading";
import ApiService from "../../services/ApiService";

const ChangeUsernameScreen: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { user, setUser} = useUserContext();
    const [username, setUsername] = useState(user?.username ?? "");
    const navigation = useNavigation();
    
    return (<>
        {
            loading &&  <Loading />
        }
        <Screen title="Change Username" backNavigation={true} dismissKeyboard={true}>
            <View style={{width: '100%'}} >
            <TextField 
                label={"Username"} 
                value={username} 
                mandatory={false} 
                onTextChange={setUsername} />
            </View>
            <View style={{alignItems: 'center'}}>
                <Button 
                    label="Change Username"
                    type="primary" 
                    onPress={
                        async () => {
                            if (user) {
                                setLoading(true);
                                await ApiService.updateUser({
                                    username,
                                });
                                setUser({
                                    ...user,
                                    username: username,
                                });
                                setLoading(false);
                                navigation.goBack();
                            }
                        }
                    }
                />
            </View>
        </Screen>
    </>)
}

export default ChangeUsernameScreen;