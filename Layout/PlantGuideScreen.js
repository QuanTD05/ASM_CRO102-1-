import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const PlantGuideScreen = () => {
  const navigation = useNavigation();

  // Danh sách cây trồng
  const plants = [
    {
      id: "1",
      name: "Panse Den | Hybrid",
      difficulty: "Độ khó 3/5",
      image: require("../Image/9.png"), // Ảnh local
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cẩm Nang Trồng Cây</Text>
      </View>

      {/* Danh sách cây */}
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item} 
            onPress={() => navigation.navigate("PlantDetailScreen", { plant: item })} // Điều hướng
          >
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.difficulty}>{item.difficulty}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, marginTop: 40 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: "bold", textAlign: "center" },
  item: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  image: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  textContainer: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold" },
  difficulty: { fontSize: 14, color: "gray" },
});

export default PlantGuideScreen;
