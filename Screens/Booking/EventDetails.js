import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const EventDetails = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  const handleNext = () => {
    if (eventName && eventDescription) {
      const EventData = {
        eventName,
        eventDescription,
        eventDate,
      };
      navigation.navigate('BookingInformation', { EventData });
    }

    else{
      alert("PLZ FILL ALL THE FIELDS")
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowDatePicker(false);
    setEventDate(currentDate);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="calendar-outline" size={Dimensions.get('window').width * 0.5} color="#247ba0" style={styles.icon} />
      </View>
      <Text style={styles.title}>Event Details</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Event Name"
          value={eventName}
          onChangeText={(text) => setEventName(text)}
          required
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Event Description"
          value={eventDescription}
          onChangeText={(text) => setEventDescription(text)}
          multiline={true}
          textAlignVertical="top"
          required
        />
        <Pressable
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{eventDate.toDateString()}</Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={eventDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <Pressable style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginTop: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Kamerik105Cyrillic-Bold',
    letterSpacing: 5,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    alignSelf: 'center',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 120, // Adjust the height as needed
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#247ba0',
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default EventDetails;
