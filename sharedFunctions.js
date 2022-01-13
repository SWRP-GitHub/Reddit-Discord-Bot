const {
    RedditContent,
    Listing
} = require('snoowrap');
const snoowrap = require('snoowrap'); //Reddit lib
const config = require('./config/config.json'); //Config lib
const defaultConfig = config.creds; //Config
const fs = require('fs');
const command = require('nodemon/lib/config/command');
const {
    title
} = require('process');

//SnooWrap request with OAuth credentials
const r = new snoowrap({
    userAgent: defaultConfig.userAgent,
    clientId: defaultConfig.clientId,
    clientSecret: defaultConfig.clientSecret,
    refreshToken: defaultConfig.refreshToken,
    accessToken: defaultConfig.accessToken
});
//////////////////////////////////FUNCTIONS/////////////////////////////////////////

//Get Hot Posts from SWRP
async function getHotPosts(input) {
    if (input === "content") {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(r.getHot('StarwarsRP').map(RedditContent => RedditContent.id)))
        })
        let result = await promise
        return Promise.resolve(result)
    }
    if (input === "title") {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(r.getHot('Starwarsrp').map(RedditContent => RedditContent.title)))
        })
        let result = await promise
        return Promise.resolve(result)
    }
};

//Get Post Data
// Needs: 
//  - the segment of the post you want (Body | Title)
//  - the postID (found in the posts URL)
async function getPostData(segment, postID) {
    let promise = new Promise((resolve, reject) => {
        if (segment == 'Body') {
            setTimeout(() => resolve(r.getSubmission(postID).selftext), 100)
        }
        if (segment == 'Title') {
            setTimeout(() => resolve(r.getSubmission(postID).title), 100)
        }
        if (segment == 'postID') {
            setTimeout(() => resolve(r.getSubmission(postID).postID), 100)
        }
        if (segment == 'URL') {
            setTimeout(() => resolve(r.getSubmission(postID).url), 100)
        }
        if (segment == "Author") {
            setTimeout(() => resolve(r.getSubmission(postID).author), 100)
        }
        if (segment == "AuthorIcon") {
            setTimeout(() => resolve(r.getSubmission(postID).author.icon_img), 100)
        }
        if (segment == "PostTitle") {
            setTimeout(() => resolve(r.getSubmission(postID).title), 100)
        }
    });
    let result = await promise;
    return result;
};


////gets the new posts
async function getNewPosts(type) {
    if (type === 'postID') {
        let promise = r.getNew('Starwarsrp').map(RedditContent => RedditContent.id)
        let result = await promise
        return result
    }
    if (type === 'title') {
        let promise = r.getNew('Starwarsrp').map(RedditContent => RedditContent.title)
        let result = await promise;
        return result
    }
    if (type === 'url') {
        let promise = r.getNew('Starwarsrp').map(RedditContent => RedditContent.url)
        let result = await promise;
        return result
    }
}



//////Get lists of things and content
//////You can basically just construct a list of things here and then for loop it to map the data accordingly in a discord post.
async function getNewPostsV2(subred, segment) {
    if (segment === 'title') {
        let promisePostTitles = r.getNew(subred, {
            limit: 3
        }).map(RedditContent => RedditContent.title)
        let result = await promisePostTitles;
        return result
    }
    if (segment === 'author') {
        let promisePostAuthors = r.getNew(subred, {
            limit: 3
        }).map(RedditContent => RedditContent.author.name)
        let result = await promisePostAuthors;
        return result
    }
    if (segment === 'postid') {
        let promisePostID = r.getNew(subred, {
            limit: 3
        }).map(RedditContent => RedditContent.id)
        let result = await promisePostID
        return result
    }
    if (segment === 'url') {
        let promisePostURL = r.getNew(subred, {
            limit: 3
        }).map(RedditContent => RedditContent.url)
        let result = await promisePostURL
        return result
    }
    if (segment === 'authicon') {
        let promiseAuthIcon = r.getNew(subred, {
            limit: 3
        }).map(RedditContent => RedditContent.author.icon_img)
        let result = await promiseAuthIcon
        return result
    }
    if (segment === 'body') {
        let promiseAuthIcon = r.getNew(subred, {
            limit: 3
        }).map(RedditContent => RedditContent.body)
        let result = await promiseAuthIcon
        return result
    }
}


async function getRecentComments(subreddit, setting, limit) {
    if (setting === "id") {
        let promiseComments = r.getNewComments(subreddit, {
            limit: limit
        }).map(RedditContent => RedditContent.id);
        let result = await promiseComments
        return result
    }
    if (setting === "author") {
        let id = subreddit
        let promiseComments = r.getComment(id).author.name;
        let result = await promiseComments
        return result
    }
    if (setting === "body") {
        let id = subreddit
        let promiseComments = r.getComment(id).body;
        let result = await promiseComments
        return result
    }
    if (setting === "sub") {
        let id = subreddit
        let promiseComments = r.getComment(id).subreddit.display_name;
        let result = await promiseComments
        return result
    }
    if (setting === "icon") {
        let id = subreddit
        let promiseComments = r.getComment(id).author.icon_img;
        let result = await promiseComments
        return result
    }
    if (setting === "parent") {
        let id = subreddit
        let promiseComments = r.getComment(id).link_id;
        let result = await promiseComments
        return result.slice(3, 100)
    }

}

module.exports = {
    getHotPosts,
    getPostData,
    getNewPosts,
    getNewPostsV2,
    getRecentComments
};