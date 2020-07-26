import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from './Components/RegistrationScreen';
import LoginScreen from './Components/LoginScreen';
import HomeScreen from './Components/HomeScreen';
import { auth } from './firebase/firebase';
import SplashScreen from './Components/SplashScreen';
import SignUpScreen from './Components/SignUpScreen';
import MainScreen from './Components/MainScreen';
const theme = {
   ...DefaultTheme,
   roundness: 2,
   colors: {
     ...DefaultTheme.colors,
     primary: '#673ab7',
     accent: "#ccc",
   },
  
};

const Stack = createStackNavigator();

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn : false,
      user : null, 
      splash : true
    };
  }

  componentDidMount(){
    auth.onAuthStateChanged( user => {
      if(user != null){
       this.setState({isLoggedIn : true, user : user, splash: false}); 
      }else{
        this.setState({isLoggedIn: false, user: null, splash: false});
      }
    });
  }
  

  render(){
    return (
      <PaperProvider theme={theme}>
        {this.state.splash ? (
          <SplashScreen/>
        ) : 
        (
          <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#673ab7" />
          {this.state.isLoggedIn ? (
            <MainScreen />
          ) : (

            <Stack.Navigator 
            screenOptions={{
              headerStyle: {
                backgroundColor: "#673ab7",
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
    
              <Stack.Screen name="SignUpScreen" options={{title: "Sign Up"}} component={SignUpScreen} />
              <Stack.Screen name="LoginScreen" options={{title: "Login"}} component={LoginScreen} />
        
            </Stack.Navigator>
          ) }
        </NavigationContainer>
        )}
     
    </PaperProvider>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});

export default App;
