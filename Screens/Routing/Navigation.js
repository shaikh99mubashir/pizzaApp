import React from 'react';
import Login from '../Login';
import SignUp from '../SignUp';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../AdminScreen/Dashboard';
import Category from '../AdminScreen/Category';
import AddItems from '../AdminScreen/AddItems';
import AddDeals from '../AdminScreen/AddDeals';
import ShowCategory from '../AdminScreen/ShowCategory';
import CreateDeal from '../AdminScreen/CreateDeal';
import ShowDeals from '../AdminScreen/ShowDeals';
import ShowItem from '../AdminScreen/ShowItem';
import UserDashboard from '../UserScreen/UserDashboard';
import ShowCategoryToUser from '../UserScreen/ShowCategoryToUser';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="AddItems" component={AddItems} />
        <Stack.Screen name="AddDeals" component={AddDeals} />
        <Stack.Screen name="CreateDeal" component={CreateDeal} />
        <Stack.Screen name="ShowCategory" component={ShowCategory} />
        <Stack.Screen name="ShowItem" component={ShowItem} />
        <Stack.Screen name="ShowDeals" component={ShowDeals} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="ShowCategoryToUser" component={ShowCategoryToUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
