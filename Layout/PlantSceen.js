import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

const PlantScreen = ({ navigation, route }) => {
    const allData = route.params?.data;
    const [selectedFilter, setSelectedFilter] = useState('Tất cả');

    const filters = ['Tất cả', 'Hàng mới về', 'Ưa sáng', 'Ưa bóng'];

    const filteredData = selectedFilter === 'Tất cả' 
        ? allData 
        : allData.filter(item => 
            (selectedFilter === 'Ưa sáng' && item.type) || 
            (selectedFilter === 'Ưa bóng' && !item.type)
        );
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.icon} source={require('../Image/back.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Cây trồng</Text>
                <TouchableOpacity style={{ width: 50 }} onPress={() => navigation.navigate('CartScreen')}>
                    <Image style={styles.icon} source={require('../Image/cart.png')} />
                </TouchableOpacity>
            </View>

            <View style={styles.filterContainer}>
                {filters.map(filter => (
                    <TouchableOpacity key={filter} onPress={() => setSelectedFilter(filter)}>
                        <Text style={[styles.filterText, selectedFilter === filter && styles.selectedFilter]}>
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                numColumns={2}
                data={filteredData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('DetailProduct', { item })} style={styles.itemPlant}>
                        <Image source={{ uri: item.img }} style={styles.itemImage} />
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemType}>{item.type ? 'Ưa sáng' : 'Ưa bóng'}</Text>
                        <Text style={styles.price}>{item.price} đ</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default PlantScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF',
        padding: 16,
        marginTop: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    icon: {
        width: 24,
        height: 24,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    filterText: {
        fontSize: 16,
        color: 'gray',
    },
    selectedFilter: {
        color: 'green',
        fontWeight: 'bold',
    },
    itemPlant: {
        backgroundColor: 'white',
        width: '46%',
        borderRadius: 12,
        padding: 12,
        margin: '2%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    itemImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 4,
    },
    itemType: {
        fontSize: 14,
        color: 'gray',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
});
