import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity ,TextInput} from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import axios from 'axios';

export default function PopupModal({ visible, onClose, onSave, title,defaultValue,userID }) {
    const [inputValue, setInputValue] = React.useState(defaultValue);
    useEffect(() => {
      setInputValue(defaultValue);
  }, [defaultValue]);


    const handleSave = async () => {
      try {
          // Prepare the data to be sent in the request body
          const data = {};
          if (title === "Goal") {
            data['motive'] = inputValue;
          } else if (title === "Goal Weight") {
            data['targetWeight'] = inputValue;
          }else if (title === "Current Weight") {
            data['currentWeight'] = inputValue;
          }else if (title === "Height") {
            data['height'] = inputValue;
          }else if (title === "Age") {
            data['age'] = inputValue;
          }else if (title === "Gender") {
            data['gender'] = inputValue;
          }else if (title === "Activity Level") {
            data['activitylevel'] = inputValue;
          }
          console.log(data)
          await axios.patch(`http://192.168.240.61:8000/update-profile/${userID}`, data);
          onSave();
      } catch (error) {
          console.error('Error updating profile:', error);
          // Handle error if needed
      }
  };
    return (
      <Modal visible={visible} transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 , width:200}}>
            <Text style={{fontSize:22 , marginBottom:10,}}>{title}</Text>
            <TextInput 
                style={{fontSize:18,marginBottom:10,borderBottomWidth: 1, borderBottomColor: 'black'}}
                placeholder='Input'
                value={inputValue}
                onChangeText={setInputValue}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <TouchableOpacity onPress={onClose}>
                 <Text style={{ color: 'red' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={{ marginLeft: 10 }}>
                <Text style={{ color: 'blue' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
}
