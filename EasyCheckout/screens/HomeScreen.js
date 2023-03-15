import React, { Component, TouchableOpacity, route } from "react";
import { View, Text, Button } from "react-native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.route.params,
    };
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("BarcodeScan", {
              userId: this.state.userId,
            });
          }}
        >
          <Text>Update</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
