import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./screens/Register";
import Barcode from "./screens/BarcodeScanner";
import Login from "./screens/Login";
import EditProfile from "./screens/EditProfile";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          initialParams={{ userId: 0 }}
        />
        <Stack.Screen
          name="BarcodeScan"
          component={Barcode}
          initialParams={{ userId: 0 }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          initialParams={{ userId: 0 }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
