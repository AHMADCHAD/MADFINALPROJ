import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable ,Dimensions} from 'react-native';

export default function Admin({ navigation }) {
    const news = () => {
        navigation.navigate('News', { name: 'News' });
    };

    const Venues = () => {
        navigation.navigate('Venues', { name: 'Venues' });
    };

    const Feedbacks = () => {
        navigation.navigate('Feedbacks', { name: 'Feedbacks' });
    };

    return (
        <View style={styles.container}>


            <View style={styles.blue}>
                <View style={styles.viewdashboard}>
                    <Text style={styles.dashboard}>Dashboard</Text>
                    <Text style={styles.welcome}>Welcome to Admin Panel</Text>
                </View>
            </View>


            <View style={styles.darkwhite}>
                <View style={styles.innercont}>
                    <TouchableOpacity style={styles.dashboardContents} onPress={() => navigation.navigate('Requests', { name: 'Requests' })}>
                        <Image style={styles.image} source={require('../../Images/request.png')} />
                        <Text style={styles.request}>Requests</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dashboardContents} onPress={news}>
                        <Image style={styles.image} source={require('../../Images/news.png')} />
                        <Text style={styles.request}>Latest News</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.innercont}>
                    <TouchableOpacity style={styles.dashboardContents} onPress={Feedbacks}>
                        <Image style={styles.image} source={require('../../Images/feedback.png')} />
                        <Text style={styles.request}>Feedbacks</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dashboardContents} onPress={Venues}>
                        <Image style={styles.image} source={require('../../Images/question.png')} />
                        <Text style={styles.request}>Venues</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    blue: {
        backgroundColor: '#1E90FF',
        flex: 1,
    },
    darkwhite: {
        backgroundColor: '#F5F5F5',
        height: '50%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        flex: 1,
        width:Dimensions.get('window').width,
        // alignSelf:'stretch'
        // position:'relative'
    },
    dashboard: {
        top:90,
        fontSize: 45,
        color: 'white',
    },
    viewdashboard: {
        margin: 30,
        paddingTop: 40,
    },
    welcome: {
        fontSize: 15,
        color: 'white',
        marginTop: 100,
        letterSpacing: 2,
    },
    image: {
        height: 70,
        width: 70,
        marginBottom:10,
        alignSelf: 'center',
    },
    dashboardContents: {
        backgroundColor: 'white',
        width: '40%',
        height: '60%',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection:'column'
      
    },
    innercont: {
        height: '50%',
        // borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
});
