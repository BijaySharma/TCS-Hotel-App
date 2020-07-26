import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {Button, Card, Avatar, Icon} from 'react-native-elements';
import {TextInput, Divider} from 'react-native-paper';
import {auth, db} from '../firebase/firebase';
import {connect} from 'react-redux';
import BasicDetails from './BasicDetailsComponent';

const mapStateToProps = state => {
    return {
      profile: state.profile
    }
  };

  function RenderProfile({profile, navigation}){
      if(profile.isLoading){
          return (
              <Text>Loding</Text>
          );
      }else if(profile.errMess !== null){
          return (
              <BasicDetails />
          )
      }else{
          return (
                <Card containerStyle={{borderRadius: 20, }}>
                    <View style={{flexDirection: 'row', alignItems:"center", justifyContent:"center"}}>
                        <Avatar containerStyle={{marginRight: 10}} rounded source={{uri : auth.currentUser.photoURL}} size="large"/>
                        <Text style={{color: "#673ab7", fontSize: 25,marginLeft: 10}}>{auth.currentUser.displayName}</Text>
                    </View>
                    <Card title="Details"  titleStyle={{color: "#673ab7"}} containerStyle={{marginHorizontal: 0, borderRadius: 20}}>
                        <Text>Name: {auth.currentUser.displayName}</Text>
                        <Divider style={{ marginVertical: 10}}/>
                        
                        <Text>Gender: {profile.profile.gender}</Text>
                        <Divider style={{ marginVertical: 10}}/>

                        <Text>Email: {auth.currentUser.email}</Text>
                        <Divider style={{ marginVertical: 10}}/>
                        
                        <Text>Phone: {profile.profile.phone}</Text>
                        <Divider style={{ marginVertical: 10}}/>

                        <Text>Address : {profile.profile.address}</Text>
                   
                    </Card>
                    <View style={{flexDirection: "row", margin: 10, marginBottom: 0}}>
                    
                    <Button 
                        type="solid" 
                        title="Settings"
                        buttonStyle={{backgroundColor: '#ddd'}}
                        titleStyle={{color: "#000"}}
                        containerStyle={{flex: 1, borderRadius: 20}}
                        onPress={() => navigation.navigate('Settings')}
                        icon={<Icon name='md-cog' style={{marginRight: 5,}} color="#000" type='ionicon'/>} />

                    <Divider style={{margin: 5}} />
                     <Button 
                        title = "Log Out"
                        buttonStyle={{backgroundColor: '#ddd'}}
                        type="solid"
                        titleStyle={{color: "#000"}}
                        containerStyle={{flex: 1, borderRadius: 20}}
                        onPress = {() => {auth.signOut(); }} 
                        icon={<Icon name='ios-log-out' style={{marginRight: 5,}} color="#000" type='ionicon'/>}/>
                    </View>
                   
                </Card>
          );
      }
  }

class Profile extends Component {
    constructor(props){
        super(props);
    }


    render(){
        return (
            <ScrollView>
                <RenderProfile profile={this.props.profile} navigation={this.props.navigation} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Profile);