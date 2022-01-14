import configparser
import praw
from requests import Session


# Pathing and config loading
path = r"..\config\pyConfig.ini"
config = configparser.ConfigParser()
config.read(path)


# Build Credential List
# config.get('SECTION_NAME','SECTION_SUB_NAME') will grab the config.ini's values based on Section name and Section SubName.
sections1 = config.sections()
client_id1 = config.get("creds", "client_id")
client_secret1 = config.get("creds", "client_secret")
user_agent1 = config.get("creds", "user_agent")
username1 = config.get("creds", "username")
password1 = config.get("creds", "password")
refreshToken1 = config.get("creds", "refreshToken")
accessToken1 = config.get("creds", "accessToken")
redirectURI1 = config.get("creds", "redirectURI")

# Console log the creds to make sure they are working
print("Sections:      ", sections1)
print("ClientID:      " + client_id1)
print("Client_Secret: " + client_secret1)
print("User_Agent:    " + user_agent1)
print("Username:      " + username1)
print("Password:      " + password1)
print("refreshToken:  " + refreshToken1)
print("accessToken:   " + accessToken1)
print("redirectURI1:  " + redirectURI1)




reddit = praw.Reddit(
    client_id=client_id1,
    client_secret=client_secret1,
    refresh_token=refreshToken1,
    user_agent=user_agent1,
)
print(reddit.auth.scopes())
quit()
