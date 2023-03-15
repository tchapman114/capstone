import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, route, navigation } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Barcode({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataFetch, setDataFetch] = useState(null);
  const [text, setText] = useState("Not Yet Scanned");
  const [isLoading, setLoading] = useState(true);
  const [scancode, setScanCode] = useState(null);
  const [price, setPrice] = useState(null);
  const [name, setName] = useState(null);
  const [productId, setProductId] = useState(null);
  const { userId } = route.params;

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
  const GetScanCode = async () => {
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var Data = {
      // HARDCODED UNTIL WE CAN GET SOMEONE TO TEST ON THEIR PHONE!!!
      scancode: "0070847012474", // text?
    };

    var APIURL = "http://localhost/capstone/api/getScancode.php";

    await fetch(APIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log("getScancode Response: ", Response);
        setDataFetch(Response);
        setScanCode(text);
        setPrice(dataFetch[0][0].price);
        setName(dataFetch[0][0].name);
        setProductId(dataFetch[0][0].id);
        console.log("Scanned Price: ", price);
        console.log("Scanned Name: ", name);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function InsertUserProduct() {
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var APIURL = "http://localhost/capstone/api/insertUserProduct.php";
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
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      {/* we can prob remove {text} output. only for testing */}
      <Text style={styles.maintext}>{text}</Text>
      <Text style={styles.maintext}>{name}</Text>
      <Text style={styles.maintext}>{price}</Text>

      {
        <Button
          title={"Scan Item?"}
          onPress={() => {
            setScanned(false);
            GetScanCode();
            InsertUserProduct();
          }}
          color="003FAF"
        />
      }
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
  },
});
