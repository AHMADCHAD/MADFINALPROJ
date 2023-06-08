import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Login from './Login';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase';


const SignUp = () => {

    const [newemail, setNewEmail] = useState(null);
    const [newpassword, setNewPassword] = useState(null);

    const navigation = useNavigation();

    const Submit = () => {
        createUserWithEmailAndPassword(auth, newemail, newpassword)
            .then((userCredential) => {
                alert('SUCCESSFULLY SIGNED IN')
            })
            .catch((error) => {
                alert('FAILED')
            });
    }

    return (
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="chevron-back-outline" size={24} color="black" />
                </Pressable>
                <Text style={styles.title}>SignUp</Text>
            </View>



            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder='Enter Your Email'
                    style={styles.textinput}
                    keyboardType="email-address"
                    onChangeText={(text) => setNewEmail(text)}

                />
                <TextInput
                    placeholder='Enter Your Password'
                    style={styles.textinput}
                    keyboardType="visible-password"
                    onChangeText={(text) => setNewPassword(text)}

                />

            </View>

            <View style={styles.bottomContainer}>
                <Pressable
                    onPress={() => navigation.navigate('Login')}
                ><Text style={{ marginLeft: 20, color: 'blue', fontSize: 18 }}>Already registered,login</Text></Pressable>
                <Pressable style={styles.button} onPress={Submit}><Text style={styles.buttonText}>Submit</Text></Pressable>
            </View>

        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    textInputContainer: {
        flexGrow: 1,
        top: 100,
        width: '80%',
        alignSelf: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textinput: {
        backgroundColor: 'gray',
        padding: 20,
        borderRadius: 10,
        marginBottom: 50

    },
    titleContainer: {
        // fontSize: 30,
        flexDirection: 'row',
        top: 50,
        left: 20,
        alignItems: 'center',
        // justifyContent:'space-around'
    },
    title: {
        fontSize: 30
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: 40
    },
    button: {
        backgroundColor: 'blue',
        width: '30%',
        padding: 20,
        marginRight: 20,
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    }
});
