import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from '../screens/Pigmy/RegisterScreen';
import MainPage from '../screens/Pigmy/MainPage';
import PrintPage from '../screens/Pigmy/PrintPage'; // Import PrintPage

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={RegisterScreen} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="PrintPage" component={PrintPage} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
