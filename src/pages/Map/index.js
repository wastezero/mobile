import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { GetBranches } from 'src/api';

const MapPage = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [branches, setBranches] = useState([]);

  const getBranches = async () => {
    const res = await GetBranches();
    setBranches(res.branches);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
    getBranches();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        zoomControlEnabled
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker coordinate={userLocation}>
          <Image
            source={require('../../assets/UserLocation.png')}
            style={styles.userMarker}
          />
        </Marker>
        {branches.map((res) => (
          <Marker
            coordinate={{
              latitude: res.address.lat,
              longitude: res.address.lng,
            }}
            key={res.id}
            title={res.restaurant.name}
            onPress={() => navigation.navigate('Branch', { id: res.id })}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  userMarker: {
    width: 50,
    height: 50,
  },
});

export default MapPage;
