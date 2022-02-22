// import slick from 'slick-carousel';
import { ref, db, onValue, remove } from '../admin/assets/js/firebase.js';

$(document).ready(function () {
    $(".catalog-page-carousel").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: true,
        prevArrow: "<button type='button' class='slick-prev slick-arrow'><img src='./assets/icon/prevArrow.svg'/></button>",
        nextArrow: "<button type='button' class='slick-next slick-arrow'><img   src='./assets/icon/nextArrow.svg'/></button>",
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1

            }
        }
        ]
    });
});
$(document).ready(function () {
    $(".catalog-header-carousel").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: "<button type='button' class='slick-prev-header slick-arrow'> <img src='./assets/icon/caret-left-solid.svg' style='height: 35px; width: 35px; '/></button>",
        nextArrow: "<button type='button' class='slick-next-header slick-arrow'><img src='./assets/icon/caret-right-solid.svg' style='height: 35px; width: 35px;'/> </button>",
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
        ]
    });
});
function initAllBooks() {
    $("#all-books").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: true,
        prevArrow: "<button type='button' class='slick-prev slick-arrow'><img src='./assets/icon/prevArrow.svg'/></button>",
        nextArrow: "<button type='button' class='slick-next slick-arrow'><img   src='./assets/icon/nextArrow.svg'/></button>",
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1

            }
        }
        ]
    });
};

/**
 * For Catalogue Page
 */

let snap;

let sort = (category) => {
    $("#all-books").slick('unslick');
    $("#all-books").empty();
    let data = snap.val();
    let bookHTML;
    for (let book of Object.entries(data)) {
        if (book[1].isNew) {
            bookHTML = "<div style='background-image:url(" + book[1].imageUrl + ")' data-id='" + book[0] + "' data-type='" + book[1].type + "' class='card col-3 text-center  shadow position-relative mr-5'><span class='new-book'>New</span><div class='card-body'><p><strong>" + book[1].name + "</strong></p><p>" + book[1].author + "</p><button class='read-more bt btn-primary text-white btn-block readButton'>Read More</button></div></div>";
        }
        else {
            bookHTML = "<div style='background-image:url(" + book[1].imageUrl + ")' data-id='" + book[0] + "' data-type='" + book[1].type + "' class='card col-3 text-center shadow position-relative mr-5'><div class='card-body'><p><strong>" + book[1].name + "</strong></p><p>" + book[1].author + "</p><button class='read-more bt btn-primary text-white btn-block readButton'>Read More</button></div></div>";
        }

        if (book[1].type === category) {
            $("#all-books").append(bookHTML);
        }
    }
    ReadMore();
    initAllBooks();
}


// console.log("Sorting")


onValue(ref(db, "/categories"), (snapshot) => {
    let data = snapshot.val();

    for (var type of Object.entries(data)) {
        let li = $("<li class='nav-item '><button class='nav-link'>" + type[1].type + "</button></li>");
        li.attr('onclick', 'sort("' + type[1].type + '")');
        $("#categories").append(li)
    }
    $("#categories").slick('refresh');
});

// Read More

function ReadMore() {
    $(".read-more").on("click", function () {

        $(".catalog-header").css("display", "none");
        $(".general-carousel").css("display", "none");
        $(".read-more-page").css("display", "block");
        let data = snap.val();
        let bookHTML;

        let bookId = $(this).closest(".card").attr("data-id");
        for (let book of Object.entries(data)) {
            $("#read-more-main").empty();

            if (book[0] === bookId) {
                bookHTML = '<div class="col-6 p-3" ><button onclick="ReadMoreQuit()" class="back-btn btn-primary"> <i class="fa fa-caret-left" aria-hidden="true"></i> Back </button><span class="year">' + book[1].publishDate + '</span> <h2>' + book[1].name + ' </h2> <h4>' + book[1].author + '</h4> <p>' + book[1].description + '</p>  </div><div class="col-5 "> <img style="max-width: 250px" src="' + book[1].imageUrl + '" class="img-fluid shadow rounded" alt=""> </div> ';
                $("#read-more-main").append($(bookHTML));
                break;
            }
        };
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 500);
    });
}

function ReadMoreQuit() {
    $(".catalog-header").css("display", "block");
    $(".general-carousel").css("display", "block");
    $(".read-more-page").css("display", "none");
}

onValue(ref(db, "/books"), (snapshot) => {
    let data = snapshot.val();
    snap = snapshot;
    let bookHTML;
    $("#all-books").empty();
    $("#new-release").empty();
    $("#best-seller").empty();
    for (let book of Object.entries(data)) {
        if (book[1].isNew) {
            bookHTML = "<div style='background-image:url(" + book[1].imageUrl + ")' data-id='" + book[0] + "' data-type='" + book[1].type + "' class='card col-3 text-center  shadow position-relative mr-5'><span class='new-book'>New</span><div class='card-body'><p><strong>" + book[1].name + "</strong></p><p>" + book[1].author + "</p><button  class='read-more bt btn-primary text-white btn-block readButton'>Read More</button></div></div>";
            $("#new-release").append($(bookHTML));
        }
        else {
            bookHTML = "<div style='background-image:url(" + book[1].imageUrl + ")' data-id='" + book[0] + "' data-type='" + book[1].type + "' class='card col-3 text-center shadow position-relative mr-5'><div class='card-body'><p><strong>" + book[1].name + "</strong></p><p>" + book[1].author + "</p><button id='read-more' class='read-more bt btn-primary text-white btn-block readButton'>Read More</button></div></div>";
        }

        if (book[1].type === "Bestseller") {
            $("#best-seller").append($(bookHTML));
        }
        $("#all-books").append($(bookHTML));
    }
    ReadMore();
    $("#all-books").slick('refresh');
    $("#loadingAll").hide();


    $("#new-release").slick("refresh");
    $("#loadingNew").hide();

    $("#best-seller").slick('refresh');
    $("#loadingBest").hide();


    // Create new carousel from scratch and then start it
    // let goToCatalog = () => {
    let category = window.localStorage.getItem("sort");
    if (category != undefined) {
        sort(category);
        window.localStorage.removeItem("sort");
    }
    // }
});

//@ts-ignore
// window.goToCatalog = goToCatalog;

//@ts-ignore
window.sort = sort;

//@ts-ignore
window.ReadMoreQuit = ReadMoreQuit;