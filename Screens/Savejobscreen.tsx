import React from 'react';
import { 
    View, Text, FlatList, TouchableOpacity, Image, StyleSheet 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigator/Appnavigator';
import { useJobcontext } from '../Context/Jobcontext';
import { useTheme } from '../Context/Themecontext';

const Savejobscreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { savedJobs, removeJob } = useJobcontext(); // Added removeJob function
    const { isDarkMode } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
            <Text style={[styles.heading, { color: isDarkMode ? '#fff' : '#000' }]}>Saved Jobs</Text>

            {/* Show message if no saved jobs */}
            {savedJobs.length === 0 ? (
                <Text style={[styles.noJobsText, { color: isDarkMode ? '#bbb' : '#777' }]}>
                    No saved jobs yet.
                </Text>
            ) : (
                <FlatList
                    data={savedJobs}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.jobCard, { backgroundColor: isDarkMode ? '#222' : '#f9f9f9' }]}>
                            
                            {/* Company Logo (Handles cases where the logo is missing) */}
                            {item.companyLogo ? (
                                <Image source={{ uri: item.companyLogo }} style={styles.logo} />
                            ) : (
                                <View style={[styles.logoPlaceholder, { backgroundColor: isDarkMode ? '#444' : '#ccc' }]}>
                                    <Text style={{ color: isDarkMode ? '#bbb' : '#555' }}>No Logo</Text>
                                </View>
                            )}

                            {/* Job Info */}
                            <View style={styles.jobInfo}>
                                <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
                                    {item.title}
                                </Text>
                                <Text style={[styles.company, { color: isDarkMode ? '#ccc' : '#000' }]}>
                                    {item.companyName}
                                </Text>
                            </View>

                            {/* Buttons (Apply & Remove) */}
                            <View style={styles.buttons}>
                                <TouchableOpacity 
                                    style={styles.applyButton} 
                                    onPress={() => navigation.navigate('ApplicationForm', { job: item })}
                                >
                                    <Text style={styles.buttonText}>Apply</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.removeButton} 
                                    onPress={() => removeJob(item.id)}
                                >
                                    <Text style={styles.buttonText}>Remove</Text>
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
    container: { flex: 1, padding: 10 },
    heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    noJobsText: { fontSize: 16, textAlign: 'center', marginTop: 20 },
    jobCard: { 
        flexDirection: 'row', alignItems: 'center', padding: 15, 
        marginBottom: 10, borderRadius: 8 
    },
    logo: { width: 50, height: 50, marginRight: 10, borderRadius: 5 },
    logoPlaceholder: { width: 50, height: 50, marginRight: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' },
    jobInfo: { flex: 1 },
    title: { fontSize: 18, fontWeight: 'bold' },
    company: { fontSize: 14 },
    buttons: { flexDirection: 'column' },
    applyButton: { backgroundColor: '#28a745', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, marginBottom: 5 },
    removeButton: { backgroundColor: '#dc3545', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default Savejobscreen;
