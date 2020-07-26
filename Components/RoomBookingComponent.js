import React,  {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text } from 'react-native';
import {Card, Button, Icon, Avatar} from 'react-native-elements';
import Slider from '@react-native-community/slider';
import {List} from 'react-native-paper';
import { auth } from '../firebase/firebase';
import { bookRoom, fetchRooms, checkOut } from '../redux/actionCreators';
import { BookingInfo } from './BookingInfoComponent';

const mapStateToProps = state => ({
    profile: state.profile,
    rooms: state.rooms
});

const mapDispatchToProps = dispatch => ({
    bookRoom : (roomNumber) => dispatch(bookRoom(roomNumber)),
    fetchRooms: () => dispatch(fetchRooms()),
    checkOut: (roomNumber) => dispatch(checkOut(roomNumber))
})


class RoomBooking extends Component{

    constructor(props){
        super(props);
        this.state={
            guests : 1
        };
    }
   
    getAvailableRooms = () => {
        if(this.props.rooms !== null){
            var availableRooms = [];
            this.props.rooms.rooms.forEach(room => {
                if(room.available == 'true'){
                    availableRooms.push(room);
                }
            });
            return availableRooms;
        }
      }

      isAlreadyBooked = () =>{
          let booked = false
        this.props.rooms.rooms.forEach(room => {
            if(room.uid == auth.currentUser.uid){
                booked = true;
            }
        });
        return booked;
      };

      checkIn = (roomNumber) => {
        this.props.bookRoom(roomNumber)
      }

    render(){
       var availableRooms = this.getAvailableRooms();
      if(this.isAlreadyBooked()) {
          return (
            <BookingInfo checkOut={this.props.checkOut} room = {this.props.rooms.rooms.filter(room => room.uid == auth.currentUser.uid)[0]}/>
          );
      } 
      else if(availableRooms.length < 1){
           return (
            <View>
                <Text>No Rooms are available !</Text>
            </View>
           );
       }else{
            var roomNumber = this.getAvailableRooms()[0].roomNumber;
            return (
                <View>
                    <Card title="Check In" containerStyle={{margin:0, borderRadius: 20}}>
                        <View>
                                <Text style={{fontSize: 20, marginBottom: 5}}>{auth.currentUser.displayName}</Text>
                            <Text>Number of Guests : {this.state.guests}</Text>
                            <Slider
                                style={{flex : 1, height: 40}}
                                minimumValue={1}
                                maximumValue={6}
                                onSlidingComplete={value => this.setState({guests: value})}
                                onValueChange = {value => this.setState({guests: value})}
                                step={1}
                                thumbTintColor="#673ab7"
                                minimumTrackTintColor="#673ab7"
                                maximumTrackTintColor="#000000"
                            />
                        </View>
                        <Button 
                            type="solid"
                            title="Check in"
                            onPress={() => this.checkIn(roomNumber)}
                            buttonStyle={{backgroundColor: "#673ab7"}}
                            icon={<Icon type="font-awesome-5" containerStyle={{marginRight: 5}} name="person-booth" color="#fff" />}/>
                    </Card>

                    <View style={{flexDirection: 'row', padding: 10, justifyContent:'space-around'}}>
                    <Avatar
                            size="large"
                            rounded
                            containerStyle={{backgroundColor: "#673ab7"}}
                            icon={{name: 'wifi', type: 'font-awesome-5'}}
                            />
                    <Avatar
                            size="large"
                            rounded
                            containerStyle={{backgroundColor: "#673ab7"}}
                            icon={{name: 'concierge-bell', type: 'font-awesome-5'}}
                            />
                    <Avatar
                            size="large"
                            rounded
                            containerStyle={{backgroundColor: "#673ab7"}}
                            icon={{name: 'tv', type: 'font-awesome-5'}}
                            />
                    <Avatar
                            size="large"
                            rounded
                            containerStyle={{backgroundColor: "#673ab7"}}
                            icon={{name: 'headset', type: 'font-awesome-5'}}
                            />
                    </View>
                    <View>
                        <List.Section>
                        <List.Subheader>Services</List.Subheader>
                        <List.Item
                            title="24x7 High Speed Wifi"
                            type="font-awesome"
                            left={() => <Icon containerStyle={{marginTop: 4}} type="font-awesome-5" name="wifi" />}
                            />
                        <List.Item
                            title="24x7 Waiter Service"
                            type="fontawesome"
                            left={() => <Icon type="font-awesome-5" containerStyle={{marginTop: 4}} name="concierge-bell" /> }
                            />
                        <List.Item
                            title="All rooms have one TV each."
                            type="fontawesome"
                            left={() => <Icon type="font-awesome-5" containerStyle={{marginTop: 4}} name="tv" /> }
                            />
                        <List.Item
                            title="24x7 Customer Service over Phone"
                            type="fontawesome"
                            left={() => <Icon type="font-awesome-5" containerStyle={{marginTop: 4}} name="headset" /> }
                            />
                        </List.Section>
                    </View>
                </View>
            );
       }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomBooking);