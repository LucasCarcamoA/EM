import pandas as pd
from openpyxl import load_workbook, Workbook
from flask import Flask, render_template, request
import io
import os


class Excel():
    def __init__(self, file_path):
        self.file_path = file_path
        self.df = pd.read_excel(file_path, engine='openpyxl')
        self.columns = self.df.columns.tolist()
        self.dtypes = self.df.dtypes
        self.head = self.df.head()
        self.info = self.df.info()
        self.describe = self.df.describe()

    def get_columns(self):
        return self.columns

    def get_dtypes(self):
        return self.dtypes
    
    def get_head(self):
        return self.head 
    
    def get_info(self):
        return self.info

    def get_describe(self):
        return self.describe

    def get_df(self):
        return self.df
    def get_file_path(self):
        return self.file_path
