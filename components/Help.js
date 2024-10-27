import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Alert } from 'react-native';
import axios from 'axios';

const Help = () => {
  const [userId, setUserId] = useState('');
  const [oldPassword, setOldPassword] = useState(''); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idModalVisible, setIdModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const handleIdSubmit = () => {
    if (userId) {
      setOldPassword('currentOldPassword'); 
      setIdModalVisible(false);
      setPasswordModalVisible(true);
    } else {
      Alert.alert('Error', 'Please enter your ID.');
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        try {
          const response = await axios.put('http://localhost:5000/api/users/update-password', {
            username: userId,
            newPassword,
          });
          Alert.alert('Success', response.data.message);
          setPasswordModalVisible(false);
          setNewPassword('');
          setConfirmPassword('');
        } catch (error) {
          if (error.response) {
            Alert.alert('Error', error.response.data.message);
          } else {
            Alert.alert('Error', 'Network error, please try again.');
          }
        }
      } else {
        Alert.alert('Error', 'New passwords do not match.');
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>
      <Text style={styles.content}>
        If you forgot your password, please check your email for a reset link.
        If you don't receive an email, please contact support.
      </Text>
      <Text style={styles.content}>Email: support@example.com</Text>
      
      <Button title="Create New Password" onPress={() => setIdModalVisible(true)} />

      {/* ID Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={idModalVisible}
        onRequestClose={() => setIdModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Your ID</Text>
            <TextInput
              style={styles.input}
              placeholder="User ID"
              value={userId}
              onChangeText={setUserId}
            />
            <Button title="Submit" onPress={handleIdSubmit} />
            <Button title="Cancel" onPress={() => setIdModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Update Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={passwordModalVisible}
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Old Password"
              value={oldPassword}
              editable={false} 
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <Button title="Update" onPress={handleUpdatePassword} />
            <Button title="Cancel" onPress={() => setPasswordModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
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

export default Help;
