import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { encode, decode } from 'js-base64';

interface LoginDataInterface {
  email: string,
  password: string,
}

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginDataInterface>({} as LoginDataInterface);

  const auth = useAuth();

  const handleData = useCallback(({ key, value }: { key: string, value: string }) => {
    setLoginData({
      ...loginData,
      [key]: value,
    });
  }, [loginData, setLoginData]);

  const login = useCallback(() => {
    console.log(loginData);

    if(loginData) {
      const password = encode(loginData.password)
      console.log(password, decode(password))

      auth.signIn({
        email: loginData.email,
        password,
      });
    }

  }, [loginData]);

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
      <View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, paddingBottom: 8 }}>Autenticar</Text>
        </View>

        <Text style={{ fontWeight: 'bold' }}>E-mail</Text>
        <TextInput
          style={styles.Input}
          value={loginData.email}
          onChangeText={value => handleData({ key: 'email', value })}
        />

        <Text style={{ fontWeight: 'bold' }}>Senha</Text>
        <TextInput
          style={styles.Input}
          value={loginData.password}
          textContentType="password"
          secureTextEntry
          onChangeText={value => handleData({ key: 'password', value })}
        />

        <TouchableOpacity onPress={() => login()} style={styles.Button}>
          <Text style={styles.ButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightBlue',
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  Button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  ButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;