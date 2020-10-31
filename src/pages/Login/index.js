import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Input from '../../components/Input';
import {SignIn} from '../../api';

const LoginPage = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const onLoginClick = async () => {
    await SignIn(phone, password);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
        <Input
          placeholder="Phone number"
          value={phone}
          onChange={setPhone}
          keyboardType="phone-pad"
        />
        <Input
          placeholder="Password"
          onChange={setPassword}
          value={password}
          isSecure
        />
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.button} onPress={onLoginClick}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formContainer: {
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: '#32495b',
    borderRadius: 10,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
});
