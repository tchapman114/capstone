import React, { Component, Fragment } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
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
      <View style={styles.container}>
        <View style={styles.BackContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              style={{ width: 35, height: 35 }}
              source={require("../assets/arrowicon.png")}
            ></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.TitleContainer}>
          <Text style={{ textAlign: "center", fontSize: 30 }}>Scanner</Text>
        </View>

        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={isScanned ? undefined : this.handleBarCodeScanned}
            style={{ height: 400, width: 400 }}
          ></BarCodeScanner>
        </View>

        <Text>{this.state.name}</Text>
        <Text>{this.state.price}</Text>

        <View style={styles.ScanContainer}>
          {isScanned && (
            <TouchableOpacity
              onPress={() => {
                this.setState({ isScanned: false });
              }}
            >
              <Image
                style={{ width: 70, height: 70 }}
                source={require("../assets/cameraicon.jpg")}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

export default ScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 400,
    overflow: "hidden",
    //borderRadius: 30,
    backgroundColor: "#C597FF",
    //marginTop: 40,
    marginBottom: 20,
  },
  loginButtonContainer: {
    //marginTop:30,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: 135,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#C597FF",
    marginLeft: 7,
    borderRadius: 30,
    marginTop: 100,
  },
  loginButtonText: {
    fontSize: 17,
    color: "black",
  },
  ScanContainer: {
    justifyContent: "center",
    //borderWidth: 1,
    height: 70,
    width: 70,
    borderColor: "#817E7E",
    //backgroundColor: "#C597FF",
    marginTop: 70,
    textAlign: "center",
  },
  BackContainer: {
    borderwidth: 1,
    height: 45,
    width: 45,
    borderColor: "#C597FF",
    //backgroundColor:"blue",
    marginRight: 325,
    //marginTop:10
  },
  TitleContainer: {
    justifyContent: "center",
    height: 50,
    width: "100%",
    borderColor: "#C597FF",
    backgroundColor: "#C597FF",
    //marginTop:0,
    textAlign: "center",
    marginBottom: 100,
  },
});
