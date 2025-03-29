import React, { useEffect, useState } from 'react';
import { 
    View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJobContext } from '../Context/Jobcontext';
import { useTheme } from '../Context/Themecontext';
import { Switch } from 'react-native';

const Homescreen: React.FC = () => {
    const { jobs, savedJobs, fetchJobs, saveJob } = useJobContext();
    const { isDarkMode, toggleTheme } = useTheme();
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
        <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
            <View style={styles.container}>
                {/* Header */}
                <View style={[styles.header, { backgroundColor: isDarkMode ? '#222' : '#fff' }]}>
                    <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#000' }]}>
                        Midterms by ITCO C3A
                    </Text>
                    <Switch value={isDarkMode} onValueChange={toggleTheme} />
                </View>

                <TextInput
                    style={[styles.searchBar, { backgroundColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000' }]}
                    placeholder="Search jobs..."
                    placeholderTextColor={isDarkMode ? '#bbb' : '#777'}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                <FlatList
                    data={filteredJobs}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.jobCard, { backgroundColor: isDarkMode ? '#222' : '#f9f9f9' }]}>
                            <Image source={{ uri: item.companyLogo }} style={styles.logo} />
                            <View style={styles.jobInfo}>
                                <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
                                <Text style={[styles.company, { color: isDarkMode ? '#ccc' : '#000' }]}>{item.companyName}</Text>
                                <Text style={[styles.workModel, { color: isDarkMode ? '#ccc' : '#000' }]}>{item.workModel}</Text>
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
                                    onPress={() => console.log('Navigate to application form')}
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
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginTop: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 8,
        marginBottom: 10,
    },
    jobCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
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
        fontSize: 22,
        fontWeight: 'bold',
    },
    company: {
        fontSize: 14,
    },
    workModel: {
        fontSize: 12,
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
