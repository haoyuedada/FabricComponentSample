/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

#pragma once

#include <react/renderer/components/scrollview/ScrollViewEventEmitter.h>
#include <react/renderer/components/scrollview/ScrollViewShadowNode.h>
#include "RNOH/arkui/StackNode.h"
#include "RNOH/arkui/ScrollNode.h"
#include "RNOH/arkui/ColumnNode.h"
#include "RNOH/generated/components/BaseQDScrollViewComponentInstance.h"

namespace rnoh {
class QDScrollViewComponentInstance : public BaseQDScrollViewComponentInstance, ScrollNodeDelegate {
  using Super = BaseQDScrollViewComponentInstance;

private:
  // 根容器
  StackNode m_scrollContainerNode;
  // scroll 组件
  ScrollNode m_scrollNode;
  
  // 组件宽高
  float m_width;
  float m_height;
  bool m_isInit = false;
  // 停止百分比、吸顶百分比
  float m_stopPercent = 0.75f;
  float m_stopPercentMax = 0.85f;
  facebook::react::Size m_containerSize;
  facebook::react::Size m_contentSize;
  facebook::react::Point getScrollOffset() const;
      facebook::react::Float adjustOffsetToRTL(facebook::react::Float x) const;
public:
  QDScrollViewComponentInstance(Context context);

  ScrollNode &getLocalRootArkUINode();
    
  facebook::react::ScrollViewMetrics getScrollViewMetrics();

  void onPropsChanged(SharedConcreteProps const &props);

  void onChildInserted(ComponentInstance::Shared const &childComponentInstance, std::size_t index) override;
  void onChildRemoved(ComponentInstance::Shared const &childComponentInstance) override;
    
  void onScroll() override;
  void onScrollStop() override;
  void onScrollToCommand(float offsetY, bool animated) override;
    
  void setLayout(facebook::react::LayoutMetrics layoutMetrics) override;

};
} // namespace rnoh