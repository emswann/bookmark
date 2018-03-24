$(document).ready(() => {
    var currentView;

    $(".user-search").on("submit", function (event) {
        event.preventDefault();

        var searchInput = $(".userText").val().trim();
        var searchParam = $(".search-btn").attr("data-value");

        if (!searchInput.length) {
            alert("The search field cannot be blank!");
        }
        else {
            var url = "/api/search/" + searchParam + "/" + searchInput;
            console.log("GET request: " + url);

            $.ajax(url, {
                type: "GET"
            })
                .then(data => {
                    $("#search-results").html(data)
                    handleOverflows(); 
                })
                .fail(error => console.error(error));
        }
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

        if (searchParam != "all" && searchParamVal.length === 0) {
            alert("The search field cannot be blank!");
        }
        else {
            console.log("searchParam =", searchParam, "// searchParamVal =", searchParamVal)
            var url = "/api/list/" + userId + "/" + searchParam + "/" + searchParamVal;
            console.log("GET request: " + url);

            $.ajax(url, {
                type: "GET"
            })
            .then(data => { 
                $("#list-results").html(data);
                handleOverflows(); 
                showStatus();
                currentView = searchParamVal;
            })
            .fail(error => console.error(error));
        }
    });

    $("#selectSearchList").change(function () {
        $("#dynamicSearchListContainer").empty();
        var selectedSearchList = $(this).val();
        // might need to make sure initial view is set up when page loads
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
                            $("<option value='" + ele + "'>").text(ele).appendTo(dynamicSearchList);
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
                            $("<option value='" + ele + "'>").text(ele).appendTo(dynamicSearchList);
                        })
                    })
                    .fail(error => console.error(error));
                break;
            default: console.log("End of 'switch' statement error; you should never get here.");
        }
        $("#dynamicSearchListContainer").append(dynamicSearchList);
    })

    $(document).on("click", "#launch-app", function (event) {
        sessionStorage.setItem("userId", $("#user-id").attr("data-value"));
        window.location.href = "/list";
    });

    $(".search-param").on("click", function (event) {
        var newSearchParam = $(this).attr("data-value");
        $(".search-btn").text("Searching: " + newSearchParam.toUpperCase());
        $(".search-btn").attr("data-value", newSearchParam);
    });

    $(document).on("click", ".add-to-list", function (event) {
        var title = $(this).attr("data-title")

        var dataObj = {
            userId: sessionStorage.getItem("userId"),
            title: title,
            author: $(this).attr("data-author"),
            genre: $(this).attr("data-genre"),
            img: $(this).attr("data-img"),
            url: $(this).attr("data-url")
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

    // for each reading_list book, show active status and hide others
    function showStatus () {
        $(".statusArea li").hide();
        $(".statusArea li").filter(function() {
            return $(this).parent().attr("value") === $(this).attr("value");
        }).addClass("setStatus").show();
    }

    // reveal all status for selection
    $(document).on("click", ".setStatus button", function () {
        $(this).parent().siblings().animate({height: "toggle"}, 200, function() {
            // Animation complete.
        });
    })

    // PUT new "status" when status (not currently set) button is clicked
    $(document).on("click", ".statusArea li:not(.setStatus) button",  function() {
        console.log($(this).attr("data-status"));
        
        var title = $(this).attr("data-title");
        var status = $(this).attr("data-status");

        var dataObj = {
            userId: sessionStorage.getItem("userId"),
            title: title,
            author: $(this).attr("data-author"),
            status: status
        };
        var url = "/api/list/update";

        console.log("PUT request: " + url);

        $.ajax(url, {
            type: "PUT",
            data: dataObj
        })
        .then((results) => {
            if (!results.hasOwnProperty("error")) {
                console.log("'" + title + "'" + " added to " + status + " list");
                $(this).parent().siblings(".setStatus").removeClass("setStatus");
                $(this).parent().addClass("setStatus");
                if (!(status === currentView)) {
                    $(this).closest(".book").empty().append($("<p style='text-align: center'>").text("Book moved to '"+status+"'"));
                } else {
                    $(this).parent().siblings().animate({height: "toggle"}, 200, function() {
                        // Animation complete
                    });
                };
            } else {
                console.log("'" + title + "'" + "not added to " + status + " list");
            }
        })
        .fail(error => console.error(error));
    })

    // expand book to show all hidden overflow
    function isOverflown(element) {
        return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    };
    
    // if book contents is overflowing, display expanding edge
    function handleOverflows() {
        $(".contents").each(function() {
            if (!isOverflown(this)) {
                $(this).next().hide()
            }
        })
    }
    
    // expand overflowing book
    $(document).on("click", ".expand", function () {
        $(this).prev(".contents").toggleClass("contentsExpanded");
        $(this).children("span").toggleClass("glyphicon-chevron-down glyphicon-chevron-up");
    })
});
