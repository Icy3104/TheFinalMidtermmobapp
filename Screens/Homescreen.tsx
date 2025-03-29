import React, { useEffect, useState } from 'react';
import { 
    View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useJobContext } from '../Context/Jobcontext';

const Homescreen: React.FC = () => {
    const { jobs, savedJobs, fetchJobs, saveJob } = useJobContext();
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    // Filter jobs based on search query
    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.workModel.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <FlatList
                    data={filteredJobs}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.jobCard}>
                            <Image source={{ uri: item.companyLogo }} style={styles.logo} />
                            <View style={styles.jobInfo}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.company}>{item.companyName}</Text>
                                <Text style={styles.workModel}>{item.workModel}</Text>
                            </View>
                            <View style={styles.buttons}>
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={() => saveJob(item)}
                                >
                                    <Text style={styles.buttonText}>
                                        {savedJobs.some((saved) => saved.id === item.id) ? 'Saved' : 'Save Job'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.applyButton}
                                    onPress={() => navigation.navigate('ApplicationForm', { job: item })}
                                >
                                    <Text style={styles.buttonText}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </SafeAreaView>
    );
};

// Styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
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
        fontSize: 22, // Increased for better visibility
        fontWeight: 'bold',
        color: '#000', // Ensures job title is black
    },
    company: {
        fontSize: 16, // Clearer and sharper
        fontWeight: '500',
        color: '#000', // Black color for better readability
    },
    workModel: {
        fontSize: 14,
        color: '#000', // Black text for better visibility
    },
    buttons: {
        flexDirection: 'column',
    },
    saveButton: {
        backgroundColor: '#007bff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    applyButton: {
        backgroundColor: '#28a745',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    listContainer: {
        paddingBottom: 20,
    },
});

export default Homescreen;
