import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Dialog from 'react-native-dialog';
import { useProduct } from '../context/product';
import { CameraComponent } from '../component/CameraComponent';
import { styles } from '../styles/styles';

export const MainScreen = () => {
  const { state, dispatch } = useProduct();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  const handleSubmit = () => {
    const data = {
      photo: state.product.photo,
      description: state.product.description,
      category: state.product.category,
    };

    if (!data.photo || !data.description || !data.category) {
      Alert.alert('All fields are required', 'Please take a photo, write a description, and choose a category.');
      return;
    }

    setDialogData(data);
    setShowDialog(true);

  };

  const handleConfirm = () => {
    Alert.alert('Data sent successfully!');

    dispatch({ type: 'RESET_PRODUCT' });

    setShowDialog(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
    <ScrollView contentContainerStyle={styles.container}>
      {!state.product.photo ?
      (
        <CameraComponent />
      ) : (
        <View style={styles.photoContainer}>
          <Image source={{ uri: state.product.photo }} style={styles.photo} />
          <TouchableOpacity style={styles.anotherPhotoButton} onPress={() => dispatch({ type: 'SET_PHOTO', payload: null })}>
            <Text style={styles.buttonText}>Take another photo</Text>
          </TouchableOpacity>
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Describe product"
        value={state.product.description}
        onChangeText={(text) => dispatch({ type: 'SET_DESCRIPTION', payload: text })}
      />
      <Picker
        selectedValue={state.product.category}
        onValueChange={(itemValue) => dispatch({ type: 'SET_CATEGORY', payload: itemValue })}
        style={styles.picker}
      >
        <Picker.Item label="Select a category" value="" />
        <Picker.Item label="Cocina" value="Cocina" />
        <Picker.Item label="Hogar" value="Hogar" />
        <Picker.Item label="Recamara" value="Recamara" />
        <Picker.Item label="Limpieza" value="Limpieza" />
        <Picker.Item label="Baño" value="Baño" />
        <Picker.Item label="Contigo" value="Contigo" />
        <Picker.Item label="Bienestar" value="Bienestar" />
      </Picker>
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
    <Dialog.Container visible={showDialog}>
        <Dialog.Title>Confirm Data</Dialog.Title>
        <Dialog.Description>
          Please confirm the following data before sending:
        </Dialog.Description>
        <Dialog.Description>
          {`Photo: ${dialogData?.photo ? 'Exist' : 'No exist'}\nDescription: ${dialogData?.description}\nCategory: ${dialogData?.category}`}
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setShowDialog(false)} />
        <Dialog.Button label="Confirm" onPress={handleConfirm} />
      </Dialog.Container>
    </KeyboardAvoidingView>
  );
};

