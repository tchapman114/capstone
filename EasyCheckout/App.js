import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./screens/Register";
import Login from "./screens/Login";
import EditProfile from "./screens/EditProfile";
import DetailsScreen from "./screens/DetailsScreen";
import UserProfile from "./screens/UserProfile";
import CheckoutScreen from "./screens/CheckoutScreen";
import CheckoutCompleteScreen from "./screens/CheckoutCompleteScreen";
import ScannerScreen from "./screens/ScannerScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Register"
          component={Register}
          initialParams={{ userId: null }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          initialParams={{ userId: 0 }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          initialParams={{ userId: 0 }}
        />
        <Stack.Screen
          name="ScannerScreen"
          component={ScannerScreen}
          initialParams={{ userId: 0 }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          initialParams={{ userId: 0 }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          initialParams={{ userId: 0 }}
        />
        <Stack.Screen
          name="CheckoutScreen"
          component={CheckoutScreen}
          initialParams={{ userId: 0 }}
        />
        <Stack.Screen
          name="CheckoutCompleteScreen"
          component={CheckoutCompleteScreen}
          initialParams={{ userId: 0 }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
