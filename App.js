import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, ImageBackground, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';
import EventDetails from './Screens/Booking/EventDetails';
import AuditoriumSelection from './Screens/Booking/AuditoriumSelection';
import BookingInformation from './Screens/Booking/BookingInformation';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import Admin from './Screens/Admin/Admin';
import Feedbacks from './Screens/Admin/FeedBacks';
import News from './Screens/Admin/News';
import Requests from './Screens/Admin/Requests';
import Venues from './Screens/Admin/Venues';
import { firestore } from './firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import FreeSlot from './Screens/FreeSlots/FreeSlots';
import moment from 'moment';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [sharedNews, setSharedNews] = useState([]);

  useEffect(() => {
    
    const fetchApprovedEvents = async () => {
      try {
        const collectionRef = collection(firestore, 'Events');
        const q = query(collectionRef, where('status', '==', 'approved'));
        const querySnapshot = await getDocs(q);
        const currentDate = new Date(); // Get the current date
        const data = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((event) => {
            const eventDate = new Date(event.eventDate.toDate()); // Convert event date to a Date object
            return eventDate >= currentDate; // Filter out events that have passed their date
          });
        setApprovedEvents(data);
      } catch (error) {
        console.log('Error fetching approved events:', error);
      }
    };
    
    
    
    

    const fetchSharedNews = async () => {
      try {
        const collectionRef = collection(firestore, 'news');
        const q = query(collectionRef);
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSharedNews(data);
        console.log("fetch successfull")
        console.log(combinedData)
      } catch (error) {
        console.log('Error fetching shared news:', error);
      }
    };

    fetchApprovedEvents();
    fetchSharedNews();
  }, []);

  const renderEvent = ({ item }) => (
    <View style={styles.eventContainer}>
      <Text style={styles.eventTitle}>{item.eventName}</Text>
      <Text style={styles.eventDescription}>{item.eventDescription}</Text>
    </View>
  );

  const renderNewsItem = ({ item }) => (
    <View style={styles.eventContainer}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
    </View>
  );

  const combinedData = [...approvedEvents, ...sharedNews];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground source={require('./assets/Iqbal_Auditorium.jpg')} style={styles.backgroundImg}>
          <Text style={styles.text}>HITEC Booking</Text>
        </ImageBackground>
      </View>

      <View style={styles.container2}>
        <Pressable
          onPress={() => navigation.navigate('EventDetails')}
          style={styles.cont2Button}
        >
          <Ionicons name="location-outline" size={24} color="black" style={styles.icon} />
          <Text style={styles.cont2ButtonText}>Booking</Text>
        </Pressable>
        <Pressable style={styles.cont2Button} onPress={() => navigation.navigate('FreeSlot')}>
          <Ionicons name="pause-outline" size={24} color="black" style={styles.icon} />
          <Text style={styles.cont2ButtonText}>Free Slots</Text>
        </Pressable>
        <Pressable style={styles.cont2Button}>
          <Ionicons name="chatbox-ellipses-outline" size={24} color="black" style={styles.icon} />
          <Text style={styles.cont2ButtonText}>Complaint</Text>
        </Pressable>
      </View>

      <View style={styles.container3}>
        <Text style={styles.title}>Latest Events and News</Text>

        {combinedData.length > 0 ? (
          <View style={styles.eventListContainer}>
            <FlatList
              data={combinedData}
              renderItem={({ item }) => {
                if (item.eventName && item.eventDescription) {
                  return renderEvent({ item });
                } else if (item.title && item.description) {
                  return renderNewsItem({ item });
                }
              }}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.eventListContent}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <Text style={styles.noEventText}>No events and news available</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Sign In as Admin</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerTransparent: true }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUp}
        />
        <Stack.Screen
          name='EventDetails'
          component={EventDetails}
          options={{
            title: "Booking",
            headerStyle: { backgroundColor: '#ff1641' },
            headerTintColor: 'white', // Set the back arrow color to white
            headerTitleStyle: {
              color: 'white'
            },
          }}
        />

        <Stack.Screen
          name='BookingInformation'
          component={BookingInformation}
          options={{
            title: "Booking",
            headerStyle: { backgroundColor: '#ff1654' },
            headerTintColor: 'white', // Set the back arrow color to white
            headerTitleStyle: {
              color: 'white',
              textAlign: 'center', // Center align the header title
              letterSpacing: 1, // Apply letter spacing
              flex: 1 // Expand the header title to center it
            },
          }}
        />

        <Stack.Screen
          name='AuditoriumSelection'
          component={AuditoriumSelection}
          options={{
            title: "Booking",
            headerStyle: { backgroundColor: '#ff1654' },
            headerTintColor: 'white', // Set the back arrow color to white
            headerTitleStyle: {
              color: 'white',
              textAlign: 'center', // Center align the header title
              letterSpacing: 1, // Apply letter spacing
              flex: 1 // Expand the header title to center it
            },
          }}
        />

        <Stack.Screen
          name='FreeSlot'
          component={FreeSlot}
        />
        <Stack.Screen
          name='Admin'
          component={Admin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Requests'
          component={Requests}
          options={{ headerTransparent: true }}
        />
        <Stack.Screen name='News' component={News} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Feedbacks' component={Feedbacks}></Stack.Screen>
        <Stack.Screen name='Venues' component={Venues}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: '25%',
    backgroundColor: '#333',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 10
  },
  text: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Kamerik105Cyrillic-Bold',
    marginBottom: 60,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    backgroundColor: '#fff',
    marginTop: -30,
  },
  cont2Button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cont2ButtonText: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  container3: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  eventListContainer: {
    flex: 1,
  },
  eventListContent: {
    paddingBottom: 20,
  },
  eventContainer: {
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
  },
  noEventText: {
    alignSelf: 'center',
    marginTop: 20,
    color: 'gray',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    // marginBottom: 20,
    // paddingHorizontal: 20,
  },
  button: {
    padding: 18,
    backgroundColor: '#1E90FF',
    width: '100%',
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },
  backgroundImg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
});