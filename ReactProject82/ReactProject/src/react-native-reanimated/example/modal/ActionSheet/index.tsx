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

import React, { forwardRef, useImperativeHandle, useState,useEffect } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
  Text,
} from 'react-native';
import { Modal } from 'react-native';

type Action = {
  text: string;
  key: string | number;
  disabled?: boolean;
  id?: string;
  danger?: boolean;
  description?: string;
  bold?: boolean;
  style?: StyleProp<TextStyle> | undefined;
};

interface ActionSheetProps {
  visible?: boolean;
  actions?: Action[];
  customView?: React.ReactNode;
  cancelText?: string;
  closeOnAction?: boolean;
  closeOnMaskClick?: boolean;
  onAction?: (action: Action) => void;
  onClose?: () => void;
  afterClose?: () => void;
  onMaskClick?: () => void;
  onCancelAction?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  showTitle?: boolean;
  title?: string;
}

const ActionSheet = forwardRef<any, ActionSheetProps>((props, ref) => {
  const [internalVisible, setInternalVisible] = useState(false);
  const [testText, setTestText] = useState("false");
  const {
    visible,
    actions = [],
    customView,
    cancelText = '取消',
    closeOnAction = true,
    closeOnMaskClick = true,
    onAction,
    onClose,
    afterClose,
    onMaskClick,
    onCancelAction,
    contentStyle,
    showTitle = true,
    title = '提示',
  } = props;
  // 合并显示状态：优先使用 prop，否则用内部状态
  const mergedVisible = visible ?? internalVisible;
  const handleActionPress = (action: Action) => {
    if (action.disabled) return;
    onAction?.(action);
    if (closeOnAction) {
      onClose?.();
      if (visible === undefined) setInternalVisible(false); // 非受控模式才更新内部状态
    }
  };

  const handleMaskClick = () => {
    onMaskClick?.();
    if (closeOnMaskClick) {
      onClose?.();
      if (visible === undefined) setInternalVisible(false); // 非受控模式才更新内部状态
    }
  };

  const handleCancelPress = () => {
    onCancelAction?.();
    onClose?.();
    if (visible === undefined) setInternalVisible(false); // 非受控模式才更新内部状态
  };
  useEffect(() => {
    // 每次 internalVisible 更新后，这里都会执行
    console.log('internalVisible 已更新为:', internalVisible);
    
    // 你可以在这里做更新后的逻辑（比如判断值、调用其他函数等）
    if (internalVisible) {
      console.log('状态更新为 true，执行后续操作');
    } else {
      console.log('状态更新为 false，执行后续操作');
    }
  }, [internalVisible]); 
  // 暴露控制方法
  useImperativeHandle(ref, () => ({
    show: () => {
      if (visible === undefined) {
        setInternalVisible(true);
      } else {
        console.warn('ActionSheet is controlled, use visible prop instead of ref.show()');
      }
    },
    hide: () => {
      if (visible === undefined) {
        setInternalVisible(false);
      } else {
        console.warn('ActionSheet is controlled, use visible prop instead of ref.hide()');
      }
    },
  }));

  const containerStyle: ViewStyle = {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    maxHeight: '80%',
    marginHorizontal: 0,
    paddingBottom: 30,
  };

  const renderContent = () => {
    if (customView) {
      return (
        <View style={[containerStyle, contentStyle, Platform.OS === 'web' && webStyles.container]}>
          {customView}
        </View>
      );
    }

    return (
      <View style={[containerStyle, contentStyle, Platform.OS === 'web' && webStyles.container]}>
        <View style={styles.actionsContainer}>
          {showTitle && title && (
            <View style={styles.actionContent}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#7A7D82',
                  fontWeight: '500',
                  padding: 12,
                }}
              >
                {title ?? '提示'}
              </Text>
              <View style={styles.divider} />
            </View>
          )}
          {actions.map((action, index) => (
            <Pressable
              key={action.key}
              style={({ pressed }) => [
                styles.actionItem,
                action.disabled && styles.disabledAction,
                pressed && !action.disabled && styles.actionPressed,
                index !== actions.length - 1 && styles.actionItemBorder,
              ]}
              disabled={action.disabled}
              onPress={() => handleActionPress(action)}
            >
              <View style={styles.actionContent}>
                <Text style={[action.style, { fontSize: 16, color: '#16171C' }]}>
                  {action.text}
                </Text>
                {action.description && (
                  <Text style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                    {action.description}
                  </Text>
                )}
              </View>
            </Pressable>
          ))}
        </View>

        {cancelText && (
          <Pressable onPress={handleCancelPress}>
            <View style={{ marginTop: -8, height: 8, backgroundColor: '#F6F7F8' }}></View>
            <Pressable
              style={({ pressed }) => [styles.cancelButton, pressed && styles.cancelPressed]}
              onPress={handleCancelPress}
            >
              <Text style={{ fontSize: 16, color: '#16171C', fontWeight: '500' }}>
                {cancelText}
              </Text>
            </Pressable>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    // <Text>{testText}</Text>
    <Modal
      visible={internalVisible}
      transparent
      animationType="none"
      onRequestClose={handleMaskClick}
      onDismiss={afterClose}
      statusBarTranslucent
    >
      <View style={styles.modalContainer}>
        <Pressable style={styles.backdrop} onPress={handleMaskClick} />
        {renderContent()}
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  actionsContainer: {
    borderRadius: 8,
    marginBottom: 8,
  },
  actionItem: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  actionItemBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEF0F2',
  },
  actionContent: {
    alignItems: 'center',
  },
  dangerText: {
    color: '#ff3141',
  },
  boldText: {
    fontWeight: '500',
  },
  descriptionText: {
    color: '#999',
    marginTop: 4,
  },
  disabledAction: {
    opacity: 0.5,
  },
  actionPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  cancelButton: {
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 18,
    backgroundColor: '#FFFFFF',
    fontWeight: '500',
  },
  cancelPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  divider: {
    height: 0.5,
    backgroundColor: '#EEF0F2',
    width: '100%',
  },
});

const webStyles = StyleSheet.create({
  container: {
    maxWidth: 600,
    width: '100%',
    marginHorizontal: 'auto',
  },
});
export type { Action };
export default ActionSheet;
