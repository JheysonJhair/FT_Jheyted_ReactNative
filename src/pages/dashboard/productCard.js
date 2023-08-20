import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Importa useRoute

export default function ProductCard() {
  const route = useRoute();
  
  // Usa directamente route.params.userName en lugar de declarar una nueva constante
  const userName = route.params?.userName || '';
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            'https://i.pinimg.com/564x/80/b4/eb/80b4eb114076e7cd344c357b14cdf91d.jpg', 
        }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>Nombre del Producto</Text>
        <Text style={styles.productDescription}>Descripción breve del producto.</Text>
        <Text>Bienvenido, {userName}!</Text>
        <Text style={styles.productPrice}>$99.99</Text>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>COMPRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2, 
    shadowColor: 'rgba(0, 0, 0, 0.1)', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 8,
  },
  buyButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
