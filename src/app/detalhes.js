import { useLocalSearchParams, useRouter } from 'expo-router';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const listaExercicios = {
  'Supino reto': {
    musculos: 'Peitoral, tríceps e ombros',
    descricao: 'Exercício para fortalecer principalmente o peito.',
    execucao: [
      'Deite-se no banco com os pés apoiados.',
      'Segure a barra com as mãos afastadas.',
      'Desça a barra lentamente em direção ao peito.',
      'Empurre a barra para cima de maneira controlada.',
    ],
    series: '3 séries',
    repeticoes: '12 repetições',
    descanso: '60 a 90 segundos',
    imagem: 'https://images.unsplash.com/photo-1534368270820-9de3d8053204?w=900',
  },

  'Supino inclinado': {
    musculos: 'Peitoral superior, tríceps e ombros',
    descricao: 'Exercício para desenvolver a parte superior do peito.',
    execucao: [
      'Ajuste o banco em uma inclinação confortável.',
      'Segure os halteres ou a barra.',
      'Desça o peso lentamente.',
      'Empurre para cima de forma controlada.',
    ],
    series: '3 séries',
    repeticoes: '10 a 12 repetições',
    descanso: '60 a 90 segundos',
  },

  'Flexão de braço': {
    musculos: 'Peitoral, tríceps e ombros',
    descricao: 'Exercício que utiliza o peso do próprio corpo.',
    execucao: [
      'Apoie as mãos no chão.',
      'Mantenha o corpo alinhado.',
      'Flexione os cotovelos para descer.',
      'Empurre o chão para voltar.',
    ],
    series: '3 séries',
    repeticoes: '10 a 15 repetições',
    descanso: '60 segundos',
  },

  'Puxada frontal': {
    musculos: 'Costas e bíceps',
    descricao: 'Exercício para fortalecer os músculos das costas.',
    execucao: [
      'Sente-se na máquina de puxada.',
      'Segure a barra com as mãos afastadas.',
      'Puxe a barra em direção à parte superior do peito.',
      'Retorne lentamente.',
    ],
    series: '3 séries',
    repeticoes: '12 repetições',
    descanso: '60 a 90 segundos',
  },

  'Remada baixa': {
    musculos: 'Costas, bíceps e ombros posteriores',
    descricao: 'Exercício para trabalhar a região das costas.',
    execucao: [
      'Sente-se com os pés apoiados.',
      'Segure o puxador.',
      'Puxe em direção ao abdômen.',
      'Retorne lentamente.',
    ],
    series: '3 séries',
    repeticoes: '12 repetições',
    descanso: '60 a 90 segundos',
  },

  'Remada curvada': {
    musculos: 'Costas e bíceps',
    descricao: 'Exercício para fortalecer as costas.',
    execucao: [
      'Segure a barra.',
      'Incline o tronco mantendo a coluna neutra.',
      'Puxe a barra em direção ao abdômen.',
      'Desça lentamente.',
    ],
    series: '3 séries',
    repeticoes: '10 a 12 repetições',
    descanso: '90 segundos',
  },

  'Agachamento': {
    musculos: 'Quadríceps, glúteos e posteriores',
    descricao: 'Exercício para fortalecer as pernas e os glúteos.',
    execucao: [
      'Afaste os pés na largura dos ombros.',
      'Flexione os joelhos e quadris.',
      'Desça mantendo o controle do movimento.',
      'Retorne à posição inicial.',
    ],
    series: '3 séries',
    repeticoes: '12 repetições',
    descanso: '90 segundos',
  },

  'Leg press': {
    musculos: 'Quadríceps, glúteos e posteriores',
    descricao: 'Exercício realizado em máquina para trabalhar as pernas.',
    execucao: [
      'Sente-se corretamente na máquina.',
      'Posicione os pés na plataforma.',
      'Empurre a plataforma sem travar os joelhos.',
      'Retorne lentamente.',
    ],
    series: '3 séries',
    repeticoes: '12 repetições',
    descanso: '90 segundos',
  },

  'Cadeira extensora': {
    musculos: 'Quadríceps',
    descricao: 'Exercício para fortalecer a parte da frente das coxas.',
    execucao: [
      'Sente-se na máquina.',
      'Ajuste o apoio próximo aos tornozelos.',
      'Estenda os joelhos de forma controlada.',
      'Retorne lentamente.',
    ],
    series: '3 séries',
    repeticoes: '12 repetições',
    descanso: '60 segundos',
  },

  'Rosca direta': {
    musculos: 'Bíceps',
    descricao: 'Exercício para fortalecer a parte anterior dos braços.',
    execucao: [
      'Segure a barra com as palmas para frente.',
      'Mantenha os cotovelos próximos ao corpo.',
      'Flexione os cotovelos.',
      'Desça lentamente.',
    ],
    series: '3 séries',
    repeticoes: '12 repetições',
    descanso: '60 segundos',
  },

  'Rosca alternada': {
    musculos: 'Bíceps',
    descricao: 'Exercício realizado com halteres, alternando os braços.',
    execucao: [
      'Segure um halter em cada mão.',
      'Mantenha os cotovelos próximos ao corpo.',
      'Flexione um braço de cada vez.',
      'Retorne lentamente.',
    ],
    series: '3 séries',
    repeticoes: '12 repetições',
    descanso: '60 segundos',
  },

  'Tríceps pulley': {
    musculos: 'Tríceps',
    descricao: 'Exercício realizado na polia para fortalecer os tríceps.',
    execucao: [
      'Fique em frente à polia.',
      'Segure a barra ou corda.',
      'Estenda os cotovelos para baixo.',
      'Retorne controlando o movimento.',
    ],
    series: '3 séries',
    repeticoes: '12 repetições',
    descanso: '60 segundos',
  },

  'Abdominal reto': {
    musculos: 'Abdômen',
    descricao: 'Exercício para fortalecer a musculatura abdominal.',
    execucao: [
      'Deite-se de barriga para cima.',
      'Flexione os joelhos.',
      'Eleve o tronco de forma controlada.',
      'Retorne lentamente.',
    ],
    series: '3 séries',
    repeticoes: '15 repetições',
    descanso: '45 a 60 segundos',
  },

  'Prancha': {
    musculos: 'Abdômen e músculos estabilizadores',
    descricao: 'Exercício isométrico para fortalecer o centro do corpo.',
    execucao: [
      'Apoie os antebraços no chão.',
      'Estenda as pernas.',
      'Mantenha o corpo alinhado.',
      'Sustente a posição sem prender a respiração.',
    ],
    series: '3 séries',
    repeticoes: '20 a 30 segundos',
    descanso: '45 a 60 segundos',
  },

  'Abdominal bicicleta': {
    musculos: 'Abdômen e oblíquos',
    descricao: 'Exercício abdominal com movimento alternado das pernas.',
    execucao: [
      'Deite-se de barriga para cima.',
      'Eleve as pernas.',
      'Aproxime o cotovelo do joelho oposto.',
      'Alterne os lados.',
    ],
    series: '3 séries',
    repeticoes: '12 por lado',
    descanso: '45 a 60 segundos',
  },

  'Esteira': {
    musculos: 'Pernas e sistema cardiovascular',
    descricao: 'Atividade aeróbica para melhorar o condicionamento.',
    execucao: [
      'Suba na esteira com segurança.',
      'Comece em velocidade confortável.',
      'Mantenha uma postura natural.',
      'Reduza a velocidade antes de finalizar.',
    ],
    series: '1 sessão',
    repeticoes: '15 a 20 minutos',
    descanso: 'Conforme orientação',
  },

  'Bicicleta': {
    musculos: 'Quadríceps, glúteos e panturrilhas',
    descricao: 'Atividade aeróbica para melhorar o condicionamento.',
    execucao: [
      'Ajuste o banco da bicicleta.',
      'Posicione os pés nos pedais.',
      'Comece com resistência leve.',
      'Mantenha um ritmo confortável.',
    ],
    series: '1 sessão',
    repeticoes: '15 a 20 minutos',
    descanso: 'Conforme orientação',
  },

  'Polichinelo': {
    musculos: 'Pernas, ombros e sistema cardiovascular',
    descricao: 'Exercício aeróbico que movimenta o corpo inteiro.',
    execucao: [
      'Fique em pé com os pés juntos.',
      'Salte afastando os pés e elevando os braços.',
      'Salte novamente retornando à posição inicial.',
      'Repita em ritmo confortável.',
    ],
    series: '3 séries',
    repeticoes: '20 repetições',
    descanso: '60 segundos',
  },
};
const imagens = {
  'Supino reto': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/bench-press/start.webp',
  'Supino inclinado': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/incline-bench-press/start.webp',
  'Flexão de braço': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/push-up/start.webp',
  'Puxada frontal': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/lat-pulldown/start.webp',
  'Remada baixa': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/seated-cable-row/start.webp',
  'Remada curvada': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/bent-over-row/start.webp',
  'Agachamento': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/squat/start.webp',
  'Leg press': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/leg-press/start.webp',
  'Cadeira extensora': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/leg-extension/start.webp',
  'Rosca direta': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/barbell-curl/start.webp',
  'Rosca alternada': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/alternating-dumbbell-curl/start.webp',
  'Tríceps pulley': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/tricep-pushdowns/start.webp',
  'Abdominal reto': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/crunches/start.webp',
  'Prancha': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/plank/hold.webp',
  'Abdominal bicicleta': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/bicycle-crunch/start.webp',
 'Esteira': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/treadmill-run/hold.webp',
'Bicicleta': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/stationary-bike/hold.webp',
  'Polichinelo': 'https://raw.githubusercontent.com/MarvinNazari/exercise-images/main/images/jumping-jacks/start.webp',
};
export default function Detalhes() {
  const router = useRouter();
  const { exercicio, categoria } = useLocalSearchParams();

  const nome = Array.isArray(exercicio) ? exercicio[0] : exercicio;
  const grupo = Array.isArray(categoria) ? categoria[0] : categoria;

  const dados = listaExercicios[nome] || listaExercicios['Supino reto'];
  const imagem = imagens[nome];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Voltar aos exercícios</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{nome || 'Exercício'}</Text>
        <Text style={styles.subtitle}>{grupo || 'Treinamento'}</Text>
      </View>

      <View style={styles.content}>
       {imagem ? (
          <Image
            source={{ uri: imagem }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>💪</Text>
            <Text style={styles.placeholderLabel}>{nome}</Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Sobre o exercício</Text>
        <Text style={styles.description}>{dados.descricao}</Text>

        <Text style={styles.sectionTitle}>Músculos trabalhados</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>{dados.musculos}</Text>
        </View>

        <Text style={styles.sectionTitle}>Como executar</Text>
        <View style={styles.infoCard}>
          {dados.execucao.map((passo, index) => (
            <Text key={index} style={styles.infoText}>
              {index + 1}. {passo}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Sugestão de treino</Text>
        <View style={styles.trainingCard}>
          <Text style={styles.trainingText}>{dados.series}</Text>
          <Text style={styles.trainingText}>{dados.repeticoes}</Text>
          <Text style={styles.trainingText}>Descanso: {dados.descanso}</Text>
        </View>

        <Text style={styles.warning}>
          As quantidades são sugestões ilustrativas. Ajuste o treino com
          orientação de um profissional.
        </Text>
      </View>
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
    paddingTop: 55,
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  backText: {
    color: '#BFDBFE',
    fontSize: 15,
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#BFDBFE',
    fontSize: 16,
    marginTop: 8,
  },
  content: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 230,
    borderRadius: 12,
    backgroundColor: '#CBD5E1',
  },
  imagePlaceholder: {
    height: 180,
    backgroundColor: '#DBEAFE',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 55,
  },
  placeholderLabel: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  sectionTitle: {
    color: '#1E3A8A',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 10,
  },
  description: {
    color: '#334155',
    fontSize: 16,
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  infoText: {
    color: '#334155',
    fontSize: 15,
    lineHeight: 25,
  },
  trainingCard: {
    backgroundColor: '#DBEAFE',
    padding: 18,
    borderRadius: 12,
  },
  trainingText: {
    color: '#1E3A8A',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  warning: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 20,
    marginBottom: 30,
  },
});