import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { JobProvider } from './Context/Jobcontext';
import Appnavigator from './Navigator/Appnavigator';

export default function App() {
  return (
    <JobProvider>
      <View style={styles.container}>
        <Appnavigator />
        <StatusBar style="auto" />
      </View>
    </JobProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flex: 1,
  },
});
