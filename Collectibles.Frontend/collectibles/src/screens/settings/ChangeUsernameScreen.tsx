import React, {useState} from 'react';
import Screen from "../../components/Screen";
import TextField from "../../components/fields/TextField";
import Button from "../../components/Button";
import {StyleSheet, View} from "react-native";
import {useUserContext} from "../../contexts/UserContext";
import {useNavigation} from "@react-navigation/native";
import Loading from "../../components/Loading";
import ApiService from "../../services/apiService";
import {buttonContainerStyles} from "../../styles/buttonStyles";

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
            <View style={styles.inputContainer} >
                <TextField 
                    label={"Username"} 
                    value={username} 
                    mandatory={false} 
                    onTextChange={setUsername} />
            </View>
            <View style={buttonContainerStyles.single}>
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

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%'
    }
})

export default ChangeUsernameScreen;