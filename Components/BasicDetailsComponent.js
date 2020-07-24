import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import {Button, Card, Avatar} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import {auth} from '../firebase/firebase';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class BasicDetails extends Component {
    user = auth.currentUser;

    constructor(props){
        super(props);
        this.state = {
            name: '',
            phone: '',
            image: null
        };
    }

    componentDidMount() {
        this.getPermissionAsync();
      }

    verifyEmail = () =>{
        auth.currentUser.sendEmailVerification().then(() => {
            alert("Verification Email sent !");
        }).catch(error => {
            console.log(error);
        });
    };

    updateUserProfile = () => {
        this.user.updateProfile({
            displayName: this.state.name,
            phone: this.state.phone
          }).then(function() {
            alert("User Details Updated");
          }).catch(function(error) {
            console.log(error);
            alert("Something went wrong.");
          });

    }

    //Image
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      };

      _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ image: result.uri });
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };

    render() {
        let { image } = this.state;
            return (
                <Card  title="Few Details more"
                titleStyle={{color: "#673ab7"}}
                dividerStyle={{backgroundColor: "#673ab7"}}
                containerStyle={{borderRadius: 10, margin: 0}}>
                  <View style={{flexDirection: 'row', alignItems:"center", justifyContent: 'space-evenly', marginBottom : 10}}>
                  <Avatar
                        rounded
                        containerStyle={{alignSelf: "center", backgroundColor:"#c7b2ed",}}
                        size="large"
                        onPress={() => this._pickImage()}
                        source={{uri : this.state.image}}
                    />
                    <Button type="outline" titleStyle={{color:'#673ab7'}} buttonStyle={{borderColor: "#c7b2ed"}} onPress={() => this._pickImage()} title="Select Image from Gallery" />
                  </View>
                       
                   
                    <View style={styles.inputContainer}>
                        <TextInput 
                        label="Name"
                        mode='outlined'
                        value={this.state.name}
                        onChangeText={name => this.setState({name})}
                        placeholder="Name"/>

                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                        label="Phone"
                        mode='outlined'
                        keyboardType="phone-pad"
                        value={this.state.phone}
                        onChangeText={phone => this.setState({phone})}
                        placeholder="Phone"/>

                    </View>

                    <Button 
                    title="Save"
                    type="solid"
                    onPress = {() => this.updateUserProfile()}
                    buttonStyle={{backgroundColor: "#673ab7"}}/>
                </Card>
            );
        
    };
}

const styles = StyleSheet.create({
    inputContainer : {
        marginBottom: 10
    }
});

export default BasicDetails;