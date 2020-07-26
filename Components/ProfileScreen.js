import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {Button, Card, Avatar, Icon} from 'react-native-elements';
import {TextInput, Divider} from 'react-native-paper';
import {auth, db} from '../firebase/firebase';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './ProfileComponent';
import Settings from './SettingsComponent';


const Stack = createStackNavigator();

class ProfileScreen extends Component{

    constructor(props){
        super(props);
    }

    render(){
        var profileTitle = auth.currentUser.displayName == null ? "Profile" : auth.currentUser.displayName;
        return(
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
                <Stack.Screen name="Profile" options={{title: profileTitle}} component={Profile} />
                <Stack.Screen name="Settings" options={{title: "Settings"}} component={Settings} />
            </Stack.Navigator>
          );
    }
}




export default ProfileScreen;