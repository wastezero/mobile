import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {restaurants} from './mock';

const MapPage = () => {
  const [userLocation, setUserLocation] = useState({latitude: 0, longitude: 0});

  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
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
        {restaurants.map((res, index) => (
          <Marker coordinate={res.coords} key={index} title={res.name} />
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
