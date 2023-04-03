import { Component } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Item from "../components/Item";
import { Ionicons } from "@expo/vector-icons";

export default class CheckoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.route.params,
      total: "",
      productId: "",
      dataFetch: "", // cart items
      dataQty: "",
      dataTotal: "",
    };
  }

  componentDidMount = () => {
    this.FetchItems();
  };

  // API calls to fetch scanned items and transaction total
  FetchItems = () => {
    var userId = this.state.userId;

    var Data = {
      id: userId,
    };
    fetch("http://192.168.1.67:80/capstone/api/getScannedItems.php", {
      method: "POST",
      body: JSON.stringify(Data),
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log("getScannedItems: ", Response);
        this.setState({
          dataFetch: Response,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    var transactionData = {
      userId: this.state.userId.userId,
    };
    fetch("http://192.168.1.67:80/capstone/api/getTransactionTotal.php", {
      method: "POST",
      body: JSON.stringify(transactionData),
    })
      .then((Response) => Response.json())
      .then((Response) => {
        this.setState({
          dataTotal: Response,
        });
        this.setState({ total: this.state.dataTotal[0].total });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // API call to insert transaction total and date into the transaction table
  InsertTransaction = () => {
    var APIURL = "http://192.168.1.67:80/capstone/api/insertTransaction.php";

    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var Data = {
      userId: this.state.userId.userId,
      total: this.state.total,
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
          this.props.navigation.navigate("CheckoutCompleteScreen", {
            userId: this.state.userId.userId,
          });
        }
      })
      .catch((error) => {
        console.error("ERROR: " + error);
      });
  };

  // Once user selects place order, we need to disable ALL user's scanned items so they can begin a new transaction. Updates the user_product
  disableAllProducts = () => {
    var userId = this.state.userId.userId;

    var Data = {
      userId: userId,
    };
    fetch("http://192.168.1.67:80/capstone/api/disableAllUserItems.php", {
      method: "POST",
      body: JSON.stringify(Data),
    }).catch((error) => {
      console.error(error);
    });
  };

  deleteHandler = (index) => {
    Alert.alert(
      "Are you sure you want to delete this item from your cart?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            let updatedCart = this.state.dataFetch; /* Clone it first */
            let productId = this.state.dataFetch[index].product_id;
            let user_id = this.state.dataFetch[index].user_id;
            updatedCart.splice(
              index,
              1
            ); /* Remove item from the cloned cart state */
            this.DeleteItem(user_id, productId); // disabled items user wants to delete
            this.setState(updatedCart);
            this.setState({ dataFetch: this.updatedCart }); // need to update the length of data fetch in the situation you have no items left
            this.FetchItems(); // call API to once again fetch scanned items
          },
        },
      ],
      { cancelable: false }
    );
  };

  DeleteItem = (userId, productId) => {
    var Data = {
      userId: userId,
      productId: productId,
    };
    fetch("http://192.168.1.67:80/capstone/api/disableScannedItem.php", {
      method: "POST",
      body: JSON.stringify(Data),
    })
      .then((Response) => Response.json())
      .then((Response) => {
        if (Response[0].Message == "Success") {
          console.log("deleted item");
          console.log(Data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { dataFetch } = this.state;
    return (
      <View style={{ marginTop: 30 }}>
        <Text>Items Scanned:</Text>
        <View>
          {this.state.dataFetch?.length > 0 ? ( // if there is data from api
            <>
              {this.state.dataFetch?.map((data, i) => (
                <>
                  <>
                    <Item
                      key={i}
                      name={data?.name} // display product name if exists
                      price={data?.price} // display product price if exists
                      productId={data?.product_id}
                      userId={data?.user_id}
                    />
                  </>
                  {/* Handles deletion of scanned items */}
                  <TouchableOpacity
                    style={[{ width: 32, height: 32 }]}
                    onPress={() => this.deleteHandler(i)}
                  >
                    <Ionicons name="md-trash" size={25} color="#ee4d2d" />
                  </TouchableOpacity>
                </>
              ))}
              <View>
                <Text>OrderTotal: $ {this.state.total}</Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.InsertTransaction();
                    this.disableAllProducts();
                  }}
                >
                  <Text>Place Order</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <Text>No Items Scanned Yet!</Text>
          )}
        </View>
      </View>
    );
  }
}
