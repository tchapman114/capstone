import { Component } from "react";
import { View, Button, Text, Image } from "react-native";
import styles from "../style/style";

export default class Transaction extends Component {
  render() {
    return (
      <View>
        <View style={styles.DatetransactionContainer}>
          <Text style={{ fontWeight: "bold" }}> {this.props.date}</Text>
        </View>

        <View style={styles.transactionContainer}>
          <Image
            style={{ width: 40, height: 40, marginLeft: 10, marginTop: 7 }}
            source={require("../assets/successfulPaymentIcon.png")}
          />
          <Text
            style={{
              color: "green",
              fontWeight: "bold",
              marginTop: 18,
              marginLeft: 20,
            }}
          >
            Payment Successful!
          </Text>
          <Text style={{ fontWeight: "bold", marginTop: 18, marginLeft: 90 }}>
            ${this.props.total}
          </Text>
        </View>
        {/* <Text>{this.props.key}</Text> */}
      </View>
    );
  }
}
