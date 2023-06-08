import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, FlatList, Button } from 'react-native';
import { firestore } from '../../firebase/firebase';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function Requests() {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(firestore, 'Events');
        const q = query(collectionRef, where('status', '==', 'Pending'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAllData(data);
      } catch (error) {
        console.log('ERROR', error);
      }
    };

    fetchData();
  }, []);

  const handleAccept = async (itemId) => {
    try {
      // Update the status to "approved" in Firestore
      const docRef = doc(firestore, 'Events', itemId);
      await updateDoc(docRef, { status: 'approved' });

      // Remove the accepted document from the displayed list
      setAllData((prevData) => prevData.filter((data) => data.id !== itemId));
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const handleDecline = async (itemId) => {
    try {
      // Delete the declined document from Firestore
      const docRef = doc(firestore, 'Events', itemId);
      await deleteDoc(docRef);

      // Remove the declined document from the displayed list
      setAllData((prevData) => prevData.filter((data) => data.id !== itemId));
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const renderRequest = ({ item }) => (
    <View style={styles.request}>
      <Text style={styles.title}>Requestor Name: {item.requestorName}</Text>
      <Text style={styles.title}>Auditorium: {item.auditorium}</Text>
      <Text style={styles.title}>Event Date: {item.eventDate && item.eventDate.seconds}</Text>
      <Text style={styles.title}>Requestor Phone: {item.requestorPhone}</Text>
      <Text style={styles.title}>Event Name: {item.eventName}</Text>
      <Text style={styles.title}>Event Description: {item.eventDescription}</Text>
      <Text style={styles.title}>Requestor Email: {item.requestorEmail}</Text>
      <TextInput style={styles.input} />

      <View style={styles.buttonContainer}>
        <Button title="Accept" onPress={() => handleAccept(item.id)} color="#4CAF50" />
        <Button title="Decline" onPress={() => handleDecline(item.id)} color="#F44336" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {allData.length === 0 ? (
        <Text style={styles.noRequestsText}>There are no current requests.</Text>
      ) : (
        <View style={styles.requestsContainer}>
          <FlatList
            data={allData}
            renderItem={renderRequest}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  requestsContainer: {
    marginTop: 50,
    width: '90%',
    alignSelf: 'center',
    height: '80%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
  },
  request: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  noRequestsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
});
