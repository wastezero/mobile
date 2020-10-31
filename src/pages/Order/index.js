import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {Button} from 'galio-framework';
import {foods} from '../Menu/mock';

const OrderPage = ({route, navigation}) => {
  const [selectedFood, setSelectedFood] = useState();

  useEffect(() => {
    const food = foods[route.params.id];
    navigation.setOptions({title: food.name});
    setSelectedFood(food);
  }, [route, navigation]);

  return (
    <View style={styles.container}>
      {selectedFood ? (
        <>
          <Image
            source={{
              uri: selectedFood.imageUrl,
            }}
            style={styles.image}
          />
          <View style={styles.content}>
            <Button color="transparent" shadowless style={styles.button}>
              <Text>Order</Text>
            </Button>
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" style={{marginTop: 20}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  name: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    width: '100%',
    margin: 0,
    marginTop: 10,
    borderWidth: 1,
  },
});

export default OrderPage;
