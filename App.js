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
    SafeAreaView, FlatList,TouchableOpacity,Alert,ScrollView,
} from 'react-native';
import { useState } from 'react';
import * as Permissions from 'expo-permissions';
import CalendarStrip from 'react-native-calendar-strip';
import Moment from 'moment';

let mEmail = '';
let mPassword = '';
let mClinicName = '';
let mPhoneNumber = '';
let mAddress ='';
var errorMsg ='';

let userJson ={
    "email": mEmail,
    "password": mPassword,
    "clinic_name": mClinicName,
    "phone_number": mPhoneNumber,
    "address": mAddress
};
let bookingResponse = {
    "isPass":true,
    "booking":[],
};

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
const regUrl = 'http://192.168.1.9:3000/users/register';

function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder='email'
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => onChangeText('email', val)}
        />
      <TextInput
        style={styles.input}
        placeholder='password'
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => onChangeText('password', val)}
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
                        bookingResponse = responseJson;
                        // bookingResponse.booking.map((item,key) =>{
                        //     if(key ===1){
                        //         showList.push(item)
                        //     }
                        //     console.log(item);
                        //     console.log(key);
                        // })

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
        keyboardType="numeric"
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

                fetch(regUrl, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Accept':       'application/json',
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        email: mEmail,
                        password: mPassword,
                        clinic_name: mClinicName,
                        phone_number: mPhoneNumber,
                        address: mAddress
                    }),
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    try {
                        console.log(responseJson.isPass)
                        if(responseJson.isPass == true){
                            navigation.goBack();
                        }else {
                            errorMsg = responseJson.msg;
                            console.log(errorMsg);
                            Alert.alert(
                                errorMsg,
                                '',
                                [
                                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                                ],
                                { cancelable: false }
                            )
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
  );
}

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>"Clinic:"{item.clinic}</Text>
        <Text style={styles.title}>"DoctorName:"{item.doctor_name}</Text>
        <Text style={styles.title}>"PatientName:"{item.patient_name}</Text>
        <Text style={styles.title}>"Diagnosis:"{item.diagnosis}</Text>
        <Text style={styles.title}>"Medication:"{item.medication}</Text>
        <Text style={styles.title}>"ConsultationFee:"{item.consultation_fee}</Text>
    </TouchableOpacity>
);



function DetailsScreen({ navigation }) {
    let showList=[]
    const renderItem = ({ item }) => {
        return (
            <Item
            item={item}
            style={{ backgroundColor:'#fff' }}/>
    );
    };
    const [userdetail, setUserDetail] = useState(null);

    return (
    <View styles={styles.container}>
        <CalendarStrip
            scrollable
            style={{height:100, paddingTop: 20, paddingBottom: 10}}
            startingDate={new Date()}
            calendarColor={'#3343CE'}
            calendarHeaderStyle={{color: 'white'}}
            dateNumberStyle={{color: 'white'}}
            dateNameStyle={{color: 'white'}}
            iconContainer={{flex: 0.1}}
            onDateSelected ={ (date) =>{

                // var date = new Date().getDate(); //To get the Current Date
                // var month = new Date().getMonth() + 1; //To get the Current Month
                // var year = new Date().getFullYear(); //To get the Current Year
                // const nowDate = year+"-"+month+"-"+date
                // console.log(nowDate);
                bookingResponse.booking.map((item,key) =>{
                    if(key ===1){
                        console.log( typeof(item.date));
                        console.log(item.date);
                        setUserDetail(item);
                    }
                })

                console.log(showList);

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
            console.log(bookingResponse)
        }}
        title="monthly"
        color="#90A4AE"
        />
        </View>
        </View>

            <SafeAreaView>
            <ScrollView styles={styles.scrollView}>
                <FlatList
                    data={bookingResponse.booking}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.clinic}
                    extraData={userdetail}
                />
                </ScrollView>
            </SafeAreaView>

    </View>

  );
}

function onChangeText(key, val){
    if (key == 'email') {
        mEmail = val
    }
    else if (key == 'password') {
        mPassword = val
    }
    else if (key == 'clinic_name') {
        mClinicName = val
    }
    else if (key == 'phone_number') {
        mPhoneNumber = val
    }
    else if (key == 'address') {
        mAddress = val
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
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
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



