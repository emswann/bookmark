$(document).ready(() => {
    $(".user-search").on("submit", function (event) {
        event.preventDefault();

        var searchInput = $(".userText").val().trim();
        var searchParam = $(".search-btn").attr("data-value");
        searchInput = searchInput.split(" ").join("%20");
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
        var userId = sessionStorage.getItem("userId");

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
            case "all": 
            case "title":
            case "author":
                // search all <text field>
                // search title <text field>
                // search author <text field>
                dynamicSearchList = $("<input type='text' name='search' id='dynamicSearchList'>");
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
                        $("<option value='"+ele+"'>").text(ele).appendTo(dynamicSearchList);
                    })
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
                        $("<option value='"+ele+"'>").text(ele).appendTo(dynamicSearchList);
                    })
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
        $(this).prop("disabled",true); // disable so cannot add again.

        var dataObj = {
            userId: sessionStorage.getItem("userId"),
            title:  $(this).attr("data-title"),
            author: $(this).attr("data-author"),
            genre:  $(this).attr("data-genre"),
            url:    $(this).attr("data-url")
        }  
        var url = "/api/list/add";

        console.log(dataObj, url);

        $.ajax(url, {
            type: "POST",
            data: dataObj
        })
        .then(() => {
            alert(title + " was added to your library!");
        })
        .fail(error => console.error(error));
    });
});