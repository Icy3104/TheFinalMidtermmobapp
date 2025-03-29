import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Navigator/Appnavigator'; // Import correct type

type ApplicationFormRouteProp = RouteProp<RootStackParamList, 'ApplicationForm'>;

const Applicationformscreen: React.FC = () => {
    const route = useRoute<ApplicationFormRouteProp>();
    const navigation = useNavigation();
    const job = route.params?.job || { title: 'Unknown Job' }; // Ensure fallback data

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Applying for:</Text>
            <Text style={styles.jobTitle}>{job.title}</Text>

            {/* Faster Back to Job List Button */}
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.goBack()} // Uses goBack() for faster navigation
            >
                <Text style={styles.buttonText}>Back to Job List</Text>
            </TouchableOpacity>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000',
    },
    jobTitle: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
    backButton: {
        marginTop: 20,
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Applicationformscreen;
