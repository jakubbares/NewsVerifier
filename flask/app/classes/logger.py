import logging
from logging.handlers import RotatingFileHandler
from app.classes.helper import now_as_string

class Logger:
    def __init__(self, name=""):
        # instantiate logger
        logging.basicConfig(level=logging.ERROR)
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)

        # create a file handler
        file_path = f"logs/{name}-{now_as_string()}.log"
        text_file = open(file_path, "w")
        self.handler = RotatingFileHandler(file_path, maxBytes=10000000, backupCount=5)
        self.handler.setLevel(logging.INFO)

        # create a logging format
        self.formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        self.handler.setFormatter(self.formatter)

        # add the handlers to the logger
        self.logger.addHandler(self.handler)
        self.logger.info("Logger ready to be used")
