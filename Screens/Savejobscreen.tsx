// Screens/Savejobscreen.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useJobContext } from '../Context/Jobcontext';

const Savejobscreen: React.FC = () => {
    const { savedJobs, removeJob } = useJobContext();

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Saved Jobs</Text>
            {savedJobs.length === 0 ? (
                <Text style={styles.noJobsText}>No saved jobs yet.</Text>
            ) : (
                <FlatList
                    data={savedJobs}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.jobCard}>
                            <Image source={{ uri: item.companyLogo }} style={styles.logo} />
                            <View style={styles.jobInfo}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.company}>{item.companyName}</Text>
                                <Text style={styles.workModel}>{item.workModel}</Text>
                            </View>
                            <TouchableOpacity 
                                style={styles.removeButton} 
                                onPress={() => removeJob(item.id)}
                            >
                                <Text style={styles.buttonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    noJobsText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#777',
    },
    jobCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        borderRadius: 8,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 5,
    },
    jobInfo: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    company: {
        fontSize: 14,
        color: '#555',
    },
    workModel: {
        fontSize: 12,
        color: '#777',
    },
    removeButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Savejobscreen;
