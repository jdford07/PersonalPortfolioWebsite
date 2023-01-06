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
  navigator.clipboard.writeText(emailText);

  // Update Bootstrap tooltip to notify user the e-mail address was copied to their clipboard
  emailElement.setAttribute("data-bs-original-title", "Copied "+emailText+" to clipboard!");
  var tooltip = bootstrap.Tooltip.getInstance(emailElement);
  tooltip.show();
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
