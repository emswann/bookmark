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
        var userId = sessionStorage.getItem("userId");

        var searchParam = $("#selectSearchList").val();
        var searchParamVal;
        if ($("#dynamicSearchListContainer").find('select').length > 0) {
            var searchParamVal = $("#dynamicSearchList").val();
        } else {
            var searchParamVal = $(".userText").val().trim();
        }

        var url = "/api/list/" + userId + "/" + searchParam + "/" + searchParamVal;
        console.log("GET request: " + url);
        
        $.ajax(url, {
            type: "GET"       
        })
        .then(data => {$("#list-results").html(data);})
        .fail(error => console.error(error));
    });

    $("#selectSearchList").change(function() {
        $("#dynamicSearchListContainer").empty();
        var selectedSearchList = $(this).val();
        // might need to make sure initial view is set up when page loads
        console.log(selectedSearchList);
        var dynamicSearchList = $("<select id='dynamicSearchList' name='dynamicSearchList'>");
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
                // search category <category list>
                var url = "/api/list/" + sessionStorage.getItem("userId") + "/category";
                console.log("categoty GET request: " + url);
                $.ajax(url, {
                    type: "GET"       
                })
                .then(data => {
                    data.forEach(ele => {
                        $("<option value='"+ele+"'>").text(ele).appendTo(dynamicSearchList);
                    })
                })
                .fail(error => console.error(error));
            break;
            case "status":
                // search status <status list>
                var url = "/api/list/" + sessionStorage.getItem("userId") + "/status";
                console.log("status GET request: " + url);
                $.ajax(url, {
                    type: "GET"       
                })
                .then(data => {
                    data.forEach(ele => {
                        $("<option value='"+ele+"'>").text(ele).appendTo(dynamicSearchList);
                    })
                })
                .fail(error => console.error(error));
            break;
            default: console.log("End of 'switch' statement error; you should never get here.");
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
            results.hasOwnProperty("error") 
              ? alert("You have already added <" + title + ">to your library!")
              : alert("<" + title + "> was added to your library!")
        )
        .fail(error => console.error(error));
    });

    $(document).on("click", ".delete-from-list", function (event) {
        var title = $(this).attr("data-title")

        var dataObj = {
            userId: sessionStorage.getItem("userId"),
            title: title,
            author: $(this).attr("data-author"),
            status: "Deleted"
        }
        var url = "/api/list/update";

        console.log("PUT request: " + url);

        $.ajax(url, {
            type: "PUT",
            data: dataObj
        })
        .then((results) =>
            results.hasOwnProperty("error")
                ? alert("<" + title + ">" + "not deleted from list")
                : alert("<" + title + ">" + "deleted from list")
        )
        .fail(error => console.error(error));
    });
});
