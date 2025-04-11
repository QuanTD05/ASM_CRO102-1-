import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const PlantDetailScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("Cây trồng");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showBasicKnowledge, setShowBasicKnowledge] = useState(false); // Kiến thức cơ bản
  const [showGrowthStages, setShowGrowthStages] = useState(false); // Giai đoạn

  // Ảnh cây trồng
  const plantImages = [
    require("../Image/1.png"),
    require("../Image/2.png"),
    require("../Image/4.png"),
  ];

  // Nội dung Kiến thức cơ bản
  const basicKnowledge = [
    { title: "Bước 1: Chuẩn bị vật dụng, chất trồng", content: "Bạn cần chuẩn bị đất, phân bón, chậu và nước tưới phù hợp." },
    { title: "Bước 2: Tiến hành gieo hạt", content: "Gieo hạt vào đất đã chuẩn bị, tưới nước đầy đủ và giữ độ ẩm." },
    { title: "Bước 3: Chăm sóc sau khi gieo hạt", content: "Đảm bảo cây có đủ ánh sáng, tưới nước đúng cách và bón phân hợp lý." },
  ];

  // Nội dung các giai đoạn phát triển
  const growthStages = [
    { title: "Ngâm Hạt và Ủ Hạt (48 tiếng)", content: "Ngâm hạt vào nước ấm 24-27 độ C để kích thích nảy mầm." },
    { title: "Nảy Mầm (3-5 ngày)", content: "Đảm bảo độ ẩm 30-40%, ánh sáng gián tiếp khoảng 6 giờ/ngày." },
    { title: "Bắt Đầu Phát Triển (2-3 tuần)", content: "Cung cấp dinh dưỡng và kiểm soát nhiệt độ để cây phát triển ổn định." },
    { title: "Trưởng Thành (4-6 tuần)", content: "Chăm sóc cây với nước và phân bón hợp lý để cây ra hoa hoặc kết quả." },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Panse Den</Text>
      </View>

      {/* Hình ảnh cây */}
      <View style={styles.imageContainer}>
        <Image source={plantImages[0]} style={styles.image} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {["Cây trồng", "Ưa bóng"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Kiến thức cơ bản */}
      <View style={styles.toggleContainer}>
        <Text style={styles.sectionTitle}>Kiến thức cơ bản</Text>
        <TouchableOpacity onPress={() => setShowBasicKnowledge(!showBasicKnowledge)} style={styles.addButton}>
          <Icon name={showBasicKnowledge ? "minus" : "plus"} size={14} color="black" />
        </TouchableOpacity>
      </View>
      {showBasicKnowledge &&
        basicKnowledge.map((item, index) => (
          <View key={index} style={styles.item}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <Text style={styles.question}>{item.title}</Text>
              <Icon name={expandedIndex === index ? "chevron-up" : "chevron-down"} size={14} color="black" />
            </TouchableOpacity>
            {expandedIndex === index && <Text style={styles.answer}>{item.content}</Text>}
          </View>
        ))}

      {/* Các giai đoạn */}
      <View style={styles.toggleContainer}>
        <Text style={styles.sectionTitle}>Các giai đoạn</Text>
        <TouchableOpacity onPress={() => setShowGrowthStages(!showGrowthStages)} style={styles.addButton}>
          <Icon name={showGrowthStages ? "minus" : "plus"} size={14} color="black" />
        </TouchableOpacity>
      </View>
      {showGrowthStages &&
        growthStages.map((item, index) => (
          <View key={index} style={styles.item}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => setExpandedIndex(expandedIndex === `stage${index}` ? null : `stage${index}`)}
            >
              <Text style={styles.question}>{item.title}</Text>
              <Icon name={expandedIndex === `stage${index}` ? "chevron-up" : "chevron-down"} size={14} color="black" />
            </TouchableOpacity>
            {expandedIndex === `stage${index}` && <Text style={styles.answer}>{item.content}</Text>}
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, marginTop:40 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: "bold", textAlign: "center" },
  imageContainer: { alignItems: "center", marginBottom: 20 },
  image: { width: 200, height: 200, borderRadius: 10 },
  tabContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, marginHorizontal: 5, borderRadius: 20, borderWidth: 1, borderColor: "green" },
  activeTab: { backgroundColor: "green" },
  tabText: { fontSize: 14, color: "green" },
  activeTabText: { color: "white", fontWeight: "bold" },
  toggleContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "bold" },
  item: { borderBottomWidth: 1, borderBottomColor: "#ddd", paddingVertical: 10 },
  questionContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  question: { fontSize: 16, fontWeight: "bold", flex: 1 },
  answer: { fontSize: 14, color: "gray", marginTop: 5 },
  addButton: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: "black", alignItems: "center", justifyContent: "center" },
});

export default PlantDetailScreen;
