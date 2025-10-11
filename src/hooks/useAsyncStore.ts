import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_NAME } from '../constants/General';

const isValidJsonString = (str: string): boolean => {
    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
};

export const useAsyncStorage = () => {
    const setStorage = useCallback(async <T>(key: string, value: T): Promise<void> => {
        try {
            await AsyncStorage.setItem(`${APP_NAME}_${key}`, JSON.stringify(value));
        } catch (err) {
            console.error('Error saving data:', err);
        }
    }, []);

    const getStorage = useCallback(async <T>(key: string): Promise<T | null> => {
        try {
            const value = await AsyncStorage.getItem(`${APP_NAME}_${key}`);
            if (value !== null) {
                return isValidJsonString(value) ? JSON.parse(value) : (value as unknown as T);
            }
            return null;
        } catch (err) {
            console.error('Error reading data:', err);
            return null;
        }
    }, []);

    const removeStorage = useCallback(async (key: string): Promise<void> => {
        try {
            await AsyncStorage.removeItem(`${APP_NAME}_${key}`);
        } catch (err) {
            console.error('Error removing data:', err);
        }
    }, []);

    return { setStorage, getStorage, removeStorage };
};
