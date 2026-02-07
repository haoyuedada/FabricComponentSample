import styles from './styles';
import React, {useState} from 'react';
import StickyHeaderFlatList from './StickyHeaderFlatList';
import {View, Text, Pressable, ScrollView, RefreshControl} from 'react-native';

const ArticleCategoryList = [
  {
    label: '精选',
    value: '01' as const,
  },
  {
    label: '广场',
    value: '02' as const,
  },
];

export default function MemberSays() {
  // 文章分类选中的类别
  const [activeIndex, setActiveIndex] = useState<'01' | '02'>(
    ArticleCategoryList[0].value,
  );
  // 切换文章分类
  const changeActiveIndex = (value: '01' | '02') => () => {
    setActiveIndex(value);
  };

  return (
    <View style={styles.container}>
      <StickyHeaderFlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        StickyElementComponent={
          <View style={styles.articleCategory}>
            {ArticleCategoryList.map(({value, label}) => (
              <Text
                key={value}
                onPress={changeActiveIndex(value)}
                style={[
                  styles.articleCategoryText,
                  activeIndex === value && styles.articleCategoryTextActive,
                ]}>
                {label}
              </Text>
            ))}
          </View>
        }
        HeaderComponent={
          <View style={styles.momentsWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[1, 2, 3, 4, 5, 6].map((item, i) => (
                <Pressable key={item}>
                  <View
                    style={[
                      styles.momentItemWrapper,
                      {
                        backgroundColor: 'blue',
                      },
                      // eslint-disable-next-line react-native/no-inline-styles
                      {
                        marginTop: 16,
                        overflow: 'visible',
                        marginLeft: i !== 0 ? 8 : 16,
                        marginRight: i === 5 ? 16 : 0,
                      },
                    ]}>
                    <View style={styles.momentItemWrapper}>
                      <View style={styles.p12}>
                        {/* 圈子标题、收藏 */}
                        <View style={styles.momentItemTitleWrapper}>
                          <Text style={styles.momentItemTitle}>
                            我是列表项{item}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        }
        scrollEventThrottle={16}
        onEndReachedThreshold={0.3}
        keyExtractor={item => item.postId}
        showsVerticalScrollIndicator={false}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{paddingBottom: 6}}
        renderItem={({item}) => (
          <View style={{height: 100}}>
            <Text>我是列表项{item}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl colors={['#00BBD1']} progressViewOffset={200} />
        }
      />
    </View>
  );
}
