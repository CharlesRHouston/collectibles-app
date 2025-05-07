import React, {useState} from 'react';
import Screen from "../../components/Screen";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import {View} from "react-native";
import {useProfileContext} from "../../context/ProfileProvider";
import {useNavigation} from "@react-navigation/native";
import Loading from "../../components/Loading";
import authenticatedApi from "../../api/authenticatedApi";

const ChangeUsernameScreen: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { profile, setProfile} = useProfileContext();
    const [username, setUsername] = useState(profile?.username ?? "");
    const navigation = useNavigation();
    
    return (<>
        {
            loading &&  <Loading />
        }
        <Screen title="Change Username" backNavigation={true}>
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
                            if (profile) {
                                setLoading(true);
                                await authenticatedApi.put("api/v1/user", {
                                    data: {
                                        username: username,
                                        email: profile.email,
                                        id: profile.id
                                    }
                                })
                                setProfile({
                                    ...profile,
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