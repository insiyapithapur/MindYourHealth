import Colors from "constants/Colors";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SearchMeal() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    

    // Dummy data for demonstration
    const mealData = [
        { id: 1, name: 'Chicken Curry' },
        { id: 2, name: 'Spaghetti Carbonara' },
        { id: 3, name: 'Vegetable Stir Fry' },
        { id: 4, name: 'Beef Tacos' },
        { id: 5, name: 'Salmon Salad' },
    ];

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleSearch();
        }, 300); // Adjust the delay time as needed (in milliseconds)

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleSearch = () => {
        // For demonstration, filtering dummy data based on search query
        const filteredResults = mealData.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleSelectMeal(item)}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    const handleSelectMeal = (meal) => {
        console.log('Selected meal:', meal);
        
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search for meal..."
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            {searchQuery !== '' && (
                <FlatList
                    data={searchResults}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.dropdown}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor : Colors.dark.background
    },
    searchBar: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    dropdown: {
        maxHeight: 200,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
});
