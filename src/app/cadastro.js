import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Cadastro() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [idade, setIdade] = useState('');
  const [cpf, setCpf] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [objetivo, setObjetivo] = useState('Ganhar massa muscular');
  const [nivel, setNivel] = useState('Iniciante');
  const [frequencia, setFrequencia] = useState('3 vezes por semana');

  const finalizarCadastro = async () => {
    if (
      !nome.trim() ||
      !sobrenome.trim() ||
      !idade.trim() ||
      !cpf.trim() ||
      !peso.trim() ||
      !altura.trim() ||
      !email.trim() ||
      !telefone.trim() ||
      !senha ||
      !confirmarSenha
    ) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const cpfLimpo = cpf.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) {
      Alert.alert('Atenção', 'Digite um CPF com 11 números.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Atenção', 'Digite um e-mail válido.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não são iguais.');
      return;
    }

    try {
      const chavePerfil = `fitja_perfil_${cpfLimpo}`;
      const chaveSenha = `fitja_senha_${cpfLimpo}`;

      const cadastroExistente = await AsyncStorage.getItem(chavePerfil);

      if (cadastroExistente) {
        Alert.alert('Atenção', 'Já existe uma conta cadastrada com esse CPF.');
        return;
      }

      const usuario = {
        nome: nome.trim(),
        sobrenome: sobrenome.trim(),
        idade,
        cpf: cpfLimpo,
        peso,
        altura,
        email: email.trim().toLowerCase(),
        telefone,
        objetivo,
        nivel,
        frequencia,
      };

      await AsyncStorage.setItem(
        chavePerfil,
        JSON.stringify(usuario)
      );

      await SecureStore.setItemAsync(chaveSenha, senha);

      Alert.alert(
        'Cadastro realizado!',
        `Bem-vindo(a) ao FitJá, ${nome}! Seus dados foram salvos.`,
        [
          {
            text: 'OK',
            onPress: () => router.replace('/login'),
          },
        ]
      );
    } catch (erro) {
      Alert.alert(
        'Erro',
        'Não foi possível salvar seu cadastro. Tente novamente.'
      );
      console.log('Erro ao cadastrar:', erro);
    }
  };

  const campo = (
    titulo,
    valor,
    alterar,
    placeholder,
    teclado = 'default',
    senhaSegura = false
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{titulo}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        value={valor}
        onChangeText={alterar}
        keyboardType={teclado}
        secureTextEntry={senhaSegura}
        autoCapitalize={teclado === 'email-address' ? 'none' : 'words'}
      />
    </View>
  );

  const opcoes = (titulo, selecionado, alterar, lista) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{titulo}</Text>
      <View style={styles.options}>
        {lista.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.option,
              selecionado === item && styles.optionSelected,
            ]}
            onPress={() => alterar(item)}
          >
            <Text
              style={[
                styles.optionText,
                selecionado === item && styles.optionTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Criar conta</Text>
      <Text style={styles.subtitle}>
        Preencha seus dados para fazer parte do FitJá!
      </Text>

      <Text style={styles.section}>Dados pessoais</Text>

      {campo('Nome *', nome, setNome, 'Digite seu nome')}
      {campo('Sobrenome *', sobrenome, setSobrenome, 'Digite seu sobrenome')}
      {campo('Idade *', idade, setIdade, 'Ex.: 25', 'numeric')}
      {campo('CPF *', cpf, setCpf, '000.000.000-00', 'numeric')}
      {campo('Telefone *', telefone, setTelefone, '(00) 00000-0000', 'phone-pad')}
      {campo('E-mail *', email, setEmail, 'seuemail@email.com', 'email-address')}

      <Text style={styles.section}>Dados físicos</Text>

      {campo('Peso (kg) *', peso, setPeso, 'Ex.: 70', 'numeric')}
      {campo('Altura (cm) *', altura, setAltura, 'Ex.: 175', 'numeric')}

      <Text style={styles.section}>Informações de treino</Text>

      {opcoes('Qual é seu objetivo?', objetivo, setObjetivo, [
        'Emagrecer',
        'Ganhar massa muscular',
        'Manter a forma',
        'Melhorar a saúde',
      ])}

      {opcoes('Nível de atividade', nivel, setNivel, [
        'Iniciante',
        'Intermediário',
        'Avançado',
      ])}

      {opcoes('Frequência de treino', frequencia, setFrequencia, [
        '2 vezes por semana',
        '3 vezes por semana',
        '4 vezes por semana',
        '5 vezes por semana',
        '6 vezes por semana',
      ])}

      <Text style={styles.section}>Dados de acesso</Text>

      {campo('Senha *', senha, setSenha, 'Crie uma senha', 'default', true)}
      {campo(
        'Confirmar senha *',
        confirmarSenha,
        setConfirmarSenha,
        'Digite a senha novamente',
        'default',
        true
      )}

      <Text style={styles.note}>* Campos obrigatórios.</Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={finalizarCadastro}
      >
        <Text style={styles.buttonText}>Finalizar cadastro</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>FitJá • Seu treino começa aqui!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
  },
  content: {
    paddingTop: 55,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  backText: {
    color: '#93C5FD',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 22,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#BFDBFE',
    fontSize: 15,
    marginTop: 7,
    marginBottom: 28,
  },
  section: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 18,
  },
  inputContainer: {
    marginBottom: 17,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 16,
    color: '#1E293B',
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  option: {
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    paddingVertical: 11,
    paddingHorizontal: 13,
  },
  optionSelected: {
    backgroundColor: '#2563EB',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  optionText: {
    color: '#1E293B',
    fontSize: 13,
  },
  optionTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  note: {
    color: '#BFDBFE',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  footer: {
    color: '#BFDBFE',
    textAlign: 'center',
    marginTop: 25,
    fontSize: 13,
  },
});