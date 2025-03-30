import React, { useState, useContext } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Keyboard, TouchableWithoutFeedback 
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigator/Appnavigator';
import { useTheme } from '../Context/Themecontext';
import { Jobcontext } from '../Context/Jobcontext'; // Import the context managing saved jobs

const Applicationformscreen: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { isDarkMode } = useTheme();
    const { savedJobs, setSavedJobs } = useContext(Jobcontext); // Get saved jobs and setter function

    const job = (route.params as { job?: any })?.job;
    const fromSavedJobs = (route.params as { fromSavedJobs?: boolean })?.fromSavedJobs || false;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = () => {
        if (!name || !email || !contact || !reason) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        // Remove the job from saved jobs if applying from Saved Jobs
        if (fromSavedJobs && job) {
            setSavedJobs(savedJobs.filter(savedJob => savedJob.id !== job.id));
        }

        // Clear form fields first
        setName('');
        setEmail('');
        setContact('');
        setReason('');

        // Show success alert with "OK" button that redirects properly
        Alert.alert('Success', 'Your application has been submitted.', [
            { 
                text: 'OK', 
                onPress: () => {
                    if (fromSavedJobs) {
                        navigation.navigate('HomeScreen'); // Redirect to Job Finder Screen
                    } else {
                        navigation.goBack(); // Go back to the previous screen
                    }
                }
            },
        ]);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
                <Text style={[styles.heading, { color: isDarkMode ? '#fff' : '#000' }]}>Job Application</Text>

                {job ? (
                    <>
                        <Text style={[styles.label, { color: isDarkMode ? '#bbb' : '#000' }]}>Applying for:</Text>
                        <Text style={[styles.jobTitle, { color: isDarkMode ? '#0af' : '#007bff' }]}>{job.title}</Text>
                    </>
                ) : (
                    <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                        Error: No Job Selected
                    </Text>
                )}

                <Text style={[styles.label, { color: isDarkMode ? '#bbb' : '#000' }]}>Full Name</Text>
                <TextInput 
                    style={[styles.input, { backgroundColor: isDarkMode ? '#222' : '#fff', color: isDarkMode ? '#fff' : '#000' }]} 
                    placeholder="Enter your full name"
                    placeholderTextColor={isDarkMode ? '#888' : '#777'}
                    value={name}
                    onChangeText={setName}
                />

                <Text style={[styles.label, { color: isDarkMode ? '#bbb' : '#000' }]}>Email</Text>
                <TextInput 
                    style={[styles.input, { backgroundColor: isDarkMode ? '#222' : '#fff', color: isDarkMode ? '#fff' : '#000' }]} 
                    placeholder="Enter your email"
                    placeholderTextColor={isDarkMode ? '#888' : '#777'}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={[styles.label, { color: isDarkMode ? '#bbb' : '#000' }]}>Contact Number</Text>
                <TextInput 
                    style={[styles.input, { backgroundColor: isDarkMode ? '#222' : '#fff', color: isDarkMode ? '#fff' : '#000' }]} 
                    placeholder="Enter your contact number"
                    placeholderTextColor={isDarkMode ? '#888' : '#777'}
                    keyboardType="phone-pad"
                    value={contact}
                    onChangeText={setContact}
                />

                <Text style={[styles.label, { color: isDarkMode ? '#bbb' : '#000' }]}>Why should we hire you?</Text>
                <TextInput 
                    style={[styles.input, styles.textArea, { backgroundColor: isDarkMode ? '#222' : '#fff', color: isDarkMode ? '#fff' : '#000' }]} 
                    placeholder="Write your answer here..."
                    placeholderTextColor={isDarkMode ? '#888' : '#777'}
                    multiline
                    numberOfLines={4}
                    value={reason}
                    onChangeText={setReason}
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

// Styles
const styles = StyleSheet.create({
    container: { padding: 20, flexGrow: 1 },
    heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    label: { fontSize: 16, fontWeight: 'bold', marginTop: 15 },
    jobTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    input: { 
        height: 40, borderColor: '#ccc', borderWidth: 1, 
        borderRadius: 8, paddingHorizontal: 10, marginTop: 5 
    },
    textArea: { height: 100, textAlignVertical: 'top' },
    submitButton: { 
        backgroundColor: '#28a745', padding: 12, borderRadius: 8, 
        marginTop: 20, alignItems: 'center' 
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default Applicationformscreen;
