AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});


// Function to copy E-mail Address anchor tag value from 'Contact' section to a user's clipboard when the e-mail address is clicked
// Bootstrap tooltip title is also updated from "Click to copy" to "Copied [e-mail] to clipboard!"
function clickToCopyEmail(){
  var emailElement = document.getElementById("emailAddress");

  // Copy <a></a> e-mail address text value to user's clipboard
  emailText = emailElement.textContent;
  navigator.clipboard.writeText(emailText).then(() => {
      // Update Bootstrap tooltip to notify user the e-mail address was copied to their clipboard
      emailElement.setAttribute("data-bs-original-title", "Copied "+emailText+" to clipboard!");
      var tooltip = bootstrap.Tooltip.getInstance(emailElement);
      tooltip.show();
    })
    .catch(() => {
      console.log(`Error copying ${emailText} to clipboard`);
    });
  
}

// Function to collapse the NavBar menu when a link is clicked on smaller screen resolutions
function collapseNavBar(){
  const menuToggle = document.getElementById('navbarNav');
  const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false});
  const navImage = document.getElementById('navImage');

  // Determine if navImage is visible (NavMenu not collapsable)
  // If NavMenu is collapsed with Image shown, large screen resolution navbar flickers when a link is clicked
  if(!navImage.offsetParent){
    // If navImage is not visible, collapse menu
    bsCollapse.toggle();
  }
}

// Function to hide all MyNotes sections (Ex: Sorting Algorithms, DataStructures...) and show the section corresponding to the active button
function collapseNotesCard(notesID){
  const notesObjs = document.getElementsByClassName('notes-base');

  for (let i = 0; i < notesObjs.length; i++){
    let noteToggle = document.getElementById(notesObjs[i].id);
    let bsCollapse = new bootstrap.Collapse(noteToggle, {toggle: false});

    if(notesObjs[i].id != notesID){
      bsCollapse.hide();
    }
    else{
      // Do nothing 
    }
  }
}

// Function to trunate a passed string to the passed maximum length
// If the string length is greater than the max length, replace the last character with "..."
function truncateString(string, maxLength){
  return (string.length > maxLength) ? string.slice(0, maxLength-1) + "..." : string;
}

// Function to add the active class to the clicked li element and remove the active class from any other li elements 
// then function call to update main twitch profile
function makeTwitchElementActive(clickedElement, type){
  let liElements = document.getElementsByClassName("consolidateTwitchListItem");

  //find which element(s) have active class, remove active class
  for(let i = 0; i < liElements.length; i++){
    let classList = liElements[i].className.split(" ");
    activeIndex = classList.indexOf("active");

    if(activeIndex > -1){
      classList.splice(activeIndex, 1);
    }

    liElements[i].className = classList.join(" ")
  }

  //add active class to clicked element
  clickedElement.className += " active"

  updateMainTwitchProfile(clickedElement, type);
}


// Function to update the main twitch profile element that displays more in-depth information then call function to update the twitch player
// to reflect the profile change
function updateMainTwitchProfile(clickedElement, type){
  let profileImage = document.getElementById("consolidateTwitchLiveProfilePicture");
  let liveTimer = document.getElementById("twitchTimer"); 
  let viewerCount = document.getElementById("twitchViewerCount");
  let streamerName = document.getElementById("consolidateTwitchLiveProfileName");
  let streamGame = document.getElementById("consolidateTwitchLiveStreamGame");
  let streamTitle = document.getElementById("consolidateTwitchLiveStreamTitle");

  if(type == 'default'){
    profileImage.setAttribute("src", clickedElement.children[0].children[0].src);
    viewerCount.textContent = "-";
    streamerName.textContent = clickedElement.children[1].children[0].textContent;
    streamTitle.textContent = clickedElement.children[1].children[1].textContent;
  }
  else if(type == 'generated'){
    let twitchFollowedChannels = JSON.parse(localStorage.getItem("twitchFollowedChannels"));
    let channelName = clickedElement.getAttribute("id");
    let followedChannel = twitchFollowedChannels.find(channel => channel.userName === channelName);

    profileImage.setAttribute("src", followedChannel.userProfilePicture);
    viewerCount.textContent = followedChannel.streamViewerCount;
    streamerName.textContent = followedChannel.userName;
    streamGame.textContent = followedChannel.gameName;
    streamTitle.textContent = followedChannel.streamTitle;

  }

  changeTwitchPlayer();
}

