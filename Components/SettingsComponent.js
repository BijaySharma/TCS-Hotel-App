import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {auth} from '../firebase/firebase';
import BasicDetails from './BasicDetailsComponent';

class Settings extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
           <ScrollView>
               <BasicDetails/>
           </ScrollView>
        );
    }
}

export default Settings;