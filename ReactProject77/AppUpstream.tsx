import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import {
  GestureHandlerRootView,
  RectButton,
  Switch,
} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OverflowParent from './UpstreamDemo/release_tests/overflowParent';
import DoublePinchRotate from './UpstreamDemo/release_tests/doubleScalePinchAndRotate';
import DoubleDraggable from './UpstreamDemo/release_tests/doubleDraggable';
import GesturizedPressable from './UpstreamDemo/release_tests/gesturizedPressable';
// import { ComboWithGHScroll } from './UpstreamDemo/release_tests/combo';
import {
  TouchablesIndex,
  TouchableExample,
} from './UpstreamDemo/release_tests/touchables';
import Rows from './UpstreamDemo/release_tests/rows';
import NestedFling from './UpstreamDemo/release_tests/nestedFling';
import MouseButtons from './UpstreamDemo/release_tests/mouseButtons';
import ContextMenu from './UpstreamDemo/release_tests/contextMenu';
import NestedTouchables from './UpstreamDemo/release_tests/nestedTouchables';
import NestedPressables from './UpstreamDemo/release_tests/nestedPressables';
import NestedButtons from './UpstreamDemo/release_tests/nestedButtons';
import PointerType from './UpstreamDemo/release_tests/pointerType';
// import SwipeableReanimation from './UpstreamDemo/release_tests/swipeableReanimation';
import NestedGestureHandlerRootViewWithModal from './UpstreamDemo/release_tests/nestedGHRootViewWithModal';
import TwoFingerPan from './UpstreamDemo/release_tests/twoFingerPan';
import SvgCompatibility from './UpstreamDemo/release_tests/svg';
import NestedText from './UpstreamDemo/release_tests/nestedText';

import { PinchableBox } from './UpstreamDemo/recipes/scaleAndRotate';
import PanAndScroll from './UpstreamDemo/recipes/panAndScroll';

import { BottomSheet } from './UpstreamDemo/showcase/bottomSheet';
// import Swipeables from './UpstreamDemo/showcase/swipeable';
import ChatHeads from './UpstreamDemo/showcase/chatHeads';

import Draggable from './UpstreamDemo/basic/draggable';
import MultiTap from './UpstreamDemo/basic/multitap';
import BouncingBox from './UpstreamDemo/basic/bouncing';
import PanResponder from './UpstreamDemo/basic/panResponder';
import HorizontalDrawer from './UpstreamDemo/basic/horizontalDrawer';
import PagerAndDrawer from './UpstreamDemo/basic/pagerAndDrawer';
import ForceTouch from './UpstreamDemo/basic/forcetouch';
import Fling from './UpstreamDemo/basic/fling';
import WebStylesResetExample from './UpstreamDemo/release_tests/webStylesReset';
import StylusData from './UpstreamDemo/release_tests/StylusData';
// import ReanimatedDrawerLayout from './UpstreamDemo/release_tests/reanimatedDrawerLayout';

// import Camera from './UpstreamDemo/new_api/camera';
import Transformations from './UpstreamDemo/new_api/transformations';
import Overlap from './UpstreamDemo/new_api/overlap';
import Calculator from './UpstreamDemo/new_api/calculator';
import BottomSheetNewApi from './UpstreamDemo/new_api/bottom_sheet';
import ChatHeadsNewApi from './UpstreamDemo/new_api/chat_heads';
import DragNDrop from './UpstreamDemo/new_api/drag_n_drop';
import BetterHorizontalDrawer from './UpstreamDemo/new_api/betterHorizontalDrawer';
import ManualGestures from './UpstreamDemo/new_api/manualGestures/index';
import Hover from './UpstreamDemo/new_api/hover';
import HoverableIcons from './UpstreamDemo/new_api/hoverable_icons';
import VelocityTest from './UpstreamDemo/new_api/velocityTest';
// import Swipeable from './UpstreamDemo/new_api/swipeable';
import Pressable from './UpstreamDemo/new_api/pressable';

import EmptyExample from './UpstreamDemo/empty/EmptyExample';
import RectButtonBorders from './UpstreamDemo/release_tests/rectButton';
import { ListWithHeader } from './UpstreamDemo/ListWithHeader';
import { COLORS } from './UpstreamDemo/common';

import MacosDraggable from './UpstreamDemo/simple/draggable';
import Tap from './UpstreamDemo/simple/tap';
import LongPressExample from './UpstreamDemo/simple/longPress';
import ManualExample from './UpstreamDemo/simple/manual';
import SimpleFling from './UpstreamDemo/simple/fling';

import { Icon } from '@swmansion/icons';

interface Example {
  name: string;
  component: React.ComponentType;
  unsupportedPlatforms?: Set<typeof Platform.OS>;
}
interface ExamplesSection {
  sectionTitle: string;
  data: Example[];
}

