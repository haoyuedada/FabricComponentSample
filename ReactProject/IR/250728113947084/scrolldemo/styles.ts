import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  p12: {
    padding: 12,
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  momentsWrapper: {
    height: 78,
    // paddingTop: 16,
  },
  momentScrollView: {
    height: 62,
    paddingTop: 16,
    paddingBottom: 16,
  },
  momentItemWrapper: {
    width: 124,
    height: 62,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  momentItemTitleWrapper: {
    gap: 4,
    flexDirection: 'row',
  },
  collectImage: {
    width: 16,
    height: 16,
  },
  heatCountWrapper: {
    gap: 4,
    marginTop: 8,
    flexDirection: 'row',
  },
  momentItemContent: {
    padding: 12,
    position: 'relative',
  },
  notificationImage: {
    top: -6,
    right: -2,
    width: 14,
    zIndex: 1,
    height: 16,
    position: 'absolute',
  },
  heatImage: {
    height: 14,
    width: 12.5,
  },
  heatCount: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 14,
    fontWeight: 500,
    alignItems: 'center',
  },
  articleCategory: {
    gap: 16,
    height: 46,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  articleCategoryText: {
    fontSize: 14,
    color: '#999',
    lineHeight: 46,
  },
  articleCategoryTextActive: {
    color: '#333',
    fontWeight: 500,
  },
  momentItemTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 500,
    lineHeight: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999999',
    marginTop: 32,
  },
  postImage: {
    right: 6,
    width: 64,
    height: 64,
    bottom: 50,
    position: 'absolute',
  },
  shareModal: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  shareModalWrapper: {
    paddingTop: 16,
    backgroundColor: '#f5f5f5',
  },
  modalTitle: {
    fontSize: 16,
    width: '100%',
    color: '#999',
    fontWeight: 500,
    marginBottom: 16,
    textAlign: 'center',
  },
  shareModalContent: {
    marginBottom: 16,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },
  iconWrapper: {
    alignItems: 'center',
  },
  shareIcon: {
    width: 64,
    height: 64,
    marginBottom: 8,
  },
  shareModalBtn: {
    height: 50,
    borderRadius: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
    paddingVertical: 8,
    textAlign: 'center',
  },
});
export default styles;
