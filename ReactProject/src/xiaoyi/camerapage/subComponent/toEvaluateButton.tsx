/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2026-2026. All rights reserved.
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import DynamicText from "../../../common/components/DynamicText";
import {STRING_OF_JUMP_TO_EVALUATE} from '../../components/aiCoach/resources/string';

export interface ToEvaluateButtonProps {
  onPress: () => void;
  imageUriList: string[];
}

const TAG: string = 'toEvaluateButton';

/**
 * 去评估 按钮
 * @param onPress
 * @param imageUriList
 */
const toEvaluateButton: React.FC<ToEvaluateButtonProps> = ({
  onPress,
  imageUriList,
}) => {
  return (
    (imageUriList?.length ?? 0) >= 0 ? (
      <TouchableOpacity
        testID={'toEvaluateButton'}
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.7}>
        <DynamicText style={styles.buttonText}>{STRING_OF_JUMP_TO_EVALUATE}</DynamicText>
      </TouchableOpacity>
    ) : (
      <></>
    )
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#0A59F7',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default toEvaluateButton;
