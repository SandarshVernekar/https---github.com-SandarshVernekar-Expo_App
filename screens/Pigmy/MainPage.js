import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const MainPage = ({ route, navigation }) => {
  const { accountId } = route.params; // Get accountId from the login screen
  const [currentAmount, setCurrentAmount] = useState(0);
  const [addAmount, setAddAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [showPrintButton, setShowPrintButton] = useState(false);

  useEffect(() => {
    // Initialize currentAmount or fetch it from local storage if needed
    setCurrentAmount(0); // Initial value
  }, []);

  const handleSubmit = () => {
    if (addAmount === '') {
      Alert.alert('Error', 'Please enter an amount to add.');
      return;
    }

    const newTotalAmount = currentAmount + parseFloat(addAmount);
    setTotalAmount(newTotalAmount);
    setCurrentAmount(newTotalAmount); // Update currentAmount

    Alert.alert('Success', `Amount added successfully! Total: ${newTotalAmount}`);
    setAddAmount(''); // Reset input field
    setShowPrintButton(true); // Show print button after submitting amount
  };

  const handleCancel = () => {
    setAddAmount(''); // Reset the input field
    setShowPrintButton(false); // Hide print button if the process is canceled
  };

  const handlePrint = () => {
    // Pass data to PrintPage and navigate to it
    navigation.navigate('PrintPage', {
      accountId,
      currentAmount,
      addAmount,
      totalAmount
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Account ID: {accountId}</Text>
      <Text style={styles.label}>Current Amount: {currentAmount}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Amount to Add"
        keyboardType="numeric"
        value={addAmount}
        onChangeText={setAddAmount}
      />

      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={handleCancel} color="red" />
        <Button title="Submit" onPress={handleSubmit} />
      </View>

      <Text style={styles.total}>Total Amount: {totalAmount || currentAmount}</Text>

      {showPrintButton && (
        <Button title="Print" onPress={handlePrint} /> // Show print button when amount is added
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  total: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default MainPage;
