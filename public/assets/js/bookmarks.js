$(document).ready(() => {
    $(".user-search").on("submit", function (event) {

        event.preventDefault();

        var newSearchInput = $("#userText").val().trim();
        var newSearchParam = $("#search-btn").attr("data-value");

        var url = "/api/search/" + newSearchParam + "/" + newSearchInput;
        console.log("GET request: " + url);
        
        $.ajax(url, {
            type: "GET"
        }).then(data => {
          $(".search-results").html(data)
        });
    });

    $(".search-param").on("click", function (event) {
        var newSearchParam = $(this).attr("data-value");
        $("#search-btn").text("Searching: " + newSearchParam.toUpperCase());
        $("#search-btn").attr("data-value", newSearchParam);
    });
});