import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Perfil() {
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const cpfLogado = await AsyncStorage.getItem(
        'fitja_usuario_logado'
      );

      if (!cpfLogado) {
        Alert.alert('Atenção', 'Faça login para acessar seu perfil.');
        router.replace('/login');
        return;
      }

      const perfilSalvo = await AsyncStorage.getItem(
        `fitja_perfil_${cpfLogado}`
      );

      if (!perfilSalvo) {
        Alert.alert('Erro', 'Não encontramos os dados do seu perfil.');
        router.replace('/login');
        return;
      }

      setUsuario(JSON.parse(perfilSalvo));
    } catch (erro) {
      console.log('Erro ao carregar perfil:', erro);
      Alert.alert('Erro', 'Não foi possível carregar seu perfil.');
    } finally {
      setCarregando(false);
    }
  };

  const campo = (titulo, valor) => (
    <View style={styles.campo}>
      <Text style={styles.campoTitulo}>{titulo}</Text>
      <Text style={styles.campoValor}>
        {valor ? String(valor) : 'Não informado'}
      </Text>
    </View>
  );

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.textoCarregando}>Carregando perfil...</Text>
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.carregando}>
        <Text>Não foi possível carregar o perfil.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.icone}>👤</Text>
        <Text style={styles.titulo}>Meu Perfil</Text>
        <Text style={styles.subtitulo}>
          Confira seus dados no FitJá
        </Text>
      </View>

      <View style={styles.cartao}>
        <Text style={styles.secao}>Dados pessoais</Text>

        {campo('Nome completo', `${usuario.nome} ${usuario.sobrenome}`)}
        {campo('Idade', usuario.idade ? `${usuario.idade} anos` : '')}
        {campo('CPF', usuario.cpf)}
        {campo('E-mail', usuario.email)}
        {campo('Telefone', usuario.telefone)}
      </View>

      <View style={styles.cartao}>
        <Text style={styles.secao}>Dados físicos</Text>

        {campo('Peso', usuario.peso ? `${usuario.peso} kg` : '')}
        {campo('Altura', usuario.altura ? `${usuario.altura} cm` : '')}
      </View>

      <View style={styles.cartao}>
        <Text style={styles.secao}>Informações de treino</Text>

        {campo('Objetivo', usuario.objetivo)}
        {campo('Nível', usuario.nivel)}
        {campo('Frequência semanal', usuario.frequencia)}
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.back()}
      >
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
  },
  textoCarregando: {
    marginTop: 12,
    color: '#1E3A8A',
  },
  cabecalho: {
    backgroundColor: '#1E3A8A',
    paddingTop: 60,
    paddingBottom: 35,
    alignItems: 'center',
  },
  icone: {
    fontSize: 48,
    marginBottom: 10,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#BFDBFE',
    fontSize: 15,
    marginTop: 6,
  },
  cartao: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
    marginTop: 20,
    padding: 18,
    borderRadius: 12,
  },
  secao: {
    color: '#1E3A8A',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  campo: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 12,
  },
  campoTitulo: {
    color: '#64748B',
    fontSize: 13,
  },
  campoValor: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  botao: {
    backgroundColor: '#2563EB',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});