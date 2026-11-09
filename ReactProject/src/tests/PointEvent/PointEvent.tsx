import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';

const PointerEventsExample = () => {
  const [parentPointerEvents, setParentPointerEvents] = useState('auto');
  const [childPointerEvents, setChildPointerEvents] = useState('auto');
  const [overlayVisible, setOverlayVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const showOverlay = () => {
    setOverlayVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideOverlay = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setOverlayVisible(false));
  };

  const handleParentPress = () => {
    Alert.alert('父容器被点击', `pointerEvents: ${parentPointerEvents}`);
  };

  const handleChildPress = () => {
    Alert.alert('子容器被点击', `pointerEvents: ${childPointerEvents}`);
  };

  const handleButtonPress = (buttonName) => {
    Alert.alert(`${buttonName} 被点击`, '即使上面有半透明覆盖层');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>pointerEvents 示例</Text>
      
      {/* 控制面板 */}
      <View style={styles.controlPanel}>
        <Text style={styles.subtitle}>控制面板</Text>
        
        <Text>父容器</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setParentPointerEvents('auto')}
          >
            <Text>auto</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setParentPointerEvents('none')}
          >
            <Text>none</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setParentPointerEvents('box-none')}
          >
            <Text>box-none</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setParentPointerEvents('box-only')}
          >
            <Text>box-only</Text>
          </TouchableOpacity>
        </View>
        
        <Text>子容器</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setChildPointerEvents('auto')}
          >
            <Text>auto</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setChildPointerEvents('none')}
          >
            <Text>none</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setChildPointerEvents('box-none')}
          >
            <Text>box-none</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setChildPointerEvents('box-only')}
          >
            <Text>box-only</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.overlayButton}
          onPress={showOverlay}
        >
          <Text>显示覆盖层</Text>
        </TouchableOpacity>
      </View>

      {/* 测试区域 */}
      <View style={styles.testArea}>
        <Text style={styles.statusText}>
          当前状态: 父容器 - {parentPointerEvents}, 子容器 - {childPointerEvents}
        </Text>
        
        <View 
          style={styles.parentContainer}
          pointerEvents={parentPointerEvents}
          onTouchStart={handleParentPress}
        >
          <Text style={styles.containerLabel}>父容器</Text>
          <View 
            style={styles.childContainer}
            pointerEvents={childPointerEvents}
            onTouchStart={handleChildPress}
          >
            <Text style={styles.containerLabel}>子容器</Text>
            <Text style={styles.hintText}>点击测试区域</Text>
          </View>
        </View>
      </View>

      {/* 底部按钮区域 */}
      <View style={styles.bottomArea}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleButtonPress('按钮1')}
        >
          <Text>按钮 1</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleButtonPress('按钮2')}
        >
          <Text>按钮 2</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleButtonPress('按钮3')}
        >
          <Text>按钮 3</Text>
        </TouchableOpacity>
      </View>

      {/* 半透明覆盖层 */}
      {overlayVisible && (
        <Animated.View 
          style={[styles.overlay, { opacity: fadeAnim }]}
          pointerEvents="box-none"
        >
          <View style={styles.overlayContent}>
            <Text style={styles.overlayTitle}>半透明覆盖层</Text>
            <Text style={styles.overlayText}>
              此覆盖层的 pointerEvents="box-none"，所以下面的按钮仍然可以点击
            </Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={hideOverlay}
            >
              <Text style={styles.closeButtonText}>关闭覆盖层</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  controlPanel: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  controlButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  overlayButton: {
    padding: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  testArea: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#666',
  },
  parentContainer: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  childContainer: {
    width: '80%',
    height: '60%',
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  containerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hintText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  bottomArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FF5722',
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overlayText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PointerEventsExample;