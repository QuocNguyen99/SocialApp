import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading, SplashScreen } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from './App/redux/Reducer/rootReducer';


import LoginScreen from './App/screen/LoginScreen';
import RegisterScreen from './App/screen/RegisterScreen';
import StartScreen from './App/screen/StartScreen'
import MainStack from './App/screen/Main/MainStack';

const Stack = createStackNavigator()

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName='LoginScreen'
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name='LoginScreen' component={LoginScreen} />
    <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
    <Stack.Screen name='MainScreen' component={MainStack} />
  </Stack.Navigator>
)

const store = createStore(rootReducer)

export default function App() {
  const [state, setState] = useState(false);
  // if (!state) {
  //   <AppLoading onFinish={() => setState(true)} />
  // }

  useEffect(() => {
  })
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
})

