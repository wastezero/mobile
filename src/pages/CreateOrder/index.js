import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import { Input } from 'src/components';
import { Button, Text } from 'galio-framework';

const CreatePage = ({ navigation, route }) => {
  const [image, setImage] = useState();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Food Name</Text>
        <Input placeholder="Food Name" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Price</Text>
        <Input placeholder="Price" keyboardType="numeric" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Cuisine</Text>
        <Input placeholder="Cuisine" />
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
      <Button color="success">
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
