import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Input from '../../components/Input';

const SignUpPage = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPass, setRepeatedPass] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');

  const onLoginClick = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
        <Input placeholder="First name" value={name} onChange={setName} />
        <Input placeholder="Last Name" value={surname} onChange={setSurname} />
        <Input
          placeholder="Phone number"
          value={phone}
          onChange={setPhone}
          keyboardType="phone-pad"
        />
        <Input
          placeholder="Email"
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
          autoCapitalize="none"
        />
        <Input
          placeholder="Repeat password"
          value={repeatedPass}
          onChange={setRepeatedPass}
          isSecure
          autoCapitalize="none"
        />
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.button} onPress={onLoginClick}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpPage;

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
