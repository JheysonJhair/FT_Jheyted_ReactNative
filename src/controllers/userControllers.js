import { buscarUsuario } from "../api/userApi.js";
import Toast from "react-native-toast-message";

// Función para iniciar sesión 
export const loginUser = async (email, password, navigation, setUserName) => {
  try {
    const users = await buscarUsuario();
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      console.log("Ingreso!");
      setUserName(user.name);
      navigation.navigate("ProductCard", { userName: user.name,imgPerfil: user.email });
    } else {
      console.log("Error de ingreso!");
      Toast.show({
        type: "error",
        position: "center",
        text1: "Crea una cuenta",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};
