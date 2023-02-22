import React, { Component } from "react";
import { View, TextInput, Button, TouchableOpacity, Text } from "react-native";
import styles from "../style/style.js";
import Feather from "react-native-vector-icons/Feather";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      cardnumber: "",
      password: "",
      check_textInputChange: false,
      secureTextEntry: true,
      confirmSecureTextEntry: true,
    };
  }

  InsertRecord = () => {
    var firstname = this.state.firstname;
    var lastname = this.state.lastname;
    var email = this.state.email;
    var phone = this.state.phone;
    var cardnumber = this.state.cardnumber;
    var password = this.state.password;
    var checkEmail = RegExp(
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i
    );

    if (email.length == 0 || password.length == 0) {
      alert("Required Field Is Missing!!!");
    } else if (!checkEmail.test(email)) {
      alert("invalid email!!!");
    }
    // Password validations
    else if (password.length < 8) {
      alert("Minimum 08 characters required!!!");
    } else if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
      alert("Use atleast 01 special character!!!");
    } else if (/[ ]/.test(password)) {
      alert("Don't include space in password!!!");
    } else {
      var InsertAPIURL = "http://localhost/capstone/api/register.php"; //API to render register

      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        cardnumber: cardnumber,
        password: password,
      };

      fetch(InsertAPIURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data), //convert data to JSON
      })
        .then((response) => response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
        .then((response) => {
          alert(response[0].Message); // If data is in JSON => Display alert msg
          this.props.navigation.navigate("Login"); //Navigate to next screen if authentications are valid
        })
        .catch((error) => {
          alert("Error Occurred: " + error);
          console.log(error);
        });
    }
  };

  updateSecureTextEntry() {
    this.setState({
      ...this.state,
      secureTextEntry: !this.state.secureTextEntry,
    });
  }

  updateConfirmSecureTextEntry() {
    this.setState({
      ...this.state,
      confirmSecureTextEntry: !this.state.confirmSecureTextEntry,
    });
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <Text>Name*</Text>
        <View style={styles.registrationInputContainer}>
          <TextInput
            placeholder="Enter First Name"
            style={styles.registrationInput}
            onChangeText={(firstname) => this.setState({ firstname })}
          />
          <TextInput
            placeholder="Enter Last Name"
            style={styles.registrationInput}
            onChangeText={(lastname) => this.setState({ lastname })}
          />
        </View>

        <Text style={{ marginTop: 15 }}>Email Address*</Text>
        <TextInput
          placeholder="Enter Email"
          style={styles.textInput}
          onChangeText={(email) => this.setState({ email })}
        />
        <Text>Phone Number*</Text>
        <TextInput
          placeholder="Enter Phone Number"
          style={styles.textInput}
          onChangeText={(phone) => this.setState({ phone })}
        />
        <Text>Credit Card*</Text>
        <TextInput
          placeholder="Enter Card Number"
          style={styles.textInput}
          onChangeText={(cardnumber) => this.setState({ cardnumber })}
        />
        <Text>Password*</Text>
        <TextInput
          placeholder="Enter Password"
          secureTextEntry={this.state.secureTextEntry ? true : false}
          style={styles.textInput}
          onChangeText={(password) => this.setState({ password })}
        />
        <TouchableOpacity onPress={this.updateSecureTextEntry.bind(this)}>
          {this.state.secureTextEntry ? (
            <Feather name="eye-off" color="grey" size={20} />
          ) : (
            <Feather name="eye" color="black" size={20} />
          )}
        </TouchableOpacity>

        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              this.InsertRecord();
            }}
          >
            <Text style={styles.loginButtonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
