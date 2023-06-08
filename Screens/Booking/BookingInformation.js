import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const BookingInformation = ({ route }) => {
  const [requesterName, setRequesterName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const navigation = useNavigation();

  const { EventData } = route.params;
  EventData._requestorName = requesterName;
  EventData._contactEmail = contactEmail;
  EventData._contactPhone = contactPhone;

  const handleNext = () => {
    navigation.navigate('AuditoriumSelection', { EventData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="person-add-outline" size={100} color="#247ba0" style={styles.icon} />
      </View>
      <Text style={styles.title}>Personal Information</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={requesterName}
          onChangeText={text => setRequesterName(text)}
          required
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={contactEmail}
          onChangeText={text => setContactEmail(text)}
          required
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={contactPhone}
          onChangeText={text => setContactPhone(text)}
          required
        />
      </View>

      <Pressable style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    marginTop: 15,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 5
  },
  iconContainer: {
    marginTop:20,
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    alignSelf: 'center',
  },
  formContainer: {},
  input: {
    marginBottom: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#247ba0',
    width: '100%',
    padding: 16,
    borderRadius: 8,
    marginTop: 40,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default BookingInformation;
