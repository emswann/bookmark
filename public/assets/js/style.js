$(document).ready(() => {
  
  var userId = sessionStorage.getItem("userId");

  $(".userName").text(userId);
});