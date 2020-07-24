import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {Button, Card} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import {auth} from '../firebase/firebase';
import BasicDetails from './BasicDetailsComponent';

function signOutUser(){
    auth.signOut().then(function() {
      alert('Sign Out Successful!');
    }).catch(function(error) {
     alert(error.toString());
    });
  }

export default class HomeScreen extends Component{
    user = auth.currentUser;
    
    render(){
    return (
        
           <ScrollView style={{flex: 1, margin: 20, marginTop:20}}>
               
               {this.user.displayName !== '' ? <BasicDetails navigation={this.props.navigation} /> : <></>}
                <Text>{this.user.displayName}</Text>
               <Card containerStyle={{borderRadius: 10, margin: 0}}>
                <Button
                    title="Sign Out"
                    type="outline"
                    onPress={() => signOutUser()}
                    />
            </Card>
           </ScrollView>
       
    );
   }
}

const styles = StyleSheet.create({
    inputContainer : {
        marginBottom: 10
    }
});