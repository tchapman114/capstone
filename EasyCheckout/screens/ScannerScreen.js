import React, { Component } from "react";
import { View, Text, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

class ScannerScreen extends Component {
  // Component State
  constructor(props) {
    super(props);
    this.state = {
      isScanned: false, // scanned
      userId: props.route.params,
      name: "",
      productId: "",
      dataFetch: "",
    };
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({
      isScanned: true,
    });
    this.CompleteScanProcess(data);
  };

  // 2 API calls
  CompleteScanProcess = (data) => {
    // First API call: fetch product info (price and product name)
    var fetchData = {
      scancode: data,
    };
    console.log("text test: ", data);

    var APIURL = "http://192.168.1.67:80/capstone/api/getScancode.php";

    fetch(APIURL, {
      method: "POST",
      body: JSON.stringify(fetchData),
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log("getScancode Response: ", Response);
        this.setState({
          dataFetch: Response,
        });
        this.setState({
          price: this.state.dataFetch[0].price,
        });
        this.setState({
          name: this.state.dataFetch[0].name,
        });
        this.setState({
          productId: this.state.dataFetch[0].id,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    // Second API call to record items scanned by user
    var APIURL = "http://192.168.1.67:80/capstone/api/insertUserProduct.php";
    var insertData = {
      userId: this.state.userId.userId,
      productId: this.state.productId,
    };
    fetch(APIURL, {
      method: "POST",
      body: JSON.stringify(insertData),
    })
      .then((Response) => Response.json())
      .then((Response) => {
        alert(Response[0].Message);
        if (Response[0].Message == "Success") {
          console.log("Successfully inserted record in user_product Table");
        }
      })
      .catch((error) => {});
  };

  render() {
    const { hasCameraPermission, isScanned } = this.state;
    // we have permission and this screen is under focus
    return (
      <View>
        <BarCodeScanner
          onBarCodeScanned={isScanned ? undefined : this.handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        ></BarCodeScanner>
        {isScanned && (
          <Button
            title={"Scan Item?"}
            onPress={() => {
              this.setState({
                isScanned: false,
              });
            }}
          />
        )}
        <Text>{this.state.name}</Text>
        <Text>{this.state.price}</Text>

        <Button
          title="Go back home"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default ScannerScreen;
