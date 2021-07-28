import React,{useRef,useState,useEffect} from "react";

import {View,Text,StyleSheet,Button, ScrollView,Dimensions,Image,BackHandler,RefreshControl,
  
    ActivityIndicator,
    Platform
} from "react-native";
import WebView from "react-native-webview";
import  data  from "../build_data/data.json";

import  Netinfo  from "@react-native-community/netinfo";
import { useNavigation, useRoute } from "@react-navigation/native";


import { 
  AdMobBanner, AdMobInterstitial, setTestDeviceIDAsync
 
 } from "expo-ads-admob";
import { event } from "react-native-reanimated";

import Rate,{AndroidMarket} from "react-native-rate";

const HomeScreen=()=>
{


  const navigation=useNavigation()
  

  const route=useRoute()
  const link=route.params?.link
  console.log(link+"PROPS")

  React.useEffect
  (
    ()=>
    {

      interstitial()

    },[]
  )


  React.useEffect
  (

    ()=>
    {

      console.log("called changing useeffect")
      if(link!="")
      setCurrentUrl(link)

    }
    ,[link]
  )
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
    if(url.toString()==data.rate_url)
    {
      console.log('called Rate method>>')
      rate()
     
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
  


    const interstitial=async()=>
    {
 

      
    //  await setTestDeviceIDAsync('EMULATOR')
 
      await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id

      try
      {
      await AdMobInterstitial.requestAdAsync();
await AdMobInterstitial.showAdAsync();
      }
      catch(err)
      {
        console.log(err)
      }
    }






    React.useEffect
    (
      ()=>
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
        
      },
      []
    )

    const onLoadend=()=>
    {

    
      

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


    const rate=()=>
    {
      const options = {
        //AppleAppID:"2193813192",
        GooglePackageName:data.package_name_andorid,
       // AmazonPackageName:"com.appconverter",
       // OtherAndroidURL:"http://www.randomappstore.com/app/47172391",
        preferredAndroidMarket:AndroidMarket.Google,
        preferInApp:true,
      

       openAppStoreIfInAppFails:false,
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
       

     


       <AdMobBanner
  bannerSize="fullBanner"
  adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
  servePersonalizedAds // true or false

  style={
    {
      position:"absolute"
    }
  }
  onDidFailToReceiveAdWithError={this.bannerError} />
{(!offline)  &&
<ScrollView 


refreshControl={ <RefreshControl refreshing={refr}
enabled={pos}
onRefresh={refc}
></RefreshControl>}
style={{height:height,width:width,position:'absolute'}}>

  
             <WebView

source={{uri:(route.params?.link!="" && route.params?.link !=undefined)?link:data.url}}
ref={webviewRef}
style={{height:height,width:width}}


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
   
   allowUniversalAccessFromFileURLs={true}
  userAgent="Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"

     
     domStorageEnabled={true}
     scalesPageToFit={true}
     startInLoadingState={true}
     onNavigationStateChange={navState => {


      
      console.log(navState.url)

      rateApp(navState.url)
      setCanGoBack(navState.canGoBack)
      setCanGoForward(navState.canGoForward)
      setCurrentUrl(navState.url)}
    
    }
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
      
       <Text style={{alignSelf:'flex-end',fontWeight:'bold',top:height/3,
   alignSelf:"center",justifyContent:"center",color:"gray",opacity:0.7,transform:[{rotateZ:'25deg'}],
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