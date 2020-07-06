$(document).ready(function () {
    $(".card").hover(
        function () {
            $(this).addClass("shadow");
        },
        function () {
            $(this).removeClass("shadow");
        }
    );
});
function copyBibtexClipBoard(bibID) {
    var bibtex = document.getElementById("pre-" + bibID);
    var text = bibtex.innerHTML;
    $("#txt-" + bibID)
        .val(text)
        .select();
    document.execCommand("copy");
    $("#copy-notification-" + bibID).addClass(
        "alert alert-success text-center"
    );
    $("#copy-notification-" + bibID).text("Bibtex is copied to clipboard");
}

function manageAPublicationTab(tab, bibID) {
    var otherTab =
        tab === "abstract" ? "panel-bibtex-" + bibID : "panel-abs-" + bibID;
    var otherTabIsVisible = $("#" + otherTab).is(":visible");
    if (otherTabIsVisible) {
        $("#" + otherTab).collapse("toggle");
    }
}
