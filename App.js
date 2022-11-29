import { StyleSheet, View, Text } from 'react-native';
import AudioPlayer from './screens/AudioPlayer';

function App() {

  return (
    <View style={styles.container}>
      <AudioPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  }
})

export default App;




