# MSSQL
mssql_db_username = 'fullreport' #API11Hacks
mssql_db_password = 'Football11Hacks#'   #Football11HacksAPI#
mssql_db_name = 'fullreport'
mssql_db_hostname = 'fullreportserver.database.windows.net,1433'

DEBUG = True
PORT = 3000
HOST = "0.0.0.0"
SQLALCHEMY_ECHO = True
SQLALCHEMY_TRACK_MODIFICATIONS = True
SECRET_KEY = "SOME SECRET"


SQLALCHEMY_DATABASE_URI = "mssql+pyodbc://{DB_USER}:{DB_PASS}@{DB_ADDR}:1433/{DB_NAME}?driver=ODBC+Driver+17+for+SQL+Server".format(DB_USER=mssql_db_username,
                                                                                        DB_PASS=mssql_db_password,
                                                                                        DB_ADDR=mssql_db_hostname,
                                                                                        DB_NAME=mssql_db_name)
