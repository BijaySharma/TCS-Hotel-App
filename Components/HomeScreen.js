import React from 'react';
import { View, Text } from 'react-native';
import {Button} from 'react-native-elements';
import firebase from '../firebase';

function signOutUser(){
    firebase.auth().signOut().then(function() {
      alert('User Signed Out');
    }).catch(function(error) {
     alert(error.toString());
    });
  }

export default function HomeScreen(props){
    return (
        <View>
            <Text>
                Home Screen
            </Text>
            <Button title="Sign Out"
                iconRight={true}
                titleStyle={{fontSize: 14}}
                type="clear"
                onPress={() => signOutUser()}
             />
        </View>
    );
};