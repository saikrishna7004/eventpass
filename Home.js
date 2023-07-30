import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const [eventId, setEventId] = useState('');

    const handleStartScan = () => {
        navigation.navigate('ScanQR', { eventId });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter Event ID"
                value={eventId}
                onChangeText={setEventId}
            />
            <Button title="Start Scan" onPress={handleStartScan} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 16,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        marginBottom: 16,
    },
});

export default HomeScreen;
