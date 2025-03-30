import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useJobContext } from '../Context/Jobcontext';
import { useTheme } from '../Context/Themecontext';

const Savejobscreen: React.FC = () => {
    const { savedJobs, removeJob } = useJobContext();
    const { isDarkMode } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
            <Text style={[styles.heading, { color: isDarkMode ? '#fff' : '#000' }]}>Saved Jobs</Text>
            {savedJobs.length === 0 ? (
                <Text style={[styles.noJobsText, { color: isDarkMode ? '#bbb' : '#777' }]}>No saved jobs yet.</Text>
            ) : (
                <FlatList
                    data={savedJobs}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.jobCard, { backgroundColor: isDarkMode ? '#222' : '#f9f9f9' }]}>
                            <Image source={{ uri: item.companyLogo }} style={styles.logo} />
                            <View style={styles.jobInfo}>
                                <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
                                <Text style={[styles.company, { color: isDarkMode ? '#ccc' : '#555' }]}>{item.companyName}</Text>
                                <Text style={[styles.workModel, { color: isDarkMode ? '#bbb' : '#777' }]}>{item.workModel}</Text>
                            </View>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity 
                                    style={styles.removeButton} 
                                    onPress={() => removeJob(item.id)}
                                >
                                    <Text style={styles.buttonText}>Remove</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.applyButton} 
                                    onPress={() => console.log('Navigate to application form')}
                                >
                                    <Text style={styles.buttonText}>Apply</Text>
                                </TouchableOpacity>
                            </View>
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
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    noJobsText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    jobCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginBottom: 12,
        borderRadius: 10,
    },
    logo: {
        width: 60,
        height: 60,
        marginRight: 12,
        borderRadius: 5,
    },
    jobInfo: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    company: {
        fontSize: 16,
    },
    workModel: {
        fontSize: 14,
    },
    buttonsContainer: {
        flexDirection: 'column',
    },
    removeButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginBottom: 5,
    },
    applyButton: {
        backgroundColor: '#28a745',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Savejobscreen;
