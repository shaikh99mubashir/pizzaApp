import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import database from '@react-native-firebase/database';

const ShowCategoryToUser = () => {
  const [dbCategories, setDBCategories] = useState([]);
  const [dbItems, setDBItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const getCategoryData = () => {
    database()
      .ref(`Categories`)
      .once('value', dt => {
        let data = dt.val();
        let mydata = Object.values(data);
        setDBCategories(mydata);
      });
  };
  useEffect(() => {
    getCategoryData();
  }, []);

  const getItemData = () => {
    database()
      .ref(`Items`)
      .once('value', dt => {
        let data = dt.val();
        let mydata = Object.values(data);
        setDBItems(mydata);
      });
  };
  useEffect(() => {
    getItemData();
  }, []);

  console.log('dbItems', dbItems);

  const filterItem = itemValue => {
    console.log('itemValue==>', itemValue.itemCategory);
    let filteredItems = dbItems.filter(
      x => x.itemType.toLowerCase() === itemValue.itemCategory.toLowerCase(),
    );
    setFilteredItems(filteredItems);
  };

  console.log('filteredItems==>', filteredItems);

  const renderAllItems = ({item}) => (
    <View style={{paddingHorizontal: 5, marginTop: 10, marginBottom: 10}}>
      <TouchableOpacity
        onPress={() => filterItem(item)}
        style={{
          borderWidth: 0,
          paddingVertical: 1,
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <Image
          source={{uri: item.imageUri}}
          style={{width: 70, height: 70, margin: 5, borderRadius: 10}}
        />
        <Text style={{color: 'black', marginVertical: 5, fontSize: 12}}>
          {item.itemCategory}
        </Text>
      </TouchableOpacity>
    </View>
  );
  const renderItems = item => (
    <View style={{paddingHorizontal: 2, marginHorizontal: 5}}>
      <View
        style={{
          borderWidth: 0,
          paddingVertical: 0,
          borderRadius: 10,
          flexDirection: 'row',
        }}>
        <Image
          source={{uri: item.imageUri}}
          style={{width: 95, height: 95, margin: 5, borderRadius: 10}}
        />
        <View style={{justifyContent: 'space-around', width: '65%'}}>
          <View>
            <Text style={{color: 'black', marginVertical: 5, fontSize: 18}}>
              {item.itemName}
            </Text>
            <Text style={{marginVertical: 1, fontSize: 12}}>
              {item.itemSize} | {item.itemDescription}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'black',
                marginVertical: 5,
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              {item.itemPrice} .RS
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#e86a12',
                width: 60,
                alignItems: 'center',
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}>
              <Text
                style={{
                  paddingHorizontal: 1,
                  paddingVertical: 3,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                + Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView>
    <FlatList
        data={dbCategories}
        renderItem={renderAllItems}
        keyExtractor={item => item.id}
        horizontal
      />

      {filteredItems?.length  
        ? filteredItems.map((item, index) => {
            return (
              <View
                key={item.id}
                style={{
                  ...(index == filteredItems.length - 1 && {
                    marginBottom: 20,
                  }),
                }}>
                {renderItems(item)}
              </View>
            );
          })
        : dbItems.map((item, index) => {
            return (
              <View
                key={item.id}
                style={{
                  ...(index == dbItems.length - 1 && {
                    marginBottom: 20,
                  }),
                }}>
                {renderItems(item)}
              </View>
            );
          })}
    </ScrollView>
  );
};

export default ShowCategoryToUser;
