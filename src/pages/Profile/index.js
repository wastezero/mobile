import React, {useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Button} from 'galio-framework';

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.name}>Nursultan Akhmetzhanov</Text>
      </SafeAreaView>
      <Button color="transparent" shadowless style={styles.button}>
        <Text>My orders</Text>
      </Button>
      <Button color="transparent" shadowless style={styles.button}>
        <Text>Edit profile</Text>
      </Button>
      <Button color="transparent" shadowless style={styles.button}>
        <Text>Log Out</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    paddingHorizontal: 20,
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

export default ProfilePage;
