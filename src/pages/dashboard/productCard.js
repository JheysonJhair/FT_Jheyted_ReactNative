import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export default function ProductCard() {
  const route = useRoute();
  const backgroundColors = [
    "hsl(45, 88%, 50%)",
    "hsl(211, 87%, 49%)",
    "hsl(81, 88%, 39%)",
  ];
  const userName = route.params?.userName || "";
  const perfil = route.params?.imgPerfil || "";

  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");

  const [promociones, setPromociones] = useState([]);
  const [productos, setProductos] = useState([]);

  const handleSearch = () => {
    Alert.alert("Búsqueda", `Buscar productos con: ${searchText}`);
  };
  const handleChatButtonClick = () => {
    navigation.navigate('Chat', { userProfileImage: perfil });
  };
  useEffect(() => {
    fetch("https://xgoobk.ccontrolz.com/productsupplier")
      .then((response) => response.json())
      .then((data) => {
        const promocionesPromises = data.map((item) => {
          return fetch(
            `https://xgoobk.ccontrolz.com/products/${item.product_id}`
          )
            .then((response) => response.json())
            .then((productData) => {
              return {
                productId: item.product_id,
                productName: productData.name,
                productVol: productData.volume,
                productMl: productData.ml,
                productFlavor: productData.flavor,
                promotionPrice: item.promotionPrice,
                imgProduct: item.imgProduct,
              };
            });
        });

        Promise.all(promocionesPromises)
          .then((promocionesData) => {
            const filteredPromociones = promocionesData.filter(
              (promocion) => promocion.promotionPrice > 0
            );
            setPromociones(filteredPromociones);
          })
          .catch((error) => {
            console.error("Error fetching promociones data:", error);
          });

        const productosData = data.filter((item) => item.priceProduct > 0);
        const productosPromises = productosData.map((item) => {
          return fetch(
            `https://xgoobk.ccontrolz.com/products/${item.product_id}`
          )
            .then((response) => response.json())
            .then((productData) => {
              return {
                productId: item.product_id,
                productName: productData.name,
                productVol: productData.volume,
                productMl: productData.ml,
                productFlavor: productData.flavor,
                productPrice: item.priceProduct,
                imgProduct: item.imgProduct,
              };
            });
        });

        Promise.all(productosPromises)
          .then((productosData) => {
            setProductos(productosData);
          })
          .catch((error) => {
            console.error("Error fetching productos data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <View style={styles.c}>
      <LinearGradient
        colors={["rgba(71, 46, 204, 1)", "rgba(139, 75, 242, 1)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.cont} 
      >
        <View style={styles.container}>
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>
              Hola,{" "}
              <Text style={{ fontWeight: "bold" }}>
                {userName.charAt(0).toUpperCase()}
                {userName.slice(1).toLowerCase()}
              </Text>{" "}
            </Text>
            <Text style={styles.productDescription}>
              Cuida tu salud y mente con un trago.
            </Text>
          </View>
          <Image
            source={{
              uri: perfil,
            }}
            style={styles.productImage}
          />
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Busca tus bebidas favoritas aquí!"
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Promociones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Recomendado</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productScrollView}
      >
        {promociones.map((promocion, index) => (
          <View key={index}>
            <LinearGradient
              colors={["rgba(49, 68, 39, 1)", "rgba(26, 34, 3, 1)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.productItem}
            >
              <Image
                source={{ uri: promocion.imgProduct }}
                style={styles.productItemImage}
                resizeMode="contain"
              />
              <View style={styles.productLetra}>
                <Text style={styles.productItemTitle}>
                  {promocion.productName}
                </Text>
                <View style={styles.text}>
                  <Text style={styles.rightText}>Solo por 5 días </Text>
                  <Text style={styles.leftText}>
                    s/ {promocion.promotionPrice}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Todos</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productScrollView2}
      >
        {productos.map((product, index) => (
          <TouchableOpacity
            key={product.productId}
            onPress={() =>
              navigation.navigate("ProductScreen", { product: product })
            }
          >
            <View>
              <LinearGradient
                colors={
                  index % 3 === 0
                    ? ["rgba(162, 187, 12, 1)", "rgba(183, 94, 12, 1)"]
                    : index % 3 === 1
                    ? ["rgba(15, 12, 187, 1)", "rgba(12, 152, 183, 1)"]
                    : ["rgba(152, 187, 12, 1)", "rgba(16, 183, 12, 1)"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.productItem2}
              >
                <Image
                  source={{ uri: product.imgProduct }}
                  style={styles.productItemImage2}
                  resizeMode="contain"
                />

                <View style={styles.productLetra2}>
                  <View style={styles.cuad}>
                    <View style={styles.text2}>
                      <Text style={styles.productItemTitle2}>
                        {product.productName.split(" ").slice(0, -1).join(" ")}
                      </Text>
                      <Text>Sabor {product.productFlavor}</Text>
                    </View>
                    <Icon
                      name="heart"
                      size={17}
                      color="#000"
                      style={styles.LikeIcon}
                    />
                  </View>
                  <View style={styles.cuad}>
                    <Text style={styles.productItemPreci2}>
                      s/{product.productPrice}
                    </Text>
                    <Icon
                      name="shopping-cart"
                      size={20}
                      color="#000"
                      style={styles.buyIcon}
                    />
                  </View>
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.horizontalLine}></View>
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButtonXD}>
          <Icon name="home" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={handleChatButtonClick}>
          <Icon name="comment" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="star" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="cart-plus" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="bars" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  c: {
    flex: 1,
    backgroundColor: "rgba(14, 12, 20, 1)",
  },
  cont: {
    backgroundColor: "hsl(262, 47%, 55%)",
    borderRadius: 10,
    margin: 16,
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
    elevation: 2,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  container: {
    flexDirection: "row",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "#f0f0f0", // Color de fondo del contenedor de búsqueda
    borderRadius: 5, // Borde redondeado para el contenedor de búsqueda
    padding: 1, // Espaciado interno
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10, // Espaciado izquierdo
  },
  searchButton: {
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  //----------------------------------------------------------------

  //----------------------------------------------------------------
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginRight: 16,
    borderColor: "#fff",
    borderWidth: 1,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    color: "#fff",
    fontSize: 26,
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: "white",
    marginBottom: 8,
  },

  // ----------------------------------------------------------------
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 20, // Espaciado horizontal
  },
  button: {
    backgroundColor: "#242030", // Color de fondo del botón
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6, // Bordes redondeados para el botón
    marginRight: 20,
  },
  buttonText: {
    color: "white", // Color del texto del botón
    fontWeight: "bold",
  },
  // ----------------------------------------------------------------
  productScrollView: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 19,
  },

  productItem: {
    flexDirection: "row",
    padding: 10,
    marginRight: 10,
    width: Dimensions.get("window").width - 50,
    backgroundColor: "rgba(25, 36, 19, 1)",
    borderRadius: 10,
  },

  productItemImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginRight: 30,
  },
  productLetra: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  productItemTitle: {
    marginTop: 5,
    fontSize: 19,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftText: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: "bold",
    color: "yellow",
  },
  rightText: {
    fontSize: 13,
    fontStyle: "italic",
    color: "white",
  },
  //----------------------------------------------------------------
  productScrollView2: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 19,
  },

  productItem2: {
    flexDirection: "column",
    padding: 10,
    marginRight: 10,
    width: 170,
    borderRadius: 10,
  },

  productItemImage2: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginLeft: 10,
  },
  cuad: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productItemTitle2: {
    fontWeight: "bold",
    fontSize: 15,
  },
  productItemPreci2: {
    fontWeight: "bold",
    fontSize: 15,
  },
  LikeIcon: {
    marginTop: 10,
  },
  //---------------------------------------------------------------
  horizontalLine: {
    borderBottomColor: "dimgray",
    borderBottomWidth: 1,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center", // Centra los botones horizontalmente
    marginVertical: 10, // Espaciado vertical
  },
  socialButtonXD: {
    backgroundColor: "rgba(139, 75, 242, 1)",
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10, // Espaciado horizontal entre botones
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 18, // Espaciado horizontal entre botones
  },
});
