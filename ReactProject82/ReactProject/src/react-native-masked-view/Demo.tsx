import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import pattern from './assets/test_pattern.png';

const PAGE_BG = '#CCCCCC';

function Label({ text }: { text: string }) {
    return <Text style={styles.label}>{text}</Text>;
}

function CaseA_BasicMask() {
    return (
        <View>
            <Label text="A 基础蒙版：内容仅透过文字字形显示（核心契约）" />
            <MaskedView
                style={{ height: 110, backgroundColor: '#FFFFFF' }}
                maskElement={
                    <View style={styles.maskFill}>
                        <Text style={styles.maskText}>BASIC 蒙版</Text>
                    </View>
                }>
                <View style={[styles.contentFill, { backgroundColor: '#2196F3' }]} />
                <View style={[styles.block, { backgroundColor: '#FFEB3B', top: 30, left: 40, width: 120 }]} />
            </MaskedView>
        </View>
    );
}

function CaseB_HostBackground() {
    return (
        <View>
            <Label text="B 宿主背景+半透明mask：右侧55%区域 显示什么？" />
            <MaskedView
                style={{ height: 110, backgroundColor: '#B00020' }}
                maskElement={
                    <View style={[styles.maskFill, { width: '45%', alignSelf: 'flex-start', backgroundColor: '#000000' }]} />
                }>
                <View style={[styles.contentFill, { backgroundColor: '#03A9F4' }]} />
            </MaskedView>
            <Text style={styles.hint}>新实现(修复后)：右侧应为页面灰底 | 旧实现：右侧为红色宿主背景(绕过mask)</Text>
        </View>
    );
}

function CaseC_BlurInContent() {
    return (
        <View>
            <Label text="C blur 内容（bug 本体）：模糊图片应正常显示" />
            <MaskedView
                style={{ height: 110 }}
                maskElement={<View style={[styles.maskFill, { backgroundColor: '#000000' }]} />}>
                <Image
                    source={pattern}
                    blurRadius={40}
                    resizeMode="cover"
                    style={styles.contentFill}
                />
            </MaskedView>
        </View>
    );
}

function CaseD_MultiChildren() {
    return (
        <View>
            <Label text="D 多内容子节点：仅右侧70%被mask保留" />
            <MaskedView
                style={{ height: 110 }}
                maskElement={
                    <View style={[styles.maskFill, { width: '70%', alignSelf: 'flex-end', backgroundColor: '#000000' }]} />
                }>
                <View style={[styles.contentFill, { backgroundColor: '#FF9800' }]} />
                <View style={[styles.block, { backgroundColor: '#9C27B0', top: 30, left: 30, width: 100 }]} />
                <View style={[styles.block, { backgroundColor: '#00BCD4', top: 30, right: 30, width: 100 }]} />
            </MaskedView>
        </View>
    );
}

function CaseE_DynamicRemove() {
    const [removed, setRemoved] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setRemoved(true), 1200);
        return () => clearTimeout(t);
    }, []);

    const mask = (
        <View style={[styles.maskFill, { width: '60%', alignSelf: 'flex-end', backgroundColor: '#000000' }]} />
    );
    const children = (isRemoved: boolean) => (
        <>
            <View style={[styles.contentFill, { backgroundColor: '#4CAF50' }]} />
            {!isRemoved && <View style={[styles.block, { backgroundColor: '#E91E63', top: 20, left: 80, width: 80 }]} />}
            <View style={[styles.block, { backgroundColor: '#3F51B5', top: 20, right: 80, width: 80 }]} />
        </>
    );

    return (
        <View>
            <Label text="E 动态删除内容子节点（1.2s后删除中间粉色块）：剩余内容仍应被mask" />
            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.subLabel}>删除前</Text>
                    <MaskedView style={{ height: 80, flex: 1 }} maskElement={mask}>
                        {children(false)}
                    </MaskedView>
                </View>
                <View style={styles.col}>
                    <Text style={styles.subLabel}>删除后(截图时应已完成)</Text>
                    <MaskedView style={{ height: 80, flex: 1 }} maskElement={mask}>
                        {children(removed)}
                    </MaskedView>
                </View>
            </View>
            <Text style={styles.hint}>新实现：右格删除后仍仅右侧60%可见 | 旧实现：删除子节点清除Stack混合 → 内容泄露全显</Text>
        </View>
    );
}

export default function MaskedViewDemo() {
    return (
        <ScrollView style={styles.page} contentContainerStyle={styles.container}>
            <CaseA_BasicMask />
            <CaseB_HostBackground />
            <CaseC_BlurInContent />
            <CaseD_MultiChildren />
            <CaseE_DynamicRemove />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: PAGE_BG },
    container: { padding: 12, gap: 14 },
    label: { fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 4 },
    subLabel: { fontSize: 12, color: '#333', marginBottom: 4 },
    hint: { fontSize: 11, color: '#555', marginTop: 3 },
    maskFill: { flex: 1 },
    contentFill: { flex: 1 },
    block: { position: 'absolute', height: 50 },
    row: { flexDirection: 'row', gap: 10 },
    col: { flex: 1 },
});
