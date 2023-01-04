import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import database from '@react-native-firebase/database';
const AddDeals = ({navigation}) => {
  const [dbItems, setDBItems] = useState([]);
  const getItemsData = () => {
    database()
      .ref(`Items`)
      .once('value', dt => {
        let data = dt.val();
        let mydata = Object.values(data);
        setDBItems(mydata);
      });
  };
  console.log('dbItems', dbItems);
  useEffect(() => {
    getItemsData();
  }, []);

  return (
    <ScrollView style={{height: '100%', backgroundColor: 'white'}}>
      <View style={{alignItems: 'center', marginTop: '10%'}}>
        <TouchableOpacity
          onPress={()=>navigation.navigate('CreateDeal')}
          style={{
            // borderWidth:1,
            backgroundColor: '#e86a12',
            width: 320,
            height: 50,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>
            {dbItems ? 'Create Deal' : 'No Item Avaiable'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 'bold',
            color: '#e86a12',
          }}>
          Avaiable Items For Deal
        </Text>
        {dbItems &&
          dbItems.map((e, i) => (
            <View
              key={i}
              style={{
                borderWidth: 1.3,
                borderRadius: 8,
                marginTop: 10,
                flexDirection: 'row',
                padding: 5,
                borderColor: '#e86a12',
              }}>
              <Image source={{uri:e.imageUri}} style={{width: 100, height: 100}} />
              <View style={{paddingHorizontal:10}}>
                <Text>{e.itemType}</Text>
                <Text>{e.itemName}</Text>
                <Text>{e.itemDescription}</Text>
                <Text>{e.itemSize}</Text>
                <Text>{e.itemPrice} Rs</Text>
              </View>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

export default AddDeals;
