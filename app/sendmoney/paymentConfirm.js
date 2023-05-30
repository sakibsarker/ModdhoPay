import { View, Text,Pressable } from 'react-native'
import { primaryColor, secondaryColor, textColor, bgColor } from '../../color';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
const PaymentConfirm = () => {
  return (
    <View style={{flex:1,backgroundColor:bgColor,justifyContent:'center',alignItems:'center'}}>
      <View style={{backgroundColor:primaryColor,width:'95%',height:'95%',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
      <Ionicons name="checkmark-circle" size={100} color={bgColor} />
      <Text style={{color:bgColor,fontWeight:'bold',fontSize:15}}>Your payment sucessfull</Text>
      <Link href="/home" asChild>
      <Pressable>{() =>
      <Text style={{marginTop:20}}>Go to home</Text>}
      </Pressable>
      </Link>
      </View>

    </View>
  )
}

export default PaymentConfirm