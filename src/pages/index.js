import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

const Welcome = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Text animation="flipInX" style={styles.containerLogoText}>
          DIZZGO
        </Animatable.Text>
      </View>
    </View>
  );
};


// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030303",
  },
  containerLogo: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  containerLogoText: {
    color: "#fff",
    fontSize: 50,
    fontWeight: 700,
    letterSpacing: 2,
  },
  containerForm: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "25%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  Title: {
    fontSize: 24,
    fontWeight: 700,
    paddingTop: 28,
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 400,
    color: "#00000080",
    paddingBottom: 20,
  },
  button: {
    position: "absolute",
    backgroundColor: "#ff0000",
    borderRadius: 50,
    paddingVertical: 10,
    width: "60%",
    alignSelf: "center",
    bottom: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default Welcome;
