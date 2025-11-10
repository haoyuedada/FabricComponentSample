import React, { useState, useRef, useMemo } from 'react';
import { ScrollView, View, Animated, StyleSheet, Platform, Text } from 'react-native';

const HomePage: React.FC = () => {
const [timesPressed, setTimesPressed] = useState(0);
  const [velocityNative, setVelocityNative] = useState('');
  const [velocityApprox, setVelocityApprox] = useState('');
  const lastContentOffset = useRef({ x: 0, y: 0 });
  const lastScrollTime = useRef(0);
  let textLog = '';
  if (timesPressed > 1) {
    textLog = timesPressed + 'x onScroll';
  } else if (timesPressed > 0) {
    textLog = 'onScroll';
  }

  return (
        <View>
      <Text>属性值：onScroll</Text>
      <Text>预期结果：滚动后log文本中回调名称前面的次数增加，例如：1x onScroll变为2x onScroll</Text>
      <Text>实际结果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        onScroll={(event) => {
          const { contentOffset, velocity } = event.nativeEvent;
          const now = Date.now();
          const dt = now - lastScrollTime.current;

          if (dt > 0) {
            const dy = contentOffset.y - lastContentOffset.current.y;
            // 估算速度（像素/毫秒）
            const approxVelY = dy / dt;
            // 与 native velocity 对比
            setVelocityNative(`Velocity (native): y=${velocity.y}`);
            setVelocityApprox(`Velocity (approx): y=${approxVelY}`);
          }
          lastContentOffset.current = contentOffset;
          lastScrollTime.current = now;
          setTimesPressed(current => current + 1);
        }}
        nestedScrollEnabled
      >
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Text style={{ marginTop: 10 }}>log: {textLog}</Text>
      
      <Text>预期结果：{velocityApprox}</Text>
      <Text>实际结果：{velocityNative}</Text>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 2,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  overlayView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    zIndex: 1,
  },
});