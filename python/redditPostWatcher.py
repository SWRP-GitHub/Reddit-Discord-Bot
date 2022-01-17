import configparser
import time
from encodings import utf_8

import praw
from requests import Session
import discord as d

# Pathing and config loading
path = "praw.ini"
config = configparser.ConfigParser()
config.read(path)


# Build Credential List
# config.get('SECTION_NAME','SECTION_SUB_NAME') will grab the config.ini's values based on Section name and Section SubName.
# sections1 = config.sections()
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
    client_secret=client_secret1,
    refresh_token=refreshToken1,
    user_agent=user_agent1,
)
auth = reddit.auth.scopes()

def word_count(str):
        counts = dict()
        words = str.split()

        for word in words:
            if word in counts:
                counts[word] += 1
            else:
                counts[word] = 1

        return counts
    
def word_count_actual(int):
        counts = dict()
        for i in counts:
            counts[i] += 1
        else:
            counts[i] = 1
            
        return counts



# while {True}:
#     for submission in reddit.subreddit("swrpBotTesting").new(limit=1):
#         print(submission.title)
#         print(submission.id)
#         print(submission.author)
#         print(submission.url)
#         print("-=-=-=-=-=-=-=-=-=-=-=-")
#         time.sleep(2)
for submission in reddit.subreddit("Starwarsrp").new(limit=10):
    t = submission.title
    id = submission.id
    a = str(submission.author)
    url = submission.url
    b = str(submission.selftext)
    rawWc = str(len(b.split()))
    wc = str(len(word_count(b)))
    wcd = str(word_count(b))
    submission.upvote()
    file = open('results.txt','a+')
    file.write('Title: '+ t + '\n')
    file.write('PostID: '+ id + '\n')
    file.write('Author: '+ a + '\n')
    file.write('URL: '+ url + '\n')
    file.write('BodyText: ' + b + '\n')
    file.write('Word Count: '+ rawWc + '\n')
    file.write('unique Word Count: '+ wc + '\n')
    file.write('Word Count Detail: '+ wcd + '\n')
    file.close()
    file2 = open('body.txt','a+')
    file2.write(b)
    file2.close()
    
    
    
        