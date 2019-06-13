//In the object we will keep the global values. The values that we will need through the
//whole application.
const globalVariable = {
  cart: [],
  email: ""
};

$(document).ready(function() {
  //Check if the user is logged in (if in the localstorage there is an email and a token)
  //Then redirect the user to home page, if there is no email and token redirect to login view
  //and also .hide() the header and footer elements as they are not needed on login page.
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  globalVariable.email = email;
  if (!email || !token) {
    //hide header and footer (I added authenticated class to the header and footer to catch
    //both of them by that class)
    $(".authenticated").hide();
    //Get the login.html page and put it in the main-content
    $("#main-content").load("../pages/login.html");
    $("#right-column").load("../components/page-description.html");
    return; //stop executing the .ready() function
  }

  //If the user is logged in we open the home page and load the ads in the right
  $("#main-content").load(`../pages/home.html`);
  $("#right-column").load(`../components/advertisements.html`);
});

function goToPage(event, page) {
  event.preventDefault();
  //get all the nav links and remove the class active from them if they have it.
  $(".navbar-nav .nav-link").removeClass("active");
  //add the active class to the clicked nav link.
  $(this).addClass("active");
  //Load the html page in the main content
  $("#main-content").load(`../pages/${page}.html`);
}
