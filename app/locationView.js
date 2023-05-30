import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity,Text,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import {bgColor,primaryColor} from './../color'

const LocationView = () => {
  const [mapRegion, setMapRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      Alert.alert('Error fetching location');
    }
  };

  const handlePressMarker = () => {
    if (mapRegion) {
      const { latitude, longitude } = mapRegion;
      Alert.alert('User location:', latitude, longitude);
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        {mapRegion && (
          <Marker coordinate={mapRegion} title="Marker" onPress={handlePressMarker}>
          </Marker>
        )}
      </MapView>

      {mapRegion && (
        <TouchableOpacity style={styles.locationButton} onPress={getUserLocation}>
          <Ionicons name="locate-outline" size={32} color={bgColor} />
        </TouchableOpacity>
      )}

      {!mapRegion && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMsg}>{errorMsg}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerIcon: {
    alignSelf: 'center',
    marginTop: -32,
  },
  locationButton: {
    position: 'absolute',
    bottom: 50,
    right: 35,
    backgroundColor:primaryColor,
    borderRadius: 16,
    padding: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMsg: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LocationView;
