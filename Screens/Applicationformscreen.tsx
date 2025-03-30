import React, { useState } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Keyboard, TouchableWithoutFeedback 
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigator/Appnavigator';
import { useTheme } from '../Context/Themecontext';

const Applicationformscreen: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { isDarkMode } = useTheme();

    // Ensure job data exists to prevent crashes
    const job = (route.params as { job?: any })?.job;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [reason, setReason] = useState('');

    // Function to handle form submission
    const handleSubmit = () => {
        if (!name || !email || !contact || !reason) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        // Show feedback & navigate back
        Alert.alert('Success', 'Your application has been submitted.', [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);

        // Clear form fields
        setName('');
        setEmail('');
        setContact('');
        setReason('');
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
                <Text style={[styles.heading, { color: isDarkMode ? '#fff' : '#000' }]}>Job Application</Text>

                {/* Job Title (Read-only) */}
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

                {/* Name Field */}
                <Text style={[styles.label, { color: isDarkMode ? '#bbb' : '#000' }]}>Full Name</Text>
                <TextInput 
                    style={[styles.input, { backgroundColor: isDarkMode ? '#222' : '#fff', color: isDarkMode ? '#fff' : '#000' }]} 
                    placeholder="Enter your full name"
                    placeholderTextColor={isDarkMode ? '#888' : '#777'}
                    value={name}
                    onChangeText={setName}
                />

                {/* Email Field */}
                <Text style={[styles.label, { color: isDarkMode ? '#bbb' : '#000' }]}>Email</Text>
                <TextInput 
                    style={[styles.input, { backgroundColor: isDarkMode ? '#222' : '#fff', color: isDarkMode ? '#fff' : '#000' }]} 
                    placeholder="Enter your email"
                    placeholderTextColor={isDarkMode ? '#888' : '#777'}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                {/* Contact Number Field */}
                <Text style={[styles.label, { color: isDarkMode ? '#bbb' : '#000' }]}>Contact Number</Text>
                <TextInput 
                    style={[styles.input, { backgroundColor: isDarkMode ? '#222' : '#fff', color: isDarkMode ? '#fff' : '#000' }]} 
                    placeholder="Enter your contact number"
                    placeholderTextColor={isDarkMode ? '#888' : '#777'}
                    keyboardType="phone-pad"
                    value={contact}
                    onChangeText={setContact}
                />

                {/* Why Should We Hire You? Field */}
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

                {/* Submit Button */}
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
