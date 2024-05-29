import React, { useState, useRef } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { styles } from '../styles/styles';
import { useProduct } from '../context/product';

export const CameraComponent = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const { dispatch } = useProduct();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      dispatch({ type: 'SET_PHOTO', payload: photo.uri });
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera}  ref={cameraRef}>
        <View style={styles.buttonContainer}>
        </View>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.text}>Take Photo</Text>
        </TouchableOpacity>
      </CameraView>
    </View>
  );
};

