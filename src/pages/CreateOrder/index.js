import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import { Input } from 'src/components';
import { Button, Text } from 'galio-framework';
import { CreateOrder } from 'src/api';

const CreatePage = ({ navigation, route }) => {
  const [image, setImage] = useState();
  const [name, setName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [price, setPrice] = useState(0);

  const onSubmit = async () => {
    try {
      await CreateOrder({ name, price, cuisine });
      navigation.goBack();
    } catch (e) {
      Alert(e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Food Name</Text>
        <Input
          placeholder="Food Name"
          value={name}
          onChange={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Price</Text>
        <Input
          placeholder="Price"
          keyboardType="numeric"
          value={price.toString()}
          onChange={(text) => setPrice(Number(text))}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Cuisine</Text>
        <Input
          placeholder="Cuisine"
          value={cuisine}
          onChange={(text) => setCuisine(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Pick up address</Text>
        <Input placeholder="Address" />
      </View>
      {image && <Image source={{ uri: image.uri }} style={styles.image} />}
      <Button
        onPress={() => {
          launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: true,
            },
            (response) => {
              setImage(response);
            },
          );
        }}>
        <Text>{image ? 'Change Image' : 'Add Image'}</Text>
      </Button>
      <Button color="success" onPress={onSubmit}>
        <Text>Post Food</Text>
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  labelText: {
    fontSize: 17,
  },
  inputContainer: {
    marginTop: 10,
  },
  image: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default CreatePage;
