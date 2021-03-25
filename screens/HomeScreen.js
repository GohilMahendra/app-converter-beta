

import React,{useRef,useState} from "react";

import {View,Text, ScrollView,Dimensions,Image,BackHandler,RefreshControl,
    ActivityIndicator
} from "react-native";
import WebView from "react-native-webview";
import  data  from "../build_data/data.json";

console.log(data)
const HomeScreen=()=>
{




      const [refr,setrefr]=useState(false)
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  

  const [pos,setpos]=useState(false)
  let jsCode = `
        var cookie={};
        document.cookie.split('; ').forEach(function(i){cookie[i.split('=')[0]]=i.split('=')[1]});
        document.querySelector('#email').value=cookie['email'] || '';
        document.querySelector('#password').value=cookie['password'] || '';
        document.querySelector('#login button').onclick = function(){
            document.cookie = 'email='+document.querySelector('#email').value;
            document.cookie = 'password='+document.querySelector('#password').value;
        };
    `;
  const height=Dimensions.get('window').height
  const width=Dimensions.get('window').width
    const [load,setload]=React.useState(false)
    const webviewRef = useRef()
  
    const errorpage=()=>
    {
      return(
        <View style={{flex:1}}>
          <Image source={require('../build_data/splash.jpg')}
          style={{height:height,width:width}}
          ></Image>
           </View>
      )
    }
   const backButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goBack()
    }
  
    const refc=()=>
  {
    if (webviewRef.current )  webviewRef.current.reload()
  
    setrefr(true)
  }
  const  handleBackButton = ()=>{
    if (webviewRef.current) webviewRef.current.goBack()
      return true;
    }
  const frontButtonHandler = () => {
      if (webviewRef.current) webviewRef.current.goForward()
    }
  
  
  
    React.useEffect
    {
      
      BackHandler.addEventListener('hardwareBackPress',handleBackButton)
      ,[]
    }
   

const givescreen=()=>
{
  return(
    <View style={{flex:1}}>

    <Text>Hih</Text>
    </View>
  )
}
  React.useEffect(
          ()=>{internetPermission},
      )
      const internetPermission = async () => {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: "Cool Photo App Camera Permission",
                message:
                  "Cool Photo App needs access to your camera " +
                  "so you can take awesome pictures.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log("You can use the camera");
            } else {
              internetPermission
              console.log("Camera permission denied");
            }
          } catch (err) {
            console.warn(err);
          }
        };
  

    return(   
        <View style={{flex:1}}>    

<ScrollView 


refreshControl={ <RefreshControl refreshing={refr}
enabled={pos}
onRefresh={refc}
></RefreshControl>}
style={{height:height,width:width,position:'absolute'}}>

  
             <WebView

source={{uri:data.url}}
ref={webviewRef}
style={{flex:1,height:height,width:width}}
  //  onLoadProgress={()=>setload(true)}
    onLoadEnd={()=>{setload(false),setrefr(false),console.log('success')}}

    
    onScroll={syntheticEvent => {
      const { contentOffset } = syntheticEvent.nativeEvent
     setpos(contentOffset.y==0)
    }}

pullToRefreshEnabled={true}
   allowFileAccessFromFileURLs={true}
 allowingReadAccessToURL={true}
   allowsBackForwardNavigationGestures={true}
   allowsInlineMediaPlayback={true}

    
   allowUniversalAccessFromFileURLs={false}
    userAgent="Mozilla/5.0 (Windows NT 6.1)
     AppleWebKit/537.36 (KHTML, like Gecko) 
     Chrome/67.0.3396.99 Safari/537.36"

    onMessage={(event)=> console.log(event.nativeEvent.data)}
    message={console.log('called')}
    onNavigationStateChange={navState => {
      setCanGoBack(navState.canGoBack)
      setCanGoForward(navState.canGoForward)
      setCurrentUrl(navState.url)}}
    

      onLoadProgress={
        ({ nativeEvent }) => {
         console.log( nativeEvent.progress);
        }
      }

      onMessage={(event)=> console.log(event.nativeEvent.data)}
      injectedJavaScript={jsCode}
    
   // onNavigationStateChange={}
   onLoadStart={()=>setload(true)}
  //    onHttpError={()=>givescreen()}
    
  //   // renderError={(errorName) => <Error name={errorName} />}
  //  onError={()=>givescreen()}
     javaScriptEnabled={true}
     cacheEnabled={true}
     
     sharedCookiesEnabled={true}
     thirdPartyCookiesEnabled={true}
     >


     </WebView>
  {load &&   <ActivityIndicator style={{backgroundColor:'white',
  height:50,width:50,borderRadius:50,position:"absolute",
  top:height/2,alignSelf:'center'}}
   size='large' color="gray" animating={true} ></ActivityIndicator>}
</ScrollView>
</View>
    )
}

export default HomeScreen