#! /usr/bin/env python
import json
import os
import sys
import subprocess
import time
import re

# coding=utf-8
seek_api_name = [
    "READ_MEDIA","WRITE_MEDIA",
]

cur_path = os.path.abspath(os.path.dirname(__file__))
re_obj_c = re.compile('[(//)(/*)(*)(*/)]')

#def create_result_files():
#    """创建生成结果目录"""
#    result_path = os.path.join(cur_path, "result")
#    if not os.path.exists(result_path):
#        os.makedirs(result_path)
#    return result_path


def get_list_dirs(path):
    """获取path路径下所有文件夹"""
    list_dirs = []
    for file in os.listdir(path):
        file = os.path.join(path, file) #不加这一行可能导致 os.path.isdir(file) 一直返回false
        print(file)
        print(os.path.isdir(file))
        if os.path.isdir(file) and file != "result":
            list_dirs.append(file)
    return list_dirs



def __find_remove_depend(list_android_depends, list_packages):
    """删除本地包的依赖class"""
    while "" in list_packages:
        list_packages.remove("")

    list_rm_android_depends = []
    for item in list_packages:
        for android_depend in list_android_depends:
            if item in android_depend:
                list_android_depends.remove(android_depend)
                list_rm_android_depends.append(android_depend)
    return list_android_depends, list_rm_android_depends


# def write_to_excel(excel_name, sheet_num, column_name, column_num, data):
#     app = xlwings.App(visible=False, add_book=False)
#     wb = app.books.open(excel_name)
#     st = wb.sheets[sheet_num]
#
#     le = len(st.range("A1").expand("down").rows)
#     print("列表长度： {}".format(le))
#     st.range("{}{}".format(column_name, column_num)).value = data
#
#     wb.save()
#     wb.close()

def find_files(path, dir_name):
    """获取目录下js、ts、ets文件，输出到文件"""
    list_api_name = []
    list_path = []
    list_line_number = []
    for a, b, c in os.walk(path):
        for i in c:
            file_path = os.path.join(a, i)
            for api_name in seek_api_name:
                with open(file_path, encoding="utf-8", errors='ignore') as f:
                    line_number = 0
                    count = 0
                    line_string = ""
                    for line in f.readlines():
                        line = line.strip()  # 删除行首的空格
                        line_number = line_number + 1
                        if api_name.lower() in line.lstrip().lower():
                            if count == 0:
                                list_api_name.append(api_name)
                                list_path.append(file_path)
                                count = count + 1
                            line_string = line_string + str(line_number) + ","
                    if count != 0:
                        list_line_number.append(line_string[0:len(line_string) - 1])

    #将数据写入统计总文件
    with open(cur_path + "/result.txt", mode="a+") as resultFile:
        for index in range(0, len(list_api_name)):
            lib_name = dir_name.split("\\", -1)
            module_name = lib_name[len(lib_name) - 1]
            resultFile.write(module_name)
            resultFile.write("\t")
            resultFile.write(list_api_name[index])
            resultFile.write("\t")
            resultFile.write(list_path[index])
            resultFile.write("\t")
            resultFile.write(str(list_line_number[index]))
            resultFile.write("\n")
        resultFile.close()

if __name__ == '__main__':
    list_dirs = get_list_dirs(cur_path)
    print("list_dirs: {}".format(list_dirs))
    with open(cur_path + "/result.txt", mode="a+") as resultFile:
        resultFile.write("库名称\tapi名字\t存在路径\t所在行数\n")
        resultFile.close()

    for dir_path in list_dirs:
        print("dir_path------start: {}".format(dir_path))
        check_path = os.path.join(cur_path, dir_path)
        find_files(check_path, dir_path)
        print("dir_path------end: {}".format(dir_path))
