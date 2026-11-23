
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

export default function App() {

  // Store dog images
  const [dogs, setDogs] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetch dog images from API
  useEffect(() => {

    const fetchDogs = async () => {
      try {
        const response = await fetch(
          'https://api.thedogapi.com/v1/images/search?limit=5'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch dog images');
        }

        const data = await response.json();

        setDogs(data);

      } catch (error) {
        console.log('Error:', error);

      } finally {
        setLoading(false);
      }
    };

    fetchDogs();

  }, []);

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        My Dog Gallery
      </Text>

      {loading ? (
        <Text style={styles.message}>Loading...</Text>
      ) : dogs.length > 0 ? (
        dogs.map((dog) => (
          <View key={dog.id} style={styles.card}>

            <Image
              source={{ uri: dog.url }}
              style={styles.image}
            />

            <Text style={styles.name}>
              Cute Dog
            </Text>

          </View>
        ))
      ) : (
        <Text style={styles.message}>
          No dog images available.
        </Text>
      )}

    </ScrollView>
  );
}

// Simple styling
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#b19999',
    padding: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },

  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  image: {
    width: 250,
    height: 200,
    borderRadius: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },

  message: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },

});
