import React,{useState,useEffect,useCallback} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, TextInput, ActivityIndicator, MD2Colors,} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL= 'http://10.70.1.34:3001/api/';

export default function App() {

  
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading , setIsLoading] = useState(false);
  const [token, setToken] = useState(null);

 const login = async() => {
    setIsLoading(true);
    const login_url = baseURL + 'account/login';

    const response = await fetch(login_url, {
      method: 'post',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    const data = await response.json();
    if(data){
      if(data.status){
        //Async
       //Alert.alert(data.token)
       setIsLoading(false);
       AsyncStorage.setItem('token', JSON.stringify({
        token: data.token
       }))
      } else {
        Alert.alert(data.message)
      }
    } else {
      Alert.alert('no data for you');
    }
  }


  useEffect(() => {
    getProducts();
  },[]);

  const getProducts = async() =>{
    const dataFromAsync = await AsyncStorage.getItem('token');
    if(dataFromAsync !== null){
      const value = JSON.parse(dataFromAsync);
      setToken(value.token);
      loadData();
    } else {
      Alert.alert('Pleace login');
    }
  }

  const loadData = async() => {
    const products_url =  baseURL+ 'product/getAllProducts';
    try {
      const respones = await fetch( baseURL+'product/getAllProducts',{
        method: 'get',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      })

      const data = await respones.json();

      if(data){
        if(data.status){
          console.log(data.message);
        } else {
          Alert.alert(data.message)
        }
      } else {
        Alert.alert('no data for you');
      }

    } catch (error) {
        Alert.alert(error.massege);
    }
  }


  return (
    <View style={styles.container}>
      <TextInput
       keyboardType='email-address'
       autoCapitalize='none'
        style={{width:'100%', marginBottom:12}}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder ='Pleace Enter Your email'
      />

        <TextInput
        keyboardType='default'
        secureTextEntry={true}
        style={{width:'100%', marginBottom:12}}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder ='Pleace Enter Your Password'
      />

      {
        isLoading ?(
          <ActivityIndicator animating={true} size={50} color={MD2Colors.red800} style={{margin:12}} />
        ) : (
          <Button
         onPress={login}
         mode="contained"
         style={{width:'100%',marginTop:12}} 
         icon="account" > LOGIN </Button> 
        )
      }

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
