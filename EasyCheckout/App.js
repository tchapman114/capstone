import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./screens/Register";
import Barcode from "./screens/BarcodeScanner";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="BarcodeScan" component={Barcode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
