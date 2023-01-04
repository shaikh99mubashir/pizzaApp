import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

const Dashboard = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <ScrollView>
        <View style={{alignItems:'center'}}>
          <View style={{marginTop:40, backgroundColor:"#e86a12", width:200, height:40 ,borderRadius:60, alignItems: 'center',justifyContent:"center"}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Category')}>
              <Text style={{color:'white', fontWeight:"bold", fontSize:20}}>Add Category</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:40, backgroundColor:"#e86a12", width:200, height:40 ,borderRadius:60, alignItems: 'center',justifyContent:"center"}}>
            <TouchableOpacity onPress={()=>navigation.navigate('AddItems')}>
              <Text style={{color:'white', fontWeight:"bold", fontSize:20}}>Add Items</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:40, backgroundColor:"#e86a12", width:200, height:40 ,borderRadius:60, alignItems: 'center',justifyContent:"center"}}>
            <TouchableOpacity onPress={()=>navigation.navigate('AddDeals')}>
              <Text style={{color:'white', fontWeight:"bold", fontSize:20}}>Add Deals</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:40, backgroundColor:"#e86a12", width:200, height:40 ,borderRadius:60, alignItems: 'center',justifyContent:"center"}}>
            <TouchableOpacity onPress={()=>navigation.navigate('ShowCategory')}>
              <Text style={{color:'white', fontWeight:"bold", fontSize:20}}>Show Category</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:40, backgroundColor:"#e86a12", width:200, height:40 ,borderRadius:60, alignItems: 'center',justifyContent:"center"}}>
            <TouchableOpacity onPress={()=>navigation.navigate('ShowItem')}>
              <Text style={{color:'white', fontWeight:"bold", fontSize:20}}>Show Items</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:40, backgroundColor:"#e86a12", width:200, height:40 ,borderRadius:60, alignItems: 'center',justifyContent:"center"}}>
            <TouchableOpacity onPress={()=>navigation.navigate('ShowDeals')}>
              <Text style={{color:'white', fontWeight:"bold", fontSize:20}}>Show Deals</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;