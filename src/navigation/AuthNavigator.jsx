import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PhoneScreen from '../screens/auth/PhoneScreen'
import OtpScreen from '../screens/auth/OtpScreen'
import NameScreen from '../screens/auth/NameScreen'

const Stack = createNativeStackNavigator()

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Phone" component={PhoneScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="Name" component={NameScreen} />
    </Stack.Navigator>
  )
}