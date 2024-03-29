import React, { Component } from 'react';
import {Text, View, StyleSheet, ScrollView, Alert, Picker} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Icon, Button, Card} from 'react-native-elements';
import {auth, db} from '../firebase/firebase';
import DatePicker from 'react-native-datepicker'

class RegistrationScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            step:1,
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            password : '',
            confirmPassword : '',
            address : '',
            areaState : '',
            pincode : '',
            gender : 'Male',
            dob: '',
            isLoading : false

        };
    }

    handleNext = () => {
        if(this.state.password !== this.state.confirmPassword ){
            Alert.alert("Passwords does not match.");
            return;
        }
        this.setState({step: this.state.step + 1});
    };
    handlePrev = () => {
        this.setState({step: this.state.step - 1});
    };



    RenderForm = () => {
        switch(this.state.step){
            case 1 :
                return this.UserCredentials(); 

            case 2 :
                return this.BasicDetails();

            case 3 : 
                return this.CommunicationDetails();
            
            case 4 : 
                return this.ConfirmDetails();

            default :
                return this.BasicDetails();
        }
    };

    UserCredentials = () => {
        return(
            <View>
               <View style={styles.inputContainer}>
                        <TextInput 
                            label="Email"
                            mode='outlined'
                            keyboardType="email-address"
                            value={this.state.email}
                            onChangeText={email => this.setState({email})}
                            placeholder="Email"
                        
                        />
                    </View>
                <View style={styles.inputContainer}>
                    <TextInput 
                        label="Password"
                        mode='outlined'
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={password => this.setState({password})}
                        placeholder="Password"
                       
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput 
                        label="Confirm Password"
                        mode='outlined'
                        value={this.state.confirmPassword}
                        secureTextEntry={true}
                        onChangeText={confirmPassword => this.setState({confirmPassword})}
                        placeholder="Confirm Password"
                       
                    />
                </View>
                <Button title="Continue"
                            buttonStyle={{backgroundColor: '#673ab7', marginBottom:10}}
                            iconRight={true}
                            onPress={() => this.handleNext()}
                            icon={<Icon name='arrow-alt-circle-right' style={{marginLeft: 5 }} color="#fff" type='font-awesome-5'/>}
                        />

                <View style={{flexDirection:'row', alignItems: 'center'}}>
                    <View>
                        <Text>Already have an account?</Text>
                    </View>
                    <View>

                        <Button title="Login"
                                    iconRight={true}
                                    titleStyle={{fontSize: 14}}
                                    type="clear"
                                    onPress={() => this.props.navigation.navigate('LoginScreen')}
                                />
                    </View>
                </View>

            </View>
        );
    };

    BasicDetails = () => {


        return(
            <View>
                <View style={styles.inputContainer}>
                    <TextInput 
                        label="First Name"
                        mode='outlined'
                        value={this.state.firstname}
                        onChangeText={firstname => this.setState({firstname})}
                        placeholder="First Name"
                       
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput 
                        label="Last Name"
                        mode='outlined'
                        value={this.state.lastname}
                        onChangeText={lastname => this.setState({lastname})}
                        placeholder="Last Name"
                    />
                </View>
    
                <View style={styles.inputContainer}>
                    <View style={{ flexDirection: "row", alignItems:"center", justifyContent:"space-around", paddingLeft: 10, paddingRight: 10 }}>
                        <Text style={{flex:1}}>Gender : </Text>
                        <Picker
                            selectedValue={this.state.gender}
                            style={{height: 50, flex: 1}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({gender: itemValue})
                            }>
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>
                    </View> 
                </View>

                <View style={styles.inputContainer}>
                    <View style={{ flexDirection: "row", alignItems:"center", justifyContent:"space-around", paddingLeft: 10, paddingRight: 10 }}>
                        <Text style={{flex: 1}}>Date of Birth :</Text>
                        <DatePicker
                            style={{ flex: 2}}
                            date={this.state.dob}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({dob: date})}}
                        />
                    </View>
                    
                </View>
                
                
                <Button title="Continue"
                            buttonStyle={{backgroundColor: '#673ab7', marginBottom:10}}
                            iconRight={true}
                            onPress={() => this.handleNext()}
                            icon={<Icon name='arrow-alt-circle-right' style={{marginLeft: 5 }} color="#fff" type='font-awesome-5'/>}
                        />
                <Button title="Previous" 
                    buttonStyle={{backgroundColor: '#ebe8e8'}}
                    titleStyle={{color: "#999"}}
                    onPress={() => this.handlePrev()}
                    icon={<Icon name='arrow-alt-circle-left' color="#999" style={{marginRight: 5}} type='font-awesome-5'/>}
                    />
    
            </View>
           
        );
    }

   
    CommunicationDetails = () => {
        return (
            <View>
                <View style={styles.inputContainer}>
                    <TextInput 
                        label="Phone Number"
                        mode='outlined'
                        keyboardType="number-pad"
                        value={this.state.phone}
                        type="Number"
                        onChangeText={phone => this.setState({phone})}
                        placeholder="Phone Number"
                    
                    />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput 
                            label="Email"
                            mode='outlined'
                            disabled={true}
                            keyboardType="email-address"
                            value={this.state.email}
                            onChangeText={email => this.setState({email})}
                            placeholder="Email"
                        
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            label="Address Line 1"
                            mode='outlined'
                            value={this.state.address}
                            onChangeText={address => this.setState({address})}
                            placeholder="Address"
                        
                        />
                    </View>

                    <View style={{flexDirection: 'row', marginBottom: 20}}>    
                        <View style={{flex: 1, marginRight: 10}}>
                            <TextInput 
                                label="State"
                                mode='outlined'
                                value={this.state.areaState}
                                onChangeText={areaState => this.setState({areaState})}
                                placeholder="State"
                            />
                        </View>
                        <View style={ {flex: 1}}>
                            <TextInput 
                                label="Pin Code"
                                mode='outlined'
                                value={this.state.pincode}
                                onChangeText={pincode => this.setState({pincode})}
                                placeholder="Pin Code"
                            />
                        </View>
                    </View>
                    
                    
                        <Button title="Continue"
                            buttonStyle={{backgroundColor: '#673ab7', marginBottom:10}}
                            iconRight={true}
                            onPress={() => this.handleNext()}
                            icon={<Icon name='arrow-alt-circle-right' style={{marginLeft: 5 }} color="#fff" type='font-awesome-5'/>}
                        />
                        <Button title="Previous" 
                            buttonStyle={{backgroundColor: '#ebe8e8'}}
                            titleStyle={{color: "#999"}}
                            onPress={() => this.handlePrev()}
                            icon={<Icon name='arrow-alt-circle-left' color="#999" style={{marginRight: 5}} type='font-awesome-5'/>}
                         />
                 </View>
            
        );
    }

    ConfirmDetails = () => {
        return (
            <View>
                
                <Card title="Confirm Details">
                    <Text>Name : {this.state.firstname} {this.state.lastname}</Text>
                    <Text>Gender : {this.state.gender}</Text>
                    <Text>DOB : {this.state.dob}</Text>
                    <Text>Phone : {this.state.phone}</Text>
                    <Text>Email : {this.state.email}</Text>
                    <Text>Address : {this.state.address}, {this.state.areaState}, Pin - {this.state.pincode}</Text>
                </Card>
                <View style={{marginTop: 10}}>
                    <Button title="Confirm"
                        buttonStyle={{backgroundColor: '#673ab7', marginBottom:10}}
                        loading={this.state.isLoading}
                        style={{marginTop: 10}}
                        onPress={() => this.handleSubmit()}
                        icon={<Icon name='check-circle' style={{marginRight: 5 }} color="#fff" type='font-awesome-5'/>}
                 />
                 <Button title="Previous" 
                            buttonStyle={{backgroundColor: '#ebe8e8'}}
                            titleStyle={{color: "#999"}}
                            onPress={() => this.handlePrev()}
                            icon={<Icon name='arrow-alt-circle-left' color="#999" style={{marginRight: 5}} type='font-awesome-5'/>}
                         />
                </View>
                
            </View>
        );
    };

     signUpUser = async (email, password) => {
        try{
             db.collection('customers').add({
                name : this.state.firstname + " " + this.state.lastname,
                gender : this.state.gender,
                dob : this.state.dob,
                phone : this.state.phone,
                email : this.state.email,
                address : `${this.state.address}, ${this.state.areaState}, Pin - ${this.state.pincode}`,
                photo: "",
                idproof: ""
             }).then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                auth.createUserWithEmailAndPassword(email, password).catch(error => {
                    alert(error.toString());
                    this.setState({isLoading: false});
                }); 
             });
          }catch(error){
           console.log(error);
           this.setState({isLoading: false});
          }
    };

    handleSubmit = async () => {
        this.setState({isLoading: true});
       await this.signUpUser(this.state.email, this.state.password);
    };

    render(){
        return(
            <ScrollView style={{flex: 1, margin: 20, marginTop:20}}>
                
                <View style={{ justifyContent: "center", alignItems:"center"}}>
                     <Icon type="font-awesome" name="user-plus" size={35} color="#673ab7"/>
                    <Text style={{color:"#673ab7", fontSize: 30, marginBottom: 20, fontWeight:"100"}}>
                         User Registration
                    </Text>
                </View>

                {this.RenderForm()}

                
               
            </ScrollView>
        );
    }

}


 

const styles = StyleSheet.create({
    inputContainer : {
        marginBottom: 10
    }
});

export default RegistrationScreen;