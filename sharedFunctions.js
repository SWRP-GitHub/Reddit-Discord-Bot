const { RedditContent } = require('snoowrap');
const snoowrap = require('snoowrap'); //Reddit lib
const config = require('./config/config.json'); //Config lib
const defaultConfig = config.creds; //Config

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
  async function getHotPosts(){
    let promise = new Promise((resolve,reject)=>{
        setTimeout(()=>resolve(r.getHot('StarwarsRP').map(RedditContent => RedditContent.id)))
    })
    let result = await promise
    return Promise.resolve(result)
  };

//Get Post Data
// Needs: 
//  - the segment of the post you want (Body | Title)
//  - the postID (found in the posts URL)
async function getPostData(segment, postID){
    let promise = new Promise((resolve, reject) => {
        if(segment == 'Body'){
            setTimeout(() => resolve(r.getSubmission(postID).selftext) , 1500)
        }
        if(segment == 'Title'){
            setTimeout(() => resolve(r.getSubmission(postID).title) , 1500)
        }
        if(segment == 'postID'){
            setTimeout(()=> resolve(r.getSubmission(postID).postID), 1500)
        }
        if(segment == 'URL'){
            setTimeout(()=> resolve(r.getSubmission(postID).url), 1500)
        }
        if(segment == "Author"){
            setTimeout(()=> resolve(r.getSubmission(postID).author), 1500)
        }
        if(segment == "AuthorIcon"){
            setTimeout(()=> resolve(r.getSubmission(postID).author.icon_img), 1500)
        }
    });
    let result = await promise;
    return result;
};


//Exports functions
  module.exports = {getHotPosts,getPostData};