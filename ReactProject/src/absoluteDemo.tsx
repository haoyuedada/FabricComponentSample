import { Text, View } from 'react-native';

export default function App() {
    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
                Absolute vs Relative 定位对比
            </Text>

            {/* 第三个例子：对比展示 - 是否占用空间 */}
            <View>
                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#333' }}>
                    3. 对比：是否占用布局空间
                </Text>
                <View style={{
                    backgroundColor: '#e8f5e9',
                    padding: 20,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#c8e6c9'
                }}>
                    <Text style={{ fontSize: 14, color: '#555', marginBottom: 10 }}>
                        黄色块显示实际布局空间，观察两个方块的空间占用情况
                    </Text>
                    <View style={{
                        backgroundColor: '#fffde7',  // 浅黄色背景表示布局空间
                        padding: 10,
                        borderRadius: 4,
                        minHeight: 200,
                        borderWidth: 2,
                        borderColor: '#fbc02d'
                    }}>
                        {/* 基准线 */}
                        <Text style={{ fontSize: 12, color: '#8d6e63', marginBottom: 10 }}>
                            布局基准线 →
                        </Text>

                        {/* 红色边界线 - 显示布局位置 */}
                        <View style={{
                            borderWidth: 2,
                            borderColor: '#f44336',
                            borderRadius: 4,
                            height: 80,
                            width: 80,
                            backgroundColor: 'transparent'
                        }}>
                            <Text style={{ fontSize: 10, color: '#f44336', textAlign: 'center', marginTop: 5 }}>
                                布局空间
                            </Text>
                        </View>

                        <View style={{
                            width: 80,
                            height: 80,
                            backgroundColor: '#69DB7C',
                            borderRadius: 4,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            left: 20,
                            top: 20
                        }}>
                            <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
                                Relative
(保留空间)
                            </Text>
                        </View>

                        <View style={{
                            width: 80,
                            height: 80,
                            backgroundColor: '#9775FA',
                            borderRadius: 4,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            right: 20,
                            bottom: 20,
                            left: 20,
                            top: 20
                        }}>
                            <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
                                Absolute
(不保留空间)
                            </Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 14, color: '#555', lineHeight: 20 }}>
                            <Text style={{ fontWeight: '600' }}>分析：</Text>
                            {"\n"}• 红色边框显示了 relative 定位元素实际占据的布局空间
                            {"\n"}• 绿色方块 (Relative) 向右向下偏移，但红色边框保留在原位置
                            {"\n"}• 紫色方块 (Absolute) 没有红色边框，说明它不占据布局空间
                            {"\n"}• 黄色背景区域的高度由 Relative 定位元素的空间决定
                        </Text>
                    </View>
                </View>
            </View>

            {/* 总结 */}
            <View style={{
                marginTop: 30,
                backgroundColor: '#fff',
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#eee'
            }}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' }}>
                    总结：
                </Text>
                <Text style={{ fontSize: 14, color: '#555', lineHeight: 20 }}>
                    • <Text style={{ fontWeight: '600' }}>Relative 定位：</Text>元素相对于其正常位置偏移，但仍保留原来的空间。
                    {"\n"}• <Text style={{ fontWeight: '600' }}>Absolute 定位：</Text>元素相对于最近的定位祖先元素（或根元素）定位，不保留原来的空间。
                    {"\n"}• 在 React Native 中，所有定位都是相对于父容器的边框（border box）计算的。
                </Text>
            </View>
        </View>
    );
}
