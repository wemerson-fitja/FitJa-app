import { useRouter } from 'expo-router';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const exercicios = [
  {
    categoria: 'Peito',
    descricao: 'Exercícios para fortalecer o peitoral',
    itens: ['Supino reto', 'Supino inclinado', 'Flexão de braço'],
  },
  {
    categoria: 'Costas',
    descricao: 'Exercícios para fortalecer as costas',
    itens: ['Puxada frontal', 'Remada baixa', 'Remada curvada'],
  },
  {
    categoria: 'Pernas',
    descricao: 'Exercícios para membros inferiores',
    itens: ['Agachamento', 'Leg press', 'Cadeira extensora'],
  },
  {
    categoria: 'Braços',
    descricao: 'Exercícios para bíceps e tríceps',
    itens: ['Rosca direta', 'Rosca alternada', 'Tríceps pulley'],
  },
  {
    categoria: 'Abdômen',
    descricao: 'Exercícios para fortalecer o abdômen',
    itens: ['Abdominal reto', 'Prancha', 'Abdominal bicicleta'],
  },
  {
    categoria: 'Cardio',
    descricao: 'Exercícios para melhorar o condicionamento',
    itens: ['Esteira', 'Bicicleta', 'Polichinelo'],
  },
];

export default function Exercicios() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>FitJá 💪</Text>
            <Text style={styles.subtitle}>
              Escolha seu treino de hoje!
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/perfil')}
          >
            <Text style={styles.profileIcon}>👤</Text>
            <Text style={styles.profileText}>Meu Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Categorias de exercícios</Text>

      {exercicios.map((grupo) => (
        <View key={grupo.categoria} style={styles.card}>
          <Text style={styles.cardTitle}>{grupo.categoria}</Text>
          <Text style={styles.description}>{grupo.descricao}</Text>

          {grupo.itens.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.exercise}
              onPress={() =>
                router.push({
                  pathname: '/detalhes',
                  params: {
                    exercicio: item,
                    categoria: grupo.categoria,
                  },
                })
              }
            >
              <Text style={styles.exerciseText}>• {item} ➜</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <Text style={styles.footer}>
        FitJá • Seu treino começa aqui!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  header: {
    backgroundColor: '#1E3A8A',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#BFDBFE',
    fontSize: 16,
    marginTop: 8,
  },
  profileButton: {
    backgroundColor: '#2563EB',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 24,
  },
  profileText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    margin: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 18,
    borderRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  description: {
    color: '#64748B',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 12,
  },
  exercise: {
    backgroundColor: '#EFF6FF',
    padding: 11,
    borderRadius: 8,
    marginTop: 7,
  },
  exerciseText: {
    color: '#1E293B',
    fontSize: 15,
  },
  footer: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 15,
    marginBottom: 30,
  },
});