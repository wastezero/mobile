import React, {useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Text} from 'react-native';
import {Button} from 'galio-framework';
import Input from '../../components/Input';
import {ValidateEmail} from '../../utils';
import {SignUp} from '../../api';

const SignUpPage = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPass, setRepeatedPass] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState();

  const onLoginClick = async () => {
    try {
      await SignUp(email, password, name, surname, phone, repeatedPass);
      navigation.navigate('Main');
    } catch (e) {
      setError(e.message);
    }
  };

  const isButtonActive = () => {
    return (
      phone.length &&
      password.length &&
      repeatedPass.length &&
      name.length &&
      surname.length &&
      email.length &&
      ValidateEmail(email) &&
      repeatedPass === password
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
        <Input placeholder="First name" value={name} onChange={setName} />
        {name.length === 0 && (
          <Text style={styles.errorText}>Name can not be empty</Text>
        )}
        <Input placeholder="Last Name" value={surname} onChange={setSurname} />
        {surname.length === 0 && (
          <Text style={styles.errorText}>Surname can not be empty</Text>
        )}
        <Input
          placeholder="Phone number"
          value={phone}
          onChange={setPhone}
          keyboardType="phone-pad"
        />
        {phone.length === 0 && (
          <Text style={styles.errorText}>Phone number can not be empty</Text>
        )}
        <Input
          placeholder="Email"
          value={email}
          onChange={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {!ValidateEmail(email) && (
          <Text style={styles.errorText}>Invalid email</Text>
        )}
        <Input
          placeholder="Password"
          onChange={setPassword}
          value={password}
          isSecure
          autoCapitalize="none"
        />
        {password.length === 0 && (
          <Text style={styles.errorText}>Passwords can not be empty</Text>
        )}
        <Input
          placeholder="Repeat password"
          value={repeatedPass}
          onChange={setRepeatedPass}
          isSecure
          autoCapitalize="none"
        />
        {repeatedPass.length > 0 && password !== repeatedPass && (
          <Text style={styles.errorText}>Passwords are not same</Text>
        )}
      </KeyboardAvoidingView>
      <Button
        style={styles.button}
        onPress={onLoginClick}
        disabled={!isButtonActive()}>
        <Text style={styles.buttonText}>Register</Text>
      </Button>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  errorText: {
    color: '#ff0000',
    alignSelf: 'flex-start',
  },
});
