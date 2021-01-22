import numpy as np
from app.classes.logger import Logger

class DataFramePrinter:
    def __init__(self, df, columns):
        self.print_map = {}
        self.df = df
        self.columns = columns
        self.header = columns.pop(0)

    def run_and_print(self):
        self.create_print_dictionary()
        self.print_dictionary()

    def create_print_dictionary(self):
        for _ind, row in self.df.iterrows():
            data = {column: row[column] for column in self.columns}
            self.print_map[row[self.header]] = data

    def print_dictionary(self):
        for header, column_dict  in self.print_map.items():
            print(header)
            for column, data in column_dict.items():
                print(column)
                print(data)

