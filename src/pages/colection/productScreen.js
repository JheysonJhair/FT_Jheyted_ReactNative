import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const ProductScreen = ({ route }) => {
  const [selectedFlavor, setSelectedFlavor] = useState("green");
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { product } = route.params;

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "XGOSTORE",
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

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleFlavorSelect = (flavor) => {
    setSelectedFlavor(flavor);
  };

  return (
    <View style={styles.cont}>
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text style={styles.productFlavor}>Sabores</Text>
          <TouchableOpacity
            style={[
              styles.flavorCircle,
              {
                backgroundColor:
                  selectedFlavor === "#C7E707" ? "transparent" : "#C7E707",
              },
              selectedFlavor === "#C7E707" ? styles.selectedFlavor : null,
            ]}
            onPress={() => handleFlavorSelect("#C7E707")}
          />
          <TouchableOpacity
            style={[
              styles.flavorCircle,
              {
                backgroundColor:
                  selectedFlavor === "#06A003" ? "transparent" : "#06A003",
              },
              selectedFlavor === "#06A003" ? styles.selectedFlavor : null,
            ]}
            onPress={() => handleFlavorSelect("#06A003")}
          />
          <TouchableOpacity
            style={[
              styles.flavorCircle,
              {
                backgroundColor:
                  selectedFlavor === "#B91B96" ? "transparent" : "#B91B96",
              },
              selectedFlavor === "#B91B96" ? styles.selectedFlavor : null,
            ]}
            onPress={() => handleFlavorSelect("#B91B96")}
          />
          <TouchableOpacity
            style={[
              styles.flavorCircle,
              {
                backgroundColor:
                  selectedFlavor === "#1153FC" ? "transparent" : "#1153FC",
              },
              selectedFlavor === "#1153FC" ? styles.selectedFlavor : null,
            ]}
            onPress={() => handleFlavorSelect("#1153FC")}
          />
        </View>
        <View style={styles.mlVolContainer}>
          <Text style={styles.mlText}>{product.productMl}</Text>
          <Text style={styles.volText}>{product.productVol} vl</Text>
        </View>
        <View style={styles.middleColumn}>
          <Text style={styles.productName}>{product.productName}</Text>

          <Text style={styles.productFlavor}>
            Con saborisante {product.productFlavor}
          </Text>
          <Image
            source={{ uri: product.imgProduct }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.productFlavor}>Favorito</Text>
          <TouchableOpacity onPress={handleFavoriteToggle}>
            <Icon
              name={isFavorite ? "heart" : "heart-o"}
              size={24}
              style={{ marginBottom: 20, marginTop: 5 }}
              color={isFavorite ? "red" : "gray"}
            />
          </TouchableOpacity>
          <Text style={styles.productFlavor}>Cantidad</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={handleIncrementQuantity}>
              <View style={styles.squareBorder}>
                <Icon name="plus" size={18} color="white" />
              </View>
            </TouchableOpacity>
            <View style={styles.squareBorder}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
            <TouchableOpacity onPress={handleDecrementQuantity}>
              <View style={styles.squareBorder}>
                <Icon name="minus" size={18} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.bottomLeft}>
          <Text style={styles.productPrice}>
            s/{product.productPrice.toFixed(2)}
          </Text>
        </View>
        <View style={styles.bottomRight}>
          <Text style={styles.productFlavor}>Mezclar</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity>
              <View style={styles.squareBorder}>
                <Icon name="key" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.waveContainer}>
        <View style={styles.wave}></View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SelectedProduct", {
            productName: product.productName,
            productPrice: product.productPrice.toFixed(2),
            productQuantity: quantity,
            productFlavor: selectedFlavor,
          });
        }}
      >
        <Icon name="cart-plus" size={45} color="white" style={styles.logo} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    backgroundColor: "rgba(14, 12, 20, 1)",
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(14, 12, 20, 1)",
    paddingHorizontal: 20,
  },
  leftColumn: {
    position: "absolute",
    height: "95%",
    left: 10, // Ajusta la posición izquierda según tus necesidades
    alignItems: "center",
  },
  flavorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  selectedFlavor: {
    borderColor: "white",
  },
  mlVolContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  mlText: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 200,
  },
  volText: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 5,
  },
  /*-------------------------*/
  middleColumn: {
    alignItems: "center",
    height: "85%",
  },
  productName: {
    fontSize: 19,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
  },
  productFlavor: {
    fontSize: 16,
    marginBottom: 10,
    color: "rgba(255, 255, 255, 0.6)",
  },
  productImage: {
    marginTop: 18,
    width: 270,
    height: 390,
    resizeMode: "cover",
    marginBottom: 20,
  },
  /*-------------------------*/
  rightColumn: {
    position: "absolute",
    right: 10, // Ajusta la posición derecha según tus necesidades
    height: "95%",
    alignItems: "center",
  },
  quantityContainer: {
    alignItems: "center",
  },
  quantityText: {
    color: "white",
    fontWeight: "bold",
    marginRight: 3,
    marginLeft: 3,
  },
  squareBorder: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 8,
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
    color: "white",
  },
  mixButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  mixButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  /* -----------------*/
  bottomRow: {
    position: "absolute",
    bottom: 150,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
  },
  bottomLeft: {
    flex: 1,
  },
  bottomRight: {
    marginLeft: 20,
  },
  addButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addButtonText: {
    position: "absolute",
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  /*--------*/
  waveContainer: {
    position: "absolute",
    bottom: -360,
    width: "100%",
    alignItems: "center",
  },
  wave: {
    width: 500,
    height: 500,
    borderRadius: 240,
    backgroundColor: "#8B4BF2",
    opacity: 0.7,
  },
  logo: {
    bottom: 40,
    alignSelf: "center",
  },
});

export default ProductScreen;
