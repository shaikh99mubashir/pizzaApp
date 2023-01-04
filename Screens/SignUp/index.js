import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

const SignUp = ({navigation}) => {

    const [signupInput, setSignupInput] = useState({
      username: '',
      email: '',
      password: '',
      isAdmin: false
    });

    const signupWithFireBase = () => {
      const {username, email, password, isAdmin} = signupInput;
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          const obj = {email, username, isAdmin}
          database().ref(`users/${user.uid}`)
          .set(obj)
          .then((success) => {
            console.log(success);
          })
          .catch(err => {
            console.log(err);
          });
          navigation.navigate('Login');
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log('errorMessage==>', errorMessage);
        });
    };
  
  return (
    <View style={{backgroundColor:'white', height:'100%', }}>
    <ScrollView>
      <View>
      <Text style={{color:'black', fontSize:35, fontWeight:'bold', paddingLeft:20, marginTop:20}}>Signup</Text>
      </View>
      <View style={{marginHorizontal:10}}>
      <TextInput
       onChangeText={e => {
              setSignupInput({...signupInput, username: e});
            }}
          placeholder="Enter User Name"
          placeholderTextColor='black'
          style={styles.input}
        />
      <TextInput
       onChangeText={e => {
              setSignupInput({...signupInput, email: e});
            }}
          placeholder="Enter Email"
          placeholderTextColor='black'
          style={styles.input}
        />
      <TextInput
       onChangeText={e => {
              setSignupInput({...signupInput, password: e});
            }}
          placeholder="Password"
          placeholderTextColor='black'
          style={styles.input}
          secureTextEntry={true}
        />
      </View>

      <View style={{marginTop:30}}>
      <TouchableOpacity style={{alignItems:'center'}} onPress={signupWithFireBase}>
        <Text style={{color:'black', textAlign:'center', fontSize:20, fontWeight:'bold', backgroundColor:'#7e809d', width:'40%',borderRadius:10, padding:5 }}>SignUp</Text>
      </TouchableOpacity>
      </View> 
      <View>
      <TouchableOpacity style={{alignItems:'center'}} onPress={()=>navigation.navigate('Login')}>
        <Text style={{color:'black', textAlign:'center',marginTop:30}}>Already Have Account? Login</Text>
      </TouchableOpacity>
      </View>

      <View>
        <Text style={{color:'black', textAlign:'center',marginTop:30}}>Sponsered</Text>
      </View>

    </ScrollView>
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


export default SignUp