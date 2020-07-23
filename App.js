import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './Main'
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from './Components/RegistrationScreen';
import LoginScreen from './Components/LoginScreen';
import firebase from './firebase';
import HomeScreen from './Components/HomeScreen';
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
      user : null
    };
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged( user => {
      if(user != null){
       this.setState({isLoggedIn : true, user : user}); 
      }else{
        this.setState({isLoggedIn: false, user: null});
      }
    });
  }

  render(){
    return (
      <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>

          {this.state.isLoggedIn ? (
            <>
            <Stack.Screen name="HomeScreen" options={{title: "Home"}} component={HomeScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="RegistrationScreen" options={{title: "User Registration"}} component={RegistrationScreen} />
              <Stack.Screen name="LoginScreen" options={{title: "Login"}} component={LoginScreen} />
            </>
          )}
          
        </Stack.Navigator>
      </NavigationContainer>
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
