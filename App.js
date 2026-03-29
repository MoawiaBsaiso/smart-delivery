import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CustomerHomeScreen from './src/screens/customer/HomeScreen'
import NewOrderScreen from './src/screens/customer/NewOrderScreen'
import OrderTrackingScreen from './src/screens/customer/OrderTrackingScreen'
import RatingScreen from './src/screens/customer/RatingScreen'
import DriverHomeScreen from './src/screens/driver/HomeScreen'
import OrderRequestScreen from './src/screens/driver/OrderRequestScreen'
import DeliveryScreen from './src/screens/driver/DeliveryScreen'
import EarningsScreen from './src/screens/driver/EarningsScreen'
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CustomerHome" component={DriverHomeScreen} />
        <Stack.Screen name="NewOrder" component={NewOrderScreen} />
        <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
        <Stack.Screen name="Rating" component={RatingScreen} />
        <Stack.Screen name="DriverHome" component={DriverHomeScreen} />
        <Stack.Screen name="OrderRequest" component={OrderRequestScreen} />
        <Stack.Screen name="DriverDelivery" component={DeliveryScreen} />
        <Stack.Screen name="DriverEarnings" component={EarningsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}