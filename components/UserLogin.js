import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const UserLogin = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminModalVisible, setAdminModalVisible] = useState(false);
  const [adminCode, setAdminCode] = useState('');

  const handleLogin = async () => {
    const credentials = { username, password };

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', credentials);
      console.log('Login success:', response.data);
      navigation.navigate('UserDashboard', { userName: response.data.username });
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', 'Invalid username or password.');
    }
  };

  const handleAdminAccess = () => {
    if (adminCode === '9671') {
      setAdminModalVisible(false);
      navigation.navigate('AdminDashboard');
    } else {
      Alert.alert('Access Denied', 'Incorrect admin code.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#fff"
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#fff"
          />
        </View>
        <View style={styles.rememberForget}>
          <TouchableOpacity>
            <Text style={styles.rememberMe}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Help')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAdminModalVisible(true)}>
          <View style={styles.registerLink}>
            <Text>Don't have an account? <Text style={styles.link}>Access Admin</Text></Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Admin Code Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={adminModalVisible}
        onRequestClose={() => setAdminModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Admin Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Admin Code"
              value={adminCode}
              onChangeText={setAdminCode}
              placeholderTextColor="#000"
            />
            <Button title="Submit" onPress={handleAdminAccess} />
            <Button title="Cancel" onPress={() => setAdminModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
  },
  wrapper: {
    width: 420,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    color: '#fff',
  },
  inputBox: {
    width: '100%',
    marginVertical: 15,
  },
  input: {
    height: 50,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#fff',
  },
  rememberForget: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    fontSize: 14.5,
    color: '#fff',
  },
  rememberMe: {
    color: '#fff',
  },
  forgotPassword: {
    color: '#fff',
  },
  btn: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  btnText: {
    color: '#333',
    fontWeight: '600',
  },
  registerLink: {
    marginVertical: 15,
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default UserLogin;
