import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [showInfo1, setShowInfo1] = useState(false); // state variable to toggle the visibility of the first info
  const [showInfo2, setShowInfo2] = useState(false); // state variable to toggle the visibility of the second info

  const handleButtonClick1 = () => {
    setShowInfo1(true); // show the first info
  };

  const handleButtonClick2 = () => {
    setShowInfo2(true); // show the second info
  };

  const handleInfoClose1 = () => {
    setShowInfo1(false); // hide the first info
  };

  const handleInfoClose2 = () => {
    setShowInfo2(false); // hide the second info
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Easy Checkout</Text>
      <Text style={styles.title}></Text>
      <Text style={styles.title}></Text>
      <Text style={styles.title}>Welcome To</Text>
      <Text style={styles.title}>The Future Of Shopping!</Text>
      <Text style={styles.title}></Text>
      <Text style={styles.title}></Text>
      <Text style={styles.title}></Text>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          {!showInfo1 && (
            <Button title="Show Project Info" onPress={handleButtonClick1} />
          )}
          {showInfo1 && (
            <Button title="Return To Main Menu" onPress={handleInfoClose1} />
          )}
        </View>
        <View style={styles.button}>
          {!showInfo2 && (
            <Button title="Show Team Info" onPress={handleButtonClick2} />
          )}
          {showInfo2 && (
            <Button title="Return To Main Menu" onPress={handleInfoClose2} />
          )}
        </View>
      </View>
      {showInfo1 && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Cross-platform mobile application that allows users to scan items as
            they shop and perform a simple checkout process
          </Text>
          <Text style={styles.infoText}>
            Users can scan from a set list of items and perform a transaction
          </Text>
          <Text style={styles.infoText}>
            Prevents customers from waiting in long checkout lines
          </Text>
        </View>
      )}
      {showInfo2 && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            The Team: Tara Chapman, Cam Schwartz, Gianni Menassa, Paige Craig
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4A4A4A",
    textShadowColor: "#BEBEBE",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 10,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: "#F5F5F5",
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    width: "80%",
    shadowColor: "#BEBEBE",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#4A4A4A",
  },
});
