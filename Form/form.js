$(document).ready(function () {
    $("#registration-form").validate({
        rules: {
            username: {
                required: true,
                minlength: 3,
                maxlength: 20,
            },
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
                minlength: 6,
            },
            "confirm-password": {
                required: true,
                equalTo: "#password",
            },
        },
        messages: {
            username: {
                required: "Please enter a username.",
                minlength: "Username must be at least 3 characters long.",
                maxlength: "Username cannot exceed 20 characters.",
            },
            email: {
                required: "Please enter an email address.",
                email: "Please enter a valid email address.",
            },
            password: {
                required: "Please enter a password.",
                minlength: "Password must be at least 6 characters long.",
            },
            "confirm-password": {
                required: "Please confirm your password.",
                equalTo: "Passwords do not match.",
            },
        },
        errorElement: "div",
        errorPlacement: function (error, element) {
            error.addClass("error-message");
            error.insertAfter(element);
        },
    });
});
