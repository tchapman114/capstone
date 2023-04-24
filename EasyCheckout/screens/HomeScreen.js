import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
} from "react-native";

export default function HomeScreen({ route, navigation }) {
  const { userId } = route.params;
  console.log("UserId: ", userId);
  const [modalTeamVisible, setModalTeamVisible] = useState(false);
  const [modalProjectVisible, setModalProjectVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        <Text
          style={{
            fontWeight: "bold",
            position: "absolute",
            top: 23,
            left: 55,
          }}
        >
          Profile
        </Text>
        {/* View User's Profile */}
        <View style={{ position: "absolute", top: 2, left: 2 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UserProfile", {
                userId: userId,
              })
            }
          >
            {/* Profile icon, indicating they can navigate to edit profile info */}
            <Image
              style={{ width: 40, height: 40, marginLeft: 5, marginTop: 10 }}
              source={require("../assets/profile.png")}
            ></Image>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontWeight: "bold",
            position: "absolute",
            top: 7,
            left: 320,
          }}
        >
          Checkout
        </Text>
        {/* Checkout Screen */}
        <View style={{ position: "absolute", top: 20, left: 330 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CheckoutScreen", {
                userId: userId,
              })
            }
          >
            <Image
              style={{ width: 35, height: 35 }}
              source={require("../assets/checkouticon.webp")}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>

      <Image
        style={{ width: 300, height: 200, position: "absolute", top: 125 }}
        source={require("../assets/homescreenimage.jpg")}
      ></Image>

      <Text style={styles.title}>WELCOME TO EASY CHECKOUT!</Text>
      <Text style={styles.title}>Shopping Redefined!</Text>

      <View style={styles.scroll}>
        {/* Barcode Scanner */}
        <TouchableOpacity
          style={styles.buttons}
          onPress={() =>
            navigation.navigate("ScannerScreen", {
              userId: userId,
            })
          }
        >
          <Text style={styles.buttonText}>Start Scanning!</Text>
        </TouchableOpacity>

        {/* Project Info */}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalProjectVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalProjectVisible(!modalProjectVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitleText}>Project Overview</Text>
                <Text style={styles.modalText}>
                  Our project is a cross-platform mobile application that allows
                  users to scan items as they shop and perform a simple checkout
                  process. Users can scan from a set list of items and perform
                  transactions and this alleviates customers from waiting in
                  long checkout lines.{"\n"}
                  {"\n"}
                  During the process of creating this project we used tools such
                  as Visual Studio Code, Github, React Native, MySQL and many
                  others.{" "}
                </Text>
                <Image
                  style={{ width: 235, height: 120 }}
                  source={require("../assets/projecticon.jpg")}
                ></Image>
                <TouchableOpacity
                  style={{ position: "absolute", top: 3, left: 5 }}
                  onPress={() => setModalProjectVisible(!modalProjectVisible)}
                >
                  <Image
                    style={{ width: 35, height: 35 }}
                    source={require("../assets/arrowicon.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={[styles.buttons]}
            onPress={() => setModalProjectVisible(true)}
          >
            <Text style={styles.buttonText}>Project Overview</Text>
          </TouchableOpacity>
        </View>

        {/* Team Info */}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalTeamVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalTeamVisible(!modalTeamVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitleText}>
                  The Developers of EasyCheckout!
                </Text>
                <Text style={styles.modalTitle2Text}>Backend:</Text>
                <Text style={styles.modalText}>
                  Tara Chapman{"\n"}
                  <Text style={styles.modalEmailText}>
                    {" "}
                    tchapman@oakland.edu
                  </Text>
                  {"\n"}Cameron Schwartz
                  <Text style={styles.modalEmailText}>
                    {" "}
                    cameronschwartz@oakland.edu
                  </Text>
                  {"\n"}Gianni Menassa{"\n"}
                  <Text style={styles.modalEmailText}>
                    {" "}
                    gmenassa@oakland.edu
                  </Text>
                </Text>
                <Text style={styles.modalTitle2Text}>Frontend:</Text>
                <Text style={styles.modalText}>
                  Paige Craig{"\n"}
                  <Text style={styles.modalEmailText}>
                    {" "}
                    paigecraig@oakland.edu
                  </Text>
                </Text>
                <Image
                  style={{ width: 235, height: 120 }}
                  source={require("../assets/teamicon.jpg")}
                ></Image>
                <TouchableOpacity
                  style={{ position: "absolute", top: 3, left: 5 }}
                  onPress={() => setModalTeamVisible(!modalTeamVisible)}
                >
                  <Image
                    style={{ width: 35, height: 35 }}
                    source={require("../assets/arrowicon.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={[styles.buttons]}
            onPress={() => setModalTeamVisible(true)}
          >
            <Text style={styles.buttonText}>Meet the Developers</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
  },
  scroll: {
    paddingLeft: 5,
    paddingRight: 5,
    maxHeight: 310,
    width: "100%",
    position: "absolute",
    bottom: 70,
  },
  buttons: {
    paddingLeft: 5,
    paddingRight: 5,
    maxHeight: 310,
    width: "100%",
    backgroundColor: "#A020F0",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  topBarContainer: {
    borderRadius: 1,
    backgroundColor: "#C597FF",
    width: "100%",
    height: 60,
    position: "absolute",
    top: 45,
  },
  infoContainer: {
    height: 50,
    width: "100%",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
  },
  modalTitleText: {
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  modalEmailText: {
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "#0287c3",
  },
  modalTitle2Text: {
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
