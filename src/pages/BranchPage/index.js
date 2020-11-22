import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  View,
} from 'react-native';

import FoodCard from '../../components/FoodCard';
import {GetBranch} from '../../api';
import {Text} from 'galio-framework';
import InfoField from '../../components/InfoField';

const BranchPage = ({navigation, route}) => {
  const [branch, setBranch] = useState();

  const getBranch = async (id) => {
    const res = await GetBranch(id);
    setBranch(res.branches);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const id = route.params.id;
      getBranch(id);
    });
    return unsubscribe;
  });

  return (
    <ScrollView style={styles.container}>
      {branch ? (
        <>
          <Image
            source={
              branch.restaurant.avatar
                ? {
                    uri: branch.restaurant.avatar,
                  }
                : require('../../assets/noimage.jpg')
            }
            style={styles.image}
          />
          <View style={styles.content}>
            <Text style={styles.name}>{branch.restaurant.name}</Text>
            <Text style={styles.description}>
              {branch.restaurant.description}
            </Text>
            <View style={{marginBottom: 20}}>
              <InfoField field="Cuisine" value={branch.restaurant.cuisine} />
              <InfoField
                field="Address"
                value={
                  branch.address.street + ' ' + branch.address.house_number
                }
              />
            </View>
            {branch.orders.map((order) => (
              <TouchableOpacity
                key={order.id}
                onPress={() => navigation.navigate('Order', {id: order.id})}>
                <FoodCard
                  imageUrl={order.food.image}
                  name={order.food.name}
                  price={order.price}
                  restaurant={branch.restaurant.name}
                />
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" style={{marginTop: 20}} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'stretch',
  },
  name: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  content: {
    paddingHorizontal: 20,
  },
});

export default BranchPage;
