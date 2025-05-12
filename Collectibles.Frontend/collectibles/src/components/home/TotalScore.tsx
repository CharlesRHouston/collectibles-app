import {Text, View} from "react-native";
import {fontStyles} from "../../styles/fontStyles";
import React, {useMemo} from "react";
import {useUserContext} from "../../contexts/UserContext";
import {useUserCollectibleContext} from "../../contexts/UserCollectibleContext";

const TotalScore : React.FC = () => {
    const { user } = useUserContext();
    const { userCollectibles } = useUserCollectibleContext();

    const totalScore = useMemo(() => {
        return userCollectibles?.reduce((total, collectible) => {
            return total + (collectible.bonusAchieved ? 2 : 1);
        }, 0) ?? 0;
    }, [userCollectibles])

    return(<View>
        <Text style={fontStyles.H1}>{user?.username.toUpperCase()}</Text>
        <Text style={fontStyles.H1}>{totalScore}</Text>
    </View>)
}

export  default TotalScore;