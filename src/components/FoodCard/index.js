import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Block, Text } from 'galio-framework';
import PropTypes from 'prop-types';

export const FoodCard = ({ imageUrl, name, restaurant, price }) => {
  return (
    <Block style={styles.container} shadow shadowColor="#696969">
      <Image
        source={
          imageUrl
            ? {
                uri: imageUrl,
              }
            : require('../../assets/noimage.jpg')
        }
        style={styles.image}
      />
      <Block style={styles.info}>
        <Text h5>{name}</Text>
        {restaurant && (
          <Text p size={17} color="#696969">
            {restaurant}
          </Text>
        )}
      </Block>
      {price && <Text h4>{price} ₸</Text>}
    </Block>
  );
};

FoodCard.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  restaurant: PropTypes.string,
  price: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    height: 100,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 15,
  },
  info: {
    height: '100%',
    justifyContent: 'space-around',
    flex: 1,
  },
});
