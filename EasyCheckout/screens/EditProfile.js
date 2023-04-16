import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from "react-native";
import styles from "../style/style";
import Feather from "react-native-vector-icons/Feather";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.route.params,
      id: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      cardnumber: "",
      password: "",
      dataFetch: "",
      secureTextEntry: true,
    };
  }

  UpdateRecord = () => {
    var userId = this.state.userId;
    var id = this.state.id;
    var firstname = this.state.firstname;
    var lastname = this.state.lastname;
    var email = this.state.email;
    var phone = this.state.phone;
    var cardnumber = this.state.cardnumber;
    var password = this.state.password;
    var APIURL = "http://192.168.1.67:80/capstone/api/update.php";

    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var Data = {
      id: userId,
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      cardnumber: cardnumber,
      password: password,
    };

    fetch(APIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then((Response) => Response.json())
      .then((Response) => {
        if (Response[0].Message == "Success") {
          console.log("Successfully updated profile");
          Alert.alert("Success!", "Profile has been updated.", [
            {
              text: "OK",
              onPress: () =>
                this.props.navigation.navigate("DetailsScreen", {
                  userId: this.state.userId.userId,
                }),
            },
          ]);
        }
      })
      .catch((error) => {
        console.error("ERROR: " + error);
      });
  };

  componentDidMount = () => {
    var userId = this.state.userId;

    var Data = {
      id: userId,
    };
    fetch("http://192.168.1.67:80/capstone/api/fetchForUpdate.php", {
      method: "POST",
      body: JSON.stringify(Data),
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log("fetchForUpdate Response: ", Response);
        this.setState({
          dataFetch: Response,
        });
        // setting user values to be displayed in text input fields
        this.setState({ firstname: this.state.dataFetch[0][0].firstname });
        this.setState({ lastname: this.state.dataFetch[0][0].lastname });
        this.setState({ email: this.state.dataFetch[0][0].email });
        this.setState({ phone: this.state.dataFetch[0][0].phone });
        this.setState({ cardnumber: this.state.dataFetch[0][0].cardnumber });
        this.setState({ password: this.state.dataFetch[0][0].password });
      })
      .catch((error) => {
        console.error(error);
      });
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
        <View style={styles.BackContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              style={{ width: 35, height: 35 }}
              source={require("../assets/arrowicon.png")}
            ></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.TitleContainer}>
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            Edit Profile
          </Text>
        </View>

        <Text> Name*</Text>
        <View style={styles.registrationInputContainer}>
          <TextInput
            placeholder="First Name"
            style={styles.registrationInput}
            value={this.state.firstname}
            onChangeText={(firstname) => this.setState({ firstname })}
          />
          <TextInput
            placeholder="Last Name"
            style={styles.registrationInput}
            value={this.state.lastname}
            onChangeText={(lastname) => this.setState({ lastname })}
          />
        </View>

        <View style={{ padding: 5 }}>
          <Text style={{ marginTop: 15 }}>Email Address*</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
          <Text>Phone Number*</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.phone}
            onChangeText={(phone) => this.setState({ phone })}
          />
          <Text>Credit Card*</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.cardnumber}
            onChangeText={(cardnumber) => this.setState({ cardnumber })}
          />
          <Text>Password*</Text>
          <TextInput
            secureTextEntry={this.state.secureTextEntry ? true : false}
            style={styles.textInput}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
        </View>

        <View style={{ marginLeft: 10 }}>
          <TouchableOpacity onPress={this.updateSecureTextEntry.bind(this)}>
            {this.state.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="black" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              this.UpdateRecord();
            }}
          >
            <Text style={styles.loginButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
