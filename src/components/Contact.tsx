import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { useAuth } from '../hooks/auth';
import { useContact } from '../hooks/contacts';

interface ContactProps {
  id?: string,
  name: string,
  phone: string,
}

const Contact: React.FC<{ info: ContactProps }> = ({ info }) => {
  const [ showContactModal, setShowContactModal ] = useState<boolean>(false);

  const { user } = useAuth();
  const { deleteContact } = useContact();
  
  const handleContactModal = useCallback(() => setShowContactModal(!showContactModal), [showContactModal]);
  
  return (
    <TouchableOpacity style={styles.Container} onPress={() => handleContactModal()}>
      <View style={styles.ProfileContainer}>
        <Text style={ styles.InitialLetter}>{info.name.charAt(0).toUpperCase()}</Text>
      </View>
      
      <View>
        <Text numberOfLines={1}>{info.name}</Text>
        <Text numberOfLines={1}>{info.phone.replace(/(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})/, "+$1 ($2) $3$4-$5")}</Text>
      </View>

      <ReactNativeModal isVisible={showContactModal} onBackdropPress={handleContactModal}>
        <View style={{ backgroundColor: 'white', padding: 16 }}>
          <View style={{ alignItems: 'center' }}>
            <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 18, padding: 6 }}>Opções</Text>
          </View>

          <TouchableOpacity onPress={() => {
              (user.id && info.id) && deleteContact(info.id, user.id);
              handleContactModal();
            }}
            style={{
              ...styles.Button,
              marginTop: 6
            }
          }>
            <Text style={styles.ButtonText}>Apagar Contato</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleContactModal} style={{ ...styles.Button, marginTop: 6 }}>
            <Text style={styles.ButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  InitialLetter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
  },
  Container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ProfileContainer: {
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: "lightgray",
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default Contact;
