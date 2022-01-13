import configparser
import praw
import pandas as pd 
import datetime as dt 
import datetime 
from datetime import timezone
import re 
import sys 


# Pathing and config loading
path = r"..\config\pyConfig.ini"
config = configparser.ConfigParser()
config.read(path)


# Build Credential List
# config.get('SECTION_NAME','SECTION_SUB_NAME') will grab the config.ini's values based on Section name and Section SubName.
sections = config.sections()
client_id = config.get("creds", "client_id")
client_secret = config.get("creds", "client_secret")
user_agent = config.get("creds", "user_agent")
username = config.get("creds", "username")
password = config.get("creds", "password")

# Console log the creds to make sure they are working
print("Sections:      " , sections)
print("ClientID:      " + client_id)
print("Client_Secret: " + client_secret)
print("User_Agent:    " + user_agent)
print("Username:      " + username)
print("Password:      " + password)


#
reddit = praw.Reddit(
    client_id=client_id,\
        client_secret=client_secret,\
            user_agent=user_agent,\
                username=username,\
                    password=password)
 

quit()
