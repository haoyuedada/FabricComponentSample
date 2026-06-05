/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2026-2026. All rights reserved.
 */

import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../common/theme/Type';
import EduLogger from '../../utils/EduLogger';
import DynamicText from '../../../common/components/DynamicText';

export interface SingleImagePreviewProps {
  imageUriList: string[];
  onPress: () => void;
  imageSize?: number;
}

const TAG: string = 'singleImagePreview';

/**
 * 与图库按钮互斥使用：最后一张图的预览图
 *
 * @param imageUriList
 * @param onPress
 * @param imageSize
 */
const singleImagePreview: React.FC<SingleImagePreviewProps> = ({
  imageUriList,
  onPress,
  imageSize = 24,
}) => {
  const [lastImageUri, setLastImageUri] = useState<string>('');

  useEffect(() => {
    EduLogger.info(`lastImageUri: ${!!lastImageUri}, imageUriList length: ${imageUriList.length}`, TAG,);
    setLastImageUri(imageUriList?.[imageUriList.length - 1]);
  }, [imageUriList]);

  return (
    <View testID={'singleImagePreview'} style={[styles.container, {borderColor: colors.white80}]}>
      {/*图片预览*/}
      <TouchableOpacity testID={'imagePreviewButton'} onPress={onPress} style={[styles.touchableOpacity]}>
        <Image
          source={{uri: lastImageUri}}
          style={[styles.thumbnail]}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/*图片数量*/}
      {imageUriList?.length && (
        <View style={styles.badge}>
          <DynamicText style={styles.badgeText}>
            {imageUriList?.length}
          </DynamicText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 48,
    height: 48,
    backgroundColor: '#ffffff19',
    borderWidth: 2,
  },
  touchableOpacity: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  thumbnail: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#007AFF',
    width: 18,
    height: 18,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
  },
});

export default singleImagePreview;
