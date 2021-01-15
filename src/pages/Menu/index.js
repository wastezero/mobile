import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Block, Button, Icon, Input, Text } from 'galio-framework';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';

import { FoodCard } from 'src/components';
import { GetOrders } from 'src/api';

const MenuPage = ({ navigation }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [orders, setOrders] = useState([]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const onSearch = (text) => {
    setSearchValue(text);
  };

  const getOrders = async () => {
    const res = await GetOrders();
    setOrders(res.orders);
  };

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
                  placeholder="from"
                  type="numeric"
                  style={styles.inputPrice}
                />
                <Text>-</Text>
                <TextInput
                  placeholder="to"
                  type="numeric"
                  style={styles.inputPrice}
                />
              </View>
            </View>
            <Button
              color="success"
              style={{ alignSelf: 'center' }}
              uppercase
              shadowless
              onPress={toggleFilters}>
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