// Function to update the twitch player settings to the current main twitch profile channel
function changeTwitchPlayer(){
  let playerChannelName = document.querySelector("#consolidateTwitchLiveProfileName");

  player.setChannel(playerChannelName.textContent.trim());
  player.setVolume(1);
}

// Function to create a list item inside the consolidateTwitchLiveChannelsList list that consists of multiple elements for each channel the authenticated twitch user follows
function createTwitchFollowedChannelElements(){
  let twitchFollowedChannels = JSON.parse(localStorage.getItem("twitchFollowedChannels"));
  let parentList = document.getElementById("consolidateTwitchLiveChannelsList");
  let count = 0;

  // Remove all listed followed channels before populating new list
  while(parentList.firstChild){
    parentList.removeChild(parentList.firstChild);
  }

  for(const followedChannel of twitchFollowedChannels){
    var listItem = document.createElement("li");
    listItem.setAttribute("id", followedChannel.userName);
    listItem.setAttribute("class", "consolidateTwitchListItem");
    listItem.setAttribute("onclick", "makeTwitchElementActive(this, 'generated')");

    // Create Elements for the profile image
    var profileImageDiv = document.createElement("div");
    var profileImage = document.createElement("img");
    profileImage.setAttribute("id","consolidateTwitchLiveProfilePictureList");
    profileImage.setAttribute("src", followedChannel.userProfilePicture);
    // Append elements to div wrapper
    profileImageDiv.appendChild(profileImage);

    // Create Elements for the Channel name and game being played
    var textDescriptionDiv = document.createElement("div");
    textDescriptionDiv.setAttribute("class", "consolidateTwitchListText");
    var channelName = document.createElement("h6");
    channelName.setAttribute("id", "consolidateTwitchLiveProfileName");
    channelName.textContent = followedChannel.userName;
    var gamePlayed = document.createElement("span");
    gamePlayed.setAttribute("id", "consolidateTwitchLiveGame");
    gamePlayed.textContent = followedChannel.gameName;
    // Append elements to Div wrapper
    textDescriptionDiv.appendChild(channelName);
    textDescriptionDiv.appendChild(gamePlayed);

    // Append div wrappers to the list item
    listItem.appendChild(profileImageDiv);
    listItem.appendChild(textDescriptionDiv);
    //Append the list item to the main ul
    parentList.appendChild(listItem);

    // If the item is the first item in the list, set to active
    if(count == 0){
      makeTwitchElementActive(listItem, "generated");
    }

    count++
  }
}

// Function to load all relevant information for the Consolidate Web Application
function loadConsolidate(){
  loadConsolidateOSRS();
  loadConsolidateTwitch();
  
}


// Function to retrieve the osrs main page articles via nested async function then take the api result and insert each article into
// an element on the DOM
async function loadConsolidateOSRS(){
  let parentArticleIDs = new Array("Article1", "Article2", "Article3", "Article4", "Article5");

  //get osrs main news articles from API
  apiResult = await loadOSRSMainPageArticles();
  //console.log("API RESULT"+JSON.stringify(apiResult));

  //Insert each article into the DOM
  for (let i = 0; i < parentArticleIDs.length; i++){
    parentArticle = document.getElementById(parentArticleIDs[i]);
    console.log("Inserting Information for " + parentArticleIDs[i]);
    parentArticle.children[0].children[0].src = apiResult[i].thumbnailUrl;
    parentArticle.children[0].children[1].children[0].textContent = apiResult[i].articleTitle;
    parentArticle.children[0].children[1].children[1].textContent = apiResult[i].articleDate;
    parentArticle.children[0].children[1].children[2].textContent = truncateString(JSON.stringify(apiResult[i].articleBody), 100);
    parentArticle.setAttribute('href', apiResult[i].articleLink);
    console.log("Article after update: " + parentArticle);
  }
}


