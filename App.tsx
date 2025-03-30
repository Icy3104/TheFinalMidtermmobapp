import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { JobProvider } from './Context/Jobcontext'; // ✅ Ensure correct import
import { ThemeProvider } from './Context/Themecontext'; // ✅ Ensure correct import
import Appnavigator from './Navigator/Appnavigator';

export default function App() {
  return (
    // ✅ Correct provider order to prevent `_currentValue2 of undefined`
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
