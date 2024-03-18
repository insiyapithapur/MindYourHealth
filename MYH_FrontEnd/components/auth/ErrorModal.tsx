import React from "react";
import {View , Text, Button, TouchableOpacity} from "react-native";

const ErrorModal = ({ message, onClose }) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={{ backgroundColor: '#875B70', padding: 5, borderRadius: 10}}>
        <Text style={{color:"white" , alignItems:"center"}}>{message}</Text>
        {/* <Button title="OK" onPress={onClose} /> */}
        <TouchableOpacity style={{backgroundColor:"pink",alignItems:"center" , borderRadius:10}} onPress={onClose}> 
          <Text>ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ErrorModal;