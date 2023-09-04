import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

const SelectedProduct = () => {
  const route = useRoute();
  const {
    productName,
    productPrice,
    productQuantity,
    productFlavor,
  } = route.params;

  return (
    <View>
      <Text>Product Name: {productName}</Text>
      <Text>Product Price: {productPrice}</Text>
      <Text>Product Quantity: {productQuantity}</Text>
      <Text>Product Flavor: {productFlavor}</Text>
    </View>
  );
};

export default SelectedProduct;
