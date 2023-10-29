import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../Screens/Home"
import Restaurant from "../Screens/Restaurant"
import Cart from "../Screens/Cart"
import PreparingOrderScreen from "../Screens/PreparingOrderScreen"
import Delivery from "../Screens/Delivery"

const Stack = createNativeStackNavigator()
const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Restaurant" component={Restaurant} options={{headerShown:false}}/>
            <Stack.Screen name="Cart" component={Cart} options={{presentation:'modal',headerShown: false}}/>
            <Stack.Screen name="PreparingOrderScreen" component={PreparingOrderScreen} options={{presentation:'fullScreenModal', headerShown: false}}/>
            <Stack.Screen name="Delivery" component={Delivery} options={{presentation:'fullScreenModal', headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation