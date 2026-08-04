/**
 * MIT License
 *
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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

#ifndef HARMONY_SPRINGSCROLLVIEWEXAMPLEEVENT_H
#define HARMONY_SPRINGSCROLLVIEWEXAMPLEEVENT_H
#include <EventBus/Event.h>
#include <arkui/native_type.h>
#include <string>
#include "Types.h"

class SpringScrollViewEvent : public EventBus::Event {
public:
    explicit SpringScrollViewEvent(double id) : id(id) {}
    virtual ~SpringScrollViewEvent() = default;
    const std::type_info &getType() override { return typeid(SpringScrollViewEvent); }
    void setAnimationValue(double animationValue_) { this->animationValue = animationValue_; }
    double getAnimationValue() const { return this->animationValue; }
    void setEventType(std::string eventType_) { this->eventType = eventType_; }
    std::string getEventType() const { return this->eventType; }
    void setMessageType(std::string messageType_) { this->messageType = messageType_; }
    std::string getMessageType() const { return this->messageType; }
    void setNodeHandle(ArkUI_NodeHandle nodeHandle) { this->nodeHandle = nodeHandle; }
    ArkUI_NodeHandle getNodeHandle() const { return this->nodeHandle; }
    void setEventSpringScrollViewNodeDelegate(void *eventSpringScrollViewNodeDelegate)
    {
        this->m_eventSpringScrollViewNodeDelegate = eventSpringScrollViewNodeDelegate;
    }
    void *getEventSpringScrollViewNodeDelegate() const { return this->m_eventSpringScrollViewNodeDelegate; }
    void setRefreshStatus(std::string refreshStatus_) { this->refreshStatus = refreshStatus_; }
    std::string getRefreshStatus() const { return this->refreshStatus; }
    void setLoadingStatus(std::string loadingStatus_) { this->loadingStatus = loadingStatus_; }
    std::string getLoadingStatus() const { return this->loadingStatus; }
    void setEventContentOffset(Types::Offset eventContentOffset_) { this->eventContentOffset = eventContentOffset_; }
    Types::Offset getEventContentOffset() const { return this->eventContentOffset; }
    void setEventBounces(bool eventBounces_) { this->eventBounces = eventBounces_; }
    bool getEventBounces() const { return this->eventBounces; }
    void setEventContentSize(Types::Size eventContentSize_) { this->eventContentSize = eventContentSize_; }
    void setEventSize(Types::Size eventSize_) { this->eventSize = eventSize_; }
    Types::Size getEventContentSize() { return this->eventContentSize; }
    Types::Size getEventSize() { return this->eventSize; }
    void setEventLastPoint(Types::Point eventLastPoint_) { this->eventLastPoint = eventLastPoint_; }
    Types::Point getEventLastPoint() { return this->eventLastPoint; }
    void setEventBeginPoint(Types::Point eventBeginPoint_) { this->eventBeginPoint = eventBeginPoint_; }
    Types::Point getEventBeginPoint() { return this->eventBeginPoint; }
    void setEventContentInsets(Types::EdgeInsets eventContentInsets_)
    {
        this->eventContentInsets = eventContentInsets_;
    }
    Types::EdgeInsets getEventContentInsets() { return this->eventContentInsets; }
    void setEventMomentumScrolling(bool eventMomentumScrolling_)
    {
        this->eventMomentumScrolling = eventMomentumScrolling_;
    }
    bool getEventMomentumScrolling() { return this->eventMomentumScrolling; }
    void setEventRecordSwipeY(float eventRecordSwipeY_)
    {
        this->eventRecordSwipeY = eventRecordSwipeY_;
    }
    float getEventRecordSwipeY() { return this->eventRecordSwipeY; }
    void setEventInitialVelocity(float eventInitialVelocity_) { this->eventInitialVelocity = eventInitialVelocity_; }
    float getEventInitialVelocity() { return this->eventInitialVelocity; }
    void setEventDampingCoefficient(float eventDampingCoefficient_)
    {
        this->eventDampingCoefficient = eventDampingCoefficient_;
    }
    float getEventDampingCoefficient() { return this->eventDampingCoefficient; }
    void setCurrentPlayTime(std::string currentPlayTime_) { this->currentPlayTime = currentPlayTime_; }
    std::string getCurrentPlayTime()  { return this->currentPlayTime; }
    void setEventDirections(bool directions) { this->eventDirections = directions; }
    bool getEventDirections()  { return this->eventDirections; }
    void setEventIsOnloading(bool eventIsOnloading_) { this->eventIsOnloading = eventIsOnloading_; }
    bool getEventIsOnloading() const { return this->eventIsOnloading; }
protected:
    double animationValue;
    std::string eventType;
    std::string messageType;
    std::string refreshStatus;
    std::string loadingStatus;
    ArkUI_NodeHandle nodeHandle;
    void *m_eventSpringScrollViewNodeDelegate;
    Types::Offset eventContentOffset;
    bool eventBounces;
    Types::Size eventContentSize;
    Types::Size eventSize;
    Types::Point eventLastPoint;
    Types::Point eventBeginPoint;
    Types::EdgeInsets eventContentInsets;
    bool eventMomentumScrolling;
    float eventRecordSwipeY;
    float eventInitialVelocity;
    float eventDampingCoefficient;
    std::string currentPlayTime;
    bool eventDirections;
    int id;
    bool eventIsOnloading;
};
#endif // HARMONY_EXAMPLEEVENT_H