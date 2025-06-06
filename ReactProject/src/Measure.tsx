import React, { useRef, useEffect } from 'react';
import { View, Text, findNodeHandle } from 'react-native';

export default function App() {
  const parentRef = useRef(null);
  const childRef = useRef(null);

  useEffect(() => {
    // const parentNode = findNodeHandle(parentRef.current);

    // if (childRef.current && parentNode) {
      childRef.current.measureLayout(
        childRef.current,
        (x, y, width, height) => {
          console.log(`相对于父视图的坐标：x=${x}, y=${y}, width=${width}, height=${height}`);
        },
        error => {
          console.error('测量失败:', error);
        }
      );
    // }
  }, []);

  return (
    <View ref={parentRef} style={{ marginBottom: 200}}>
      <View
        ref={childRef}
        style={{ width: 100, height: 100, backgroundColor: 'skyblue' }}
      />
    </View>
  );
}
