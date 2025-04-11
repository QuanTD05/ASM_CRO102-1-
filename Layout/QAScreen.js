import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

// Bật LayoutAnimation trên Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const QAScreen = () => {
  const navigation = useNavigation();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const questions = [
    {
      question: "Tôi trộn các chất dinh dưỡng theo thứ tự nào?",
      answer: "Bạn nên trộn theo hướng dẫn cụ thể từ nhà sản xuất để đảm bảo hiệu quả cao nhất.",
    },
    {
      question: "Tôi có thể giữ dung dịch dinh dưỡng hỗn hợp trong bao lâu?",
      answer: "Dung dịch có thể được giữ trong 7-14 ngày tùy vào điều kiện bảo quản.",
    },
    {
      question: "Khi nào tôi thêm bộ điều chỉnh pH?",
      answer: "Bộ điều chỉnh pH nên được thêm vào sau khi trộn tất cả các chất dinh dưỡng.",
    },
    {
      question: "Các chất điều chỉnh tăng trưởng có được sử dụng trong các sản phẩm Planta không?",
      answer: "Không, các sản phẩm của Planta không chứa chất điều chỉnh tăng trưởng.",
    },
    {
      question: "Các sản phẩm Planta có phải là hữu cơ không?",
      answer: "Một số sản phẩm Planta là hữu cơ, bạn có thể kiểm tra thông tin trên nhãn sản phẩm.",
    },
  ];

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Q & A</Text>
      </View>

      {/* Danh sách câu hỏi */}
      <FlatList
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => toggleExpand(index)}
            >
              <Text style={styles.question}>{item.question}</Text>
              <Icon
                name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                size={14}
                color="black"
              />
            </TouchableOpacity>
            {expandedIndex === index && (
              <Text style={styles.answer}>{item.answer}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, marginTop: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: { fontSize: 16, fontWeight: "bold", flex: 1 },
  answer: { fontSize: 14, color: "gray", marginTop: 5 },
});

export default QAScreen;
