	import React, { useState, useRef } from 'react';
	import { StyleSheet, View, Text, PixelRatio } from 'react-native';
	import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
	
	const DPR = PixelRatio.get();
	console.log(`[PAN_TEST] Device Pixel Ratio: ${DPR}`);
	export default function PanGestureDemo() {
	  const [position, setPosition] = useState({ x: 0, y: 0 });
	//   const offsetRef = useRef({ x: 0, y: 0 }); // 累积偏移量
	  const panGesture = Gesture.Pan()
	    .minPointers(1)
	    .minDistance(10)
	    .onUpdate((event) => {
	      console.log(`[PAN_TEST] onUpdate: translationX=${event.translationX.toFixed(1)} translationY=${event.translationY.toFixed(1)} x=${event.x?.toFixed(1)} y=${event.y?.toFixed(1)} absoluteX=${event.absoluteX?.toFixed(1)} absoluteY=${event.absoluteY?.toFixed(1)}`);
	      setPosition({
	        // x: offsetRef.current.x + event.translationX,
	        // y: offsetRef.current.y + event.translationY,
			x: event.translationX,
			y: event.translationY
	      });
	    })
	    .onStart((event) => {
	      console.log(`[PAN_TEST] onStart: translationX=${event.translationX?.toFixed(1)} translationY=${event.translationY?.toFixed(1)} absoluteX=${event.absoluteX?.toFixed(1)} absoluteY=${event.absoluteY?.toFixed(1)}`);
	    })
	    .onEnd((event) => {
	      console.log(`[PAN_TEST] onEnd: translationX=${event.translationX?.toFixed(1)} translationY=${event.translationY?.toFixed(1)} absoluteX=${event.absoluteX?.toFixed(1)} absoluteY=${event.absoluteY?.toFixed(1)}`);
	      // 保存当前偏移作为下次的起始偏移
	    //   offsetRef.current = {
	    //     x: offsetRef.current.x + event.translationX,
	    //     y: offsetRef.current.y + event.translationY,
	    //   };
	    });
	  return (
	    <GestureHandlerRootView style={styles.container}>
	      <Text style={styles.title}>Pan Gesture Demo</Text>
	      <Text>当前位置 - X: {position.x.toFixed(1)}, Y: {position.y.toFixed(1)}</Text>
	      <GestureDetector gesture={panGesture}>
	        <View style={[styles.box, { transform: [{ translateX: position.x }, { translateY: position.y }] }]} />
	      </GestureDetector>
	    </GestureHandlerRootView>
	  );
	}
	const styles = StyleSheet.create({
	  container: {
	    flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: '#f5f5f5',
	  },
	  title: {
	    fontSize: 20,
	    marginBottom: 20,
	    fontWeight: 'bold',
	  },
	  box: {
	    width: 100,
	    height: 100,
	    backgroundColor: '#4a90e2',
	    borderRadius: 10,
	    marginTop: 30,
	  },
	});