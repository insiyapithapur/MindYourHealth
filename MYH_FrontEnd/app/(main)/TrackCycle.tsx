import React, { useState } from "react";
import { View, Text, Button, Modal } from "react-native";
import { Calendar } from 'react-native-calendars';
import { addDays, format } from 'date-fns';
import Colors from "constants/Colors";

export default function TrackCycle() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [periodType, setPeriodType] = useState(null);
  const [periodStartDate, setPeriodStartDate] = useState(null);
  const [periodEndDate, setPeriodEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({}); // Use state for markedDates

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setShowModal(true);
  };

  const handlePeriodStart = () => {
    setPeriodType('Period Start');
    setPeriodStartDate(selectedDate);
    // Calculate period end date (6 days after period start date)
    const endDate = addDays(new Date(selectedDate), 6);
    setPeriodEndDate(format(endDate, 'yyyy-MM-dd'));
    // Mark selected date and next 6 days
    const newMarkedDates = {
      [selectedDate]: { selected: true, selectedColor: '#875B70' }
    };
    for (let i = 1; i <= 6; i++) {
      const currentDate = addDays(new Date(selectedDate), i);
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      newMarkedDates[formattedDate] = {
        marked: true,
        dotColor: '#BFA6B4',
        backgroundColor: '#F2E9EC', // Lighter shade background color
      };
    }
    setMarkedDates(newMarkedDates);
    setShowModal(false);
  };

  const handlePeriodEnd = () => {
    setPeriodType('Period End');
    
    const newMarkedDates = { ...markedDates };
    
    const startDate = new Date(periodStartDate);
    const endDate = new Date(selectedDate); // Use selectedDate as the end date
    
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      newMarkedDates[formattedDate] = {
        ...newMarkedDates[formattedDate],
        backgroundColor: '#875B70', // Change background color to #875B70
      };
      currentDate.setDate(currentDate.getDate() + 1); // Increment date by 1 day
    }
    
    setMarkedDates(newMarkedDates);
    setShowModal(false);
  };  

  return (
    <View style={{
        flex:1,
        backgroundColor: Colors.dark.background,
        flexDirection:'column',
        marginBottom:5
    }}>
        <View style={{flex:0.1, marginBottom:10}}>
                <Text style={{fontSize:28}}>Menstrual Cycle Tracker</Text>
        </View>
        <View>
            <Calendar
                onDayPress={handleDayPress}
                markedDates={markedDates}
                style={{marginTop:10}}
            />
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text style={{ marginBottom: 10 }}>{selectedDate}</Text>
                        <Button title="Period Start" onPress={handlePeriodStart} color="#875B70" />
                        <View style={{ marginVertical: 5 }} />
                        <Button title="Period End" onPress={handlePeriodEnd} color="#875B70" />
                    </View>
                </View>
            </Modal>
            </View>
    </View>
  );
}
