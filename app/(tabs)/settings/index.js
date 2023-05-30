import { Redirect, Stack, useRouter } from "expo-router";
import { Button, Pressable, Text, TouchableOpacity, View,Image } from "react-native";
import { AuthStore, appSignOut } from "../../../store";
import { primaryColor,textColor,bgColor,secondaryColor,darkwhite } from '../../../color';
import sakib from '../../../assets/sakib.png'
import Logo from '../../../assets/moddhopay.png'
import { AntDesign,Feather,Fontisto } from '@expo/vector-icons';

const Profile = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1,backgroundColor:bgColor,flexDirection:'column'}}>
      <Stack.Screen options={{ headerShown: false}} />
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Image source={Logo} style={{width:200,height:32}}/></View>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Image source={sakib} style={{height:100,width:100,borderRadius:50,borderColor:primaryColor,borderWidth:5}}/>
      <Text style={{ fontFamily: "EncodeSansSemiCondensed_700Bold",fontSize:15,color:textColor }}>
        {AuthStore.getRawState().user?.displayName}
      </Text>
      <Text style={{ fontFamily: "EncodeSansSemiCondensed_400Regular",color:textColor,fontSize:15 }}>
        {AuthStore.getRawState().user?.email}
      </Text>
      <View style={{backgroundColor:primaryColor,
        margin:20,borderColor:primaryColor,
        width:150,height:40,alignItems:'center',justifyContent:'center',borderRadius:20}}>
      <Text style={{color:secondaryColor,fontSize:15,fontWeight:'bold'}}>Edit Name</Text>
      </View>
      </View>
      <View style={{flex:2,flexDirection:'column',marginLeft:30,marginTop:10}}>
        <View>
        <TouchableOpacity>
      <Text style={{fontSize:16,color:textColor,margin:10}}> <Feather name="moon" size={16} color={textColor}/>  Dark Mode</Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity>
      <Text style={{fontSize:16,color:textColor,margin:10}}> <Fontisto name="world-o" size={16} color="black" />  Language</Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity onPress={async () => {
          const resp = await appSignOut();
          if (!resp?.error) {
            router.replace("/(auth)/login");
          } else {
            console.log(resp.error);
            Alert.alert("Logout Error", resp.error?.message);
          }
        }}>
      <Text style={{fontSize:16,color:textColor,margin:10}}> <AntDesign name="logout" size={16} color={textColor} />  Log Out</Text>
        </TouchableOpacity>
        </View>

      </View>

    </View>
  );
};
export default Profile;
