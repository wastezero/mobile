import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';

import { FoodCard } from 'src/components';
import { GetMyOrders } from 'src/api';

const MyOrdersPage = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const res = await GetMyOrders();
    setOrders(res.orders);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getOrders();
    });
    return unsubscribe;
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        {orders.map((order) => (
          <TouchableOpacity
            key={order.id}
            onPress={() =>
              navigation.navigate('Order', { id: order.id, myOrder: true })
            }>
            <FoodCard
              imageUrl={order.food.image}
              name={order.food.name}
              price={order.price}
              restaurant={order.branch && order.branch.restaurant.name}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
});

export default MyOrdersPage;
