import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from './App/redux/Reducer/rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage'

import LoginScreen from './App/screen/LoginScreen';
import RegisterScreen from './App/screen/RegisterScreen';
import MainStack from './App/screen/Main/MainStack';
import StartScreen from './App/screen/StartScreen';
import ChatScreen from './App/screen/ChatScreen';
import ProfileDetail from './App/components/Profile/ProfileDetail';

const Stack = createStackNavigator()

const StackNavigator = ({ token }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
    { token !== null ?
      (
        <>
          <Stack.Screen name='MainScreen' component={MainStack} />
          <Stack.Screen name='ProfileDetail' component={ProfileDetail} />
          <Stack.Screen name='LoginScreen' component={LoginScreen} />
          <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
          <Stack.Screen name='ChatScreen' component={ChatScreen} />
        </>
      ) :
      (<>
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
        <Stack.Screen name='MainScreen' component={MainStack} />
      </>
      )
    }
  </Stack.Navigator>
)


const store = createStore(rootReducer)

export default function App() {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    handleGetToken()
  }, [])

  const handleGetToken = async () => {
    const result = await AsyncStorage.getItem('Token');
    setToken(result);
    setIsLoading(false)
  }

  if (isLoading) {
    return <StartScreen />
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator token={token} />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
})

