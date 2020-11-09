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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const onLoginClick = async () => {
    try {
      await SignIn(email, password);
      navigation.navigate('Main');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
        <Input
          placeholder="email"
          value={email}
          onChange={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          placeholder="Password"
          onChange={setPassword}
          value={password}
          isSecure
        />
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.button}
        onPress={onLoginClick}
        disabled={email.length === 0 || password.length === 0}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  errorText: {
    color: '#ff0000',
    marginTop: 10,
  },
});
