import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FreeSlot = () => {
  const currentDate = new Date();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      const dayStyles = [styles.day];
      if (i === currentDate.getDate()) {
        dayStyles.push(styles.currentDay);
      }
      days.push(
        <View key={i} style={dayStyles}>
          <Text style={styles.dayText}>{i}</Text>
        </View>
      );
    }
    return days;
  };

  return (
    <View style={styles.container}>
      {renderDays()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  day: {
    width: '30%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  currentDay: {
    backgroundColor: '#1E90FF',
  },
  dayText: {
    fontSize: 18,
    color: '#333',
  },
});

export default FreeSlot;
