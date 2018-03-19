$(document).ready(() => {
    $(".user-search").on("submit", function (event) {
        event.preventDefault();

        var searchInput = $(".userText").val().trim();
        var searchParam = $(".search-btn").attr("data-value");

        var url = "/api/search/" + searchParam + "/" + searchInput;
        console.log("GET request: " + url);
        
        $.ajax(url, {
            type: "GET"
        })
        .then(data => $("#search-results").html(data))
        .fail(error => console.error(error));
    });

    $(".list-search").on("submit", function (event) {
        event.preventDefault();

        var searchParam = $(".search-btn").attr("data-value");
        var searchParamVal = $(".userText").val().trim();
        var userId = 1;

        var url = "/api/list/" + userId + "/" + searchParam + "/" + searchParamVal;
        console.log("GET request: " + url);
        
        $.ajax(url, {
            type: "GET"       
        })
        .then(data => {console.log(data); $("#list-results").html(data);})
        .fail(error => console.error(error));
    });

    $(".search-param").on("click", function (event) {
        var newSearchParam = $(this).attr("data-value");
        $(".search-btn").text("Searching: " + newSearchParam.toUpperCase());
        $(".search-btn").attr("data-value", newSearchParam);
    });
});