import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export const URL = 'http://192.168.32.101:3000'



const HomeScreen = ({ navigation }) => {

    const [ListPlant, setListPlant] = useState([]);
    const [ListPlanta, setListPlanta] = useState([]);

    const getListPlant = async () => {
        await fetch(`${URL}/plants`)
            .then(res => res.json())
            .then(data => {
                setListPlant(data)
            })
            .catch(err => console.log(err))
    }

    const getListPlanta = async () => {
        await fetch(`${URL}/plantas`)
            .then(res => res.json())
            .then(data => {
                setListPlanta(data);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getListPlant();
        getListPlanta();
    }, [])


    return (
        <SafeAreaView style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.headerContainer}>
        <Image source={require("../Image/banner.png")} style={styles.bannerImage} />

        {/* Text & Nút Xem hàng mới về */}
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Planta - toả sáng{"\n"}không gian nhà bạn</Text>
          <TouchableOpacity>
            <Text style={styles.viewNew}>Xem hàng mới về →</Text>
          </TouchableOpacity>
        </View>

     
      </View>

                <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 30, marginLeft: 10 }}>Cây trồng</Text>

                <FlatList
                    numColumns={2}
                    scrollEnabled={false}
                    data={ListPlant.filter((item, index) => index < 4)}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => navigation.navigate("DetailProduct", { item: item })}
                            style={styles.itemPlant}>
                            <Image source={{ uri: item.img }}
                                style={styles.itemImage} />
                            <Text style={styles.itemName}>{item.name}</Text>
                            {item.type ? <Text>Ưa bóng</Text> : <Text>Ưa râm</Text>}
                            <Text style={styles.price}>{item.price} đ</Text>
                        </TouchableOpacity >} >
                </FlatList>
                <TouchableOpacity onPress={() => navigation.navigate("PlantSceen", { data: ListPlant })}
                    style={styles.Xemthem}>
                    <View />
                    <Text style={{ fontSize: 14, color: 'green', fontWeight: 'bold', textDecorationLine: 'underline' }}>Xem thêm cây khác </Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 10 }}>Chậu cây</Text>

                <FlatList
                    numColumns={2}
                    extraData={4}
                    scrollEnabled={false}
                    data={ListPlanta.filter((item, index) => index < 4)}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => navigation.navigate("DetailProduct", { item: item })}
                            style={styles.itemPlant}>
                            <Image source={{ uri: item.img }}
                                style={styles.itemImage} />
                            <Text>{item.name}</Text>
                            <Text style={styles.price}>{item.price} đ</Text>
                        </TouchableOpacity>} >
                </FlatList>

                <TouchableOpacity onPress={()=> navigation.navigate('PlantaSceen', {data : ListPlanta})}
                 style={styles.Xemthem}>
                    <View />
                    <Text style={{ fontSize: 14, color: 'green', fontWeight: 'bold', textDecorationLine: 'underline' }}>Xem thêm chậu khác </Text>
                </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={styles.cart} onPress={()=> navigation.navigate('CartScreen')}>
                <Image source={require('../Image/cart.png')} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
    },
    container: {
        height: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 12
    },
    image: {
        width: 180,
        height: 150,
        borderRadius: 10
    },
    itemPlant: {
        backgroundColor: 'white',
        width: '45%',
        borderRadius: 12,
        padding: 12,
        margin: 10,
        gap: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowRadius: 5,
        shadowOpacity: 0.35,
        elevation: 10
    },
    itemImage: {
        width: '100%',
        height: 130,
        borderRadius: 12,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    Xemthem: {
        width: '100%',
        padding: 12,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    price: {
        fontSize: 17,
        fontWeight: '600',
        color: 'green'
    },
    cart: {
        width: 40, height: 40, backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 12, alignItems: 'center', justifyContent: 'center',
        position: 'absolute',
        right: 40, top: 60
    },
    newSP: {
        bottom: 0,
        marginLeft: 10
    },  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 10, marginTop: 50, padding: 10 },

    // Loading
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  
    // Banner
    headerContainer: { position: "relative", marginBottom: 20 },
    bannerImage: { width: "100%", height: 200, resizeMode: "cover", borderRadius: 10 },
    bannerTextContainer: { position: "absolute", top: 20, left: 20 },
    bannerTitle: { fontSize: 22, fontWeight: "bold", color: "#000" },
    viewNew: { color: "green", marginTop: 5 },
    
    // Icon giỏ hàng
    cartIcon: {
      position: "absolute",
      top: 15,
      right: 60,
      backgroundColor: "white",
      padding: 10,
      borderRadius: 30,
      elevation: 3,
    },
  
    // Icon Profile
    profileIcon: {
      position: "absolute",
      top: 15,
      right: 15,
      backgroundColor: "white",
      padding: 10,
      borderRadius: 30,
      elevation: 3,
    },
  
    // Danh mục sản phẩm
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10,
      marginTop: 20,
    },
    sectionTitle: { fontSize: 20, fontWeight: "bold" },
    viewAll: { fontSize: 16, color: "green" },
  
    // Sản phẩm
    row: { flexDirection: "row", justifyContent: "space-between" },
    card: { backgroundColor: "#f9f9f9", borderRadius: 10, padding: 10, flex: 1, margin: 5, alignItems: "center" },
    productImage: { width: 120, height: 120, resizeMode: "contain" },
    productName: { fontWeight: "bold", marginTop: 5, textAlign: "center" },
    productLight: { color: "gray" },
    productPrice: { color: "green", fontWeight: "bold" },
  });

