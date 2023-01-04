import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const checkLogin = () => {
    const {email, password} = login;
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in
        var user = userCredential.user;
        console.log('user==>', user)
        if(user.email === 'mubashir5@gmail.com'){
          console.log('go to admin==>', user)
          navigation.navigate('Dashboard',);
        }
        else{
          navigation.navigate('UserDashboard',);
        }
        // ...
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };
  return (
    <View style={{backgroundColor:'white', height:'100%', justifyContent:'space-around'}}>
      <View>
      <Text style={{color:'black', fontSize:35, fontWeight:'bold', paddingLeft:20, marginTop:20}}>Hello there,</Text>
      <Text style={{color:'black', fontSize:35, fontWeight:'bold', paddingLeft:20, marginTop:20}}>Welcome Back!</Text>
      </View>
      <View style={{marginHorizontal:10}}>
      <TextInput
      onChangeText={e => setLogin({...login, email: e})}
          placeholder="Enter Email"
          placeholderTextColor='black'
          style={styles.input}
        />
      <TextInput
      onChangeText={e => setLogin({...login, password: e})}
          placeholder="Password"
          placeholderTextColor='black'
          style={styles.input}
          type='password'
        />
      </View>

      <View>
      <TouchableOpacity style={{alignItems:'center'}} onPress={checkLogin}>
        <Text style={{color:'black', textAlign:'center', fontSize:20, fontWeight:'bold', backgroundColor:'#7e809d', width:'40%',borderRadius:10, padding:5 }}>Login</Text>
      </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity style={{alignItems:'center'}}>
        <Text style={{color:'black', textAlign:'center',marginTop:10}}>Forget Password?</Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
        <Text style={{color:'black', textAlign:'center'}}>Don't Have Account? Signup</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderBottomWidth: 1,
    padding:0,
    borderColor: 'black',
    color:'black'
  },
 
});


export default Login