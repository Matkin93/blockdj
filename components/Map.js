import React from 'react';
import { Text, View } from 'react-native';
import MapView, { Polygon, Marker, Callout } from 'react-native-maps';

const componentName = ({
  styles, currentLocation, areas
}) => (
    <MapView style={styles.map}
      showsUserLocation
      initialRegion={currentLocation} >
      {areas.map((area, i) => {
        return <View key={i}>
          <Polygon
            coordinates={area.bounds}
            fillColor={area.areaColor}
            strokeWidth={2}
            strokeColor='#171738'
          />
          <Marker coordinate={area.markerLocation = area.bounds[0]} pinColor='#171738'
            image='/Users/matthewatkin/Northcoders/app-test/pleasework/assets/images/vinyl.png'
          >
            <Callout style={styles.areaCallout}>
              <Text style={styles.areaCalloutName}>{area.name}</Text>
              <Text style={styles.areaCalloutDescription}>{area.description}</Text>
            </Callout>
          </Marker>
        </View>
      })}
    </MapView>
  );

export default componentName;
