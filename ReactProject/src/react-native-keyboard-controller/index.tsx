import React, {useState, useRef, useMemo, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  DeviceEventEmitter,
  Keyboard,
  Image,
  StyleSheet
} from 'react-native';
import {Modal} from 'react-native-paper';
import {KeyboardStickyView} from 'react-native-keyboard-controller';
import SafeAreaProvider from 'react-native-safe-area-context';

type PostDetailHeaderProps = {
  title?: string;
};

type RouteParams = {
  postId: string;
  activityType?: string;
};

const REPORT_TYPES = [
  {id: '01', label: '淫秽色情'},
  {id: '03', label: '营销广告'},
  {id: '05', label: '侵权'},
  {id: '02', label: '违法信息'},
  {id: '04', label: '恶意人身攻击'},
];

const PostDetailHeader: React.FC<PostDetailHeaderProps> = ({title = ''}) => {
  // const navigation = useNavigation();
  // const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  // const userInfo = useGlobal(state => state.userInfo);
  // const toastRef = useRef<Toast>(null);
  const [showMenuModal, setShowMenuModal] = useState(true);
  const [showReportFormModal, setShowReportFormModal] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const keyboardDidShowListener = useRef<boolean>(false);
  // const insets = useSafeAreaInsets();

  // 从路由参数中获取数据
  // const {postId, activityType = '03'} = route.params || {};

  const handleMorePress = () => {
    setShowMenuModal(true);
  };

  // const handleDeletePress = () => {
  //   setShowMenuModal(false);
  //   modal.show({
  //     title: '确认删除',
  //     content: '确认删除整篇帖子吗？若有留言互动，内容也将一并删除哦',
  //     confirmText: '删除',
  //     cancelText: '取消',
  //     type: 'confirm',
  //     onConfirm: handleDeletePost,
  //     onCancel: () => {
  //       //setShowMenuModal(true);
  //     },
  //   });
  // };

  const handleReportPress = () => {
    setShowMenuModal(false);
    setShowReportFormModal(true);
  };

  const handleCloseMenuModal = () => {
    setShowMenuModal(false);
  };

  const handleCloseReportFormModal = () => {
    if (keyboardDidShowListener.current) {
      Keyboard.dismiss();
      keyboardDidShowListener.current = false;
      return;
    }
    setShowReportFormModal(false);
    setSelectedTypes([]);
    setDescription('');
  };
  // const {data: postDetail} = useRequest(
  //   () =>
  //     getPostDetails({
  //       data: {id: postId, activityType},
  //     }),
  //   {
  //     refreshDeps: [postId, activityType],
  //     ready: !!postId && !!activityType,
  //     onFinally: (_, res) => {
  //       //console.log(res);
  //     },
  //   },
  // );
  // const {run: deletePostRequest} = useRequest(deletePost, {
  //   manual: true,
  //   onSuccess: res => {
  //     if (res.data.success) {
  //       // 发送帖子删除事件
  //       DeviceEventEmitter.emit(POST_DELETED, {
  //         postId,
  //         activityType,
  //       });
  //       toastRef.current?.show('删除成功');
  //       navigation.goBack();
  //     } else {
  //       toastRef.current?.show(res.data.errorMsg || '删除失败');
  //     }
  //   },
  //   onError: () => {
  //     toastRef.current?.show('删除失败，请稍后重试');
  //   },
  // });

  // const {run: reportPostRequest} = useRequest(reportPost, {
  //   manual: true,
  //   onSuccess: res => {
  //     if (res.data.success) {
  //       // toastRef.current?.show(
  //       //   <View style={styles.toastSuccessContainer}>
  //       //     <View style={styles.toastSuccessIcon}>
  //       //       <Icon source="check-circle-outline" size={30} color="#FFFFFF" />
  //       //     </View>
  //       //     <Text style={styles.toastSuccessText}>成功</Text>
  //       //   </View>,
  //       // );
  //       setShowReportFormModal(false);
  //       setSelectedTypes([]);
  //       setDescription('');
  //     } else {
  //       toastRef.current?.show(res.data.errorMsg || '举报失败');
  //     }
  //   },
  //   onError: () => {
  //     toastRef.current?.show('举报失败，请稍后重试');
  //   },
  // });

  // const handleDeletePost = () => {
  //   if (!postId || !userInfo?.id) {
  //     toastRef.current?.show('参数错误');
  //     return;
  //   }
  //   deletePostRequest({
  //     data: {
  //       id: postId,
  //       userId: userInfo.id,
  //       activityType,
  //     },
  //   });
  // };

  // const handleReportPost = (reportTypes: string[], _description: string) => {
  //   if (!postId) {
  //     toastRef.current?.show('参数错误');
  //     return;
  //   }

  //   reportPostRequest({
  //     data: {
  //       id: postId,
  //       activityType,
  //       taskType: '001',
  //       reportType: reportTypes.join(','),
  //     },
  //   });
  // };

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev => {
      if (prev.includes(typeId)) {
        return prev.filter(id => id !== typeId);
      } else {
        return [...prev, typeId];
      }
    });
  };

  // const handleSubmitReport = () => {
  //   if (selectedTypes.length === 0) {
  //     return;
  //   }
  //   handleReportPost(selectedTypes, description);
  // };
  // const isOwnPost = useMemo(() => {
  //   return (
  //     postDetail &&
  //     userInfo?.id &&
  //     postDetail.data.data.ownerUser.userId === `${userInfo.id}`
  //   );
  // }, [postDetail, userInfo]);
  //   useEffect(() => {
  //     SplashScreen.hide();
  //   Keyboard.addListener('keyboardDidShow', () => {
  //     keyboardDidShowListener.current = true;
  //   });
  //   return () => {
  //     Keyboard.dismiss();
  //   };
  // }, []);
  // return (
  //   <Text>Keyboard Controller</Text>
  // )
  return (
    // <SafeAreaProvider>
    <View style={styles.root}>
      {/* <CommonHeader title={title} showBack={true} /> */}
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.headerRight}
        onPress={handleMorePress}>
        {/* <Icon source="dots-horizontal" size={24} color="#fff" /> */}
      </TouchableOpacity>

      {/* 菜单操作弹窗 */}
      {/* <Portal>
        <Modal
          onDismiss={handleCloseMenuModal}
          visible={showMenuModal}
          contentContainerStyle={styles.modalContainer}>
          <View style={styles.modalContent}>
            {isOwnPost && (
              <TouchableOpacity
                onPress={handleDeletePress}
                style={styles.menuOptions}
                activeOpacity={1}>
                <Text style={styles.menuOptionText}>删除该帖</Text>
              </TouchableOpacity>
            )}
            {!isOwnPost && (
              <TouchableOpacity
                style={styles.menuOptions}
                onPress={handleReportPress}
                activeOpacity={1}>
                <Text style={styles.menuOptionText}>举报该帖</Text>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      </Portal> */}
      {/* 举报表单弹窗 */}
      {/* <Portal> */}
        <Modal
          visible={showReportFormModal}
          onDismiss={handleCloseReportFormModal}
          contentContainerStyle={{
            flex: 1,
            position: 'absolute',
            right: 0,
            left: 0,
            top: 450,
            // bottom: 0,
            backgroundColor:'yellow'
          }}
          style={{marginBottom: 0}}>
          <KeyboardStickyView style={{flex: 1,
            backgroundColor:'green'}}>
            <TouchableOpacity
              style={styles.modalContainerBottom}
              activeOpacity={1}
              onPress={handleCloseReportFormModal}>
              <TouchableOpacity
                style={styles.reportFormContent}
                activeOpacity={1}
                onPress={undefined}>
                {/* 顶部icon+标题+关闭按钮 */}
                <View style={styles.reportFormHeader}>
                  <View style={styles.reportFormIcon}>
                    {/* <Icon
                      source="alert-circle-outline"
                      size={20}
                      color="#F56C6C"
                    /> */}
                  </View>
                  <Text style={styles.reportFormTitle}>举报内容问题</Text>
                  <TouchableOpacity
                    onPress={handleCloseReportFormModal}
                    style={styles.reportFormClose}>
                    {/* <Icon source="close" size={20} color="#999" /> */}
                  </TouchableOpacity>
                </View>

                {/* 分类选择 */}
                <View style={styles.typeRow}>
                  {/* 左列三个分类 */}
                  <View style={styles.typeColLeft}>
                    {REPORT_TYPES.slice(0, 3).map(type => {
                      const selected = selectedTypes.includes(type.id);
                      return (
                        <TouchableOpacity
                          key={type.id}
                          style={styles.typeButton}
                          onPress={() => handleTypeToggle(type.id)}
                          activeOpacity={1}>
                          <View style={styles.typeCircleWrapper}>
                          </View>
                          <Text
                            style={[
                              styles.typeButtonText,
                              selected && styles.typeButtonTextSelected,
                            ]}>
                            {type.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  {/* 右列两个分类 */}
                  <View style={styles.typeColRight}>
                    {REPORT_TYPES.slice(3).map(type => {
                      const selected = selectedTypes.includes(type.id);
                      return (
                        <TouchableOpacity
                          key={type.id}
                          style={styles.typeButton}
                          onPress={() => handleTypeToggle(type.id)}
                          activeOpacity={1}>
                          <View style={styles.typeCircleWrapper}>
                          </View>
                          <Text
                            style={[
                              styles.typeButtonText,
                              selected && styles.typeButtonTextSelected,
                            ]}>
                            {type.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* 描述输入 */}
                <TextInput
                  style={styles.textInput}
                  placeholder="我有话要说..."
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  maxLength={100}
                  textAlignVertical="top"
                />
                <Text style={styles.charCount}>{description.length}/100</Text>

                {/* 底部按钮 */}
                {/* <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
                  <TouchableOpacity
                    style={[
                      styles.submitButton,
                      selectedTypes.length === 0 && styles.submitButtonDisabled,
                    ]}
                    // onPress={handleSubmitReport}
                    disabled={selectedTypes.length === 0}>
                    <Text style={styles.submitButtonText}>完成</Text>
                  </TouchableOpacity>
                </View> */}
              </TouchableOpacity>
            </TouchableOpacity>
          </KeyboardStickyView>
        </Modal>
      {/* </Portal> */}
      {/* <Toast ref={toastRef} position="center" /> */}
    </View>
    // </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-end',
    backgroundColor: '#00BBD1',
    // height: getStatusBarHeight(),
    position: 'relative',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 6,
    left: 16,
  },
  headerLeftText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: -4,
  },
  headerRight: {
    position: 'absolute',
    bottom: 6,
    right: 16,
    padding: 4,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    width: 180,
    textAlign: 'center',
  },
  // 举报模态框样式
  // Modal 样式
  modalContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 40,
    minWidth: 280,
    alignSelf: 'center',
    borderWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  modalContent: {
    alignItems: 'center',
    // paddingTop: 20,
    borderWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  modalContainerBottom: {
    flex: 1,
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  // 举报表单弹窗样式
  reportFormContent: {
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  reportFormHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E6EB',
    paddingBottom: 10,
  },
  reportFormIcon: {
    marginRight: 8,
  },
  reportFormTitle: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    textAlign: 'left',
  },
  reportFormClose: {
    padding: 4,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  typeButtonSelected: {},
  typeButtonText: {
    fontSize: 12,
    color: '#333333',
  },
  typeButtonTextSelected: {
    // 不改变颜色，保持和未选一致
  },
  textInput: {
    borderWidth: 0,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 60,
    backgroundColor: '#F7F8FA',
    marginBottom: 4,
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginBottom: 12,
  },
  footer: {
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E6EB',
    marginBottom: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#F7F8FA',
    borderColor: '#E5E6EB',
  },
  submitButtonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '600',
  },
  // 菜单样式
  menuContainer: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 80,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  // 弹窗菜单选项样式
  menuOptions: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    minHeight: 24,
    width: '100%',
    alignSelf: 'stretch',
  },
  menuOptionText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  typeCircleWrapper: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeCircle: {
    width: 18,
    height: 18,
  },
  typeCircleSelected: {
    borderColor: '#F56C6C',
    backgroundColor: '#fff',
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
  },
  typeColLeft: {
    flex: 1,
  },
  typeColRight: {
    flex: 1,
    marginLeft: 24,
  },
  toastSuccessContainer: {
    padding: 20,
  },
  toastSuccessIcon: {},
  toastSuccessText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 16,
  },
});

export default PostDetailHeader;
