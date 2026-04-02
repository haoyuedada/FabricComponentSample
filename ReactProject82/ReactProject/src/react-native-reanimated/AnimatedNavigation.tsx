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

import React, { useEffect } from 'react';
import {
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export const PALETTE = {
    REACT_CYAN_LIGHT: 'hsl(193, 95%, 68%)',
    REACT_CYAN_DARK: 'hsl(193, 95%, 30%)',
};

const NavigationContext = React.createContext<
    | {
        currentPageName: string;
        navigateTo: (pageName: string) => void;
        goBack: () => void;
        registerPageName: (pageName: string, isRootPage?: boolean) => void;
        registeredPageNames: string[];
        rootPageNames: string[];
        pageStack: string[];
    }
    | undefined
>(undefined);

export function NavigationContainer({
    initialPage = 'INDEX',
    titleName = "react-native-reanimated",
    children,
}: {
    initialPage?: string;
    titleName?: string;
    children: any;
}) {
    const [pageStack, setPageStack] = React.useState<string[]>([initialPage]);
    const [registeredPageNames, setRegisteredPageNames] = React.useState<string[]>([]);
    const [rootPageNames, setRootPageNames] = React.useState<string[]>([]);

    const navigateTo = (pageName: string) => {
        setPageStack(prev => {
            if (pageName === 'INDEX') return ['INDEX'];
            if (prev[prev.length - 1] === pageName) return prev;
            return [...prev, pageName];
        });
    };

    const goBack = () => {
        setPageStack(prev => {
            if (prev.length <= 1) return prev;
            return prev.slice(0, prev.length - 1);
        });
    };

    const currentPageName = pageStack[pageStack.length - 1];

    return (
        <NavigationContext.Provider
            value={{
                currentPageName,
                navigateTo,
                goBack,
                registerPageName: (pageName: string, isRootPage = false) => {

                    setRegisteredPageNames(pageNames => {
                        if (pageNames.includes(pageName)) return pageNames;
                        return [...pageNames, pageName];
                    });
    
                    if (isRootPage) {
                        setRootPageNames(pageNames => {
                            if (pageNames.includes(pageName)) return pageNames;
                            return [...pageNames, pageName];
                        });
                    }
                },
                registeredPageNames,
                rootPageNames,
                pageStack,
            }}>
            <View style={{ width: '100%', height: '100%', flexDirection: 'column' }}>
                <Page name="INDEX">
                    <IndexPage titleName={titleName} />
                </Page>
                {children}
            </View>
        </NavigationContext.Provider>
    );
}

export function useNavigation() {
    return React.useContext(NavigationContext)!;
}


export function Page({ name, children, isRootPage = false }: { name: string; children: any; isRootPage?: boolean }) {
    const { currentPageName, goBack, registerPageName } = useNavigation();

    useEffect(() => {
        if (name !== 'INDEX') {
            registerPageName(name, isRootPage); 
        }
    }, [name, isRootPage]);

    return name === currentPageName ? (
        <View style={{ width: '100%', flex: 1 }}>
            {name !== 'INDEX' && (
                <View style={{ backgroundColor: PALETTE.REACT_CYAN_DARK }}>
                    <TouchableOpacity
                        onPress={() => goBack()}>
                        <Text
                            style={[styles.buttonText, { color: PALETTE.REACT_CYAN_LIGHT }]}>
                            {'‹ Back'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={{ width: '100%', flex: 1 }}>{children}</View>
        </View>
    ) : null;
}


export function IndexPage({ titleName }: { titleName: string }) {
    const { navigateTo, rootPageNames } = useNavigation();

    return (
        <FlatList
            data={rootPageNames} 
            ListHeaderComponent={
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 16,
                    }}>
                    <Image
                        style={{ width: 32, height: 32 }}
                        resizeMode="contain"
                        source={require('../../assets/react-native-logo.png')}
                    />
                    <Text
                        style={{
                            color: '#EEE',
                            fontSize: 24,
                            fontWeight: 'bold',
                            padding: 16,
                        }}>
                        {titleName}
                    </Text>
                </View>
            }
            renderItem={({ item }) => {
                return (
                    <View style={{ backgroundColor: PALETTE.REACT_CYAN_DARK }}>
                        <TouchableOpacity
                            onPress={() => navigateTo(item)}>
                            <Text style={styles.buttonText}>{item}</Text>
                        </TouchableOpacity>
                    </View>
                );
            }}
            ItemSeparatorComponent={() => (
                <View
                    style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#666' }}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#888',
    },
    buttonText: {
        width: '100%',
        fontWeight: 'bold',
        paddingHorizontal: 16,
        paddingVertical: 24,
        color: 'white',
        backgroundColor: 'black',
    },
});