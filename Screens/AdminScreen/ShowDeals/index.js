import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import database from '@react-native-firebase/database';

const ShowDeals = () => {

    const [dbDeals, setDBDeals] = useState([]);
    const [myDealItem, setMyDealItem] = useState('')
    
    const getDealsData = () => {
      database()
        .ref(`Deals`)
        .once('value', dt => {
          let data = dt.val();
          let mydata = Object.values(data);
          setDBDeals(mydata);
        });
    };

    console.log('dbDeals', dbDeals);
    // console.log('Items',items);
    useEffect(() => {
      getDealsData();
    }, []);
  return (
    <View>
      {
        dbDeals && dbDeals.map((e,i)=>{
        console.log('e==>',e)
        if(e.dealItems){
            setMyDealItem(e.dealItems)
        }
        console.log('setMyDealItem',myDealItem)
        {/* return(
            <View key={i}>
                <Image source={{uri: e.dealImage}} style={{width:100, height:100}}/>
                <Text style={{color:'black'}}>{e.dealItems[0].count}</Text>
                <Text style={{color:'black'}}>{e.dealName}</Text>
                <Text style={{color:'black'}}>{e.dealPrice}</Text>
            </View>
        )  */}
    })
      }
    </View>
  )
}

export default ShowDeals
