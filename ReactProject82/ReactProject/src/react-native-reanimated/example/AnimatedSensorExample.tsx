/**
 * MIT License
 *
 * Copyright (C) 2025 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Animated, {
  useAnimatedSensor,
  SensorType,
  useDerivedValue,
  runOnJS,
} from '@react-native-ohos/react-native-reanimated';

const SENSOR_OPTIONS = [
  { label: 'Accelerometer', value: SensorType.ACCELEROMETER },
  { label: 'Gyroscope', value: SensorType.GYROSCOPE },
  { label: 'Gravity', value: SensorType.GRAVITY },
  { label: 'Magnetic', value: SensorType.MAGNETIC_FIELD },
  { label: 'Rotation', value: SensorType.ROTATION },
];

export default function AnimatedSensorExample() {
  const [sensorType, setSensorType] = useState(SensorType.GYROSCOPE);
  const [data, setData] = useState({ x: 0, y: 0, z: 0, w: 0 });

  const { sensor } = useAnimatedSensor(sensorType, { interval: 16 });

  useDerivedValue(() => {
    const { x, y, z } = sensor.value;
    // @ts-ignore – rotation sensor has w, others may not
    const w = (sensor.value as any).w ?? 0;
    runOnJS(setData)({ x, y, z, w });
  });

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.tabs} showsHorizontalScrollIndicator={false}>
        {SENSOR_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.tab, sensorType === opt.value && styles.tabActive]}
            onPress={() => setSensorType(opt.value)}
          >
            <Text style={[styles.tabText, sensorType === opt.value && styles.tabTextActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.dataContainer}>
        <Text style={styles.title}>{SENSOR_OPTIONS.find(o => o.value === sensorType)?.label} 实时读数</Text>
        <Text style={styles.dataText}>X: {data.x.toFixed(6)}</Text>
        <Text style={styles.dataText}>Y: {data.y.toFixed(6)}</Text>
        <Text style={styles.dataText}>Z: {data.z.toFixed(6)}</Text>
        {sensorType === SensorType.ROTATION && (
          <Text style={styles.dataText}>W: {data.w.toFixed(6)}</Text>
        )}
      </View>

      <View style={styles.visualContainer}>
        <Animated.View
          style={[
            styles.ball,
            {
              transform: [
                { translateX: Animated.interpolate(data.x, [-10, 10], [-100, 100]) },
                { translateY: Animated.interpolate(data.y, [-10, 10], [-100, 100]) },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  tabActive: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
  tabTextActive: {
    color: '#fff',
  },
  dataContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dataText: {
    fontSize: 16,
    fontFamily: 'monospace',
    marginVertical: 4,
  },
  visualContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
  },
});
