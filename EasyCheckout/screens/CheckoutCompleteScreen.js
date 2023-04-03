import React, { Component } from "react";
import { View, Button, Text } from "react-native";

export default class CheckoutCompleteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.route.params,
    };
  }

  // TODO paige: Add something fun here
  render() {
    return (
      <View>
        <Text>Transaction Complete</Text>
        <Button
          title="Start new transaction!"
          onPress={() =>
            this.props.navigation.navigate("DetailsScreen", {
              userId: this.state.userId.userId,
            })
          }
        />
      </View>
    );
  }
}
