import { StatusBar, StyleSheet, Text, View } from 'react-native';
import ChatGPT from './src';

export default function App() {
  return (
    <View style={styles.container}>



      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ChatGPT />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
