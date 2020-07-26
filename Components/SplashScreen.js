import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Button} from 'react-native-elements';
import {auth} from '../firebase/firebase';
import Loading from './LoadingComponent';



export default function SplashScreen(props){
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 30}}>
                HOTEL APP
            </Text>
            <Text>
                TCS ION INTERNSHIP PROJECT
            </Text>
            <View style={{marginTop: 20}}>
            <Loading />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
  });