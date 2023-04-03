import React, { useState, useEffect, route, navigation } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Barcode({ route, navigation }) {
  const { userId } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataFetch, setDataFetch] = useState("");
  const [text, setText] = useState("Not Yet Scanned");
  const [scancode, setScanCode] = useState(null);
  const [price, setPrice] = useState(null);
  const [name, setName] = useState(null);
  const [productId, setProductId] = useState(null);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  // Request The Camera's Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // Barcode Scanned Result
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // use data to send to API
    setText(data);
    GetScanCode(data);
    InsertUserProduct();
    console.log("Type: " + type + "\nData: " + data);
  };

  // Check Permissions and Returns Screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  //API Call to get price and item name
  function GetScanCode(data) {
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var Data = {
      scancode: data,
    };
    console.log("text test: ", data);

    var APIURL = "http://192.168.1.67:80/capstone/api/getScancode.php";

    fetch(APIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log("getScancode Response: ", Response);
        setDataFetch(Response);
        setScanCode(text);
        setPrice(dataFetch[0].price);
        setName(dataFetch[0].name);
        setProductId(dataFetch[0].id);
        console.log("Scanned Price: ", price);
        console.log("Scanned Name: ", name);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function InsertUserProduct() {
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var APIURL = "http://192.168.1.67:80/capstone/api/insertUserProduct.php";
    var Data = {
      userId: userId,
      productId: productId,
    };
    console.log(userId);

    fetch(APIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then((Response) => Response.json())
      .then((Response) => {
        alert(Response[0].Message);
        if (Response[0].Message == "Success") {
          console.log("true");
        }
      })
      .catch((error) => {
        console.error("ERROR: " + error);
      });
  }

  // Returns the View
  return (
    <View style={styles.container}>
      {/* <View style={styles.barcodebox}> */}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: 400, width: 400 }}
      />
      {scanned && (
        <Button
          title={"Tap to Scan Again"}
          onPress={() => {
            setScanned(false);
          }}
        />
      )}
      {/* </View> */}
      {/* we can prob remove {text} output. only for testing */}
      <Text style={styles.maintext}>{text}</Text>
      <Text style={styles.maintext}>{name}</Text>
      <Text style={styles.maintext}>{price}</Text>

      {/* {
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              handleBarCodeScanned;
              setScanned(false);
              InsertUserProduct();
            }}
          >
            <Text style={styles.loginButtonText}>Scan Item?</Text>
          </TouchableOpacity>
        </View>
      } */}
      <Button
        title="Go back"
        onPress={() =>
          navigation.navigate("DetailsScreen", {
            userId: userId,
          })
        }
      />
    </View>
  );
}

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
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "7D00AF",
    marginTop: -100,
  },
  loginButtonContainer: {
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
  },
});