const EXAMPLES: ExamplesSection[] = [
  {
    sectionTitle: 'Empty',
    data: [{ name: 'Empty Example', component: EmptyExample }],
  },
  {
    sectionTitle: 'New api',
    data: [
      { name: 'Ball with velocity', component: VelocityTest },
      // { name: 'Camera', component: Camera },
      { name: 'Transformations', component: Transformations },
      { name: 'Overlap', component: Overlap },
      { name: 'Bottom Sheet', component: BottomSheetNewApi },
      { name: 'Calculator', component: Calculator },
      { name: 'Chat Heads', component: ChatHeadsNewApi },
      { name: 'Drag and drop', component: DragNDrop },
      // { name: 'New Swipeable', component: Swipeable },
      { name: 'Pressable', component: Pressable },
      { name: 'Hover', component: Hover },
      { name: 'Hoverable icons', component: HoverableIcons },
      {
        name: 'Horizontal Drawer (Reanimated 2 & RNGH 2)',
        component: BetterHorizontalDrawer,
      },
      {
        name: 'Manual gestures',
        component: ManualGestures,
      },
    ],
  },
  {
    sectionTitle: 'Basic examples',
    data: [
      { name: 'Draggable', component: Draggable },
      { name: 'Multitap', component: MultiTap },
      { name: 'Bouncing box', component: BouncingBox },
      { name: 'Pan responder', component: PanResponder },
      { name: 'Horizontal drawer', component: HorizontalDrawer },
      {
        name: 'Pager & drawer',
        component: PagerAndDrawer,
        unsupportedPlatforms: new Set(['web', 'ios', 'macos']),
      },
      {
        name: 'Force touch',
        component: ForceTouch,
        unsupportedPlatforms: new Set(['web', 'android', 'macos']),
      },
      { name: 'Fling', component: Fling },
    ],
  },
  {
    sectionTitle: 'Recipes',
    data: [
      { name: 'Pinch & rotate', component: PinchableBox },
      { name: 'Pan & scroll', component: PanAndScroll },
    ],
  },
  {
    sectionTitle: 'Showcase',
    data: [
      { name: 'Bottom sheet', component: BottomSheet },
      // { name: 'Swipeables', component: Swipeables },
      { name: 'Chat heads', component: ChatHeads },
    ],
  },
  {
    sectionTitle: 'Release tests',
    data: [
      {
        name: 'Views overflowing parents - issue #1532',
        component: OverflowParent,
      },
      {
        name: 'Modals with nested GHRootViews - issue #139',
        component: NestedGestureHandlerRootViewWithModal,
      },
      {
        name: 'Nested Touchables - issue #784',
        component: NestedTouchables as React.ComponentType,
      },
      {
        name: 'Nested Pressables - issue #2980',
        component: NestedPressables as React.ComponentType,
      },
      {
        name: 'Nested buttons (sound & ripple)',
        component: NestedButtons,
        unsupportedPlatforms: new Set(['web', 'ios', 'macos']),
      },
      {
        name: 'Svg integration with Gesture Handler',
        component: SvgCompatibility,
      },
      { name: 'Double pinch & rotate', component: DoublePinchRotate },
      { name: 'Double draggable', component: DoubleDraggable },
      { name: 'Rows', component: Rows },
      { name: 'Nested Fling', component: NestedFling },
      // {
      //   name: 'Combo',
      //   component: ComboWithGHScroll,
      //   unsupportedPlatforms: new Set(['web']),
      // },
      { name: 'Touchables', component: TouchablesIndex as React.ComponentType },
      { name: 'MouseButtons', component: MouseButtons },
      {
        name: 'ContextMenu',
        component: ContextMenu,
        unsupportedPlatforms: new Set(['android', 'ios', 'macos']),
      },
      { name: 'PointerType', component: PointerType },
      // { name: 'Reanimated Drawer Layout', component: ReanimatedDrawerLayout },
      // { name: 'Swipeable Reanimation', component: SwipeableReanimation },
      { name: 'RectButton (borders)', component: RectButtonBorders },
      { name: 'Gesturized pressable', component: GesturizedPressable },
      {
        name: 'Web styles reset',
        component: WebStylesResetExample,
        unsupportedPlatforms: new Set(['android', 'ios', 'macos']),
      },
      { name: 'Stylus data', component: StylusData },
      {
        name: 'Two finger Pan',
        component: TwoFingerPan,
        unsupportedPlatforms: new Set(['android', 'macos']),
      },
      {
        name: 'Nested Text',
        component: NestedText,
        unsupportedPlatforms: new Set(['macos']),
      },
    ],
  },
  {
    sectionTitle: 'Simple',
    data: [
      { name: 'Simple Draggable', component: MacosDraggable },
      { name: 'Tap', component: Tap },
      { name: 'LongPress', component: LongPressExample },
      { name: 'Manual', component: ManualExample },
      { name: 'Simple Fling', component: SimpleFling },
    ],
  },
];

