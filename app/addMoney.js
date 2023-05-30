import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { primaryColor, secondaryColor, textColor, bgColor } from './../color';
import { get, ref, set } from 'firebase/database';
import { db } from './../firebase-config';
import { AuthStore } from './../store';
import { MaterialIcons } from '@expo/vector-icons';
import PaymentLogo from '../assets/paymentlogo.png'
const addMoney = () => {
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={PaymentLogo} style={{height:'7%',width:'50%'}}/>
      <Text style={{ color: textColor, fontSize: 25, marginBottom: 20,fontWeight:'400' }}>Enter Money Details</Text>

      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: secondaryColor, height: '5%', width: '40%', borderRadius: 5,alignContent:'center',flexDirection:'row' }}>
      <MaterialIcons name="person-pin" size={25} color={primaryColor} />
        <Text style={{ color: textColor,justifyContent:'center',alignItems:'center',marginLeft:5 }}>{AuthStore.getRawState().user?.displayName}</Text>
      </View>
      <View>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          value={phone}
          onChangeText={(phone) => {
            setPhone(phone);
          }}
          placeholder="Phone"
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          value={amount}
          onChangeText={(amount) => {
            setAmount(amount);
          }}
          placeholder="Amount"
          style={styles.textInput}
        />
        <Text style={{color:primaryColor,fontSize:10,marginBottom:15}}>Current Balance: {currentAmount}</Text>
      </View>
      <View>
        <Text style={styles.label}>Transaction ID</Text>
        <TextInput
          value={transaction}
          onChangeText={(transaction) => {
            setTransaction(transaction);
          }}
          placeholder="Transaction ID"
          style={styles.textInput}
        />
      </View>
      <View style={{backgroundColor:textColor,height:50,width:"70%",alignItems:'center',justifyContent:'center',marginTop:15}}>
        <Text style={{color:bgColor,fontWeight:'bold'}}>Send money to +8801733701822</Text></View>
      <TouchableOpacity onPress={addMoney}>
        <View
          style={{
            backgroundColor: primaryColor,
            margin: 20,
            borderColor: primaryColor,
            width: 350,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text style={{ color: secondaryColor, fontSize: 15, fontWeight: 'bold' }}>Add Money</Text>
        </View>
      </TouchableOpacity>
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
});



export default addMoney;

