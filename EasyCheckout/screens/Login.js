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
      var APIURL = "http://192.168.1.67:80/capstone/api/login.php";

      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        //sending email and password to fetch from database
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
          //TODO do we want to get rid of alert ?
          alert(Response[0].Message);
          if (Response[0].Message == "Success") {
            console.log("true");
            id = Response[0].Id;
            console.log("UserId: ", id);
            // Storing id, using routes to pass id throughout app and can be used in other queries
            this.props.navigation.navigate("HomeScreen", {
              userId: id,
            });
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
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "left",
              marginTop: 60,
              padding: 30,
              marginBottom: 30,
            }}
          >
            LOGIN
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Email"
            onChangeText={(email) => this.setState({ email })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Password</Text>
          <TextInput
            style={styles.textInput}
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

        <View style={styles.loginButtonContainer}>
          {/* Call API when user signs in */}
          <Pressable
            onPress={() => {
              this.FetchRecord();
              this.state.handleSubmit;
            }}
          >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </Pressable>
        </View>
        <View>
          {/* navigate back to Register screen when user wants to create account */}
          <Text style={styles.orText}>OR</Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={styles.signUpText}>Create new Account!</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}
