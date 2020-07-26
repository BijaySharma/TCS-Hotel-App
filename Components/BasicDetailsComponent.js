import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Picker, Alert } from 'react-native';
import {Button, Card, Avatar} from 'react-native-elements';
import {TextInput, ProgressBar} from 'react-native-paper';
import {auth, storageRef, db} from '../firebase/firebase';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    profile: state.profile,
    rooms: state.rooms
  }
};

const mapDispatchToProps = dispatch => ({
    fetchProfile : () => dispatch(fetchProfile()),
    fetchRooms: () => dispatch(fetchRooms())
});

class BasicDetails extends Component {
    user = auth.currentUser;

    constructor(props){
        super(props);
        this.state = {
            name: this.user.displayName,
            phone: '',
            image: this.user.photoURL,
            progress: '',
            gender: 'Male',
            areaPin : '',
            addressLine : '',
            areaState: '',
            aadhar: '',
            isLoading: false
        };

    }

    componentDidMount() {
        this.getPermissionAsync();

      }

      publishProgress = (progress) => {
        this.setState({progress : progress});
      }

    verifyEmail = () =>{
        auth.currentUser.sendEmailVerification().then(() => {
            alert("Verification Email sent !");
        }).catch(error => {
            console.log(error);
        });
    };

    updateUserProfile = (userdata) => {
        this.setState({isLoading: true});
         auth.currentUser.updateProfile({
            displayName: this.state.name,
            phoneNumber: this.state.phone,
            photoURL: this.state.image,
          }).then(function() {
            //user details in auth updated
            db.collection('userdata').add({
              uid: auth.currentUser.uid,
              phone: userdata.phone,
              address : userdata.address,
              gender: userdata.gender,
              aadhar : userdata.aadhar
            }).then(docRef => {
              Alert.alert(
                'Profile Updated Succesfully',
                'You must re-login to continue.',
                [
                  { text: 'OK', onPress: () => auth.signOut() }
                ],
                { cancelable: false }
              );
              this.setState({isLoading: false});
            }).catch(err => console.log(err));


          }).catch(function(error) {
            console.log(error);
            this.setState({isLoading: false});
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
            base64: true,
          });
          if (!result.cancelled) {
            // Upload the image to firebase firestore
            const response = await fetch(result.uri);
            const blob = await response.blob();
            var uploadTask = storageRef.child('images/' + auth.currentUser.uid).put(blob);
            uploadTask.on('state_changed', (snapshot) => {
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              this.publishProgress(progress);
            }, (error) => {
              alert("Something went wrong");
              console.log(error);
            },() => {
              //sucess
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                this.setState({image: downloadURL});
              });
            })
          }
    
        } catch (E) {
          console.log(E);
        }
      };


    render() {
            return (
                <Card  title="Update Profile"
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
                    <View>
                    <Button type="outline" titleStyle={{color:'#673ab7'}} buttonStyle={{borderColor: "#c7b2ed"}} onPress={() => this._pickImage()} title="Select Image from Gallery" />
                      <ProgressBar 
                      progress={this.state.progress}
                      style={{height: 10, borderRadius: 10, marginTop: 4}}
                      color={this.state.progress == 100 ? "#4aed70" : "#673ab7"} />
                    </View>
                   
                  </View>
                 
                    <View style={styles.inputContainer}>
                        <TextInput 
                        label="Name"
                        mode='outlined'
                        value={this.state.name}
                        onChangeText={name => this.setState({name})}
                        placeholder="Name"/>

                    </View>

                    <View style={styles.inputContainer, {borderColor: "#999", borderWidth: 1, borderRadius: 2, backgroundColor: "#eee"}}>
                      <View style={{ flexDirection: "row", alignItems:"center", justifyContent:"space-around", paddingLeft: 10, paddingRight: 10 }}>
                          <Text style={{flex:1}}>Gender : </Text>
                          <Picker
                              selectedValue={this.state.gender}
                              style={{height: 50, flex: 1}}
                              onValueChange={(itemValue, itemIndex) =>
                                  this.setState({gender: itemValue})
                              }>
                              <Picker.Item label="Male" value="Male" />
                              <Picker.Item label="Female" value="Female" />
                          </Picker>
                      </View> 
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
                    <View style={styles.inputContainer}>
                        <TextInput 
                            label="Address Line 1"
                            mode='outlined'
                            value={this.state.addressLine}
                            onChangeText={addressLine => this.setState({addressLine})}
                            placeholder="Address"
                        
                        />
                    </View>

                    <View style={{flexDirection: 'row', marginBottom: 20}}>    
                        <View style={{flex: 1, marginRight: 10}}>
                            <TextInput 
                                label="State"
                                mode='outlined'
                                value={this.state.areaState}
                                onChangeText={areaState => this.setState({areaState})}
                                placeholder="State"
                            />
                        </View>
                        <View style={ {flex: 1}}>
                            <TextInput 
                                label="Pin Code"
                                mode='outlined'
                                value={this.state.areaPin}
                                onChangeText={areaPin => this.setState({areaPin})}
                                placeholder="Pin Code"
                            />
                        </View>
                        
                    </View>

                    <View style={styles.inputContainer}>
                          <TextInput 
                          label="Aadhra Card Number"
                          mode='outlined'
                          keyboardType="phone-pad"
                          value={this.state.aadhar}
                          onChangeText={aadhar => this.setState({aadhar})}
                          placeholder="Aadhar Card Number"/>
                        </View>

                    <Button 
                    title="Save"
                    type="solid"
                    onPress = {() => this.updateUserProfile({
                      address : (this.state.addressLine + ', ' + this.state.areaState + ', ' + this.state.areaPin),
                      gender: this.state.gender,
                      phone: this.state.phone,
                      aadhar: this.state.aadhar
                    })}
                    loading={this.state.isLoading}
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

export default connect(mapStateToProps, mapDispatchToProps)(BasicDetails);