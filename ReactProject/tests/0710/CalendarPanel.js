import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const Calendar = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // 获取月份名称
  const getMonthName = (date) => {
    const months = [
      '一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'
    ];
    return months[date.getMonth()];
  };

  // 生成月份数据
  const generateMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 获取当月第一天和最后一天
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 获取第一天是星期几 (0 = 周日)
    const startDay = firstDay.getDay();

    // 生成日期数组
    const days = [];
    const daysInMonth = lastDay.getDate();

    // 填充空白（上个月的日期）
    for (let i = 0; i < startDay; i++) {
      days.push({ date: null, isCurrentMonth: false });
    }

    // 填充当月日期
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isToday(date)
      });
    }

    return days;
  };

  // 判断是否是今天
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // 切换月份
  const changeMonth = (direction) => {
    setCurrentDate(new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1
    ));
  };

  // 选择日期
  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date);
      onDateSelect && onDateSelect(date);
    }
  };

  // 渲染日期单元格
  const renderDay = ({ item }) => {
    if (!item.date) {
      return <View style={styles.dayEmpty} />;
    }

    const isSelected = selectedDate &&
      item.date.getDate() === selectedDate.getDate() &&
      item.date.getMonth() === selectedDate.getMonth();

    return (
      <TouchableOpacity
        style={[
          styles.day,
          isSelected && styles.selectedDay,
          item.isToday && styles.today
        ]}
        onPress={() => handleDateSelect(item.date)}
        disabled={!item.isCurrentMonth}
      >
        <Text style={[
          styles.dayText,
          !item.isCurrentMonth && styles.inactiveDay,
          isSelected && styles.selectedText,
          item.isToday && styles.todayText
        ]}>
          {item.date.getDate()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* 月份导航 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Text style={styles.navButton}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.monthText}>
          {getMonthName(currentDate)} {currentDate.getFullYear()}
        </Text>

        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Text style={styles.navButton}>›</Text>
        </TouchableOpacity>
      </View>

      {/* 星期标题 */}
      <View style={styles.weekDays}>
        {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
          <Text key={day} style={styles.weekDay}>{day}</Text>
        ))}
      </View>

      {/* 日历网格 */}
      <FlatList
        data={generateMonth()}
        renderItem={renderDay}
        keyExtractor={(item, index) => index.toString()}
        numColumns={7}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  navButton: {
    fontSize: 24,
    paddingHorizontal: 15,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDay: {
    width: 40,
    textAlign: 'center',
    fontWeight: '500',
    color: '#555',
  },
  day: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
  },
  dayEmpty: {
    width: 40,
    height: 40,
    margin: 2,
  },
  inactiveDay: {
    color: '#ccc',
  },
  selectedDay: {
    backgroundColor: '#4287f5',
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  today: {
    borderWidth: 1,
    borderColor: '#4287f5',
  },
  todayText: {
    color: '#4287f5',
    fontWeight: 'bold',
  },
});

export default Calendar;