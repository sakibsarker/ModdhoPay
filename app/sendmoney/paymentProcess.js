import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Image,Pressable,Alert,Modal } from 'react-native';
import { primaryColor, secondaryColor, textColor, bgColor } from '../../color';
import { get, ref, set } from 'firebase/database';
import { db } from '../../firebase-config';
import { AuthStore } from '../../store';
import { MaterialIcons } from '@expo/vector-icons';
import PaymentLogo from '../../assets/paymentlogo.png'
import TakaIcon from '../../assets/takaIcon.png'
import sakib from '../../assets/sakib.png'
import { Feather,Ionicons  } from '@expo/vector-icons';
import { Link } from 'expo-router';


const PaymentProcess = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [amount, setAmount] = useState('');
  const [transaction, setTransaction] = useState('');

  
  useEffect(() => {
    fetchCurrentAmount();
  }, []);

  const fetchCurrentAmount = async () => {
    try {
      const snapshot = await get(ref(db, `addMoneyReq/${AuthStore.getRawState().user?.displayName}/amount`));
      if (snapshot.exists()) {
        setCurrentAmount(snapshot.val());
      }
    } catch (error) {
      console.error('Error fetching current amount:', error);
    }
  };

  function addMoney() {
    set(ref(db, `addMoneyReq/${AuthStore.getRawState().user?.displayName}`), {
      username: AuthStore.getRawState().user?.displayName,
      phone: phone,
      amount: amount,
      transaction: transaction,
    });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center',position:'relative',marginTop:20 }}>
      <View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Payment Process is close?');
          setModalVisible(!modalVisible);
        }}>
          <View style={{ flex: 1,justifyContent: 'center',alignItems: 'center',}}>
          <View style={styles.modalView}>
            <View style={{flex:1}}>

              <View style={{flex:1}}>
              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:primaryColor,fontSize:16,fontWeight:'bold'}}>Confirm Payment</Text>
            <Pressable style={{marginLeft:'45%'}} onPress={() => setModalVisible(!modalVisible)}>
             <Ionicons name="close-outline" size={40} color={primaryColor} />
            </Pressable>
            </View>
            </View>
            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
        <View style={{flex:1}}><Image source={sakib} style={{height:40,width:40,marginLeft:50,borderRadius:50,borderWidth:2,borderColor:primaryColor}}/></View>
          <View style={{flex:2.5}}><Text style={{color:textColor,fontSize:10,fontWeight:'500'}}>{AuthStore.getRawState().user?.displayName}</Text></View>
          </View>
            <View style={{flex:.8,justifyContent:'center',alignItems:'center',flexDirection:'column',margin:10,backgroundColor:bgColor,marginBottom:'50%'}}>
              <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:.5}}>
              <View style={{flex:1,alignItems:'center',borderColor:textColor,borderRightWidth:.5,flexDirection:'column'}}>
                <Text style={{color:textColor,fontSize:10}}>Total</Text>
                <Text style={{color:textColor,fontSize:10}}>570</Text>
                <Text style={{color:textColor,fontSize:10}}>(+5.00 charge)</Text>
                </View>
              <View style={{flex:1,alignItems:'center'}}>
                <Text style={{color:textColor,fontSize:10}}>Current Balance</Text>
                <Text style={{color:textColor,fontSize:10}}>{currentAmount}</Text></View>
              </View>
              <View style={{flex:1,justifyContent:'center'}}>
                <Text style={{fontSize:12,color:textColor}}>Transaction ID: XRT3IOOD</Text>
              </View>


            </View>
              
            <View style={{flex:.3,alignItems:'center',justifyContent:'center',backgroundColor:'#ffe7d5',borderBottomLeftRadius:10,borderRadius:10}}>
            <Link href="/sendmoney/paymentConfirm" asChild>
      <Pressable>{() =><Text style={{color:primaryColor,fontWeight:'bold'}}>Tap and hold to make payment</Text>  }</Pressable>
      </Link>
            </View>
          

            </View>
          </View>
        </View>
      </Modal>


      </View>
      <View style={{backgroundColor: textColor,position:'relative', height: '18%', width: '50%',justifyContent:'center',alignItems:'center',alignContent:'center',borderRadius: 10,marginBottom:20}}> 
      <View style={{marginBottom:25}}>
      <Image source={sakib} style={{height:70,width:70,borderRadius:50,borderWidth:3,borderColor:primaryColor}}/>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center',alignContent:'center',flexDirection:'row' }}>
      <MaterialIcons name="person-pin" size={25} color={primaryColor} />
        <Text style={{ color: secondaryColor,justifyContent:'center',alignItems:'center',marginLeft:5 }}>{AuthStore.getRawState().user?.displayName}</Text>
      </View>
      </View>
      <View>
        <Text style={styles.label}>Enter phone number</Text>
        <TextInput
          value={phone}
          onChangeText={(phone) => {
            setPhone(phone);
          }}
          placeholder="017XXXXXXXX"
          style={styles.textInput}
        />
      </View>
      <View style={{marginRight:'68%',marginBottom:5}}>
      <Text style={{marginBottom: 4,color: textColor,fontSize:15}}>Amount</Text>
      </View>
      <View style={{backgroundColor:secondaryColor,height:'15%',width:"83%",alignItems:'center',justifyContent:'center',borderRadius:5}}>
      <View>
        <View style={{flexDirection:'row',width:'100%'}}>
          <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
          <TextInput
          value={amount}
          onChangeText={(amount) => {
            setAmount(amount);
          }}
          placeholder="0"
          style={{fontSize:20,fontWeight:'400'}}
        />
          </View>
          <View style={{flex:1,justifyContent:'center',alignContent:'flex-end',alignItems:'flex-end',marginRight:10}}>
          <Pressable onPress={() => setModalVisible(true)}>
          <Feather name="arrow-right" size={25} color={textColor} />
          </Pressable>
          </View>
        </View>
      </View>
      <Text style={{color:primaryColor,fontSize:10,marginTop:'5%'}}>Current Balance: {currentAmount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: textColor,
  },
  textInput: {
    width: 350,
    borderWidth: 3,
    borderRadius: 4,
    borderColor: secondaryColor,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
    backgroundColor: secondaryColor,
    color: textColor,
  },
  modalView: {
    backgroundColor:secondaryColor,
    borderRadius:10,
    alignItems: 'center',
    shadowColor:textColor,
    width:'90%',
    height:'85%',
    shadowOpacity: 0.5,
    shadowRadius:5,
    elevation: 3.5,

  },
});

export default PaymentProcess