const OPEN_LAST_EXAMPLE_KEY = 'openLastExample';
const LAST_EXAMPLE_KEY = 'lastExample';

type RootStackParamList = {
  Home: undefined;
  TouchableExample: { item: string };
} & {
  [Screen: string]: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  // return (
  //   <View style={{ flex: 1, backgroundColor: 'red' }}>

  //   </View>
  // )
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyle: {
              // It's important to set height for the screen, without it scroll doesn't work on web platform.
              height: Dimensions.get('window').height,
              backgroundColor: COLORS.offWhite,
            },
            headerStyle: {
              backgroundColor: COLORS.offWhite,
              borderBottomColor: COLORS.headerSeparator,
              borderBottomWidth: 1,
            },
          }}>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={MainScreen}
          />
          {EXAMPLES.flatMap(({ data }) => data).flatMap(
            ({ name, component }) => (
              <Stack.Screen
                key={name}
                name={name}
                getComponent={() => component}
                options={{ title: name }}
              />
            )
          )}
          <Stack.Screen name="TouchableExample" component={TouchableExample} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

function navigate(
  navigation: StackNavigationProp<ParamListBase>,
  dest: string
) {
  AsyncStorage.setItem(LAST_EXAMPLE_KEY, dest);
  navigation.navigate(dest);
}

function MainScreen({ navigation }: StackScreenProps<ParamListBase>) {
  useEffect(() => {
    AsyncStorage.multiGet([OPEN_LAST_EXAMPLE_KEY, LAST_EXAMPLE_KEY]).then(
      ([openLastExample, lastExample]) => {
        if (openLastExample[1] === 'true' && lastExample[1]) {
          navigate(navigation, lastExample[1]);
        }
      }
    );
    // we only want to run this effect once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ListWithHeader
        style={styles.list}
        sections={EXAMPLES}
        keyExtractor={(example) => example.name}
        ListHeaderComponent={OpenLastExampleSetting}
        renderItem={({ item }) => (
          <MainScreenItem
            name={item.name}
            onPressItem={(name) => navigate(navigation, name)}
            enabled={!item.unsupportedPlatforms?.has(Platform.OS)}
          />
        )}
        renderSectionHeader={({ section: { sectionTitle } }) => (
          <Text style={styles.sectionTitle}>{sectionTitle}</Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

function OpenLastExampleSetting() {
  const [openLastExample, setOpenLastExample] = React.useState(false);

  useEffect(() => {
    AsyncStorage.getItem(OPEN_LAST_EXAMPLE_KEY).then((value) => {
      setOpenLastExample(value === 'true');
    });
  }, []);

  function updateSetting(value: boolean) {
    AsyncStorage.setItem(OPEN_LAST_EXAMPLE_KEY, value.toString());
    setOpenLastExample(value);
  }

  return (
    <RectButton
      style={[styles.button, styles.autoOpenSetting]}
      onPress={() => {
        updateSetting(!openLastExample);
      }}>
      <View
        style={styles.buttonContent}
        pointerEvents={Platform.OS === 'web' ? 'box-only' : 'auto'}>
        <Text style={styles.text}>Open last example on launch</Text>
        <Switch
          value={openLastExample}
          onValueChange={() => {
            updateSetting(!openLastExample);
          }}
        />
      </View>
    </RectButton>
  );
}

interface MainScreenItemProps {
  name: string;
  onPressItem: (name: string) => void;
  enabled: boolean;
}

function MainScreenItem({ name, onPressItem, enabled }: MainScreenItemProps) {
  return (
    <RectButton
      enabled={enabled}
      style={[styles.button, !enabled && styles.unavailableExample]}
      onPress={() => onPressItem(name)}>
      <Text style={styles.text}>{name}</Text>
      {Platform.OS !== 'macos' && enabled && (
        <Icon name="chevron-small-right" size={24} color="#bbb" />
      )}
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
  sectionTitle: {
    ...(Platform.OS !== 'macos' ? { backgroundColor: '#f8f9ff' } : {}),
    ...Platform.select({
      ios: {
        fontSize: 17,
        fontWeight: '500',
      },
      android: {
        fontSize: 19,
        fontFamily: 'sans-serif-medium',
      },
    }),
    padding: 16,
    color: 'black',
  },
  text: {
    color: 'black',
  },
  list: {},
  separator: {
    height: 2,
  },
  button: {
    flex: 1,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  autoOpenSetting: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: '#eef0ff',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    elevation: 8,
    ...(Platform.OS !== 'macos'
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }
      : {}),
  },
  unavailableExample: {
    backgroundColor: 'rgb(220, 220, 220)',
    opacity: 0.3,
  },
});
