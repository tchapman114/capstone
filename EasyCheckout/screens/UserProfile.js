import { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import Transaction from "../components/Transaction";
import styles from "../style/style";

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
    console.log("CALLED");
    this.FetchUserInfo();
    this.FetchTransaction();
  };

  FetchUserInfo = () => {
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

  FetchTransaction = () => {
    var userId = this.state.userId;

    var Data = {
      id: userId,
    };
    fetch("http://192.168.1.67:80/capstone/api/getTransaction.php", {
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
      <>
        <View style={{ backgroundColor: "white" }}>
          <View style={styles.image_editContainer}>
            <Image
              style={{ width: 90, height: 90, marginLeft: 148 }}
              source={require("../assets/profile.png")}
            />
          </View>
          <Text style={styles.userProfileName}>
            {this.state.firstname} {this.state.lastname}
          </Text>
          <View style={styles.imageBox}>
            <View style={styles.image_editContainer}>
              <Image
                style={{ width: 15, height: 15 }}
                source={require("../assets/editprofile_icon.png")}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("EditProfile", {
                  userId: this.state.userId,
                });
              }}
            >
              <Text style={styles.editProfileText}>Edit Profile </Text>
            </TouchableOpacity>
          </View>
          <Button
            title="Go back"
            onPress={() =>
              this.props.navigation.navigate("DetailsScreen", {
                userId: this.state.userId,
              })
            }
          />
          <View style={styles.latestTransactionContainer}>
            <Text style={{ fontWeight: "bold" }}> LATEST TRANSACTIONS</Text>
          </View>
          <View>
            <ScrollView>
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
            </ScrollView>
          </View>
        </View>
      </>
    );
  }
}
