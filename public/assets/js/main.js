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

// Function to load all relevant information for the Consolidate Web Application
// Relevant information includes Retreiving and Inserting OSRS 5 Main Page News Articles
function loadConsolidate(){
  let parentArticleIDs = new Array("Article1", "Article2", "Article3", "Article4", "Article5");
  for (let i = 0; i < parentArticleIDs.length; i++){
    parentArticle = document.getElementById(parentArticleIDs[i]);
    console.log("Inserting Information for " + parentArticleIDs[i]);
    parentArticle.children[0].children[0].src = "https://cdn.runescape.com/assets/img/external/oldschool/2023/newsposts/2023-02-23/THUMBNAIL-ForestryUpdate.png";
    parentArticle.children[0].children[1].children[0].textContent = "An Update on Forestry";
    parentArticle.children[0].children[1].children[1].textContent = "Community 23 February 2023";
    parentArticle.children[0].children[1].children[2].textContent = "Check out what we've changed regarding your feedback and the poll questions before March 1st! Read More...";
    parentArticle.setAttribute('href', "https://secure.runescape.com/m=news/an-update-on-forestry?oldschool=1");
    console.log("Article after update: " + parentArticle);
  }
}

// Function to reload the 5 OSRS Main Page News Articles information inside the
// Consolidate Web Application incase any new articles were posted recently to the OSRS News website
function reloadOSRSArticles(){
  console.log("Reload");
}
