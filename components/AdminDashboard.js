import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import axios from 'axios';

const AdminDashboard = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null); 

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users.');
        }
    };

    const addUser = async () => {
        if (!username || !password) {
            Alert.alert('Validation Error', 'Username and password cannot be empty.');
            return;
        }

        const userData = { username, password };

        try {
            await axios.post('http://localhost:5000/api/users', userData);
            fetchUsers(); 
            setUsername('');
            setPassword('');
            Alert.alert('Success', 'User created successfully.');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Network error, please try again.');
            }
        }
    };

    const handleDelete = (userId) => {
        setConfirmDeleteId(userId); 
    };

    const confirmDeleteUser = async () => {
        if (confirmDeleteId) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/users/${confirmDeleteId}`);
                console.log('Delete Response:', response); 
                if (response.status === 200) {
                    fetchUsers(); 
                    Alert.alert('Success', 'User deleted successfully.');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                Alert.alert('Error', 'Failed to delete user.');
            } finally {
                setConfirmDeleteId(null); 
            }
        }
    };

    const cancelDelete = () => {
        setConfirmDeleteId(null); 
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Dashboard</Text>

            {error && <Text style={styles.error}>{error}</Text>}

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#aaa"
                />
                <Button title="Create New User" onPress={addUser} />
            </View>

            <Text style={styles.userListTitle}>User List:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Username</Text>
                        <Text style={styles.tableHeaderText}>Password</Text>
                        <Text style={styles.tableHeaderText}>Actions</Text>
                    </View>
                    {users.map((item) => (
                        <View key={item._id} style={styles.userItem}>
                            <Text style={styles.userText}>{item.username}</Text>
                            <Text style={styles.userText}>{item.password}</Text>
                            {confirmDeleteId === item._id ? (
                                <>
                                    <Button title="Confirm Delete" onPress={confirmDeleteUser} />
                                    <Button title="Cancel" onPress={cancelDelete} />
                                </>
                            ) : (
                                <Button title="Delete" onPress={() => handleDelete(item._id)} />
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: '90%',
    },
    userListTitle: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
        color: '#fff',
    },
    table: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
        width: 600,
        alignSelf: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 10,
    },
    tableHeaderText: {
        flex: 1,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    userText: {
        color: '#fff',
        flex: 1,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default AdminDashboard;
