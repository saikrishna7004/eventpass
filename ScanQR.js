import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ScanQRScreen = ({ route }) => {
    const { eventId } = route.params;
    const [qrData, setQRData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleBarCodeScanned = async ({ type, data }) => {
        if (data !== qrData) {
            setQRData(data);
            setLoading(true);
            try {
                const response = await fetch('https://b458-2401-4900-4e02-299-c106-5637-1d46-b3e1.ngrok-free.app/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data: data }),
                });
                const dataJson = await response.json();
                // console.log(dataJson)
                setResult(dataJson.roll_number);
            } catch (error) {
                // console.error('Error sending QR data to backend:', error);
                setResult('Unknown');
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            if (status !== 'granted') {
                console.error('Camera permission not granted!');
            }
        })();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                <BarCodeScanner
                    style={StyleSheet.absoluteFillObject}
                    onBarCodeScanned={handleBarCodeScanned}
                />
            </View>
            {loading && (
                <View style={styles.loadingBackdrop}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#ffffff" />
                        <Text style={styles.loadingText}>Fetching data...</Text>
                    </View>
                </View>
            )}
            {result && (
                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>Event ID: {eventId}</Text>
                    <Text style={styles.dataText}>Scanned QR data: {qrData}</Text>
                    <Text style={styles.dataText}>Roll Number: {result}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    cameraContainer: {
        height: '75%',
        marginTop: -16,
    },
    dataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        margin: 16,
        marginBottom: 32,
        borderRadius: 8,
    },
    dataText: {
        fontSize: 16,
        marginBottom: 8,
    },
    loadingBackdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#ffffff',
        fontSize: 16,
        marginTop: 8,
    },
});

export default ScanQRScreen;
