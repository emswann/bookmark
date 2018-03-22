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

        var searchParam = $("#selectSearchList").attr("data-value");
        console.log("searchParam =", searchParam);
        var searchParamVal = $("#dynamicSearchList").attr("data-value");
        console.log("searchParamVal =", searchParamVal);
        var userId = sessionStorage.getItem("userId");

        var url = "/api/list/" + userId + "/" + searchParam + "/" + searchParamVal;
        console.log("GET request: " + url);
        
        $.ajax(url, {
            type: "GET"       
        })
        .then(data => {console.log(data); $("#list-results").html(data);})
        .fail(error => console.error(error));
    });

    $("#selectSearchList a").click(function() {
        $("#dynamicSearchListContainer").empty();
        var selectedSearchList = $(this).attr("data-value");
        // might need to make sure initial view is set up when page loads
        console.log(selectedSearchList);
        var dynamicSearchList = $("<div class='btn-group' id='dynamicSearchList'>");
        var dySeButton = $('<button type="button" class="btn btn-default dropdown-toggle search-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">');
        dySeButton.text("For all...").append($("<span class='carat'>"));
        var dySeDropdown = $("<ul class='dropdown-menu'>");
        switch (selectedSearchList) {
            case "all": 
            case "title":
            case "author":
            // search all <text field>
            // search title <text field>
            // search author <text field>
            dynamicSearchList = $("<input type='text' name='search' class='userText'>");
            break;
            case "category": 
            // search category <categoryList>
            var url = "/api/list/" + sessionStorage.getItem("userId") + "/category"; 
            console.log("GET request: " + url);
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
            })
            .fail(error => console.error(error));
            break;
            case "status": 
            // search status <statusList>
            var url = "/api/list/" + sessionStorage.getItem("userId") + "/status"; 
            console.log("GET request: " + url);
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
});