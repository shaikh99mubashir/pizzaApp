import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import database from '@react-native-firebase/database';
import {SafeAreaView, FlatList, StyleSheet, StatusBar} from 'react-native';

const ShowCategory = () => {
  const [dbCategories, setDBCategories] = useState([]);
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

  const renderAllItems = ({item}) => (
    <>
    <View style={{borderWidth:1, width:'49%',paddingVertical:10, alignItems:"center", marginBottom:10, borderRadius:10}}>
      <Image source={{uri: item.imageUri}} style={{width: 100, height: 100}} />
      <Text style={{color: 'black', marginTop:10, fontSize:18}}>{item.itemCategory}</Text>
    </View>
    </>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dbCategories}
        renderItem={renderAllItems}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginHorizontal:10,
  },
  
});
export default ShowCategory;
