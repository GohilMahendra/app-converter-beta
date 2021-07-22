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

import {  NavigationContainer, NavigationHelpersContext, useNavigation} from "@react-navigation/native";
import {createStackNavigator  } from "@react-navigation/stack";
import HomeScreen from './screens/HomeScreen';

import OneSignal from "react-native-onesignal";
import { useState } from 'react/cjs/react.development';
const mystack=createStackNavigator()
const App=()=>
{






  const [link,setlink]=useState("")
  

  //const navigation=useNavigation()
  
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
        //console.log("OneSignal: notification opened:", openedEvent);
      const { action, notification } = openedEvent;


     
      // console.log(notification.additionalData.link)


      console.log(notification.additionalData.link)


  //    navigation.navigate("Home",{link:notification.additionalData.link})
      setlink(notification.additionalData.link)
      
      
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
   
    screenOptions={horizontalAnimation}
    >

    {/* <mystack.Screen
   
   name="splash"
   component={splash}
    options=
    {
      {
        headerShown:false

      }
    }
    >

    </mystack.Screen> */}
    <mystack.Screen
   
   name="Home"
   
   initialParams={{link:link}}
   
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
