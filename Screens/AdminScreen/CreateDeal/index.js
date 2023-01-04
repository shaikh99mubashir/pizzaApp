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
const CreateDeal = ({navigation}) => {
  const [dbItems, setDBItems] = useState([]);
  const [selectedDealItem, setSelectedDealItem] = useState([]);
  // const [count, setCount] = useState(0)
  const [createDeal, setCreateDeal] = useState({
    dealName: '',
    dealImage: '',
    dealPrice: '',
    dealItems: [],
  });
  const getItemsData = () => {
    database()
      .ref(`Items`)
      .once('value', dt => {
        let data = dt.val();
        let mydata = Object.values(data);
        setDBItems(mydata);
      });
  };
  console.log('create deal dbItems', dbItems);
  useEffect(() => {
    getItemsData();
  }, []);

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
                setCreateDeal({...createDeal, dealImage: url});
              });
          });
      }
    });
  };

  let sendDealDataToDb = () => {
    createDeal.id = database().ref(`createDeal`).push().key;
    createDeal.dealItems = selectedDealItem
    database()
      .ref('Deals/' + createDeal.id)
      .set(createDeal)
      .then(() => {
        console.log('success');
        setCreateDeal('');
        navigation.navigate('AddDeals');
      })
      .catch(error => {
        var errorMessage = error.message;
        console.log('error', errorMessage);
      });
  };
  const addItemsToDeal = dealItem => {
    if (
      selectedDealItem &&
      selectedDealItem.length > 0 &&
      selectedDealItem.some((e, i) => e.id == dealItem.id)
    ) {
      setSelectedDealItem(
        selectedDealItem.map((e, i) => {
          if (e.id == dealItem.id) {
            return {
              ...e,
              count: e.count + 1,
            };
          } else {
            return e;
          }
        }),
      );
    } else {
      dealItem.count = 1;
      setSelectedDealItem([...selectedDealItem, dealItem]);
    }
  }

  const plusDealItem = dealItem => {
    setSelectedDealItem(
      selectedDealItem &&
        selectedDealItem.map((e, i) => {
          if (e.id == dealItem.id) {
            console.log(e, 'eee');
            return {
              ...e,
              count: e.count + 1,
            };
          } else {
            return e;
          }
        }),
    );
  };

  const minusDealItem = dealItem => {
    
    if(dealItem.count == 1){
      setSelectedDealItem(selectedDealItem.filter((x,ind)=>
      {
        return x.id !== dealItem.id
      }
      ))
      
    }
    
    else{
      setSelectedDealItem(
        selectedDealItem &&
          selectedDealItem.map((e, i) => {
            if (e.id == dealItem.id) {
              return{
                ...e,
                count : e.count-1
              }
              
            } else {
              return e;
            }
          }),
      );
    }
    
  };


  return (
    <ScrollView style={{height: '100%', backgroundColor: 'white'}}>
      <View
        style={{
          marginTop: '5%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          placeholder="Deal Name"
          placeholderTextColor="black"
          style={styles.input}
          onChangeText={e => {
            setCreateDeal({...createDeal, dealName: e});
          }}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: '1%'}}>
        <TouchableOpacity
          onPress={uploadImage}
          style={{
            borderWidth: 1,
            // borderColor:'#e86a12',
            width: 320,
            height: 50,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#e86a12', fontSize: 22}}>
            {createDeal.dealImage ? 'Deal Image Uplodaed' : 'Uplaod Deal Image'}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: '1%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          placeholder="Deal Price"
          placeholderTextColor="black"
          style={styles.input}
          onChangeText={e => {
            setCreateDeal({...createDeal, dealPrice: e});
          }}
        />
      </View>

      <View style={{marginHorizontal: 20}}>
        {selectedDealItem &&
          selectedDealItem.map((e, i) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text>
                  {e.count ? e.count : ''} {e.itemType} {e.itemName}{' '}
                  {e.itemSize}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{paddingHorizontal: 10}}
                  onPress={() => plusDealItem(e)}>
                  <Text
                    style={{
                      fontSize: 22,
                      color: '#e86a12',
                      fontWeight: 'bold',
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingHorizontal: 10}} onPress={() => minusDealItem(e)}>
                  <Text
                    style={{
                      fontSize: 34,
                      color: '#e86a12',
                      fontWeight: 'bold',
                    }}>
                    -
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>

      <View style={{alignItems: 'center', marginTop: '5%'}}>
        <TouchableOpacity
          onPress={sendDealDataToDb}
          style={{
            backgroundColor: '#e86a12',
            width: 200,
            height: 40,
            borderRadius: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
            Submit Deal
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginTop: 10,
          textAlign: 'center',
          fontSize: 22,
          fontWeight: 'bold',
          color: '#e86a12',
        }}>
        Select Items For Deal
      </Text>
      <View style={{marginHorizontal: 20, marginVertical: 20}}>
        {dbItems &&
          dbItems.map((e, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => addItemsToDeal(e)}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
                padding: 5,
                // borderColor: '#e86a12',
              }}>
              <View>
                <View>
                  <Text>
                    {e.itemType} {e.itemName} {e.itemSize}
                  </Text>
                  <Text> {e.itemPrice} Rs</Text>
                </View>

                {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{paddingHorizontal: 10}}
                    onPress={() => addItemsToDeal(e)}>
                    <Text
                      style={{
                        fontSize: 22,
                        color: '#e86a12',
                        fontWeight: 'bold',
                      }}>
                      +
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{paddingHorizontal: 10}}>
                    <Text
                      style={{
                        fontSize: 34,
                        color: '#e86a12',
                        fontWeight: 'bold',
                      }}>
                      -
                    </Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
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

export default CreateDeal;
