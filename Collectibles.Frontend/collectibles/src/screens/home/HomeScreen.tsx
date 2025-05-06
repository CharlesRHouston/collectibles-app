import React from 'react';
import { Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackList } from '../../types/StackParamList';

type HomeScreenNavProp = StackNavigationProp<HomeStackList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavProp>();

  return (<>
    <Text>Welcome to the home screen.</Text>
  </>
  )
}

export default HomeScreen;