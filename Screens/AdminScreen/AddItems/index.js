import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const AddItems = ({navigation}) => {
  const [itemForm, setItemForm] = useState({
    itemType: '',
    itemName: '',
    itemSize: '',
    itemDescription: '',
    itemPrice: '',
    imageUri:'',
  });

  let sendItemFormDataToDb = () => {
    itemForm.id = database().ref(`itemForm`).push().key;
    database()
      .ref('Items/' + itemForm.id)
      .set(itemForm)
      .then(() => {
        console.log('success');
        setItemForm('');
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        var errorMessage = error.message;
        console.log('error', errorMessage);
      });
  };
  console.log('itemFOrm', itemForm)
  const [getCategory, setGetCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const getCategoryData = () => {
    database()
      .ref(`Categories`)
      .once('value', dt => {
        let data = dt.val();
        let mydata = Object.values(data);
        setGetCategory(mydata);
      });
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const categoryFunction = () => {
    if (!!getCategory) {
      let a = [];
      getCategory.map((e) => {
        let b = {};
        b.label = e.itemCategory;
        b.value = e.itemCategory;
        a.push(b);
      });
      setItems(a);
    }
  };

  useEffect(() => {
    categoryFunction();
  }, [getCategory]);

  const name = Math.floor((Math.random() * 10000000000) / 20);
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
                setItemForm({...itemForm, imageUri: url});
              });
          });
      }
    });
  };

  return (
    <ScrollView style={{height: '100%', backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <Text style={{color: '#e86a12', fontSize: 40, fontWeight: 'bold'}}>
            ADD Items
          </Text>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={e => {
              setItemForm({...itemForm, itemType: e});
            }}
          />
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <TextInput
            placeholder="Item Name"
            placeholderTextColor="black"
            style={styles.input}
            onChangeText={e => {
              setItemForm({...itemForm, itemName: e});
            }}
          />
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <TextInput
            placeholder="Size"
            placeholderTextColor="black"
            style={styles.input}
            onChangeText={e => {
              setItemForm({...itemForm, itemSize: e});
            }}
          />
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <TextInput
            placeholder="Description"
            placeholderTextColor="black"
            style={styles.input}
            onChangeText={e => {
              setItemForm({...itemForm, itemDescription: e});
            }}
          />
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <TextInput
            placeholder="Item Price"
            placeholderTextColor="black"
            style={styles.input}
            onChangeText={e => {
              setItemForm({...itemForm, itemPrice: e});
            }}
          />
        </View>
        <View style={{alignItems: 'center', marginTop:20}}>
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
              {itemForm.imageUri? 'Imgae Uplodaed' : 'Select Image'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginTop: '10%', marginBottom: '10%'}}>
          <TouchableOpacity
          onPress={sendItemFormDataToDb}
            style={{
              backgroundColor: '#e86a12',
              width: 200,
              height: 40,
              borderRadius: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
              Add Items
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    // margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    // padding:2,
    paddingHorizontal: 15,
    borderColor: 'black',
    color: 'black',
    width: 320,
  },
});

export default AddItems;
