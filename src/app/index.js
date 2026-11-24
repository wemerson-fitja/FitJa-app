import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FitJa</Text>
      <Text style={styles.subtitle}>O seu parceiro de treinos</Text>

      <Link href="/login" style={styles.button}>
        <Text style={styles.buttonText}>Entrar / Iniciar</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 18,
    color: '#93C5FD',
    marginTop: 8,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '80%',
    textAlign: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#1E3A8A',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});