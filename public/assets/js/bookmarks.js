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
        var searchParam = $("#selectSearchList>button").attr("data-value");
        var searchParamVal;
        if ($(".dynamicSearchListField") === undefined) {
            console.log("should be no text field");
            searchParamVal = $(".dynamicSearchListButton").attr("data-value");
        } else {
            console.log("there should be a text field");
            searchParamVal = $(".dynamicSearchListField").val().trim();
        }
        console.log("searchParamVal =", searchParamVal);
        // console.log("searchParam =", searchParam);
        // console.log("searchParamVal =", searchParamVal);
        var userId = sessionStorage.getItem("userId");

        var url = "/api/list/" + userId + "/" + searchParam + "/" + searchParamVal;
        console.log("list-search GET request: " + url);
        
        $.ajax(url, {
            type: "GET"       
        })
        .then(data => $("#list-results").html(data))
        .fail(error => console.error(error));
    });

    $("#selectSearchList a").click(function() {
        console.log("selectSearchList option clicked = ", $(this).attr("data-value"));
        $("#dynamicSearchListContainer").empty();
        var selectedSearchList = $(this).attr("data-value");
        // might need to make sure initial view is set up when page loads
        console.log("selectedSearchList =", selectedSearchList);
        var dynamicSearchList = $("<div id='dynamicSearchList' class='btn-group'>");
        var dySeButton = $('<button type="button" class="btn btn-default dropdown-toggle search-btn dynamicSearchListButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">');
        dySeButton.text("For all...").append($("<span class='caret'>"));
        var dySeDropdown = $("<ul class='dropdown-menu'>");
        switch (selectedSearchList) {
            case "all": 
            case "title":
            case "author":
            // search all <text field>
            // search title <text field>
            // search author <text field>
            dynamicSearchList = $("<input type='text' name='search' class='dynamicSearchListField'>");
            break;
            case "category": 
            // search category <categoryList>
            var url = "/api/list/" + sessionStorage.getItem("userId") + "/category"; 
            console.log("Category GET request: " + url);
            $.ajax(url, {
                type: "GET"       
            })
            .then(data => {
                console.log("bookmarks.js Category GET .then() = ", data);
                data.forEach(ele => {
                    var item = $("<li>");
                    var link = $("<a href='#' class='search-param' data-value='"+ele+"'>").text(ele);
                    item.append(link);
                    dySeDropdown.append(item);
                })
                dynamicSearchList.append(dySeButton, dySeDropdown);
            })
            .fail(error => console.error(error));
            break;
            case "status": 
            // search status <statusList>
            var url = "/api/list/" + sessionStorage.getItem("userId") + "/status"; 
            console.log("Status GET request: " + url);
            $.ajax(url, {
                type: "GET"       
            })
            .then(data => {
                data.forEach(ele => {
                    var item = $("<li>");
                    var link = $("<a href='#' class='search-param' data-value='"+ele+"'>").text(ele);
                    item.append(link);
                    dySeDropdown.append(item);
                })
                dynamicSearchList.append(dySeButton, dySeDropdown);
                console.log("ping");
            })
            .fail(error => console.error(error));
            break;
            default:
            console.log("Should never get here - something is wrong.");
        }
        $("#dynamicSearchListContainer").append(dynamicSearchList);
    })

    $(document).on("click", "#launch-app", function(event) {
        sessionStorage.setItem("userId", $("#user-id").attr("data-value"));
        window.location.href = "/list";
    });

    $(".search-param").on("click", function (event) {
        var newSearchParam = $(this).attr("data-value");
        $(".search-btn").text("Searching: " + newSearchParam.toUpperCase());
        $(".search-btn").attr("data-value", newSearchParam);
    });

    $(document).on("click", ".add-to-list", function(event) {
        var title = $(this).attr("data-title")

        var dataObj = {
            userId: sessionStorage.getItem("userId"),
            title:  title,
            author: $(this).attr("data-author"),
            genre:  $(this).attr("data-genre"),
            url:    $(this).attr("data-url")
        }  
        var url = "/api/list/add";

        console.log("POST request: " + url);

        $.ajax(url, {
            type: "POST",
            data: dataObj
        })
        .then((results) => 
            results.hasOwnProperty("message") 
              ? alert("You have already added <" + title + ">to your library!")
              : alert("<" + title + "> was added to your library!")
        )
        .fail(error => console.error(error));
    });
});