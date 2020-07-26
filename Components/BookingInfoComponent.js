import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, DatePickerAndroid } from 'react-native';
import {Button, Card} from 'react-native-elements';
import {auth} from '../firebase/firebase';
import BasicDetails from './BasicDetailsComponent';
import { fetchProfile, fetchRooms } from '../redux/actionCreators';
import {connect} from 'react-redux';
import Loading from './LoadingComponent';
import RoomBooking from './RoomBookingComponent';


export const BookingInfo = ({room, checkOut}) => {
    var date = new Date(Date.parse(room.bookedOn));

    return (
        <View>
            <Card title="Booking Info" containerStyle={{margin: 0, borderRadius: 20}}>
                <Text style={{fontSize: 30, alignSelf:"center"}}>{room.roomNumber}</Text>
                <Text></Text>
                <Text style={{fontSize: 20, alignSelf:"center"}}>Booked On :</Text>
                <Text style={{fontSize: 15, alignSelf:"center"}}> {date.toString()}</Text>
                <Button
                 title="Check Out"
                 titleStyle={{color: '#000'}}
                 buttonStyle={{marginTop: 10, backgroundColor: "#eee", borderRadius: 20}}
                 onPress={() => checkOut(room.roomNumber)}/>
            </Card>
           
        </View>
    );
}