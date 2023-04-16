import React, { Component } from "react";
import { View, Button, Text } from "react-native";

///   THIS FILE IS JUST FOR TESTING PURPOSES, WILL DELETE LATER!!!!!!!!!!!
function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { userId } = route.params;
  console.log("UserId: ", userId);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>userId: {JSON.stringify(userId)}</Text>
      <Button
        title="HomeScreen"
        onPress={() =>
          navigation.navigate("HomeScreen", {
            userId: userId,
          })
        }
      />
      <Button
        title="ScannerScreen"
        onPress={() =>
          navigation.navigate("ScannerScreen", {
            userId: userId,
          })
        }
      />
      <Button
        title="Update Profile"
        onPress={() =>
          navigation.navigate("EditProfile", {
            userId: userId,
          })
        }
      />

      <Button
        title="View Profile"
        onPress={() =>
          navigation.navigate("UserProfile", {
            userId: userId,
          })
        }
      />

      <Button
        title="View Checkout Cart"
        onPress={() =>
          navigation.navigate("CheckoutScreen", {
            userId: userId,
          })
        }
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default DetailsScreen;
