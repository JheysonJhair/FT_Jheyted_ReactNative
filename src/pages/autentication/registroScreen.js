import React, { useState } from "react";
import axios from "axios";
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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';

export default function RegistroScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const uri = "https://fondosmil.com/fondo/23241.png";

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Crear Cuenta",
      headerStyle: {
        backgroundColor: "rgba(14, 12, 20, 1)",
      },
      headerTitleAlign: "center",
      headerTitleStyle: {
        color: "white",
      },
      headerTintColor: "white",
    });
  }, [navigation]);

  const volver = async () => {
    navigation.navigate("Login");
  };

  const onHandleSignup = (email2, password2) => {
    if (email2 !== '' && password2 !== '') {
  createUserWithEmailAndPassword(auth, email2, password2)
        .then(() => console.log('Signup success'))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };
  
  const handleRegistro = async () => {
    
    try {
      const response = await axios.post(
        "https://xgoobk.ccontrolz.com/user/insert",
        {
          email,
          password,
          firstName,
          lastName,
          birthDate,
          profileImage:
            "https://img.freepik.com/fotos-premium/manzana-roja-hoja-verde_914455-660.jpg",
        }
        
      );
      onHandleSignup(email, password);
      if (response.status === 201) {
        navigation.navigate("Login");
      } else {
        console.error(
          "Error en la solicitud de registro: Código de estado",
          response.status
        );
      }
    } catch (error) {
      console.error("Error en la solicitud de registro", error);
    }
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
        <View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Fecha de nacimiento (YYYY-MM-DD)"
              value={birthDate}
              onChangeText={(text) => setBirthDate(text)}
            />
          </View>

          <View>
            <TextInput
              style={styles.input}
              placeholder="Correo"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegistro}>
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                letterSpacing: 2,
                fontWeight: 700,
              }}
            >
              REGISTRAR
            </Text>
          </TouchableOpacity>
          <View style={styles.googleButtonContent}>
            <Text style={styles.googleButtonText}>Inicia sesión con </Text>
            <Icon
              name="google"
              size={20}
              color="#fff"
              style={styles.googleIcon}
            />
          </View>
          <View style={{ padding: 15 }}>
            <TouchableOpacity onPress={volver}>
              <Text style={{ color: "#ffffff90", textAlign: "center" }}>
                Ya tienes cuenta?{" "}
                <Text
                  style={{ color: "rgba(17, 83, 252, 1)", fontWeight: "bold" }}
                >
                  INGRESAR
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  input: {
    width: 300,
    height: 50,
    backgroundColor: "#ffffff90",
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
    marginBottom: 20,
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
});
