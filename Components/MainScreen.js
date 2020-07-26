import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { configureStore } from '../redux/configureStore';
import {Provider} from 'react-redux';

const Tab = createBottomTabNavigator();

const MainScreen = (props) => {
    const store = configureStore();
    return(
        <Provider store={store}>
            <Tab.Navigator 
                screenOptions = {({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                       let iconName = ''
                        if(route.name == 'HomeScreen'){
                            iconName = focused 
                            ? 'ios-home'
                            : 'ios-home';
                        }else if(route.name == "ProfileScreen"){
                            iconName = focused ? 'ios-contact' : 'ios-contact';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    }
                })}
                tabBarOptions = {{
                    activeTintColor : "#673ab7"
                }}>
                
                <Tab.Screen options={{title: "Home"}} name="HomeScreen" component={HomeScreen} />
                <Tab.Screen options={{title: "Profile"}} name="ProfileScreen" component={ProfileScreen} />
            </Tab.Navigator>
        </Provider>
    );
}; 

export default MainScreen;