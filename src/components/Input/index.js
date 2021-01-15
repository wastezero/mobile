import React from 'react';
import { StyleSheet, TextInput, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

export const Input = ({ onChange, isSecure, ...rest }) => (
  <TextInput
    style={styles.input}
    onChangeText={onChange}
    secureTextEntry={isSecure}
    placeholderTextColor="rgba(0,0,0,0.4)"
    underlineColorAndroid="transparent"
    {...rest}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isSecure: PropTypes.bool,
  keyboardType: PropTypes.string,
};

Input.defaultProps = {
  keyboardType: 'default',
};

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  input: {
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#32495b',
    color: '#000',
  },
});
