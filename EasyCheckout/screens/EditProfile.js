import React, { Component, route, FlatList } from "react";
import { View, TextInput, Button, TouchableOpacity, Text } from "react-native";

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
    var APIURL = "http://localhost/capstone/api/update.php";

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
        alert(Response[0].Message);
        if (Response[0].Message == "Success") {
          console.log("true");
          // this.props.navigation.navigate("EditProfile", {
          //   userId: id,
          // });
        }
        console.log(Data);
        console.log(Response[0].SQL);
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
    fetch("http://localhost/capstone/api/fetchForUpdate.php", {
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

  render() {
    return (
      <View>
        <Text>Name*</Text>
        <View>
          <TextInput
            value={this.state.firstname}
            onChangeText={(firstname) => this.setState({ firstname })}
          />
          <TextInput
            value={this.state.lastname}
            onChangeText={(lastname) => this.setState({ lastname })}
          />
        </View>

        <Text>Email Address*</Text>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />
        <Text>Phone Number*</Text>
        <TextInput
          value={this.state.phone}
          onChangeText={(phone) => this.setState({ phone })}
        />
        <Text>Credit Card*</Text>
        <TextInput
          value={this.state.cardnumber}
          onChangeText={(cardnumber) => this.setState({ cardnumber })}
        />
        <Text>Password*</Text>
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
        />

        <View>
          <TouchableOpacity
            onPress={() => {
              this.UpdateRecord();
            }}
          >
            <Text>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
