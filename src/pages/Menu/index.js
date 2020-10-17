import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  View,
} from 'react-native';
import {Block, Icon, Text} from 'galio-framework';
import {SafeAreaView} from 'react-native-safe-area-context';
import FoodCard from '../../components/FoodCard';
import {foods} from './mock';

const MenuPage = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableWithoutFeedback>
          <Block row>
            <Icon family="Ionicons" name="filter-list" size={25} />
            <Text p style={{marginLeft: 10}}>
              Filters
            </Text>
          </Block>
        </TouchableWithoutFeedback>
      </SafeAreaView>
      <ScrollView>
        {foods.map((props, index) => (
          <FoodCard key={index} {...props} />
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

export default MenuPage;
