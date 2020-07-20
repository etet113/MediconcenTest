// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
    StatusBar,
    SafeAreaView, FlatList,TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import * as Permissions from 'expo-permissions';
import CalendarStrip from 'react-native-calendar-strip';
import Moment from 'moment';

let mEmail = 'nono123011@yahoo.com.hk';
let mPassword = '123456';
var errorMsg ='';
const Stack = createStackNavigator();

export default App;

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const url = 'http://192.168.1.9:3000/users/login';
function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>

      <TextInput

        style={styles.input}
        placeholder='email'
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => onChangeText('email', val)}
        defaultValue='nono123011@yahoo.com.hk'
        />
      <TextInput
        style={styles.input}
        placeholder='password'
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => onChangeText('password', val)}
        defaultValue='123456'
        />
      <View style={styles.touchable}>
      <Button
        title='LogIn'
        onPress={() => {

            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept':       'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    email: mEmail,
                    password: mPassword,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                try {
                    console.log(responseJson.isPass)
                    if(responseJson.isPass == true){
                        userJson = responseJson;
                        navigation.navigate('Details');
                    }
                } catch (err) {
                    console.log('error signing up: ', err)
                }
            })
            .catch((error) => {
                console.error(error);
            });
          }
        }
      />
      </View>
      <Button
        title='Registration'
        onPress={() => {
            navigation.navigate('Registration')
          }
        }/>

    </View>
  );
}

function RegistrationScreen({ navigation }) {
  return (
    // email: '', password: '', clinic_name: '', phone_number: '',address: ''
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='email'
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => onChangeText('email', val)}/>
      <TextInput
        style={styles.input}
        placeholder='password'
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => onChangeText('password', val)}/>
      <TextInput
        style={styles.input}
        placeholder='clinic_name'
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => onChangeText('clinic_name', val)}/>
      <TextInput
        style={styles.input}
        placeholder='phone_number'
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => onChangeText('phone_number', val)}/>
      <TextInput
        style={styles.input}
        placeholder='address'
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => onChangeText('address', val)}/>
        <Button
          title='LogIn'
          onPress={() => {
              navigation.goBack()
            }
          }
        />
    </View>
  );
}

let userJson ={};


const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
<Text style={styles.title}>{item.date}</Text>
    </TouchableOpacity>
);

function DetailsScreen({ navigation }) {

    const renderItem = ({ item }) => {
        return (
            <Item
            item={item}
            style={{ backgroundColor:'#fff' }}/>
    );
    };

    return (
    <View styles={styles.container}>
        <CalendarStrip
            scrollable
            style={{height:100, paddingTop: 20, paddingBottom: 10}}
            calendarColor={'#3343CE'}
            calendarHeaderStyle={{color: 'white'}}
            dateNumberStyle={{color: 'white'}}
            dateNameStyle={{color: 'white'}}
            iconContainer={{flex: 0.1}}
            onDateSelected ={ (date) =>{
                console.log(date)
            }}
            />
        <View style = {{flexDirection: 'row'}}>
        <View style={[{ width: "50%", backgroundColor: "red" }]}>
        <Button
        onPress={()=>{
            var date = new Date().getDate();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();


            console.log(new Date())
         }}
        title="weekly"
        color="#90A4AE"
        />
        </View>
        <View style={[{ width: "50%", backgroundColor: "red" }]}>
        <Button
        onPress={()=>{
            console.log(userJson)
        }}
        title="monthly"
        color="#90A4AE"
        />
        </View>
        </View>
            <SafeAreaView styles={styles.container} >
                <FlatList
            data={userJson.booking}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            />
            </SafeAreaView>
    </View>

  );
}


function onChangeText(key, val){
  if (key == 'email') {
    mEmail = val
  }
  if (key == 'password') {
    mPassword = val
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexGrow: 1
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
    marginBottom: 36
  },
  errorColor:{
    color: 'red'
  },
  row:{
      // alignItems: 'stretch',
      backgroundColor:'#fa8072',
      marginTop: StatusBar.currentHeight+ 20,
      // alignContent:'stretch' ,
      flexDirection: 'row',
  },

    list: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },

});



