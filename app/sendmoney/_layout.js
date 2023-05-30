import { Stack } from "expo-router";
import { primaryColor,textColor,bgColor,secondaryColor,darkwhite } from '../../color';
export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" 
       options={{
        headerShown: true,
        headerTitle:'Send money',
        headerStyle: {
          backgroundColor:primaryColor,
        },
        headerTintColor: bgColor,
        
        }}/>
         <Stack.Screen name="paymentProcess" 
       options={{
        headerShown: true,
        headerTitle:'Payment Process',
        headerStyle: {
          backgroundColor:primaryColor,
        },
        headerTintColor: bgColor,
        
        }}/>
                 <Stack.Screen name="paymentConfirm" 
       options={{
        headerShown: false,
        
        }}/>
    </Stack>
  );
}