// Function to query the AWS EC2 endpoint API for the 5 current OSRS main page articles
async function loadOSRSMainPageArticles(){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  let apiResponse = await fetch("https://www.webapps.jdfordjr.com/api/v1/MainNewsArticles", requestOptions);
  let jsonResponse = await apiResponse.json();
  return jsonResponse;
}


// Function to reload the 5 OSRS Main Page News Articles information inside the
// Consolidate Web Application incase any new articles were posted recently to the OSRS News website
function reloadOSRSArticles(){
  console.log("Reload");
  loadConsolidateOSRS();
}


function loadConsolidateTwitch(){
  // twitchClientID = "51mzuyafc05ui4265nkbcz4tkepml2"
  // twitchClientSecret = "jommf4avrsi7tgnx6exi5emhjuwwjg"
  let twitchProfileElement = document.getElementById("twitchFirstItem");
  updateMainTwitchProfile(twitchProfileElement, "default");
}

// Function, when clicked, to open a new window and execute the Twitch Implicit Grant Flow then extract and locally store the returned user auth token
function authorizeTwitchAccount(){
  const twitchClientID = "51mzuyafc05ui4265nkbcz4tkepml2";
  //const twitchRedirectURL = "http://localhost:81/PortfolioWebsite/public/twitchRedirect.html";
  const twitchRedirectURL = "https://www.jdfordjr.com/twitchRedirect.html";
  let twitchURL = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${twitchClientID}&redirect_uri=${twitchRedirectURL}&scope=user%3Aread%3Afollows&state=c3ab8aa609ea11e793ae92361f002671`;

  // Create new Popup for all of Twitch OAuth redirects
  const authPopUp = window.open(twitchURL, "TwitchAuthPopUp", "width=700, height=500");

  // This block waits for all twitch redirects until the final authPopUp href contains the final twitch redirect link
  // Once the final twitch redirect link is reached, the promise is fulfilled
  let getAuthPopUpHref = new Promise((resolve, reject) => {
    let interval = 300;
    let timeOut = 300000;
    let timer = setInterval(() =>{
      timeOut -= interval;
      if(timeOut < 1){
        clearInterval(timer);
        reject(new Error("Authenticating Twich OAuth Timed Out."));
      }

      let href = authPopUp.location.href;
      if(href.includes(twitchRedirectURL)){
        resolve(href);
      }
    }, interval);
  });

  // After the final twitch redirect link is reached, use RegEx to extract the user specific auth token, store the auth token in local storage then close the authPopUp window
  getAuthPopUpHref.then(href =>{
    const urlHashRegEx = /access_token=(?<twitch_access_token>[\d\w]+)/;
    let urlHash = href;
    let urlHashMatch = urlHash.match(urlHashRegEx);
  
    if(urlHashMatch.groups.twitch_access_token != null){
      console.log(`Found Twitch User Auth Token: ${urlHashMatch.groups.twitch_access_token}`);
  
      //Store auth token in local window storage before closing window so other functions can access the token
      // Avoids declaring and using global variables (sorta)
      localStorage.setItem("twitch_user_auth_token", urlHashMatch.groups.twitch_access_token);

      // Close twitch auth pop up window once the auth token is extracted
      authPopUp.close();

      loadTwitchFollowerList();
    }else{
      console.log("Unable to find Twitch User Auth Token");
      window.alert("Failed to Authenticate your Twitch account. Please try again.");
    }
  })
}

// Function to drive twitch API requests and to ultimately create a list of HTML li elements for each followed channel
async function loadTwitchFollowerList(){
  const twitchClientID = "51mzuyafc05ui4265nkbcz4tkepml2";
  const twitchClientSecret = "jommf4avrsi7tgnx6exi5emhjuwwjg";
  const twitchUserAuthToken = localStorage.getItem("twitch_user_auth_token");
  const userFollowedTwitchChannelsArr = []

  // API Flow:
  // 1). Get the authenticated user's Twitch User ID
  // 2). Get all currently live followed channels 
  let twitchAPIAuthUserID = await getTwitchUserInfo(twitchClientID, null, twitchUserAuthToken);
  console.log("ID: "+twitchAPIAuthUserID.data[0].id);
  console.log("login: "+twitchAPIAuthUserID.data[0].login);
  let twitchAPIAuthUserFollowedChannels = await getTwitchUserFollowedChannels(twitchClientID, twitchAPIAuthUserID.data[0].id, twitchUserAuthToken);
  // console.log("Followed Channels: "+JSON.stringify(twitchAPIAuthUserFollowedChannels.data));

  for(const followedChannel of twitchAPIAuthUserFollowedChannels.data){
    const channelDetails = await getTwitchUserInfo(twitchClientID, followedChannel.user_name, twitchUserAuthToken);

    let channel = {
      "userID": followedChannel.id,
      "userName": followedChannel.user_name,
      "userLoginName": followedChannel.user_login,
      "userProfilePicture": channelDetails.data[0].profile_image_url,
      "userDescription": channelDetails.data[0].description,
      "gameID": followedChannel.game_id,
      "gameName": followedChannel.game_name,
      "streamTitle": followedChannel.title,
      "streamViewerCount": followedChannel.viewer_count,
      "streamStartTime": followedChannel.streamStartTime,
      "streamLink": `https://www.twitch.tv/${followedChannel.user_name}`
    };

    userFollowedTwitchChannelsArr.push(channel);
  }
  localStorage.setItem("twitchFollowedChannels", JSON.stringify(userFollowedTwitchChannelsArr));
  //console.log("FOLLOWED CHANNEL OBJECTS JSON"+JSON.stringify(userFollowedTwitchChannelsArr));
  createTwitchFollowedChannelElements();

}

