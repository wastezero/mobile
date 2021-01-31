import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Block, Button, Icon, Input, Text, Switch } from 'galio-framework';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';

import { FoodCard } from 'src/components';
import { GetOrders, GetOrdersByFilters } from 'src/api';
import Geolocation from '@react-native-community/geolocation';

const MenuPage = ({ navigation }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isNearby, setIsNearby] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [orders, setOrders] = useState([]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleNearby = () => {
    setIsNearby(!isNearby);
  };

  const onSearch = (text) => {
    setSearchValue(text);
  };

  const getOrders = async () => {
    const res = await GetOrders();
    setOrders(res.orders);
  };

  const onFiltersApply = async () => {
    console.log('nearby', isNearby);
    const res = await GetOrdersByFilters({
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
      userLocation: isNearby ? userLocation : undefined,
    });
    toggleFilters();
    setOrders(res.orders);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getOrders();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={toggleFilters}>
          <Block row>
            <Icon family="Ionicons" name="filter-list" size={25} />
            <Text p style={{ marginLeft: 10 }}>
              Filters
            </Text>
          </Block>
        </TouchableWithoutFeedback>
        <Input
          placeholder="Search"
          value={searchValue}
          onChangeText={onSearch}
          color="#000"
        />
      </SafeAreaView>
      <ScrollView>
        {orders.map((order) => (
          <TouchableOpacity
            key={order.id}
            onPress={() => navigation.navigate('Order', { id: order.id })}>
            <FoodCard
              imageUrl={order.food.image}
              name={order.food.name}
              price={order.price}
              restaurant={order.branch.restaurant.name}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal
        isVisible={showFilters}
        style={styles.modal}
        onBackdropPress={toggleFilters}
        animationIn="slideInDown"
        animationOut="slideOutUp">
        <Block style={styles.modalContent}>
          <SafeAreaView>
            <View style={styles.inputFieldContainer}>
              <Text p style={{ marginRight: 20 }}>
                Price:
              </Text>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  value={minPrice}
                  onChangeText={setMinPrice}
                  placeholder="from"
                  type="numeric"
                  style={styles.inputPrice}
                />
                <Text>-</Text>
                <TextInput
                  placeholder="to"
                  value={maxPrice}
                  onChangeText={setMaxPrice}
                  type="numeric"
                  style={styles.inputPrice}
                />
              </View>
            </View>
            <View style={styles.inputFieldContainer}>
              <Text p style={{ marginRight: 20 }}>
                Nearby:
              </Text>
              <Switch value={isNearby} onChange={toggleNearby} />
            </View>
            <Button
              color="primary"
              style={{ alignSelf: 'center' }}
              uppercase
              shadowless
              onPress={onFiltersApply}>
              Apply Filters
            </Button>
          </SafeAreaView>
        </Block>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
  modal: {
    justifyContent: 'flex-start',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  inputPrice: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '30%',
    marginHorizontal: 10,
    padding: 5,
    textAlign: 'center',
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
});

export default MenuPage;
