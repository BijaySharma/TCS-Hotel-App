import React from 'react';
import {View, Text} from 'react-native';
import RegistrationScreen from './Components/RegistrationScreen';

class Main extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (         
              <RegistrationScreen />
        );
    }
}

export default Main;