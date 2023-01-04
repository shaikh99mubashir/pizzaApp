import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Category = ({navigation}) => {
  const name = Math.floor((Math.random() * 10000000000) / 20);

  const [category, setCategory] = useState({
    itemCategory: '',
    imageUri:'',
  });

  let sendCategoryDataToDb = () => {
    category.id = database().ref(`category`).push().key;
    database()
      .ref('Categories/' + category.id)
      .set(category)
      .then(() => {
        console.log('success');
        setCategory('');
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        var errorMessage = error.message;
        console.log('error', errorMessage);
      });
  };

  const uploadImage = () => {
    let options = {
      storageOption: {},
    };
    launchImageLibrary(options, response => {
      const image = response.assets[0];
      if (image) {
        storage()
          .ref(`Images/${name}`)
          .putFile(image.uri)
          .then(e => {
            storage()
              .ref(`Images/${name}`)
              .getDownloadURL()
              .then(url => {
                setCategory({...category, imageUri: url});
              });
          });
      }
    });
  };


  return (
    <View style={{backgroundColor: 'white', height: '100%', width: '100%'}}>
      <ScrollView>
        <View style={{marginTop: '20%'}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 40,
              color: '#e86a12',
              fontWeight: 'bold',
            }}>
            CATEGORY
          </Text>
        </View>
        <View style={{marginTop: '10%', alignItems:'center', justifyContent:'center'}}>
          <TextInput
            placeholder="Enter Category"
            placeholderTextColor="black"
            style={styles.input}
            onChangeText={e => {
              setCategory({...category, itemCategory: e});
            }}
          />
        

        <View style={{alignItems: 'center', marginTop: '1%'}}>
          <TouchableOpacity
            onPress={uploadImage}
            style={{
              borderWidth:1,
              // borderColor:'#e86a12',
              width: 320,
              height: 50,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#e86a12', fontSize: 22}}>
              {category.imageUri? 'imgae Uplodaed' : 'select Image'}
            </Text>
          </TouchableOpacity>
        </View>
        </View>
        <View style={{alignItems: 'center', marginTop: '10%'}}>
          <TouchableOpacity
            onPress={sendCategoryDataToDb}
            style={{
              backgroundColor: '#e86a12',
              width: 200,
              height: 40,
              borderRadius: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
              Add Category
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 12,
    fontSize: 22,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderColor: 'black',
    color: 'black',
    width: 320,
  },
});

export default Category;
