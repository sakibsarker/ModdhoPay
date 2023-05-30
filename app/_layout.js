import { SplashScreen, Stack } from "expo-router";
import {
  useFonts,
  EncodeSansSemiCondensed_100Thin,
  EncodeSansSemiCondensed_200ExtraLight,
  EncodeSansSemiCondensed_300Light,
  EncodeSansSemiCondensed_400Regular,
  EncodeSansSemiCondensed_500Medium,
  EncodeSansSemiCondensed_600SemiBold,
  EncodeSansSemiCondensed_700Bold,
  EncodeSansSemiCondensed_800ExtraBold,
  EncodeSansSemiCondensed_900Black,
} from '@expo-google-fonts/encode-sans-semi-condensed';
import { primaryColor,textColor,bgColor,secondaryColor,darkwhite } from './../color';
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import { Slot } from 'expo-router';

export default function Layout() {

  const [fontsLoaded] = useFonts({
    EncodeSansSemiCondensed_700Bold,
    EncodeSansSemiCondensed_400Regular,
    EncodeSansSemiCondensed_300Light,
    EncodeSansSemiCondensed_100Thin
  });

  if (!fontsLoaded) {

    return <SplashScreen />;
  }

  return (
    
    <Stack screenOptions={{ headerShown: false }} >
       <Stack.Screen name="locationView" 
       options={{
        headerShown: true,
        headerTitle:'Location',
        headerStyle: {
          backgroundColor:primaryColor,
        },
        headerTintColor: bgColor,
        }}/>
               <Stack.Screen name="receiveMoney" 
       options={{
        headerShown: true,
        headerTitle:'Receive',
        headerStyle: {
          backgroundColor:primaryColor,
        },
        headerTintColor: bgColor,
        }}/>
               <Stack.Screen name="pendingMoney" 
       options={{
        headerShown: true,
        headerTitle:'Pending',
        headerStyle: {
          backgroundColor:primaryColor,
        },
        headerTintColor: bgColor,
        }}/>
               <Stack.Screen name="addMoney" 
       options={{
        headerShown: true,
        headerTitle:'Add money',
        headerStyle: {
          backgroundColor:primaryColor,
        },
        headerTintColor: bgColor,
        }}/>
               <Stack.Screen name="cashOutMoney" 
       options={{
        headerShown: true,
        headerTitle:'Cash out',
        headerStyle: {
          backgroundColor:primaryColor,
        },
        headerTintColor: bgColor,
        }}/>
               <Stack.Screen name="historyMoney" 
       options={{
        headerShown: true,
        headerTitle:'History',
        headerStyle: {
          backgroundColor:primaryColor,
        },
        headerTintColor: bgColor,
        }}/>
               {/* <Stack.Screen name="sendmoney" 
       options={{
        headerShown: false,
        headerTitle:'Send money',
        headerStyle: {
          backgroundColor:primaryColor,
        },
        headerTintColor: bgColor,
        }}/> */}
    </Stack>

  );
}
