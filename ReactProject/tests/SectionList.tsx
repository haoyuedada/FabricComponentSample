import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, Modal, Button, SafeAreaView, StatusBar } from 'react-native';

const App = () => {
  // 月份数据
  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  
  // 生成月份数据（每个月份10条数据）
  const generateMonthData = () => {
    return monthNames.map((month, index) => ({
      title: month,
      data: Array.from({ length: 10 }, (_, i) => ({
        id: `${index}-${i}`,
        text: `${month} 数据项 ${i + 1}`,
        description: `这是${month}的第${i + 1}条数据描述，展示一些详细信息。`
      }))
    }));
  };

  const [sections] = useState(generateMonthData());
  const [selectedMonth, setSelectedMonth] = useState(0); // 当前选中的月份索引
  const [modalVisible, setModalVisible] = useState(false); // 控制弹出框显示
  const sectionListRef = useRef(null); // SectionList引用

  // 处理月份选择
  const handleMonthSelect = (index) => {
    setSelectedMonth(index);
    setModalVisible(false);
    
    // 滚动到选中的月份
    setTimeout(() => {
      if (sectionListRef.current) {
        sectionListRef.current.scrollToLocation({
          sectionIndex: index,
          itemIndex: 0,
          viewOffset: 0,
          animated: true
        });
      }
    }, 100);
  };

  // 渲染列表项
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.text}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  // 渲染月份标题
  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  // 渲染月份选择器
  const renderMonthPicker = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>选择月份</Text>
          <View style={styles.monthGrid}>
            {monthNames.map((month, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.monthButton,
                  selectedMonth === index && styles.selectedMonthButton
                ]}
                onPress={() => handleMonthSelect(index)}
              >
                <Text 
                  style={[
                    styles.monthButtonText,
                    selectedMonth === index && styles.selectedMonthButtonText
                  ]}
                >
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button title="关闭" onPress={() => setModalVisible(false)} color="#6a0dad" />
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* 头部区域 */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          当前月份: {monthNames[selectedMonth]}
        </Text>
        <TouchableOpacity 
          style={styles.selectButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.selectButtonText}>选择月份</Text>
        </TouchableOpacity>
      </View>

      {/* 月份列表 */}
      <SectionList
        ref={sectionListRef}
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={true}
        initialScrollIndex={selectedMonth}
        getItemLayout={(data, index) => (
          { length: 80, offset: 80 * index, index }
        )}
      />

      {/* 月份选择弹出框 */}
      {renderMonthPicker()}
    </SafeAreaView>
  );
};

// 样式定义
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectButton: {
    backgroundColor: '#6a0dad',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  selectButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionHeader: {
    backgroundColor: '#e0d6eb',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d0c0e0',
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a2c7a',
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4a2c7a',
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  monthButton: {
    width: '30%',
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedMonthButton: {
    backgroundColor: '#6a0dad',
  },
  monthButtonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedMonthButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;