import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../Navigator/Appnavigator'; // Import correct type

type ApplicationFormRouteProp = RouteProp<RootStackParamList, 'ApplicationForm'>;

const Applicationformscreen: React.FC = () => {
    const route = useRoute<ApplicationFormRouteProp>();
    const job = route.params?.job || { title: 'Unknown Job' }; // Ensure fallback data

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Applying for:</Text>
            <Text style={styles.jobTitle}>{job.title}</Text>
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
    },
});

export default Applicationformscreen;
