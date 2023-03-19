import { Component } from "react";
import { View, TextInput, Button, TouchableOpacity, Text } from "react-native";
import Transaction from "../components/Transaction";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.route.params,
      firstname: "",
      lastname: "",
      dataFetch: "",
      dataTransaction: "",
    };
  }

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
        console.log("Fetch User Response: ", Response);
        this.setState({
          dataFetch: Response,
        });
        // setting user values to be displayed in text input fields
        this.setState({ userId: this.state.dataFetch[0][0].id });
        this.setState({ firstname: this.state.dataFetch[0][0].firstname });
        this.setState({ lastname: this.state.dataFetch[0][0].lastname });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // TODO Screen load
  FetchTransaction = () => {
    var userId = this.state.userId;

    var Data = {
      id: userId,
    };
    fetch("http://localhost/capstone/api/getTransaction.php", {
      method: "POST",
      body: JSON.stringify(Data),
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log("getTransaction Response: ", Response);
        this.setState({
          dataTransaction: Response,
        });
        console.log("dataTransaction: ", this.state.dataTransaction);
      })
      .catch((error) => {});
  };

  render() {
    return (
      <View>
        <Text>
          {this.state.firstname} {this.state.lastname}
        </Text>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("EditProfile", {
                userId: this.state.userId,
              });
            }}
          >
            <Text>Edit Profile CLICK</Text>
          </TouchableOpacity>
        </View>
        <Text>Latest Transactions:</Text>
        <View onLayout={() => this.FetchTransaction()}>
          {this.state.dataTransaction?.length > 0 ? ( // if there is data from api
            <>
              {this.state.dataTransaction?.map((data, i) => (
                <Transaction
                  key={i} // iterator to filter though api data
                  total={data?.total} // display name if exists
                  date={data?.date} // display location if exists
                />
              ))}
            </>
          ) : (
            <Text>No Transactions Yet!</Text>
          )}
        </View>
      </View>
    );
  }
}
