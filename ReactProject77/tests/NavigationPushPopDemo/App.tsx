import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Page: {depth: number} | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList, 'RootStack'>();

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type PageProps = NativeStackScreenProps<RootStackParamList, 'Page'>;

function ActionButton({
  title,
  desc,
  color,
  disabled,
  onPress,
}: {
  title: string;
  desc?: string;
  color: string;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: color},
        disabled && styles.buttonDisabled,
      ]}
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}>
      <Text style={styles.buttonTitle}>{title}</Text>
      {desc ? <Text style={styles.buttonDesc}>{desc}</Text> : null}
    </TouchableOpacity>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

function StackInfo() {
  const navigation = useNavigation();
  const state = navigation.getState();
  return (
    <InfoCard title="当前页面堆栈（自底向上）">
      {state.routes.map((route, i) => (
        <Text
          key={route.key}
          style={[
            styles.stackItem,
            i === state.index && styles.stackItemActive,
          ]}>
          {i === state.index ? '▶ ' : '   '}
          {i + 1}. {route.name}
          {route.params
            ? `（参数 depth=${(route.params as {depth?: number}).depth}）`
            : ''}
        </Text>
      ))}
      <Text style={styles.stackDepth}>堆栈深度：{state.routes.length}</Text>
    </InfoCard>
  );
}

function HomeScreen({navigation}: HomeProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>路由 Push / Pop Demo</Text>
        <Text style={styles.subtitle}>
          使用 @react-navigation/native-stack 操作页面堆栈
        </Text>

        <InfoCard title="API 说明">
          <Text style={styles.cardText}>
            push：向堆栈顶部压入新页面，可重复压入同名页面{'\n'}
            pop：从堆栈顶部弹出 1 个页面{'\n'}
            pop(n)：一次弹出 n 个页面{'\n'}
            popToTop：弹出所有页面，回到根页面{'\n'}
            navigate：堆栈中已有同名页面时跳转到它，不重复压栈
          </Text>
        </InfoCard>

        <ActionButton
          title="push 进入 Page"
          desc="navigation.push('Page', {depth: 1})"
          color="#6366f1"
          onPress={() => navigation.push('Page', {depth: 1})}
        />
        <ActionButton
          title="navigate 进入 Page"
          desc="堆栈中没有 Page 时，navigate 与 push 效果相同"
          color="#0ea5e9"
          onPress={() => navigation.navigate('Page', {depth: 1})}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function PageScreen({navigation, route}: PageProps) {
  const depth = route.params?.depth ?? 1;
  const stackLength = navigation.getState().routes.length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Page</Text>
        <Text style={styles.subtitle}>
          参数 depth = {depth} ｜ 堆栈位置 = 第 {stackLength} 层
        </Text>

        <StackInfo />

        <ActionButton
          title="push 下一页"
          desc="navigation.push('Page', {depth: depth + 1})，堆栈深度 +1"
          color="#6366f1"
          onPress={() => navigation.push('Page', {depth: depth + 1})}
        />
        <ActionButton
          title="navigate 到 Page"
          desc="堆栈中已有 Page，仅更新参数不压栈，深度不变"
          color="#0ea5e9"
          onPress={() => navigation.navigate('Page', {depth: depth + 1})}
        />
        <ActionButton
          title="pop 返回上一页"
          desc="navigation.pop()，堆栈深度 -1"
          color="#f59e0b"
          onPress={() => navigation.pop()}
        />
        <ActionButton
          title="pop(2) 返回上两页"
          desc="navigation.pop(2)"
          color="#f97316"
          disabled={stackLength < 3}
          onPress={() => navigation.pop(2)}
        />
        <ActionButton
          title="popToTop 回到根页面"
          desc="navigation.popToTop()，清空堆栈只留 Home"
          color="#ef4444"
          onPress={() => navigation.popToTop()}
        />
        <ActionButton
          title="navigate 回 Home"
          desc="跳转到堆栈中已存在的 Home，是弹出而非压栈"
          color="#10b981"
          onPress={() => navigation.navigate('Home')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator id="RootStack" initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Push/Pop Demo'}}
        />
        <Stack.Screen
          name="Page"
          component={PageScreen}
          options={({route}) => ({
            title: `Page（depth=${route.params?.depth ?? '?'}）`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#f5f5f7'},
  content: {padding: 16, paddingBottom: 48},
  heading: {fontSize: 24, fontWeight: 'bold', color: '#111827', marginTop: 8},
  subtitle: {fontSize: 14, color: '#6b7280', marginTop: 4, marginBottom: 16},
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  cardText: {fontSize: 13, color: '#4b5563', lineHeight: 22},
  stackItem: {fontSize: 13, color: '#4b5563', lineHeight: 22},
  stackItemActive: {color: '#6366f1', fontWeight: '600'},
  stackDepth: {fontSize: 13, color: '#111827', fontWeight: '600', marginTop: 8},
  button: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  buttonDisabled: {opacity: 0.4},
  buttonTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonDesc: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
  },
});
