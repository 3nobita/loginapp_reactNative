import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserLogin from './components/UserLogin';
import AdminDashboard from './components/AdminDashboard';
import Help from './components/Help';
import UserDashboard from './components/UserDashboard';

const Stack = createNativeStackNavigator();

const App = () => {
  const [users, setUsers] = useState([]); // Initialize users

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserLogin">
        <Stack.Screen name="UserLogin">
          {(props) => <UserLogin {...props} users={users} />}
        </Stack.Screen>
        <Stack.Screen name="AdminDashboard">
          {(props) => <AdminDashboard {...props} users={users} setUsers={setUsers} />}
        </Stack.Screen>
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="Help" component={Help} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
