$(document).ready(() => {
    var currentView = "All";
    console.log("page ready ping");

    $(".user-search").on("submit", function (event) {
        event.preventDefault();
        var userId = sessionStorage.getItem("userId");

        if (!userId) {
            showError("#login", "You must sign into Bookmarks to use it!");
        }
        else {
            var searchInput = $(".userText").val().trim();
            var searchParam = $(".search-btn").attr("data-value");

            if (!searchInput.length) {
                showError("#user", "The search field cannot be blank!");
            }
            else if (!searchParam) {
                showError("#user", "The search type must be chosen!");
            }
            else {
                var url = "/api/search/" + userId + "/" + searchParam + "/" + searchInput;
                console.log("GET request: " + url);

                $.ajax(url, {
                    type: "GET"
                })
                    .then(data => {
                        $("#search-results").html(data)
                        handleOverflows();
                        currentView = "Search";
                        console.log("currentView =", currentView);
                    })
                    .fail(error => console.error(error));
            }
        }
    });

    $(".list-search").on("submit", function (event) {
        event.preventDefault();
        var userId = sessionStorage.getItem("userId");
        
        if (!userId) {
            showError("#login", "You must sign into Bookmarks to use it!");
        }
        else {
            var searchParam = $("#selectSearchList").val();
            var searchParamVal;
            if ($("#dynamicSearchListContainer").find('select').length > 0) {
                var searchParamVal = $("#dynamicSearchList").val();
            } else {
                var searchParamVal = $(".userText").val().trim();
            }

            if (searchParam != "all" && searchParamVal.length === 0) {
                showError("#user", "The search field cannot be blank!");
            }
            else {
                console.log("searchParam =", searchParam, "// searchParamVal =", searchParamVal)
                var url = "/api/list/" + userId + "/" + searchParam + "/" + searchParamVal;
                console.log("GET request: " + url);

                $.ajax(url, {
                    type: "GET"
                })
                .then(data => { 
                    searchParamVal === "" ? currentView = "All" : currentView = searchParamVal;
                    $("#list-results").html(data);
                    handleOverflows(); 
                    console.log("searchParamVal =", searchParamVal);
                    if (!(searchParamVal === "Deleted")) {
                        console.log("removing trash buttons");
                        $(".trash").remove();
                    }
                    showCategory();
                    showStatus();
                    console.log("currentView =", currentView);
                })
                .fail(error => console.error(error));
            }
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
                console.log("category GET request: " + url);
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

    $(document).on("click", ".logout", function (event) {
        sessionStorage.removeItem("userId");
        window.location.href = "/logout";
    });

    $(document).on("click", "#login-err-modal-btn", function (event) {
        window.location.href = "/login";
    });

    $(".search-param").on("click", function (event) {
        var newSearchParam = $(this).attr("data-value");
        $(".search-btn").text("Searching: " + newSearchParam.toUpperCase());
        $(".search-btn").attr("data-value", newSearchParam);
    });

    $(document).on("click", ".add-to-list:not('.added')", function (event) {
        var title = $(this).attr("data-title")
        var userId = sessionStorage.getItem("userId");

        var dataObj = {
            title: title,
            author: $(this).attr("data-author"),
            genre: $(this).attr("data-genre"),
            img: $(this).attr("data-img"),
            url: $(this).attr("data-url")
        }
        var url = "/api/list/add/" + userId;

        console.log("POST request: " + url);

        $.ajax(url, {
            type: "POST",
            data: dataObj
        })
            .then((results) => {
                if (results.hasOwnProperty("error")) {
                    console.log("Adding book already on list should never happen");
                }
                else {
                    $(this).closest(".book").empty().append($("<p style='text-align: center'>").text("'" + title + "' added to library"));
                }
            })
            .fail(error => console.error(error));
    });

    // for each reading_list book, show active category and hide others
    function showCategory () {
        $(".categoryArea li").hide();
        $(".categoryArea li").filter(function() {
            return $(this).parent().attr("value") === $(this).attr("value");
        }).addClass("setCategory").show();
    }

    // reveal all status for selection
    $(document).on("click", ".setCategory button", function () {
        $(this).parent().siblings().animate({height: "toggle"}, 200, function() {
            // Animation complete.
        });
    })

    // PUT new "category" when category (not currently set) button is clicked
    $(document).on("click", ".categoryArea li:not(.setCategory) button",  function() {
        console.log($(this).attr("data-category"));
        
        var userId = sessionStorage.getItem("userId");
        var title = $(this).attr("data-title");
        var category = $(this).attr("data-category");

        var dataObj = {
            title: title,
            author: $(this).attr("data-author"),
            category: category
        };
        var url = "/api/list/update/category/" + userId;

        console.log("PUT request: " + url);
        $.ajax(url, {
            type: "PUT",
            data: dataObj
        })
        .then((results) => {
            if (!results.hasOwnProperty("error")) {
                console.log("'" + title + "'" + " updated to " + category + " on list");
                $(this).parent().siblings(".setCategory").removeClass("setCategory");
                $(this).parent().addClass("setCategory");
                if (!(category === currentView) && !(currentView === "All")) {
                    $(this).closest(".book").empty().append($("<p style='text-align: center'>").text("'"+title+"' moved to '"+category+"'")).delay(2000).fadeOut(1000);
                } else {
                    $(this).parent().siblings().animate({height: "toggle"}, 200, function() {
                        // Animation complete
                    });
                };
            } else {
                console.log("'" + title + "'" + "not updated to " + category + " on list");
            }
        })
        .fail(error => console.error(error));
    });

    // for each reading_list book, show active status and hide others
    function showStatus () {
        $(".statusArea li:not(.trash)").hide();
        $(".statusArea li").filter(function() {
            return $(this).parent().attr("value") === $(this).attr("value");
        }).addClass("setStatus").show();
        if (!(currentView === "Deleted")) {
            console.log("currentView =", currentView);
            console.log("removing Trash button");
            $(".trash").remove();
        }
    }

    // reveal all status for selection
    $(document).on("click", ".setStatus button", function () {
        $(this).parent().siblings(":not(.trash)").animate({height: "toggle"}, 200, function() {
            // Animation complete.
        });
    })

    // PUT new "status" when status (not currently set) button is clicked
    $(document).on("click", ".statusArea li:not(.setStatus, .trash) button",  function() {
        console.log($(this).attr("data-status"));
        
        var userId = sessionStorage.getItem("userId");
        var title = $(this).attr("data-title");
        var status = $(this).attr("data-status");

        var dataObj = {
            title: title,
            author: $(this).attr("data-author"),
            status: status
        };
        var url = "/api/list/update/status/" + userId;

        console.log("PUT request: " + url);
        $.ajax(url, {
            type: "PUT",
            data: dataObj
        })
        .then((results) => {
            if (!results.hasOwnProperty("error")) {
                console.log("'" + title + "'" + " updated to " + status + " on list");
                $(this).parent().siblings(".setStatus").removeClass("setStatus");
                $(this).parent().addClass("setStatus");
                if (!(status === currentView) && !(currentView === "All")) {
                    $(this).closest(".book").empty().append($("<p style='text-align: center'>").text("'"+title+"' moved to '"+status+"'")).delay(2000).fadeOut(1000);
                } else {
                    $(this).parent().siblings().animate({height: "toggle"}, 200, function() {
                        // Animation complete
                    });
                };
            } else {
                console.log("'" + title + "'" + "not updated to " + status + " on list");
            }
        })
        .fail(error => console.error(error));
    })

    $(document).on("click", ".trash button", function () {
        var userId = sessionStorage.getItem("userId");
        var title = $(this).attr("data-title");
        var author = $(this).attr("data-author");
        var dataObj = {
            title: title,
            author: author
        };
        var url = "/api/list/delete/" + userId;
        console.log("DELETE request: " + url);
        $.ajax(url, {
            type: "DELETE",
            data: dataObj
        })
        .then((results) => {
            console.log("'" + title + "'" + " deleted from list");
            $(this).closest(".book").empty().append($("<p style='text-align: center'>").text("'" + title + "' exiled to the Trash"));
        })
        .fail(error => console.error(error));
    })

    // expand overflowing book
    $(document).on("click", ".expand", function () {
        $(this).prev(".contents").toggleClass("contentsExpanded");
        $(this).children("span").toggleClass("glyphicon-chevron-down glyphicon-chevron-up");
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
       
    function showError(divPrefix, error) {
        $(divPrefix + '-err-modal-body').empty();
        $(divPrefix + '-err-modal').modal('show');

        var errModalLine = $('<h3>').text(error);

        $(divPrefix + '-err-modal-body').append(errModalLine);
    }
});
