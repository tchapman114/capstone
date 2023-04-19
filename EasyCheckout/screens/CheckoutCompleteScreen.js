import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../style/style";

export default class CheckoutCompleteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.route.params,
    };
  }

  render() {
    return (
      <View style={{ marginTop: 40, backgroundColor: "white" }}>
        <Image
          style={{ width: 360, height: 250, marginLeft: 10, marginTop: 120 }}
          source={require("../assets/orderplacedicon.png")}
        ></Image>
        <View style={styles.TransactionCompleteOrderButton}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("HomeScreen", {
                userId: this.state.userId.userId,
              })
            }
          >
            <Text style={styles.loginButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{ fontWeight: "bold", textAlign: "center", marginTop: 30 }}
        >
          The transaction was successful!
        </Text>
        <Text style={{ textAlign: "center", marginTop: 5 }}>
          Thank you for your purchase!
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginTop: 5,
            marginBottom: "100%",
            padding: 10,
          }}
        >
          You will soon see the transaction show up in your transaction history
          on your profile page!
        </Text>
      </View>
    );
  }
}
