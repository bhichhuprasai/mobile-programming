$(document).ready(function () {

            $("#box")

            // Move to Bottom Left
            .animate({
                top: "80%",
                left: "0%"
            }, 1000, function () {
                $(this).css("background-color", "blue");
            })

            // Move to Bottom Right
            .animate({
                top: "80%",
                left: "90%"
            }, 1000, function () {
                $(this).css("background-color", "green");
            })

            // Move to Top Right
            .animate({
                top: "0%",
                left: "90%"
            }, 1000, function () {
                $(this).css("background-color", "orange");
            })

            // Back to Original Position (Top Left)
            .animate({
                top: "0%",
                left: "0%"
            }, 1000, function () {
                $(this).css("background-color", "purple");
            });

        });