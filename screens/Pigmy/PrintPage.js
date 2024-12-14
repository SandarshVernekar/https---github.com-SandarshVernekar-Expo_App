import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';

const PrintPage = ({ route, navigation }) => {
  const { accountId, currentAmount, addAmount, totalAmount } = route.params; // Data passed from MainPage

  // Function to print the data using a thermal printer
  const handlePrint = async () => {
    try {
      // Check if Bluetooth is enabled
      const isEnabled = await BluetoothEscposPrinter.isBluetoothEnabled();
      if (!isEnabled) {
        Alert.alert('Error', 'Please enable Bluetooth.');
        return;
      }

      // List available devices to connect to
      const pairedDevices = await BluetoothEscposPrinter.pairedDevices();
      if (pairedDevices.length === 0) {
        Alert.alert('Error', 'No paired Bluetooth devices found.');
        return;
      }

      const printer = pairedDevices[0]; // Select the first paired printer (you can add logic for manual selection)
      
      // Connect to the printer
      await BluetoothEscposPrinter.connect(printer.address);

      // Print the details using ESC/POS commands
      await BluetoothEscposPrinter.printText(`Account ID: ${accountId}\n`, {});
      await BluetoothEscposPrinter.printText(`Current Amount: ${currentAmount}\n`, {});
      await BluetoothEscposPrinter.printText(`Added Amount: ${addAmount}\n`, {});
      await BluetoothEscposPrinter.printText(`Total Amount: ${totalAmount}\n`, {});
      
      // Print a separator line
      await BluetoothEscposPrinter.printText('------------------------\n', {});

      // Finish printing
      Alert.alert('Success', 'Printed successfully.');
    } catch (err) {
      console.error('Error printing:', err);
      Alert.alert('Error', 'Failed to print. Please check the printer connection.');
    }
  };

  const handleCancel = () => {
    navigation.goBack(); // Go back to the previous screen (MainPage)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Account ID: {accountId}</Text>
      <Text style={styles.label}>Current Amount: {currentAmount}</Text>
      <Text style={styles.label}>Added Amount: {addAmount}</Text>
      <Text style={styles.label}>Total Amount: {totalAmount}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={handleCancel} color="red" />
        <Button title="Print" onPress={handlePrint} />
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
});

export default PrintPage;
