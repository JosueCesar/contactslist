import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavProps } from '../../routes/Routes';

const Auth: React.FC<NavProps> = ({ navigation }) => {

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
      <View style={{ justifyContent: 'center' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Autenticar</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.Button}>
          <Text style={styles.ButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.Button}>
          <Text style={styles.ButtonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default Auth;