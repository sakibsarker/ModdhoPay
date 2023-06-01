import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Image,Pressable } from 'react-native';
import { primaryColor, secondaryColor, textColor, bgColor } from '../../color';
import { get, ref, set } from 'firebase/database';
import { db } from '../../firebase-config';
import { AuthStore } from '../../store';
import { MaterialIcons } from '@expo/vector-icons';
import PaymentLogo from '../../assets/paymentlogo.png'
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
const SendMoney = () => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [quantity, setQuantity] = useState('');
  const [color, setColor] = useState('');
  const [location, setLocation] = useState('');


  function addMoney() {
    set(ref(db, `addMoneyReq/${AuthStore.getRawState().user?.displayName}/sendmoney`), {
      username: AuthStore.getRawState().user?.displayName,
      name:name,
      details:details,
      quantity:quantity,
      color:color,
      location:location,

    });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: textColor, fontSize: 25, marginBottom: 20,fontWeight:'400' }}>Enter Product Details</Text>
      <View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={(name) => {
            setName(name);
          }}
          placeholder="Enter product name"
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>Details</Text>
        <TextInput
         value={details}
         onChangeText={(details) => {
           setDetails(details);
         }}
          placeholder="Enter product details"
          style={styles.textInput}
        />
      </View>
      <View style={{flexDirection:'row',justifyContent:'center'}}>
        <View style={{flex:1}}>
          <View style={{marginLeft:'20%'}}>
      <Text style={{marginBottom: 4,
    color: textColor}}>Quantity</Text>
          </View>
     <View style={{alignItems:'flex-end',marginRight:7}}>
        <TextInput
         value={quantity}
         onChangeText={(quantity) => {
           setQuantity(quantity);
         }}
          placeholder="Enter quantity"
          style={{ width:'80%',
            borderWidth: 3,
            borderRadius: 4,
            borderColor: secondaryColor,
            paddingHorizontal: 8,
            paddingVertical: 4,
            marginBottom: 8,
            backgroundColor: secondaryColor,
            color: textColor,}}
          
        />
        </View>
        </View>
        <View style={{flex:1,marginLeft:7.5}}>
        <Text style={styles.label}>Color</Text>
        <TextInput
         value={color}
         onChangeText={(color) => {
           setColor(color);
         }}
          placeholder="Enter color"
          style={{ width:'80%',
          borderWidth: 3,
          borderRadius: 4,
          borderColor: secondaryColor,
          paddingHorizontal: 8,
          paddingVertical: 4,
          marginBottom: 8,
          backgroundColor: secondaryColor,
          color: textColor,}}
          
        />
        </View>
      </View>
      <View>
        <Text style={styles.label}>Location</Text>
        <TextInput
         value={location}
         onChangeText={(location) => {
           setLocation(location);
         }}
          placeholder="Enter delivery location"
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>Courier Service</Text>
        <TextInput
        //  value={location}
        //  onChangeText={(location) => {
        //    setLocation(location);
        //  }}
          placeholder="Enter courier service"
          style={styles.textInput}
        />
      </View>
      <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'flex-end',marginLeft:'60%'}}>
      <Link href="/sendmoney/paymentProcess" asChild>
      <Pressable onPress={addMoney}>{() =>
        <View
          style={{
            backgroundColor: primaryColor,
            margin: 20,
            borderColor: primaryColor,
            width: 70,
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
          }}>
         <Feather name="arrow-right" size={40} color={bgColor} />
        </View>
      }</Pressable>
      </Link>
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
});
      


export default SendMoney