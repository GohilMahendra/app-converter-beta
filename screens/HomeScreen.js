import React,{useRef,useState,useEffect} from "react";

import {View,Text,StyleSheet,Button, ScrollView,Dimensions,Image,BackHandler,RefreshControl,
  
    ActivityIndicator,
    Platform
} from "react-native";
import WebView from "react-native-webview";
import  data  from "../build_data/data.json";

import  Netinfo  from "@react-native-community/netinfo";
import { useNavigation, useRoute } from "@react-navigation/native";

const HomeScreen=({props})=>
{


  const navigation=useNavigation()
  
  console.log(props)

  
  const x=useRoute()
  

  console.log(JSON.stringify(x.params.link)+'parmas link')

 
  // if(x!=null && x!=undefined)

  // {
  //   setnotfUrl(x.params.link)

  // }


 
  

  const [offline,setoffline]=useState(false)
      const [refr,setrefr]=useState(false)
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [currentUrl, setCurrentUrl] = useState("")

  
  const [firstLoad,setfirstLoad]=useState(true)

  const[splashVisible,setsplashVisibe]=useState(true)
  




  const rateApp=(url)=>
  {

    if(data.rate_url=="")
    {
      return;
    }
    if(url.toString()=="https://heartbeat.fritz.ai/")
    {

      
      console.log('called')
      rate()
      alert('here comes app rating')
    }
  }


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
  const height=Dimensions.get('screen').height
  const width=Dimensions.get('screen').width
    const [load,setload]=React.useState(false)
    const webviewRef = useRef()
  






    const onLoadend=()=>
    {

      if(firstLoad)
      {

        console.log("FirstLOAD method Called")
        setTimeout(() => {
          
          setsplashVisibe(false),
          setfirstLoad(false)
          console.log("ended first load || SPLAASH SCREEN ENDED")
        }, 3000);
      }
      
      

      console.log("Load end Methid __called")
      setload(false)
      
      setrefr(false)
    }
    const Error=(name)=>
    {
      return(
        <View style={{flex:1}}>

      <Text>{name}</Text>
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
  
  

 
  //   useEffect
  //   (
  //     ()=>
  //     {
       
  
   
  //  var p=""
  //   if(x.params?.link !=undefined)
  //   {
  
  //    p=x.params.link
  
  //   }
  //  console.log(p)
  //   setlink(p)
  
  //     }
  //     ,[]
  //   )
    React.useEffect
    {
      
      BackHandler.addEventListener('hardwareBackPress',handleBackButton)
      ,[]
    }

    
    React.useEffect
    (
      ()=>
      {
        const unsubscribe=Netinfo.addEventListener((state)=>
        {
          const OFFLINE=!(state.isConnected && state.isInternetReachable)
          setoffline(OFFLINE)
        }
        )

        return ()=>unsubscribe()
      },
      []
    )


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
  


    const rate=()=>
    {
      const options = {
        //AppleAppID:"2193813192",
        GooglePackageName:data.package_name_andorid,
       // AmazonPackageName:"com.appconverter",
       // OtherAndroidURL:"http://www.randomappstore.com/app/47172391",
        preferredAndroidMarket:AndroidMarket.Google,
        preferInApp:true,
        openAppStoreIfInAppFails:true,
        fallbackPlatformURL:data.url,
    }
    Rate.rate(options, success=>{
        if (success) {
            // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
           console.log('rate_succced')
        }
    })
    }
    return(   
        <View style={{flex:1}}>    
       

     


{(!offline) &&
<ScrollView 


refreshControl={ <RefreshControl refreshing={refr}
enabled={pos}
onRefresh={refc}
></RefreshControl>}
style={{height:height,width:width,backgroundColor:'blue',position:'absolute'}}>

  
             <WebView

source={{uri:data.url}}
ref={webviewRef}
style={{height:height,width:width,backgroundColor:"pink"}}


onLoadProgress={({nativeEvent})=>console.log(nativeEvent.progress*100)}
onLoadStart={()=>setload(true)}



    onLoadEnd={()=>{onLoadend(),console.log('success')}}

    
    onScroll={syntheticEvent => {
      const { contentOffset } = syntheticEvent.nativeEvent
     setpos(contentOffset.y==0)
    }}


    

    onError={()=>console.log("internet error found!!")}
   pullToRefreshEnabled={true}
   allowFileAccessFromFileURLs={true}
   allowingReadAccessToURL={true}
   allowsBackForwardNavigationGestures={true}
   allowsInlineMediaPlayback={true}
   onFileDownload
   allowUniversalAccessFromFileURLs={false}
  userAgent="Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"

     
  domStorageEnabled={true}
     scalesPageToFit={true}
    startInLoadingState={true}
    onNavigationStateChange={navState => {


      
      console.log(navState.url)

     // rateApp(navState.url)
      setCanGoBack(navState.canGoBack)
      setCanGoForward(navState.canGoForward)
      setCurrentUrl(navState.url)}}
    
     // injectedJavaScript={jsCode}
    

     

     setSupportMultipleWindows={true}
     javaScriptCanOpenWindowsAutomatically={true}
     
     allowsFullscreenVideo={true}

     javaScriptEnabled={true}
     cacheEnabled={true}
     onMessage={(event)=> console.log(event.nativeEvent.data+'  not')}
     sharedCookiesEnabled={true}
     thirdPartyCookiesEnabled={true}
      >


     </WebView>

 
  {load &&  
   <ActivityIndicator style={{backgroundColor:'white',
  height:50,width:50,borderRadius:50,position:"absolute",
  top:height/2,alignSelf:'center'}}
   size='large' color="gray" animating={true} >
     
     
     </ActivityIndicator>}
    
    
     { data.Trial &&  
      
       <Text style={{alignSelf:'flex-end',fontWeight:'bold',top:height/2,
   alignSelf:"center",color:"gray",opacity:0.7,transform:[{rotateZ:'25deg'}],
    fontSize:35,position:"absolute"}}>#watermark</Text>
   
    }

</ScrollView>}
{(splashVisible ) &&
<Image
style={{height:height,width:width}}
source={require('../splash.jpg')}
>

</Image>}
{( offline) &&
<Image
style={{height:height,width:width}}
source={require('../offline.jpg')}
>

</Image>}
</View>


    )
}

export default HomeScreen