import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading, SplashScreen } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'

import LoginScreen from './App/screen/LoginScreen';
import RegisterScreen from './App/screen/RegisterScreen';
import StartScreen from './App/screen/StartScreen'

const Stack = createStackNavigator()

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName='StartScreen'
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name='StartScreen' component={StartScreen} />
    <Stack.Screen name='LoginScreen' component={LoginScreen} />
    <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
  </Stack.Navigator>
)

export default function App() {

  const [state, setState] = useState(false);
  if (!state) {
    <AppLoading onFinish={() => setState(true)} />
  }

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
})

