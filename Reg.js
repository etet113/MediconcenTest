import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text
} from 'react-native';

export default class Reg extends React.Component {
  state = {
    email: '', password: '', clinic_name: '', phone_number: '',address: '',
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { email, password, clinic_name, phone_number,address } = this.state




    // try {
    //   // here place your signup logic
    //   console.log('user successfully signed up!: ', success)
    // } catch (err) {
    //   console.log('error signing up: ', err)
    // }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='clinic_name'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('clinic_name', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='phone_number'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('phone_number', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='addressr'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('address', val)}
        />
        <Button
          title='Sign Up'
          onPress={this.signUp}
        />
        <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
   flexGrow: 1,
  },
  input:{
    backgroundColor:'#fa8072',
    width:'80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 36
  },
  touchable:{
    marginTop: 36
  }

});
