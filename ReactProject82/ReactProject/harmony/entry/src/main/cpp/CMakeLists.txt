# Copyright (c) 2024 Huawei Technologies Co., Ltd.
#
# This source code is licensed under the MIT license found in the
# LICENSE-MIT file in the root directory of this source tree.

project(rnapp)
cmake_minimum_required(VERSION 3.4.1)
set(CMAKE_SKIP_BUILD_RPATH TRUE)
set(RNOH_APP_DIR "${CMAKE_CURRENT_SOURCE_DIR}")
set(NODE_MODULES "${CMAKE_CURRENT_SOURCE_DIR}/../../../../../node_modules")
file(REAL_PATH "${NODE_MODULES}" NODE_MODULES)
set(RNOH_CPP_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules/@rnoh/react-native-openharmony/src/main/cpp")
file(REAL_PATH "${RNOH_CPP_DIR}" RNOH_CPP_DIR)
set(RNOH_GENERATED_DIR "${CMAKE_CURRENT_SOURCE_DIR}/generated")
set(LOG_VERBOSITY_LEVEL 1)
set(CMAKE_ASM_FLAGS "-Wno-error=unused-command-line-argument -Qunused-arguments")
set(CMAKE_CXX_FLAGS "-fstack-protector-strong -Wl,-z,relro,-z,now,-z,noexecstack -fPIE -pie")
set(WITH_HITRACE_SYSTRACE 1) # for other CMakeLists.txt files to use
set(OH_MODULES "${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules")
add_compile_definitions(WITH_HITRACE_SYSTRACE)

add_subdirectory("${RNOH_CPP_DIR}" ./rn)

# RNOH_BEGIN: manual_package_linking_1
add_subdirectory("${CMAKE_CURRENT_SOURCE_DIR}/rnc" ./fabric_component)
add_subdirectory("${OH_MODULES}/@react-native-ohos/react-native-gesture-handler/src/main/cpp" ./gesture-handler)
add_subdirectory("${OH_MODULES}/@react-native-ohos/react-native-worklets/src/main/cpp" ./worklets)
add_subdirectory("${OH_MODULES}/@react-native-ohos/react-native-reanimated/src/main/cpp" ./reanimated)
add_subdirectory("${OH_MODULES}/@react-native-ohos/react-native-spring-scrollview/src/main/cpp" ./spring_scrollview)
add_subdirectory("${OH_MODULES}/@react-native-ohos/react-native-svg/src/main/cpp" ./svg)
# Release 构建默认不带 -g，crash 反解时 addr2line 只能输出 ??:0；
# 给 svg 补上 DWARF 行号信息（只影响 rnoh_svg 一个目标，不污染其他库）。
# 如只想要行号、进一步减小体积，可改为 -gline-tables-only
target_compile_options(rnoh_svg PRIVATE -g)
target_link_options(rnoh_svg PRIVATE -g) # LTO 场景下确保链接输出保留 debug info
add_subdirectory("${OH_MODULES}/@react-native-ohos/react-native-safe-area-context/src/main/cpp" ./safe-area)
add_subdirectory("${OH_MODULES}/@react-native-ohos/react-native-pager-view/src/main/cpp" ./pager_view)
add_subdirectory("${OH_MODULES}/@react-native-ohos/flash-list/src/main/cpp" ./flash-list)
# RNOH_END: manual_package_linking_1

file(GLOB GENERATED_CPP_FILES "./generated/*.cpp")

add_library(rnoh_app SHARED
    ${GENERATED_CPP_FILES}
    "./PackageProvider.cpp"
    "${RNOH_CPP_DIR}/RNOHAppNapiBridge.cpp"
)

target_link_libraries(rnoh_app PUBLIC rnoh)

# RNOH_BEGIN: manual_package_linking_2
target_link_libraries(rnoh_app PUBLIC fabric_component)
target_link_libraries(rnoh_app PUBLIC rnoh_gesture_handler)
target_link_libraries(rnoh_app PUBLIC rnoh_worklets)
target_link_libraries(rnoh_app PUBLIC rnoh_reanimated)
target_link_libraries(rnoh_app PUBLIC rnoh_spring_scrollview)
target_link_libraries(rnoh_app PUBLIC rnoh_svg)
target_link_libraries(rnoh_app PUBLIC rnoh_safe_area)
target_link_libraries(rnoh_app PUBLIC rnoh_pager_view)
target_link_libraries(rnoh_app PUBLIC rnoh_flash_list)
# RNOH_END: manual_package_linking_2
