import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
//import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';


const uri ="https://fondosmil.com/fondo/23241.png";
const profilePicture ="https://marketplace.canva.com/EAFGF71IIW8/1/0/1600w/canva-logo-sencillo-ne%C3%B3n-para-bar-oDjqEXclk-I.jpg";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const LoginUsers = async () => {
    try {
      const response = await fetch('http://soundthezerb.ccontrolz.com/api/users/getall');
      const data = await response.json();

      const user = data.result.find((user) => user.email === email && user.password === password);

      if (user) {
        setUserName(user.name);
        navigation.navigate('ProductCard', { userName: user.name });
      } else {
        
        console.log("Error de ingreso!");
        Toast.show({
          type: 'error',
          position: 'center', 
          text1: 'Create una cuenta', 
          visibilityTime: 3000, 
          autoHide: true,
        });
      }
    } catch (error) {
      console.error('Error de coneccion', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // Aquí puedes usar userInfo para iniciar sesión con Google
      console.log('Usuario de Google:', userInfo.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // El usuario canceló la autenticación de Google
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // La autenticación de Google está en progreso
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Los servicios de Google Play no están disponibles en el dispositivo
        Alert.alert('Error', 'Los servicios de Google Play no están disponibles en este dispositivo.');
      } else {
        // Otro error inesperado
        console.error('Error al iniciar sesión con Google:', error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
      <View
        style={{
          width: 100,
          height: 40,
          backgroundColor: "#594f9b",
          top: 70,
          position: "absolute",
        }}
      ></View>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BlurView intensity={50}>
          <View style={styles.login}>
            <Image
              source={{ uri: profilePicture }}
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
              XGOO
            </Text>
            <View>
              <Text style={{ fontSize: 17, color: "#fff", letterSpacing: 1 }}>
                Correo
              </Text>
              <TextInput
                style={styles.input}
                placeholder="xgoo@gmail.com"
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
            <TouchableOpacity style={styles.button} onPress={LoginUsers}>
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
            <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
                <View style={styles.googleButtonContent}>
                <Text style={styles.googleButtonText}>Inicia sesión con </Text>
                  <Icon name="google" size={20} color="#fff" style={styles.googleIcon} />                 
                </View>
              </TouchableOpacity>
            <View style={{ padding: 25 }}>
              <Text style={{ color: "#ffffff80" }}>Crear tu Cuenta Aqui</Text>
            </View>

          </View>
          
        </BlurView>
      </ScrollView>
    </View>
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
    width: 320,
    height: 610,
    borderColor: "#ffffff30",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 1,
    margin: 15,
  },
  input: {
    width: 250,
    height: 50,
    backgroundColor: "#ffffff60",
    padding: 10,
    borderRadius: 10,
    color: "#fff",
    marginVertical: 5,
    marginBottom: 20,
  },
  button: {
    width: 250,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  googleIcon: {
    padding: 8, 
    paddingBottom: 4, 
    paddingRight: 5, 
    paddingLeft: 9,
    borderRadius: 5,
    borderWidth: 1, 
    borderColor: '#fff', 
  },
  googleButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
