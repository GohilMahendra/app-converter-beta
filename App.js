/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,Dimensions,
  Image,
  View,
} from 'react-native';

import {  NavigationContainer} from "@react-navigation/native";
import {createStackNavigator  } from "@react-navigation/stack";
import HomeScreen from './screens/HomeScreen';

import OneSignal from "react-native-onesignal";
const mystack=createStackNavigator()
const App=()=>
{





  
  
  const height=Dimensions.get('screen').height
  const width=Dimensions.get('screen').width
  const horizontalAnimation = {
    gestureDirection: 'horizontal',
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };


  useEffect
  (
    ()=>
    {

      OneSignal.setLogLevel(6,0)

      OneSignal.setAppId('0dadebcb-cd2e-405a-867e-3d1591e845f9')

      OneSignal.setNotificationOpenedHandler(openedEvent => {
        console.log("OneSignal: notification opened:", openedEvent);
      const { action, notification } = openedEvent;

      console.log(notification.additionalData)

    });
    }

    
  )

  function splash({navigation}) {
    //

   
 //   const test=require()   
 setTimeout(()=>{navigation.replace("Home")},3000)
     return(

     
       <View style={{flex:1,justifyContent:'center',
       alignItems:'center'}}>

      <Image
      style={{resizeMode:'cover',height:height,width:width}}
      source={require("./splash2.gif")}
      
      >

      </Image>
      
             </View>
     )
     
   }

  return(

    
    <NavigationContainer

    >
    <mystack.Navigator
    initialRouteName="splash"
    screenOptions={horizontalAnimation}
    >

    <mystack.Screen
   
   name="splash"
   component={splash}
    options=
    {
      {
        headerShown:false

      }
    }
    >

    </mystack.Screen>
    <mystack.Screen
   
   name="Home"
   component={HomeScreen}
    options=
    {
      {
        headerShown:false

      }
    }
    >

    </mystack.Screen>

    </mystack.Navigator>

      </NavigationContainer>

    
    )
}



export default App;
