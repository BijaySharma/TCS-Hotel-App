import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {Button, Card} from 'react-native-elements';
import {auth} from '../firebase/firebase';
import BasicDetails from './BasicDetailsComponent';
import { fetchProfile, fetchRooms } from '../redux/actionCreators';
import {connect} from 'react-redux';
import Loading from './LoadingComponent';
import RoomBooking from './RoomBookingComponent';

function signOutUser(){
    auth.signOut().then(function() {
      alert('Sign Out Successful!');
    }).catch(function(error) {
     alert(error.toString());
    });
  }

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

  function Home(props) {
    if(props.profile.isLoading){
      return (
        <View>
          <Loading />
        </View>
      );
    }else if(props.profile.errMess == null){
      if(props.rooms.isLoading){
        return (
          <Loading />
        );
      }else if(props.rooms.errMess !== null){
        return (
          <View>
            <Text>{props.rooms.errMess}</Text>
          </View>
        )
      }else{
        return (
          <RoomBooking />  
        );
      }
    }else{
      return (
        <BasicDetails />
      );
    }
  }


class HomeScreen extends Component{
    user = auth.currentUser;

    componentDidMount(){
      this.props.fetchProfile();
      this.props.fetchRooms();
    }
    getAvailableRooms = () => {
      var availableRooms = [];
      if(this.props.rooms.rooms !== []){
        availableRooms = this.props.rooms.rooms.filter(room => room.available);
      }
      return availableRooms;
    }
    render(){
    return (
       
           <ScrollView style={{flex: 1, margin: 20, marginTop:20}}>
               <Home profile={this.props.profile} rooms={this.props.rooms}/>
           </ScrollView>
       
    );
   }
}
const styles = StyleSheet.create({
  inputContainer : {
      marginBottom: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

