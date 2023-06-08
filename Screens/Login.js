import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import SignUp from './SignUp';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('LOGIN SUCCESSFULLY');
        navigation.navigate('Admin');
        console.log('Ahmad');
      })
      .catch((error) => {
        const newError = error;
        alert('LOGIN FAILED: ' + newError.code + ' - ' + newError.message);
        console.log('Error:', newError);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.screen1}>
        <Image style={styles.img} source={require('../Images/HITEC_University_Logo.jpg')}></Image>
      </View>
      <View style={styles.screen2}>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Enter Your Email"
            style={styles.input}
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>

        {/* <View style={styles.bottomContainer}> */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={login}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          {/* </View> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screen1: {
    top:60,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen2: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  img: {
    width: '80%',
    height: '60%',
    resizeMode: 'contain',
  },
  formContainer: {
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
    backgroundColor: '#E8E8E8',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 16,
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonContainer: {
    padding:30,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default Login;
