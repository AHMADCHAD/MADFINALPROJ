import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

export default function News() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const saveNews = async () => {
    // Calculate expiration timestamp (current timestamp + 24 hours)
    const expirationTimestamp = Date.now() + 86400000; // 24 hours in milliseconds

    try {
      // Save the news item to Firestore
      await addDoc(collection(firestore, 'news'), {
        title,
        description,
        createdAt: serverTimestamp(),
        expiresAt: expirationTimestamp,
      });

      // Clear the input fields
      setTitle('');
      setDescription('');
      console.log('News item saved successfully!');
      alert("Your News has been Shared!, It will automatically delete after one day")
    } catch (error) {
      console.error('Error saving news item:', error);
      alert("ERROR")
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.blue}>
        <View style={styles.dashview}>
          <Text style={styles.newstext}>Latest News</Text>
          <Text style={styles.newssharetext}>Welcome to News Sharing Section</Text>
        </View>
      </View>
      <View style={styles.darkwhite}>
        <View style={styles.inputview}>
          <TextInput
            placeholder="Title"
            style={styles.textinput}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Enter the details"
            multiline
            numberOfLines={6}
            style={styles.paragraph}
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity style={styles.share} onPress={saveNews}>
            <Text style={styles.sharetext}>SHARE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blue: {
    backgroundColor: '#1E90FF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkwhite: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 20,
  },
  newstext: {
    fontSize: 30,
    color: 'white',
    marginBottom: 10,
  },
  dashview: {
    marginTop: 20,
  },
  newssharetext: {
    fontSize: 15,
    color: 'white',
    marginTop: 5,
    letterSpacing: 2,
  },
  textinput: {
    fontSize: 20,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
  },
  paragraph: {
    fontSize: 17,
    borderWidth: 1,
    width: '100%',
    padding: 8,
    height: 120,
    marginTop: 20,
    // fontWeight: 'bold',
    textAlignVertical: 'top',
    borderRadius: 10,
    borderColor: '#ccc',
  },
  inputview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  share: {
    backgroundColor: '#1E90FF',
    width: '100%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  sharetext: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
});
