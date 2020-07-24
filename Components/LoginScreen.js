import React, {Component} from 'react';
import {Text, View, StyleSheet, Picker, ScrollView, Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Icon, Button, Card} from 'react-native-elements';
import {auth} from '../firebase/firebase';

class LoginScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            isLoading : false,
            err : '',
            warn: false
        };
    }

    signInUser = (email, password) => {
        this.setState({isLoading : true});
        try{
            auth.signInWithEmailAndPassword(email, password)
            .then(user => {
                this.setState({isLoading : false});
            }).catch(error => {this.setState({isLoading: false, err: error.toString(), warn: true})});
          }
          catch(error){
            this.setState({isLoading : false});
            alert("Incorrect Email or Password");
           console.log(error);

          }
      
    };

    RenderForm = () => {
        return (
            <View>
                {this.state.err === '' ? <></> : <Text style={{color: 'red', margin: 10}}>{this.state.err}</Text>}
                
                <View style={styles.inputContainer}>
                    <TextInput 
                        label="Email"
                        mode='outlined'
                        keyboardType="email-address"
                        value={this.state.email}
                        error={this.state.warn}
                        onFocus={() => this.setState({warn : false, err : ''})}
                        onChangeText={email => this.setState({email})}
                        placeholder="Email"
                    
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput 
                        label="Password"
                        mode='outlined'
                        secureTextEntry={true}
                        error={this.state.warn}
                        onFocus={() => this.setState({warn : false, err: ''})}
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                        placeholder="Password"
                    
                    />
                </View>
                <Button title="Login"
                            buttonStyle={{backgroundColor: '#673ab7', marginBottom:10}}
                            iconRight={true}
                            loading={this.state.isLoading}
                            onPress={() => this.signInUser(this.state.email, this.state.password)}
                            icon={<Icon name='sign-in-alt' style={{marginLeft: 5 }} color="#fff" type='font-awesome-5'/>}
                />
                
            </View>
        );
    };

    render(){
        return(
            <ScrollView style={{flex: 1, margin: 20, marginTop:20}}>
                
                <View style={{ justifyContent: "center", alignItems:"center"}}>
                     <Icon type="font-awesome-5" name="sign-in-alt" size={35} color="#673ab7"/>
                    <Text style={{color:"#673ab7", fontSize: 30, marginBottom: 20, fontWeight:"100"}}>
                        Login
                    </Text>
                </View>

                {this.RenderForm()}


                <Card containerStyle={{borderRadius: 10, margin: 0}}>
                <Text style={{marginBottom: 10}}>New User ?</Text>
                <Button
                    title="Sign Up"
                    type="outline"
                    onPress={() => this.props.navigation.navigate('SignUpScreen')}
                    />
            </Card>
            </ScrollView>
        );
    }

    

}


const styles = StyleSheet.create({
    inputContainer : {
        marginBottom: 10
    }
});


export default LoginScreen;