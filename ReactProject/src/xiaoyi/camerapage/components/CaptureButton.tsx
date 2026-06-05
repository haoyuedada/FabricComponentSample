/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2026-2026. All rights reserved.
 */

import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import EduLogger from '../../utils/EduLogger';

const CONTAINER_SIZE: number = 65;
const RING_SIZE: number = 65;
const RING_WIDTH: number = 2;
const CIRCLE_SIZE: number = 48;

export interface CaptureButtonProps {
  canCaptureEnabled: boolean;
}

const TAG: string = 'captureButton';

const captureButton: React.FC<CaptureButtonProps> = ({canCaptureEnabled}) => {
  useEffect(() => {
    EduLogger.info(`Capturing button, captureButton: ${captureButton}`, TAG);
  }, [canCaptureEnabled]);

  return (
    <View style={styles.container}>
      {/* 外层圆环 */}
      <View
        style={[
          styles.ring,
          {borderColor: canCaptureEnabled ? '#FFF' : 'grey'},
        ]}
      />
      {/* 内层白色实心圆 */}
      <View
        style={[
          styles.circle,
          {backgroundColor: canCaptureEnabled ? 'white' : 'grey'},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: RING_WIDTH, // 圆环宽度
    backgroundColor: 'transparent',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -CIRCLE_SIZE / 2}, {translateY: -CIRCLE_SIZE / 2}],
  },
});

export default captureButton;
