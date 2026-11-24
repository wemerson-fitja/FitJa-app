import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Login() {
  const router = useRouter();

  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    if (!cpf.trim() || !senha) {
      Alert.alert('Atenção', 'Preencha o CPF e a senha.');
      return;
    }

    const cpfLimpo = cpf.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) {
      Alert.alert('Atenção', 'Digite um CPF com 11 números.');
      return;
    }

    try {
      setCarregando(true);

      const chavePerfil = `fitja_perfil_${cpfLimpo}`;
      const chaveSenha = `fitja_senha_${cpfLimpo}`;

      const perfilSalvo = await AsyncStorage.getItem(chavePerfil);
      const senhaSalva = await SecureStore.getItemAsync(chaveSenha);

      if (!perfilSalvo || !senhaSalva) {
        Alert.alert(
          'Conta não encontrada',
          'Verifique seu CPF ou crie uma conta no FitJá.'
        );
        return;
      }

      if (senha !== senhaSalva) {
        Alert.alert(
          'Senha incorreta',
          'Confira sua senha e tente novamente.'
        );
        return;
      }

      await AsyncStorage.setItem('fitja_usuario_logado', cpfLimpo);

      Alert.alert(
        'Login realizado!',
        'Bem-vindo(a) de volta ao FitJá!',
        [
          {
            text: 'Continuar',
            onPress: () => router.replace('/exercicios'),
          },
        ]
      );
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível realizar o login.');
      console.log('Erro no login:', erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Acesse sua conta</Text>
      <Text style={styles.subtitle}>Digite seus dados do FitJá</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          placeholder="000.000.000-00"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          value={cpf}
          onChangeText={setCpf}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <TouchableOpacity
        style={styles.forgotContainer}
        onPress={() =>
          Alert.alert(
            'Recuperação de senha',
            'A recuperação de senha ainda será implementada.'
          )
        }
      >
        <Text style={styles.forgotText}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        activeOpacity={0.8}
        onPress={handleLogin}
        disabled={carregando}
      >
        <Text style={styles.loginButtonText}>
          {carregando ? 'Verificando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Ainda não tem conta? </Text>

        <TouchableOpacity onPress={() => router.push('/cadastro')}>
          <Text style={styles.signupLink}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  backButton: {
    marginBottom: 24,
  },
  backText: {
    color: '#93C5FD',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#93C5FD',
    marginTop: 6,
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    color: '#93C5FD',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#93C5FD',
    fontSize: 15,
  },
  signupLink: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});