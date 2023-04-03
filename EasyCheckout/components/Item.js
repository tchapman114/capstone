import { Component } from "react";
import { View, Text } from "react-native";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: "",
      dataQty: "",
    };
  }

  componentDidMount = () => {
    var Data = {
      userId: this.props.userId,
      productId: this.props.productId,
    };
    fetch("http://192.168.1.67:80/capstone/api/getScannedItemQty.php", {
      method: "POST",
      body: JSON.stringify(Data),
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log("Item.js: getScannedItemQty: ", Response);
        this.setState({
          dataQty: Response,
        });
        this.setState({ qty: this.state.dataQty[0].qty });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <View>
        <Text>Description: {this.props.name}</Text>
        <Text>Price: {this.props.price}</Text>
        <Text>Quantity: {this.state.qty}</Text>
      </View>
    );
  }
}
