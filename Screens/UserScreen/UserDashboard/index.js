import React, { useEffect, useState } from 'react';
import {FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import database from '@react-native-firebase/database';
import ShowCategoryToUser from '../ShowCategoryToUser';

const UserDashboard = () => {
  
  return (
    <View style={{backgroundColor:"white", height:'100%',}}>
    <View style={{marginHorizontal:10,}}>
    <View style={{height:30, backgroundColor:'#FCF8F5', borderRadius:10, marginTop:10, padding:5}}>
      <Text>Search or current Location</Text>
    </View>
    </View>
    <ShowCategoryToUser/>
    </View>
  );
};

export default UserDashboard;
