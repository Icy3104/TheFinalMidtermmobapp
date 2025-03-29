import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { JobProvider } from './Context/Jobcontext';
import { ThemeProvider } from './Context/Themecontext'; // Import ThemeProvider
import Appnavigator from './Navigator/Appnavigator';

export default function App() {
  return (
    <JobProvider>
      <ThemeProvider>
        <View style={styles.container}>
          <Appnavigator />
          <StatusBar style="auto" />
        </View>
      </ThemeProvider>
    </JobProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
