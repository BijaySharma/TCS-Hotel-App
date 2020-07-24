import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Button} from 'react-native-elements';
import {auth} from '../firebase/firebase';



export default function SplashScreen(props){
    return (
        <View style={styles.container}>
            <Text>
                SplashScreen Screen
            </Text>
            <Text>
                Loading ...
            </Text>
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