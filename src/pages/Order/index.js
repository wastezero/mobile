import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Button } from 'galio-framework';
import { CancelOrder, CreateChat, GetOrder, MakeOrder } from 'src/api';
import { InfoField } from 'src/components';

const OrderPage = ({ route, navigation }) => {
  const [order, setOrder] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [myOrder, setMyOrder] = useState(false);

  const getFood = useCallback(
    async (id) => {
      const res = await GetOrder(id);
      navigation.setOptions({ title: res.orders.food.name });
      setOrder(res.orders);
    },
    [navigation],
  );

  const onButtonClick = async (id) => {
    setIsLoading(true);
    if (myOrder) {
      await CancelOrder(id);
    } else {
      await MakeOrder(id);
    }
    navigation.goBack();
  };

  const onChatClick = async (id) => {
    setIsLoading(true);
    const res = await CreateChat(id);
    setIsLoading(false);
    navigation.navigate('Chat', {
      title: res.user.restaurant || res.user.name,
      id: res.id,
    });
  };

  useEffect(() => {
    const id = route.params.id;
    const isMyOrder = route.params.myOrder;
    setMyOrder(!!isMyOrder);
    getFood(id);
  }, [getFood, route, navigation]);

  return (
    <View style={styles.container}>
      {order ? (
        <>
          <Image
            source={
              order.food.image
                ? {
                    uri: order.food.image,
                  }
                : require('../../assets/noimage.jpg')
            }
            style={styles.image}
          />
          <View style={styles.content}>
            <Text style={styles.name}>{order.food.name}</Text>
            <InfoField field="Price" value={order.price + '₸'} />
            <InfoField field="Cuisine" value={order.food.cuisine} />
            {order.branch && (
              <>
                <InfoField
                  field="Restaurant"
                  value={order.branch.restaurant.name}
                />
                <InfoField
                  field="Address"
                  value={
                    order.branch.address.street +
                    ' ' +
                    order.branch.address.house_number
                  }
                />
              </>
            )}
            <Button
              color="transparent"
              shadowless
              style={styles.button}
              onPress={() => onChatClick(order.client.id)}>
              {isLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text>Write a message</Text>
              )}
            </Button>
            <Button
              color="transparent"
              shadowless
              style={styles.button}
              onPress={() => onButtonClick(order.id)}>
              {isLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text>{myOrder ? 'Cancel order' : 'Order'}</Text>
              )}
            </Button>
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
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
    resizeMode: 'stretch',
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  name: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  button: {
    width: '100%',
    margin: 0,
    marginTop: 10,
    borderWidth: 1,
  },
});

export default OrderPage;
