import { Component } from "react";
import { View, Button, Text } from "react-native";

export default class Transaction extends Component {
  render() {
    return (
      <View>
        {/* <Text>{this.props.key}</Text> */}
        <Text>Price: {this.props.total}</Text>
        <Text>Date: {this.props.date}</Text>
      </View>
    );
  }
}
