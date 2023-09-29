import React, { useState } from "react";
import { Alert } from "react-native";
import Modal from "react-native-modal";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";

const uri = "https://fondosmil.com/fondo/23241.png";
const profilePicture =
  "https://marketplace.canva.com/EAFGF71IIW8/1/0/1600w/canva-logo-sencillo-ne%C3%B3n-para-bar-oDjqEXclk-I.jpg";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleGoogleSignIn = async () => {};
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onHandleLogin = (email2, password2) => {
    if (email2 !== "" && password2 !== "") {
      signInWithEmailAndPassword(auth, email2, password2)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };
  const handleLogin = async () => {
    try {
      const response = await fetch("https://xgoobk.ccontrolz.com/user");
      const users = await response.json();

      const user = users.find(
        (user) => user.email == email && user.password == password
      );
      onHandleLogin(user.email, user.password);
      if (user) {
        const birthDate = new Date(user.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();

        if (age >= 16) {
          console.log("Ingreso!");
          setUserName(user.firstName);
          navigation.navigate("ProductCard", {
            userName: user.firstName,
            imgPerfil: user.profileImage,
          });
        } else {
          console.log("No eres mayor de 18 años.");
          toggleModal();
        }
      } else {
        console.log("Error de ingreso!");
        Alert.alert("Error de ingreso", "Create una cuenta!");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleRegister = () => {
    navigation.navigate("RegistroScreen");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />

      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.login}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.profilePicture}
          />
          <Text
            style={{
              fontSize: 35,
              color: "#fff",
              fontWeight: 700,
              padding: 10,
              letterSpacing: 2,
            }}
          >
            DIZZGO
          </Text>
          <View>
            <Text style={{ fontSize: 17, color: "#fff", letterSpacing: 1 }}>
              Correo
            </Text>
            <TextInput
              style={styles.input}
              placeholder="xgostor@gmail.com"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View>
            <Text style={{ fontSize: 17, color: "#fff", letterSpacing: 1 }}>
              Contraseña
            </Text>
            <TextInput
              style={styles.input}
              placeholder="contraseña"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                letterSpacing: 2,
                fontWeight: 700,
              }}
            >
              ENTRAR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
          >
            <View style={styles.googleButtonContent}>
              <Text style={styles.googleButtonText}>Inicia sesión con </Text>
              <Icon
                name="google"
                size={20}
                color="#fff"
                style={styles.googleIcon}
              />
            </View>
          </TouchableOpacity>
          <View style={{ padding: 25 }}>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={{ color: "#ffffff80" }}>Crear tu Cuenta Aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>¡Oops!</Text>
            <Text style={styles.modalText}>
              Debes ser mayor de 16 años para ingresar.
            </Text>
            <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
              <Text style={styles.buttonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  login: {
    width: 360,
    height: 670,
    borderColor: "#ffffff30",
    borderRadius: 10,

    padding: 10,
    alignItems: "center",
  },
  profilePicture: {
    padding: 10,
    width: 100,
    height: 100,
    borderWidth: 1,
    margin: 15,
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: "#ffffff60",
    padding: 10,
    borderRadius: 10,
    color: "#fff",
    marginVertical: 5,
    marginBottom: 20,
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8B4BF2",
    borderRadius: 10,
    marginTop: 10,
  },
  googleButton: {
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleButtonContent: {
    flexDirection: "column",
    alignItems: "center",
  },
  googleIcon: {
    padding: 8,
    paddingBottom: 4,
    paddingRight: 5,
    paddingLeft: 9,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  googleButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
