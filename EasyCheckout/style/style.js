import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
    //marginTop: 50,
  },
  textInput: {
    color: "#000000",
    borderBottomWidth: 1,
    marginBottom: 25,
    height: 40,
    fontSize: 15,
    borderWidth: 1,
    width: "80%",
    borderColor: "#817E7E",
    marginTop: 5,
    borderRadius: 5,
  },
  inputContainer: {
    marginTop: 50,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  registrationInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  registrationInput: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#817E7E",
    width: "47%",
    height: 40,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonContainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: 135,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#C597FF",
    marginLeft: 110,
    borderRadius: 30,
  },
  loginButtonText: {
    fontSize: 17,
    //fontWeight: 'bold'
  },
  signUpText: {
    //used in login
    marginTop: 35,
    fontSize: 16,
    color: "#00B2FF",
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    marginLeft: 105,
  },
  orText: {
    //used in login
    textAlign: "center",
    marginTop: 35,
    fontSize: 15,
    color: "#000000",
    width: 30,
    marginLeft: 165,
    borderColor: "#817E7E",
    borderWidth: 1,
    borderRadius: 4,
  },
  titleContainer: {
    //marginTop:30,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 135,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#C597FF",
    //marginLeft: 110,
    //borderRadius: 30
  },
});

export default styles;
