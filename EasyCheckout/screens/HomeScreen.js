import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";

const ButtonInfoModal = ({ title, info, visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{title}</Text>
        <ScrollView style={styles.modalInfo}>
          <Text>{info}</Text>
        </ScrollView>
        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default function HomeScreen({ route, navigation }) {
  const { userId } = route.params;
  console.log("UserId: ", userId);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalInfo, setModalInfo] = useState("");

  const handleButtonPress = (title, info) => {
    setModalTitle(title);
    setModalInfo(info);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME TO EASY CHECKOUT!</Text>
      <Text style={styles.title}>Shopping Redefined!</Text>
      <ScrollView style={styles.scroll}>
        {/* Checkout Cart */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("CheckoutScreen", {
              userId: userId,
            })
          }
        >
          <Text style={styles.buttonText}>Cart</Text>
        </TouchableOpacity>

        {/* Barcode Scanner */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("ScannerScreen", {
              userId: userId,
            })
          }
        >
          <Text style={styles.buttonText}>Barcode Scanner</Text>
        </TouchableOpacity>

        {/* View Profile */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("UserProfile", {
              userId: userId,
            })
          }
        >
          <Text style={styles.buttonText}>Edit User Profile</Text>
        </TouchableOpacity>

        {/* Project Info */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            handleButtonPress(
              "Project Info",
              "Cross-platform mobile application that allows users to scan items as they shop and perform a simple checkout process, Users can scan from a set list of items and perform a transaction, Prevents customers from waiting in long checkout lines"
            )
          }
        >
          <Text style={styles.buttonText}>Project Info</Text>
        </TouchableOpacity>

        {/* Team Info */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            handleButtonPress(
              "Team Info",
              "The Team:  Tara Chapman, Cam Schwartz, Gianni Menassa, Paige Craig"
            )
          }
        >
          <Text style={styles.buttonText}>Meet the Developers</Text>
        </TouchableOpacity>
      </ScrollView>
      <ButtonInfoModal
        visible={modalVisible}
        title={modalTitle}
        info={modalInfo}
        onClose={() => setModalVisible(false)}
      />
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
    maxHeight: 200,
    width: "100%",
  },
  button: {
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
});
