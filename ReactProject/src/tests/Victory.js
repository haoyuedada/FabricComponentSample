import React, { useState } from 'react';
import { View, PanResponder } from 'react-native';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryTheme } from 'victory-native';

// 可拖动的数据点组件
const DraggablePoint = ({ x, y, index, onDrag }) => {
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
        console.log("chy drag move", gestureState)
      // 将屏幕坐标转换为数据坐标
      const newX = x + gestureState.dx / 2; // 根据实际缩放比例调整
      const newY = y - gestureState.dy / 2; // 注意Y轴方向可能需要翻转
      onDrag(index, newX, newY);
    },
  });

  return (
    <View
      {...panResponder.panHandlers}
      style={{
        position: 'absolute',
        left: x - 10, // 调整点位置偏移
        top: y - 10,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'blue',
      }}
    />
  );
};

const DraggableLineChart = () => {
  // 初始数据
  const [data, setData] = useState([
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 7 },
  ]);

  // 处理拖动事件
  const handleDrag = (index, newX, newY) => {
    const newData = [...data];
    newData[index] = { 
      x: Math.max(1, Math.min(5, newX)), // 限制X范围
      y: Math.max(0, Math.min(10, newY)) // 限制Y范围
    };
    setData(newData);
  };

  return (
    <View style={{ flex: 1 }}>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          data={data}
          style={{ data: { stroke: 'red' } }}
        />
        {data.map((point, index) => (
          <DraggablePoint
            key={index}
            x={point.x * 60} // 根据实际图表比例调整
            y={300 - point.y * 30} // 根据图表高度和比例调整
            index={index}
            onDrag={handleDrag}
          />
        ))}
      </VictoryChart>
    </View>
  );
};

export default DraggableLineChart;