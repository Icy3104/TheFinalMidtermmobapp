import React, { useEffect, useState, useMemo } from 'react';
import { 
    View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet 
} from 'react-native';
import { useJobContext } from '../Context/Jobcontext';
import { useTheme } from '../Context/Themecontext';
import { Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigator/Appnavigator';

const Homescreen: React.FC = () => {
    const { jobs, savedJobs, fetchJobs, saveJob } = useJobContext();
    const { isDarkMode, toggleTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        fetchJobs();
    }, []);

    // Optimized filtering
    const filteredJobs = useMemo(() => {
        return jobs.filter(job =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.workModel.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, jobs]);

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
            {/* Header with Theme Toggle */}
            <View style={[styles.header, { backgroundColor: isDarkMode ? '#222' : '#fff' }]}>
                <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#000' }]}>
                    Midterms by ITCO C3A
                </Text>
                <Switch value={isDarkMode} onValueChange={toggleTheme} />
            </View>

            {/* Search Bar */}
            <TextInput
                style={[styles.searchBar, { backgroundColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000' }]}
                placeholder="Search jobs..."
                placeholderTextColor={isDarkMode ? '#bbb' : '#777'}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {/* Job Listings */}
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
                            {/* Save Job Button */}
                            <TouchableOpacity
                                style={[styles.saveButton, savedJobs.some((saved) => saved.id === item.id) && styles.saved]}
                                onPress={() => saveJob(item)}
                            >
                                <Text style={styles.buttonText}>
                                    {savedJobs.some((saved) => saved.id === item.id) ? 'Saved' : 'Save Job'}
                                </Text>
                            </TouchableOpacity>

                            {/* Apply Button */}
                            <TouchableOpacity
                                style={styles.applyButton}
                                onPress={() => navigation.navigate('ApplicationForm', { job: item })}
                            >
                                <Text style={styles.buttonText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({ 
    container: { flex: 1, padding: 10 },
    header: { 
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        borderColor: '#ccc', borderWidth: 1, borderRadius: 8, 
        paddingHorizontal: 10, paddingVertical: 8, marginTop: 10 
    },
    headerText: { fontSize: 16, fontWeight: 'bold' },
    searchBar: { 
        height: 40, borderColor: '#ccc', borderWidth: 1, 
        borderRadius: 8, paddingHorizontal: 10, marginTop: 8, marginBottom: 10 
    },
    jobCard: { 
        flexDirection: 'row', alignItems: 'center', padding: 15, 
        marginBottom: 10, borderRadius: 8 
    },
    logo: { width: 50, height: 50, marginRight: 10, borderRadius: 5 },
    jobInfo: { flex: 1 },
    title: { fontSize: 18, fontWeight: 'bold' },
    company: { fontSize: 14 },
    workModel: { fontSize: 12 },
    buttons: { flexDirection: 'column' },
    saveButton: { 
        backgroundColor: '#007bff', paddingVertical: 5, paddingHorizontal: 10, 
        borderRadius: 5, marginBottom: 5 
    },
    saved: { backgroundColor: '#555' }, // Change color when saved
    applyButton: { 
        backgroundColor: '#28a745', paddingVertical: 5, 
        paddingHorizontal: 10, borderRadius: 5 
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default Homescreen;
