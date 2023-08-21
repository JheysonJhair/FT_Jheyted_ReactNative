import React, { useState, useEffect } from "react";
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

export default function ProductCard() {
  const route = useRoute();
  const backgroundColors = [
    "hsl(45, 88%, 50%)",
    "hsl(211, 87%, 49%)",
    "hsl(81, 88%, 39%)",
  ];
  const userName = route.params?.userName || "";
  const [searchText, setSearchText] = useState("");

  const [products, setProducts] = useState([
    {
      id: "1",
      title: "Ruskaya + Everess",
      imageUri:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgOuWCjgJgxTB-OWyQG_7qcv66zCKoWPVmOHUYpxAkAUaCx16rH63UEkN0Qw6L5RzgycWiwPhhNw4bhHaNBRW1Byl0vF-nw0hiPSk3MxpgXrwyJg6WP7NncWVycCd_q2VhC56B76eQELjdqSRek8CWRGhpFDUbP0tJCv7pquRrrofdoCLfVsSKTvBNVOys/s700/10%20de%20los%20mejores%20c%C3%B3cteles%20de%20este%202023.png",
    },
    {
      id: "2",
      title: "Producto 2",
      imageUri:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgOuWCjgJgxTB-OWyQG_7qcv66zCKoWPVmOHUYpxAkAUaCx16rH63UEkN0Qw6L5RzgycWiwPhhNw4bhHaNBRW1Byl0vF-nw0hiPSk3MxpgXrwyJg6WP7NncWVycCd_q2VhC56B76eQELjdqSRek8CWRGhpFDUbP0tJCv7pquRrrofdoCLfVsSKTvBNVOys/s700/10%20de%20los%20mejores%20c%C3%B3cteles%20de%20este%202023.png",
    },
    {
      id: "3",
      title: "Producto 3",
      imageUri:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgOuWCjgJgxTB-OWyQG_7qcv66zCKoWPVmOHUYpxAkAUaCx16rH63UEkN0Qw6L5RzgycWiwPhhNw4bhHaNBRW1Byl0vF-nw0hiPSk3MxpgXrwyJg6WP7NncWVycCd_q2VhC56B76eQELjdqSRek8CWRGhpFDUbP0tJCv7pquRrrofdoCLfVsSKTvBNVOys/s700/10%20de%20los%20mejores%20c%C3%B3cteles%20de%20este%202023.png",
    },
    // Agrega más productos aquí según tus necesidades
  ]);
  const [products2, setProducts2] = useState([
    {
      id: "1",
      title: "Ruskaya",
      sabor: "Sabor apple",
      precio: 25,
      imageUri:
        "https://wongfood.vtexassets.com/arquivos/ids/448169/Whisky-Johnnie-Walker-Red-Label-Botella-750-ml-2-1890.jpg?v=637602600177300000",
    },
    {
      id: "2",
      title: "Four Loko",
      sabor: "Sabor blue",
      precio: 12,
      imageUri:
        "https://wongfood.vtexassets.com/arquivos/ids/448169/Whisky-Johnnie-Walker-Red-Label-Botella-750-ml-2-1890.jpg?v=637602600177300000",
    },
    {
      id: "Everess",
      title: "Sabor neutral",
      precio: 5,
      imageUri:
        "https://wongfood.vtexassets.com/arquivos/ids/448169/Whisky-Johnnie-Walker-Red-Label-Botella-750-ml-2-1890.jpg?v=637602600177300000",
    },
    // Agrega más productos aquí según tus necesidades
  ]);

  const handleSearch = () => {
    // Aquí puedes realizar la búsqueda con el texto ingresado en searchText
    Alert.alert("Búsqueda", `Buscar productos con: ${searchText}`);
  };
  return (
    <View style={styles.c}>
      <View style={styles.cont}>
        <View style={styles.container}>
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>
              Hola, <Text style={{ fontWeight: "bold" }}>{userName}</Text>{" "}
            </Text>
            <Text style={styles.productDescription}>
              Cuida tu salud y mente con un trago.
            </Text>
          </View>
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/cb/5d/64/cb5d64be736ab84602ee1bcd20303d4e.jpg",
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
      </View>
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
        {products.map((product) => (
          <View key={product.id} style={styles.productItem}>
            <Image
              source={{ uri: product.imageUri }}
              style={styles.productItemImage}
            />
            <View style={styles.productLetra}>
              <Text style={styles.productItemTitle}>{product.title}</Text>
              <View style={styles.text}>
                <Text style={styles.rightText}>solo por 5 días</Text>
                <Text style={styles.leftText}>s/40</Text>
              </View>
            </View>
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
        {products2.map((product, index) => (
          <View
            key={product.id}
            style={[
              styles.productItem2,
              {
                backgroundColor:
                  backgroundColors[index % backgroundColors.length],
              }, // Cambiar el color de fondo según la posición
            ]}
          >
            <Image
              source={{ uri: product.imageUri }}
              style={styles.productItemImage2}
            />
            <View style={styles.productLetra2}>
              <View style={styles.cuad}>
                <View style={styles.text2}>
                  <Text style={styles.productItemTitle2}>{product.title}</Text>
                  <Text>{product.sabor}</Text>
                </View>
                <Icon
                  name="heart"
                  size={17}
                  color="#000"
                  style={styles.LikeIcon}
                />
              </View>
              <View style={styles.cuad}>
                <Text style={styles.productItemPreci2}>s/{product.precio}</Text>
                <Icon
                  name="shopping-cart"
                  size={20}
                  color="#000"
                  style={styles.buyIcon}
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.horizontalLine}></View>
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButtonXD}>
          <Icon name="home" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="bell" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="heart" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="instagram" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="facebook" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  c: {
    flex: 1,
    backgroundColor: "#000",
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
    padding: 20,
    marginRight: 10,
    width: Dimensions.get("window").width - 50,
    backgroundColor: "rgba(25, 36, 19, 1)",
    borderRadius: 10,
  },

  productItemImage: {
    width: 130,
    height: 120,
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
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftText: {
    fontSize: 16,
    marginLeft: 20,
    fontWeight: "bold",
    color: "yellow",
  },
  rightText: {
    fontSize: 16,
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
    width: 160,
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
    fontSize: 22,
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
    borderBottomColor: "gray",
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