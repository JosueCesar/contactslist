import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaskInput from 'react-native-mask-input';
import Modal from 'react-native-modal';
import Contact from '../components/Contact';
import { useAuth } from '../hooks/auth';
import { useContact } from '../hooks/contacts';

interface FormData {
  name: string,
  phone: string,
}

const Home: React.FC = () => {
  const [ formData, setFormData ] = useState({} as FormData);
  const [ showModal, setShowModal ] = useState<boolean>(false);
  const { contacts, createContact } = useContact(); 
  const { user, signOut } = useAuth();
  const { getContacts } = useContact();

  useEffect(() => {
    user.id && getContacts(user.id);
  }, [])

  const handleModal = useCallback(() => setShowModal(!showModal), [showModal]);

  const handleData = useCallback(({ key, value }: { key: string, value: string }) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  }, [formData, setFormData]);

  return (
    <View style={{ paddingTop: 32, flex: 1 }}>
      <Modal isVisible={showModal} onBackdropPress={handleModal}>
        <View style={{ backgroundColor: 'white', padding: 16 }}>

          <Text style={{ fontWeight: 'bold' }}>Nome</Text>
          <TextInput
            style={styles.Input}
            value={formData.name}
            onChangeText={value => handleData({ key: 'name', value })}
          />
          
          <Text style={{ fontWeight: 'bold' }}>Telefone</Text>
          <MaskInput
            value={formData.phone}
            style={styles.Input}
            onChangeText={(masked, unmasked) => {
              handleData({ key: 'phone', value: unmasked });
            }}
            mask={['+', /\d/, /\d/, ' (', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          />
          
          <TouchableOpacity onPress={() => {
            user.id && createContact(formData, user.id);
            setFormData({} as FormData);
            handleModal();
          }} style={{ ...styles.Button, marginTop: 6 }}>
            <Text style={styles.ButtonText}>Confirmar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleModal} style={{ ...styles.Button, marginTop: 6 }}>
            <Text style={styles.ButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.Header}>
        <Text style={styles.Title}>Contatos</Text>
        <View>
          <Text numberOfLines={1} style={styles.SubTitle}>Seja bem vindo (a), {user.name}!</Text>
        </View>
      </View>

      <FlatList
        data={contacts}
        renderItem={({ item }) => <Contact info={item}/>}
      />

      <View style={styles.ButtonsContainer}>
        <TouchableOpacity onPress={handleModal} style={styles.Button}>
          <Text style={styles.ButtonText}>Adicionar Contato</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={signOut} style={{ ...styles.Button, marginTop: 6 }}>
          <Text style={styles.ButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
  },
  Title: {
    fontWeight: '600',
    fontSize: 24,
  },
  SubTitle: {
    maxWidth: '80%',
  },
  Button: {
    backgroundColor: 'lightblue',
    width: '100%',
    padding: 16,
    alignItems: 'center',
  },
  ButtonText: {
    fontWeight: 'bold'
  },
  ButtonsContainer: {
    flex: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightBlue',
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 6,
  },
});

export default Home;