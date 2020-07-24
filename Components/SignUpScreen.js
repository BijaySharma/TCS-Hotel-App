import React, {Component} from 'react';
import {Text, View, StyleSheet, Picker, ScrollView, Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Icon, Button, Card} from 'react-native-elements';
import {auth} from '../firebase/firebase';

class SignUpScreen extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : '',
            confirmPassword : '',
            emailError : '',
            passwordError : '',
            isLoading: false
        };
    }

    validateEmail = () => {
        if(this.state.email.length === 0){
            this.setState({emailError : 'Email ID cannot be blank'});
        }else{
            this.setState({emailError : ''});
        }
    };

    validatePassword = () => {
        if(this.state.password.length < 6){
            this.setState({passwordError : "Password must be atleast 6 characters long."})
        }else{
            this.setState({passwordError : ""});
        }
    };

    signUpUser = (email, password) => {
        this.setState({isLoading: true});
        
        //check password
        if(this.state.password !== this.state.confirmPassword){
            this.setState({passwordError: 'Password and Confirm password do not match'});
            this.setState({isLoading: false});
            return;
        }

        auth.createUserWithEmailAndPassword(email, password).catch((error) => {
            this.setState({isLoading: false});
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
                this.setState({passwordError : "Password too weak. Please enter a strong password"});
            }else if(errorCode == 'auth/email-already-in-use'){
                this.setState({emailError : "An account with this email already exists"});
            } else {
              alert(errorMessage);
            }

            console.log(error);
            // [END_EXCLUDE]
          });

    }
    
    render(){
        return (
            <ScrollView style={{flex: 1, margin: 20, marginTop:20}}>
                    
            <View style={{ justifyContent: "center", alignItems:"center"}}>
                <Icon type="font-awesome-5" name="user-plus" size={35} color="#673ab7"/>
                <Text style={{color:"#673ab7", fontSize: 30, marginBottom: 20, fontWeight:"100"}}>
                    Sign Up
                </Text>
            </View>

            <View>
                <View style={styles.inputContainer}>
                    <TextInput 
                        label="Email"
                        mode='outlined'
                        error={this.state.emailError === '' ? false : true}
                        keyboardType="email-address"
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                        onBlur = {() => this.validateEmail()}

                        placeholder="Email"
                    />
                        {this.state.emailError === '' ? (<></>) : (<Text style={{color: 'red', marginLeft:5}}>{this.state.emailError}</Text>)}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput 
                        label="Password"
                        mode='outlined'
                        secureTextEntry={true}
                        error={this.state.passwordError === '' ? false : true}
                        onFocus={() => this.setState({warn : false, err: ''})}
                        value={this.state.password}
                        onBlur = {() => this.validatePassword()}
                        onChangeText={password => this.setState({password})}
                        placeholder="Password"
                    
                    />
                    {this.state.passwordError === '' ? (<></>) : (<Text style={{color: 'red', marginLeft:5}}>{this.state.passwordError}</Text>)}

                </View>
                <View style={styles.inputContainer}>
                    <TextInput 
                        label="Confirm Password"
                        mode='outlined'
                        secureTextEntry={true}
                        error={this.state.passwordError === '' ? false : true}
                        onFocus={() => this.setState({warn : false, err: ''})}
                        value={this.state.confirmPassword}
                        onBlur = {() => this.validatePassword()}
                        onChangeText={confirmPassword => this.setState({confirmPassword})}
                        placeholder="Confirm Password"
                    
                    />
                </View>

                <Button title="Sign Up"
                        buttonStyle={{backgroundColor: '#673ab7', marginBottom:10}}
                        loading={this.state.isLoading}
                        icon={<Icon name='user-plus' style={{marginRight: 5 }} color="#fff" type='font-awesome-5'/>}
                        onPress= {() => this.signUpUser(this.state.email, this.state.password)} />
            </View>

            <Card containerStyle={{borderRadius: 10, margin: 0}}>
                <Text style={{marginBottom: 10}}>Already Have an Account ?</Text>
                <Button
                    title="Login"
                    type="outline"
                    onPress={() => this.props.navigation.navigate('LoginScreen')}
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

export default SignUpScreen;