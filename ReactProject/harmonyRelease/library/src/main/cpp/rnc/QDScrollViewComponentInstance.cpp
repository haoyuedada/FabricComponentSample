/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

#pragma once

#include "QDScrollViewComponentInstance.h"
#include <react/renderer/components/scrollview/ScrollViewShadowNode.h>
#include <react/renderer/components/scrollview/ScrollViewState.h>
#include <react/renderer/core/ConcreteState.h>

namespace rnoh {

QDScrollViewComponentInstance::QDScrollViewComponentInstance(Context context) : Super(std::move(context)) {
  m_scrollNode.insertChild(m_scrollContainerNode);
  m_scrollNode.setAlignment(ARKUI_ALIGNMENT_TOP_START);
  m_scrollNode.setScrollNodeDelegate(this);
  m_scrollNode.setNestedScroll(ARKUI_SCROLL_NESTED_MODE_SELF_FIRST);
}


ScrollNode &QDScrollViewComponentInstance::getLocalRootArkUINode() { return m_scrollNode; }

void QDScrollViewComponentInstance::onPropsChanged(SharedConcreteProps const &props){
  if (props->stopPercent) {
    m_stopPercent = props->stopPercent;
  }
  if (props->stopPercentMax) {
    m_stopPercentMax = props->stopPercentMax;
  }
  LOG(INFO) << "CHY onPropsChanged props->stopPercent->testObj1['id'']:" << props->testObj1["id"];
  LOG(INFO) << "CHY onPropsChanged props->stopPercent->testObj2:" << props->testObj2;  
  LOG(INFO) << "CHY onPropsChanged props->stopPercent->menuItems[0]:" << props->menuItems[0];
  LOG(INFO) << "CHY onPropsChanged props->stopPercent->contentInset:" << props->contentInset;
};

void QDScrollViewComponentInstance::onChildInserted(ComponentInstance::Shared const &childComponentInstance,
                                                      std::size_t index) {
  CppComponentInstance::onChildInserted(childComponentInstance, index);
  m_scrollContainerNode.insertChild(childComponentInstance->getLocalRootArkUINode(), index);
}

void QDScrollViewComponentInstance::onChildRemoved(ComponentInstance::Shared const &childComponentInstance) {
  CppComponentInstance::onChildRemoved(childComponentInstance);
  m_scrollContainerNode.removeChild(childComponentInstance->getLocalRootArkUINode());
}

void QDScrollViewComponentInstance::setLayout(
    facebook::react::LayoutMetrics layoutMetrics) {
//  getLocalRootArkUINode().setSize(layoutMetrics.frame.size);
//  m_scrollNode.setSize(layoutMetrics.frame.size);
//  m_layoutMetrics = layoutMetrics;
//  if (m_containerSize != layoutMetrics.frame.size) {
//    m_containerSize = layoutMetrics.frame.size;
//  }
//  if (m_layoutMetrics.layoutDirection != layoutMetrics.layoutDirection) {
//    m_scrollNode.setDirection(
//        convertLayoutDirection(layoutMetrics.layoutDirection));
//  }
//  markBoundingBoxAsDirty();
}

void QDScrollViewComponentInstance::onScroll() {
}

void QDScrollViewComponentInstance::onScrollStop() {

}

facebook::react::ScrollViewMetrics
QDScrollViewComponentInstance::getScrollViewMetrics() {
  auto scrollViewMetrics = facebook::react::ScrollViewMetrics();
  scrollViewMetrics.responderIgnoreScroll = true;
  scrollViewMetrics.zoomScale = 1;
  scrollViewMetrics.contentSize = m_contentSize;
  scrollViewMetrics.contentOffset = getScrollOffset();
  scrollViewMetrics.containerSize = m_containerSize;
  return scrollViewMetrics;
}

facebook::react::Float QDScrollViewComponentInstance::adjustOffsetToRTL(
    facebook::react::Float x) const {
  auto isRTL = m_layoutMetrics.layoutDirection ==
      facebook::react::LayoutDirection::RightToLeft;
  if (isRTL) {
    x = m_contentSize.width - m_containerSize.width - x;
  }
  return x;
}

void QDScrollViewComponentInstance::onScrollToCommand(float offsetY, bool animated) {
  m_scrollNode.scrollTo(0, offsetY, animated);
}

facebook::react::Point QDScrollViewComponentInstance::getScrollOffset() const {
  auto scrollOffset = m_scrollNode.getScrollOffset();
  scrollOffset.x = adjustOffsetToRTL(scrollOffset.x);
  return scrollOffset;
}
} // namespace rnoh
