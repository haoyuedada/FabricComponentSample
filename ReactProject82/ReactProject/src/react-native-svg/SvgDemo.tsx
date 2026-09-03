/**
 * react-native-svg 简单示例
 * 覆盖常用图形：Svg / Rect / Circle / Line / Path / Polygon / Text / G / Defs-LinearGradient
 */

import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Svg, {
  Circle,
  Rect,
  Line,
  Path,
  Polygon,
  Polyline,
  Ellipse,
  Text as SvgText,
  G,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const SvgDemo = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>react-native-svg Demo</Text>

      {/* 1. 矩形 + 渐变 */}
      <View style={styles.card}>
        <Svg width={300} height={100} viewBox="0 0 300 100">
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#FF6B6B" />
              <Stop offset="1" stopColor="#4ECDC4" />
            </LinearGradient>
          </Defs>
          <Rect x="10" y="10" width="280" height="80" rx="12" fill="url(#grad)" />
        </Svg>
      </View>

      {/* 2. 圆 + 椭圆 + 描边 */}
      <View style={styles.card}>
        <Svg width={300} height={120} viewBox="0 0 300 120">
          <Circle cx="70" cy="60" r="40" fill="#A78BFA" />
          <Circle
            cx="70"
            cy="60"
            r="50"
            fill="none"
            stroke="#7C3AED"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <Ellipse cx="210" cy="60" rx="60" ry="35" fill="#FDE68A" stroke="#F59E0B" strokeWidth="3" />
        </Svg>
      </View>

      {/* 3. 线条 / 折线 / 多边形 */}
      <View style={styles.card}>
        <Svg width={300} height={110} viewBox="0 0 300 110">
          <Line x1="20" y1="20" x2="280" y2="20" stroke="#94A3B8" strokeWidth="2" />
          <Polyline
            points="20,80 60,40 100,80 140,40 180,80 220,40 260,80"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
          />
          <Polygon points="150,30 250,30 200,90" fill="#34D399" opacity="0.7" />
        </Svg>
      </View>

      {/* 4. Path 路径 */}
      <View style={styles.card}>
        <Svg width={300} height={120} viewBox="0 0 300 120">
          <Path
            d="M 20 90 C 60 10, 140 10, 180 90 S 260 150, 280 60"
            fill="none"
            stroke="#EF4444"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <Path d="M 30 30 L 70 30 L 50 70 Z" fill="#F472B6" />
        </Svg>
      </View>

      {/* 5. 分组 G + 文本 */}
      <View style={styles.card}>
        <Svg width={300} height={110} viewBox="0 0 300 110">
          <G rotate="15" origin="150,55">
            <Rect x="30" y="30" width="80" height="50" fill="#60A5FA" />
            <Rect x="190" y="30" width="80" height="50" fill="#F97316" />
          </G>
          <SvgText
            x="150"
            y="100"
            textAnchor="middle"
            fontSize="16"
            fill="#1E293B">
            Hello RNOH SVG!
          </SvgText>
        </Svg>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  content: {
    padding: 12,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
    marginVertical: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    padding: 8,
    elevation: 2,
  },
});

export default SvgDemo;
