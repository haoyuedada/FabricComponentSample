import React from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useAnimatedSensor,
  SensorType,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';

export default function GyroDemo() {
  const { sensor } = useAnimatedSensor(SensorType.GYROSCOPE, { interval: 100 });
  const [gyroData, setGyroData] = React.useState({ x: 0, y: 0, z: 0 });

  useDerivedValue(() => {
    const { x, y, z } = sensor.value;
    console.log(`Gyroscope: x=${x}, y=${y}, z=${z}`);
    runOnJS(setGyroData)({ x, y, z });
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>陀螺仪实时读数</Text>
      <Text>X: {gyroData.x.toFixed(4)}</Text>
      <Text>Y: {gyroData.y.toFixed(4)}</Text>
      <Text>Z: {gyroData.z.toFixed(4)}</Text>
    </View>
  );
}