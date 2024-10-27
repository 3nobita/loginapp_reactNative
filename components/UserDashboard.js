import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const UserDashboard = ({ route, navigation }) => {
  const { userName } = route.params; // Retrieve the userName from route parameters

  const handleLogout = () => {
    // Implement logout logic here (e.g., clearing tokens, user state, etc.)
    
    // Reset navigation stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'UserLogin' }], // Navigate back to login screen
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Dashboard</Text>
      <Text style={styles.content}>Welcome, {userName}!</Text> {/* Display the user's name */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Match the background style
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff', // Make title text white for better visibility
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff', // Make content text white for better visibility
  },
});

export default UserDashboard;
