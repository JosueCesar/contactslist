import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthState, useAuth } from '../../hooks/auth';
import { encode, decode } from 'js-base64';

interface RegisterDataInterface extends AuthState {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

const Register: React.FC = () => {
  const [registerData, setRegisterData] = useState<RegisterDataInterface>({} as RegisterDataInterface);

  const auth = useAuth();

  const handleData = useCallback(({ key, value }: { key: string, value: string }) => {
    setRegisterData({
      ...registerData,
      [key]: value,
    });
  }, [registerData, setRegisterData]);

  const register = useCallback(() => {
    console.log(registerData);

    if(registerData && registerData.password === registerData.confirmPassword) {
      const password = encode(registerData.password);

      auth.createUser({
        name: registerData.name,
        email: registerData.email,
        password,
      });
    }

  }, [registerData]);

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
      <View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, paddingBottom: 8 }}>Cadastro</Text>
        </View>

        <Text style={{ fontWeight: 'bold' }}>Nome</Text>
        <TextInput
          style={styles.Input}
          value={registerData.name}
          onChangeText={value => handleData({ key: 'name', value })}
        />

        <Text style={{ fontWeight: 'bold' }}>E-mail</Text>
        <TextInput
          style={styles.Input}
          value={registerData.email}
          onChangeText={value => handleData({ key: 'email', value })}
        />
        
        <Text style={{ fontWeight: 'bold' }}>Senha</Text>
        <TextInput
          style={styles.Input}
          value={registerData.password}
          textContentType="password"
          secureTextEntry
          onChangeText={value => handleData({ key: 'password', value })}
        />
        
        <Text style={{ fontWeight: 'bold' }}>Confirmar senha</Text>
        <TextInput
          style={styles.Input}
          value={registerData.confirmPassword}
          textContentType="password"
          secureTextEntry
          onChangeText={value => handleData({ key: 'confirmPassword', value })}
        />

        <TouchableOpacity onPress={() => register()} style={styles.Button}>
          <Text style={styles.ButtonText}>Registrar</Text>
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
  }
});

export default Register;