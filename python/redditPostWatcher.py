import configparser
from encodings import utf_8
import praw
from requests import Session
import time


# Pathing and config loading
path = "praw.ini"
config = configparser.ConfigParser()
config.read(path)


# Build Credential List
# config.get('SECTION_NAME','SECTION_SUB_NAME') will grab the config.ini's values based on Section name and Section SubName.
#sections1 = config.sections()
clientID = config.get("creds", "client_id")
client_secret1 = config.get("creds", "client_secret")
user_agent1 = config.get("creds", "user_agent")
username1 = config.get("creds", "username")
password1 = config.get("creds", "password")
refreshToken1 = config.get("creds", "refreshToken")
accessToken1 = config.get("creds", "accessToken")
redirectURI1 = config.get("creds", "redirectURI")

reddit = praw.Reddit(
    client_id=clientID,
    client_secret =client_secret1,
    refresh_token = refreshToken1,
    user_agent = user_agent1,
)
auth = reddit.auth.scopes()
while {True}:
    for submission in reddit.subreddit('swrpBotTesting').new(limit=1):
        print(submission.title)
        print(submission.id)
        print(submission.author)
        print(submission.url)
        print('-=-=-=-=-=-=-=-=-=-=-=-')
        time.sleep(2)
        
