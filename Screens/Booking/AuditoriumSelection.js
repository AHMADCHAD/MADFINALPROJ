import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const AuditoriumSelection = ({ route }) => {
  const [selectedAuditorium, setSelectedAuditorium] = useState(null);
  const [nusratOpacity, setNusratOpacity] = useState(1);
  const [iqbalOpacity, setIqbalOpacity] = useState(1);
  const [eventStatus, setEventStatus] = useState('Pending');

  const { EventData } = route.params;

  EventData._Auditorium = selectedAuditorium;
  EventData._eventStatus = eventStatus;

  const handleAuditoriumSelect = auditoriumName => {
    setSelectedAuditorium(auditoriumName);
    if (auditoriumName === 'Nusrat') {
      setNusratOpacity(0.5);
      setIqbalOpacity(1);
    } else if (auditoriumName === 'Iqbal') {
      setNusratOpacity(1);
      setIqbalOpacity(0.5);
    }
  };

  const saveData = async () => {
    // Check if the event date is within the next 30 days from the current date
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 30);
    const enteredDate = new Date(EventData.eventDate);

    if (enteredDate < currentDate || enteredDate > maxDate) {
      Alert.alert('Invalid Date', 'Please enter a date within the next 30 days.');
      return;
    }

    // Check if the event date is available for the selected auditorium
    const isDateAvailable = await checkDateAvailability(EventData.eventDate, selectedAuditorium);

    if (isDateAvailable) {
      try {
        const docRef = await addDoc(collection(firestore, 'Events'), {
          eventName: EventData.eventName,
          eventDescription: EventData.eventDescription,
          eventDate: EventData.eventDate,
          requestorName: EventData._requestorName,
          requestorEmail: EventData._contactEmail,
          requestorPhone: EventData._contactPhone,
          auditorium: EventData._Auditorium,
          status: EventData._eventStatus,
        });

        console.log('Document written with ID:', docRef.id);
        alert("Your Request has been sent")
      } catch (error) {
        console.error('Error saving event data:', error);
      }
    } else {
      Alert.alert('Date Unavailable', 'Please select a different date for the event.');
    }
  };

  const checkDateAvailability = async (date, auditorium) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(firestore, 'Events'), where('eventDate', '==', date), where('auditorium', '==', auditorium))
      );

      const events = querySnapshot.docs.map(doc => doc.data());
      return events.length === 0;
    } catch (error) {
      console.log('Error checking date availability:', error);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an Auditorium</Text>

      <TouchableOpacity
        style={[
          styles.auditoriumButton,
          selectedAuditorium === 'Nusrat' && styles.selectedAuditoriumButton,
        ]}
        onPress={() => handleAuditoriumSelect('Nusrat')}
      >
        <ImageBackground
          source={require('../../assets/nusrat_auditorium.jpg')}
          style={[styles.imageBackground, { opacity: nusratOpacity }]}
        >
          <Text style={styles.auditoriumButtonText}>Nusrat Auditorium</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.auditoriumButton,
          selectedAuditorium === 'Iqbal' && styles.selectedAuditoriumButton,
        ]}
        onPress={() => handleAuditoriumSelect('Iqbal')}
      >
        <ImageBackground
          source={require('../../assets/Iqbal_Auditorium.jpg')}
          style={[styles.imageBackground, { opacity: iqbalOpacity }]}
        >
          <Text style={styles.auditoriumButtonText}>Iqbal Auditorium</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bookButton} disabled={!selectedAuditorium} onPress={saveData}>
        <Text style={styles.bookButtonText}>
          {selectedAuditorium ? 'Book Now' : 'Select an Auditorium'}
        </Text>
      </TouchableOpacity>
    </View>
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
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  auditoriumButton: {
    height: 120,
    width: '100%',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  selectedAuditoriumButton: {
    backgroundColor: '#1E90FF',
  },
  auditoriumButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  bookButton: {
    backgroundColor: '#247ba0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AuditoriumSelection;
