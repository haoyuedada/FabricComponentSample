/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2026-2026. All rights reserved.
 */

import React, {useEffect, useState} from 'react';
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert, ActivityIndicator,
} from 'react-native';
import EduLogger from '../../utils/EduLogger';
import {colors} from '@hw-bigdata/rn-fusion-kit';
import {MEDIA_OF_CLOSE_ICON} from '../../components/aiCoach/resources/media';
import ResponsiveSvg from '../../components/ResponsiveSvg';
import {UploadResult} from '../../common/native/type';
import DynamicText from "../../../common/components/DynamicText";

export interface HorizontalImageListProps {
    imageUriList: string[];
    uploadImageResultList: (UploadResult | undefined)[];
    onImageDelete: (index: number) => void;
}

const TAG: string = 'horizontalImageList';

/**
 * 水平排列，可滑动的预览图片
 *
 * @param imageUriList
 * @param uploadImageResultList
 * @param onImageDelete
 */
const horizontalImageList: React.FC<HorizontalImageListProps> = ({
                                                                     imageUriList,
                                                                     uploadImageResultList,
                                                                     onImageDelete,
                                                                 }) => {
    const [imageList, setImageList] = useState(imageUriList || []);

    useEffect(() => {
        EduLogger.info('Rendering images list...', TAG);
        setImageList([...imageUriList]);
    }, [imageUriList]);

    useEffect(() => {
        const nspFileIdList = uploadImageResultList.map(item => item?.nspFileId);
        EduLogger.info(`uploadImageResultList, nspFileIdList: ${JSON.stringify(nspFileIdList)}`, TAG);
    }, [uploadImageResultList]);

    const handleDelete = (index: number): void => {
        Alert.alert('确认删除', '确定要删除这张图片吗？', [
            {
                text: '取消',
                style: 'cancel',
            },
            {
                text: '删除',
                onPress: (): void => {
                    if (onImageDelete) {
                        onImageDelete(index);
                    }
                },
                style: 'destructive',
            },
        ]);
    };

    return (
        <View testID={'horizonImageList'} style={styles.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}>

                {imageList.map((imageUri, index) => {
                    // 获取当前索引对应的上传结果
                    const uploadResult = uploadImageResultList[index];
                    // 判断是否正在加载：
                    // 1. 结果不存在 (undefined)
                    // 2. 或者结果存在但明确标记为 "uploading" 状态 (如果有这个状态字段)
                    const isLoading = !uploadResult || (uploadResult && !uploadResult.nspFileId && !uploadResult.error);

                    return (<View key={index} style={styles.imageContainer}>
                        {/*图片*/}
                        <Image source={{uri: imageUri}} style={styles.thumbnail}/>

                        {/*没上传完，展示loading: 当前index在图片内，且返回结果中没到当前index */}
                        {isLoading && (
                            <View style={styles.loadingOverlay}>
                                <ActivityIndicator size="large" color='grey'/>
                            </View>
                        )}

                        {/* 错误状态展示 (可选增强) */}
                        {!isLoading && uploadResult?.error && (
                            <View style={styles.errorIcon}>
                                <View style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 20,
                                    backgroundColor: colors.black60,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <DynamicText style={{color: 'red', fontSize: 20, fontWeight: '800'}}>!</DynamicText>
                                </View>
                            </View>
                        )}

                        {/*删除按钮*/}
                        <TouchableOpacity
                            style={[styles.deleteButton, {backgroundColor: colors.black60}]}
                            onPress={(): void => handleDelete(index)}>
                            <ResponsiveSvg
                                source={MEDIA_OF_CLOSE_ICON}
                                width={12}
                                height={12}
                                color={'white'}
                            />
                        </TouchableOpacity>
                    </View>)
                })}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    scrollView: {
        flexGrow: 0,
        paddingBottom: 12,
        paddingRight: 16,
    },
    scrollContent: {
        gap: 8,
        // 头尾间隔 16vp
        paddingHorizontal: 16,
        flexDirection: 'row',
    },
    loadingOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorIcon: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    errorText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    imageContainer: {
        position: 'relative',
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    deleteButton: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 18,
        height: 18,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    deleteText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteIcon: {
        width: 12,
        height: 12,
        position: 'relative',
    }
});

export default horizontalImageList;
