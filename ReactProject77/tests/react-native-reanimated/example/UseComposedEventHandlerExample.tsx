import { View, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useComposedEventHandler,
} from 'react-native-reanimated';

function ComposedEventHandlerExample() {
  const onScrollHandler1 = useAnimatedScrollHandler({
    onScroll(e) {
      console.log('Handler 1 - Scroll Y:', e.contentOffset.y);
    },
  });

  const onScrollHandler2 = useAnimatedScrollHandler({
    onScroll(e) {
      console.log('Handler 2 - Scroll event detected');
    },
  });

  const composedHandler = useComposedEventHandler([
    onScrollHandler1,
    onScrollHandler2,
  ]);

  const Content = () => (
    <>
      {Array.from({ length: 30 }).map((_, i) => (
        <View key={i} style={styles.item}>
          <View style={styles.numberBadge}>
            <Text style={styles.numberText}>{i + 1}</Text>
          </View>
          <Text style={styles.itemText}>Item {i + 1}</Text>
        </View>
      ))}
    </>
  );

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={styles.scroll}
        onScroll={composedHandler}
        scrollEventThrottle={16}
      >
        <Content />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff'
  },
  scroll: { 
    flex: 1 
  },
  item: { 
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    flexDirection: 'row',
    alignItems: 'center'
  },
  numberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  numberText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  itemText: {
    color: '#000',
    fontSize: 16
  }
});

export default ComposedEventHandlerExample;