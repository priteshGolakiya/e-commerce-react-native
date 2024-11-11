// utils/config.js

const DEV_API_URL = __DEV__
    ? Platform.select({
        ios: 'http://localhost:5000', // iOS simulator
        android: 'http://10.0.2.2:5000', // Android emulator
        // Add your local IP address for physical devices
        // default: 'http://192.168.1.X:5000' // Replace X with your IP's last digit
    })
    : 'http://localhost:5000'; // Your production API URL

export const API_CONFIG = {
    baseURL: DEV_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
};

// Create an axios instance with the config
import axios from 'axios';
import { Platform } from 'react-native';
export const apiClient = axios.create(API_CONFIG);