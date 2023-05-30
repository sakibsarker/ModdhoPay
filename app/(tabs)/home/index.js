import React, { useState, useEffect } from 'react';
import { Link, Redirect, Stack } from "expo-router";
import { View,Text,Image,TouchableOpacity,Pressable,Alert } from "react-native";
import { AuthStore} from "../../../store";
import { primaryColor,textColor,bgColor,secondaryColor,darkwhite } from '../../../color';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../firebase-config';
import Logo from '../../../assets/moddhopay.png'
import sakib from '../../../assets/sakib.png'
import sendMoneyIcon from '../../../assets/moneysend.png'
import RequestMoneyIcon from '../../../assets/MoneyAdd.png'
import RecivedMoneyIcon from '../../../assets/RequestMoney.png'
import PendingMoneyIcon from '../../../assets/MoneyPending.png'
import CashOutMoneyIcon from '../../../assets/MoneyCashout.png'
import HistoryIcon from '../../../assets/MonayHistory.png'
import TakaIcon from '../../../assets/takaIcon.png'
import LocationIcon from '../../../assets/LocationIcon.png'

const Home = () => {
  const [currentAmount, setCurrentAmount] = useState('');

  useEffect(() => {
    const userDisplayName = AuthStore.getRawState().user?.displayName;
    const amountRef = ref(db, `addMoneyReq/${userDisplayName}/amount`);

    const unsubscribe = onValue(amountRef, (snapshot) => {
      const amount = snapshot.val();
      setCurrentAmount(amount);
    });

    return () => {
      // Unsubscribe from real-time updates when component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <View style={{ flex: 1,backgroundColor:bgColor,flexDirection:'column'}}>
      <Stack.Screen options={{ headerShown:false}} />
      <View style={{flex:2,justifyContent:'center'}}>
      <Image source={Logo} style={{height:32,width:200,marginTop:10,marginLeft:50}}/>
        </View>
      <View style={{flex:2,flexDirection:'column'}}>
        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
        <View style={{flex:1}}><Image source={sakib} style={{height:70,width:70,marginLeft:50,borderRadius:50,borderWidth:3,borderColor:primaryColor}}/></View>
          <View style={{flex:2}}><Text style={{color:textColor,fontSize:20,fontWeight:'500'}}>Hi, {AuthStore.getRawState().user?.displayName}</Text></View>
          </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>   
      <View style={{backgroundColor:primaryColor,borderColor:primaryColor,
        width:100,height:30,alignItems:'center',justifyContent:'center',borderRadius:50,flexDirection:'row'}}>
          <Image source={TakaIcon}/>

      <Text style={{color:secondaryColor,fontSize:15,marginLeft:10}}>
        {currentAmount}
      </Text>

      </View>
      </View>
      </View>
      <View style={{flex:5,flexDirection:'column',marginLeft:20,marginRight:20}}>
        <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flex:1,alignItems:'center',justifyContent:'center',
        margin:20,flexDirection:'column'}}>
           <Link href="/sendmoney" asChild>
      <Pressable>{() =>
          <View style={{backgroundColor:primaryColor,height:60,width:60,justifyContent:'center',alignItems:'center',borderRadius:50}}>
          <Image source={sendMoneyIcon} style={{height:30,width:30}}/>
          </View>
           }</Pressable>
           </Link>
         <Text style={{color:textColor,fontSize:10}}>Send Money</Text></View>
         <View style={{flex:1,alignItems:'center',justifyContent:'center',
        margin:20,flexDirection:'column'}}>
          <Link href="/receiveMoney" asChild><Pressable>{() =>
          <View style={{backgroundColor:primaryColor,height:60,width:60,justifyContent:'center',alignItems:'center',borderRadius:50}}>
          <Image source={RecivedMoneyIcon} style={{height:30,width:30}}/>
          </View>}</Pressable>
           </Link>
         <Text style={{color:textColor,fontSize:10}}>Receive</Text></View>
         <View style={{flex:1,alignItems:'center',justifyContent:'center',
        margin:20,flexDirection:'column'}}>
          <Link href="/pendingMoney" asChild><Pressable>{() =>
          <View style={{backgroundColor:primaryColor,height:60,width:60,justifyContent:'center',alignItems:'center',borderRadius:50}}>
          <Image source={PendingMoneyIcon} style={{height:30,width:30}}/>
          </View>}</Pressable></Link>
         <Text style={{color:textColor,fontSize:10}}>Pending</Text></View>
        </View>
        <View  style={{flex:1,flexDirection:'row'}}>
        <View style={{flex:1,alignItems:'center',justifyContent:'center',
        margin:20,height:100,flexDirection:'column'}}>
          <Link href="/addMoney" asChild><Pressable>{() =>
          <View style={{backgroundColor:primaryColor,height:60,width:60,justifyContent:'center',alignItems:'center',borderRadius:50}}>
          <Image source={RequestMoneyIcon} style={{height:30,width:30}}/>
          </View>
          }</Pressable></Link>
         <Text style={{color:textColor,fontSize:10}}>Add Money</Text></View>
         <View style={{flex:1,alignItems:'center',justifyContent:'center',
        margin:20,height:100,flexDirection:'column'}}>
          <Link href="/cashOutMoney" asChild><Pressable>{() =>
          <View style={{backgroundColor:primaryColor,height:60,width:60,justifyContent:'center',alignItems:'center',borderRadius:50}}>
          <Image source={CashOutMoneyIcon} style={{height:30,width:30}}/>
          </View>
          }</Pressable></Link>
         <Text style={{color:textColor,fontSize:10}}>Cash Out</Text></View>
         <View style={{flex:1,alignItems:'center',justifyContent:'center',
        margin:20,height:100,flexDirection:'column'}}>
          <Link href="/historyMoney" asChild><Pressable>{() =>
          <View style={{backgroundColor:primaryColor,height:60,width:60,justifyContent:'center',alignItems:'center',borderRadius:50}}>
          <Image source={HistoryIcon} style={{height:30,width:30}}/>
          </View>}</Pressable></Link>
         <Text style={{color:textColor,fontSize:10}}>History</Text></View>
        </View>
      </View>
      <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
      <Link href="/locationView" asChild>
      <Pressable>{() => 
      <View style={{backgroundColor:primaryColor,borderColor:primaryColor,
        width:200,height:30,alignItems:'center',justifyContent:'center',borderRadius:50,flexDirection:'row'}}>
        <Image source={LocationIcon}/>
      <Text style={{color:secondaryColor,fontSize:15,fontWeight:'500',marginLeft:10}}>
        Track Me
      </Text>
      </View>
      }</Pressable>
      </Link>   
      </View>
    </View>
  );
};
export default Home;


