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

        var searchParam = $("#selectSearchList").val();
        var searchParamVal = $("#dynamicSearchList").val().trim();
        var userId = 1;

        var url = "/api/list/" + userId + "/" + searchParam + "/" + searchParamVal;
        console.log("GET request: " + url);
        
        $.ajax(url, {
            type: "GET"       
        })
        .then(data => {console.log(data); $("#list-results").html(data);})
        .fail(error => console.error(error));
    });

    $("#selectSearchList").change(function() {
        $("#dynamicSearchListContainer").empty();
        var selectedSearchList = $(this).val();
        // might need to make sure initial view is set up when page loads
        console.log(selectedSearchList);
        var dynamicSearchList = $("<select id='dynamicSearchList' name='dynamicSearchList'>");
        switch (selectedSearchList) {
            case "all": {
                // search all <text field>
                dynamicSearchList = $("<input type='text' name='search' id='dynamicSearchList'>");
            } break;
            case "category": {
                // search category <categoryList>
                var url = "/api/list/" + "1" + "/category"; // temp userId
                console.log("GET request: " + url);
                $.ajax(url, {
                    type: "GET"       
                })
                .then(data => {
                    data.forEach(ele => {
                        $("<option value='"+ele+"'>").text(ele).appendTo(dynamicSearchList);
                    })
                })
                .fail(error => console.error(error));
            } break;
            case "status": {
                // search status <statusList>
                var url = "/api/list/" + "1" + "/status"; // temp userId
                console.log("GET request: " + url);
                $.ajax(url, {
                    type: "GET"       
                })
                .then(data => {
                    data.forEach(ele => {
                        $("<option value='"+ele+"'>").text(ele).appendTo(dynamicSearchList);
                    })
                })
                .fail(error => console.error(error));
            } break;
            case "title": {
                // search title <text field>
                dynamicSearchList = $("<input type='text' name='search' id='dynamicSearchList'>");
            } break;
            case "author": {
                // search author <text field>
                dynamicSearchList = $("<input type='text' name='search' id='dynamicSearchList'>");
            } break;
        }
        $("#dynamicSearchListContainer").append(dynamicSearchList);
    })

    $(".search-param").on("click", function (event) {
        var newSearchParam = $(this).attr("data-value");
        $(".search-btn").text("Searching: " + newSearchParam.toUpperCase());
        $(".search-btn").attr("data-value", newSearchParam);
    });
});