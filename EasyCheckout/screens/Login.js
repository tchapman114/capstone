import React, { Component } from "react";
import {
  View,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "../style/style";
import Feather from "react-native-vector-icons/Feather";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      check_textInputChange: false,
      secureTextEntry: true,
    };
  }

  FetchRecord = () => {
    var email = this.state.email;
    var password = this.state.password;

    if (email.length == 0 || password.length == 0) {
      alert("Required Field Is Missing");
    } else {
      // API endpoint URL
      var APIURL = "http://localhost/capstone/api/login.php";

      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        //fetching email and password from database
        email: email,
        password: password,
      };

      fetch(APIURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((Response) => Response.json())
        .then((Response) => {
          alert(Response[0].Message);
          if (Response[0].Message == "Success!") {
            console.log("true");
            this.props.navigation.navigate("HomeScreen"); //REPLACE WITH WHATEVER WE CALL HOME SCREEN
          }
          console.log(Data);
        })
        .catch((error) => {
          console.error("ERROR: " + error);
        });
    }
  };

  updateSecureTextEntry() {
    this.setState({
      ...this.state,
      secureTextEntry: !this.state.secureTextEntry,
    });
  }

  render() {
    // react navigation, used to switched between screen on press
    const { navigation } = this.props;
    return (
      <View style={styles.viewStyle}>
        <View>
          <TextInput
            placeholder="Enter Email"
            onChangeText={(email) => this.setState({ email })}
          />
        </View>

        <View>
          <TextInput
            placeholder="Enter Password"
            secureTextEntry={this.state.secureTextEntry ? true : false}
            onChangeText={(password) => this.setState({ password })}
          />
          {/* Eye icon: can hide or show password */}
          <TouchableOpacity onPress={this.updateSecureTextEntry.bind(this)}>
            {this.state.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="black" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <View>
          {/* Call API when user signs in */}
          <Pressable
            onPress={() => {
              this.FetchRecord();
            }}
          >
            <Text>Sign In</Text>
          </Pressable>
        </View>
        <View>
          {/* navigate back to Register screen when user wants to create account */}
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text>Create new Account</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}