// Function to retrieve a passed user's information from the Twitch API
async function getTwitchUserInfo(twitchClientID, userLoginName, twitchUserAuthToken){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${twitchUserAuthToken}`);
  myHeaders.append("Client-id", `${twitchClientID}`);
  myHeaders.append("Cookie", "twitch.lohp.countryCode=US; unique_id=9qTrgY4NQ9tc06RB23wSAn8U13vycG7B; unique_id_durable=9qTrgY4NQ9tc06RB23wSAn8U13vycG7B");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  // Since we don't gather the twitch login name at authorization, we can grab the authenticated user's login name from the generated auth code
  if(userLoginName != null){
    let apiResponse = await fetch(`https://api.twitch.tv/helix/users?login=${userLoginName}`, requestOptions);
    let jsonResponse = await apiResponse.json();
    return jsonResponse;
  }else{
    let apiResponse = await fetch(`https://api.twitch.tv/helix/users`, requestOptions);
    let jsonResponse = await apiResponse.json();
    return jsonResponse;
  }
}


// Function to retreive all currently live followed twitch channels for the passed user
async function getTwitchUserFollowedChannels(twitchClientID, twitchAuthUserID, twitchUserAuthToken){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${twitchUserAuthToken}`);
  myHeaders.append("Client-id", `${twitchClientID}`);
  myHeaders.append("Cookie", "twitch.lohp.countryCode=US; unique_id=9qTrgY4NQ9tc06RB23wSAn8U13vycG7B; unique_id_durable=9qTrgY4NQ9tc06RB23wSAn8U13vycG7B");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  let apiResponse = await fetch(`https://api.twitch.tv/helix/streams/followed?user_id=${twitchAuthUserID}`, requestOptions);
  let jsonResponse = await apiResponse.json();
  return jsonResponse;
}