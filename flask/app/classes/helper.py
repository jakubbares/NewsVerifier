import sys
from datetime import datetime
import re

def flatten(list_of_lists):
    return [item for sublist in list_of_lists for item in sublist]

def now_as_sql_string():
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return "CONVERT('" + now + "', DATETIME)"

def now_as_string():
    now = datetime.now().strftime("%Y-%m-%d-%H.%M")
    return now

def print_dictionary(dict):
    for key, value in dict.items():
        print(key, ' : ', value)

def argument_parser():
    arguments = {}
    passed_arguments = sys.argv[1:]
    for index, arg in enumerate(passed_arguments):
        if index < len(passed_arguments) - 1:
            a, b = arg, passed_arguments[index]
        else:
            a, b = arg, None
        if a.startswith('--') and '=' in a:
            key, val = a.split('=')
            key = key.replace('--', '')
        arguments[key] = val
    return arguments


def round_number(number, decimals):
    multiplier = 10 ** decimals
    if number in [float("inf"), float("-inf")]:
        return number
    return round(number * multiplier) / multiplier


def error_message(ex):
    template = "An exception of type {0} occurred. Arguments:\n{1!r}"
    message = template.format(type(ex).__name__, ex.args)
    return message

def error_type(ex):
    return type(ex).__name__

def escape_apostrophe(text):
    return text.replace("'", "''")


def underscore_tag(n_gram):
    return n_gram.lstrip(" ").replace(" ", "_")


def separate_words_in_tag(n_gram):
    return n_gram.lstrip("_").replace("_", " ")


def string(value):
    return "'" + str(value) + "'" if value else 'NULL'

def convert_to_type(value, type):
    if type in (float, int):
        if value == float('nan'):
            return 0
    return type(value)


def group_by(array, key, field):
    map = {}
    for item in array:
        map[item[key]] = []
    for item in array:
        map[item[key]].append(item[field])
    return map

def replace_non_latin_tokens_in_text(text):
    subbed =  re.sub(r'[^a-zA-Z\s]', ' ', text)
    clean = remove_spaces(subbed)
    return clean

def remove_spaces(text):
    splited = [word for word in text.split(' ') if len(word) >= 1]
    return ' '.join(splited)


def indexes_of(array, item):
    return [index for index, x in enumerate(array) if x == item]

# if pandas stores list as string, eval applies; otherwise eval would throw an error - but OK,
# in such case we just keep the original list
def robust_eval(x):
    try:
        result = eval(x)
    except:
        result = x
    return result


def flatten(list_of_lists):
    return [item for sublist in list_of_lists for item in sublist]


