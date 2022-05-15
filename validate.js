// $.validator.setDefaults({
//     submitHandler: function() {
//         alert("success!")
//         to_main_page_from_register()
//     }
// });

//to_main_page_from_register()



$().ready(function() {
    // validate the comment form when it is submitted
    // $("#commentForm").validate();

    // validate signup form on keyup and submit
    $("#register_page").validate({
        
        rules: {
            fullname: {
                required: true,
                nonNumeric: true
            },
            user_name: {
                required: true,
                checkDBreg: true,
            },
            password: {
                required: true,
                minlength: 5,
                pwcheck: true
            },
            email: {
                required: true,
                email: true
            },
        },
        messages: {
            fullname:{
                required: "Please enter your firstname and last name",
                nonNumeric: "Please use letters only"
            },
            user_name: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 2 characters",
                checkDBreg: "Username already exists"                
            },
            password: {
                required: "Please provide a password",
                pwcheck: "password must at least contain 1 letter and 1 digit",
                minlength: "Your password must be at least 5 characters long"
            },
            email: "Please enter a valid email address",
            topic: "Please select at least 2 topics"
        },
        submitHandler: function() {
            alert("success!")
            to_main_page_from_register()
        }
        
    });

    // propose username by combining first- and lastname
    $("#username").focus(function() {
        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        if (fullname && !this.value) {
            this.value = firstname + "." + lastname;
        }
    });

    window.onbeforeunload = function() {
        $('#register_page').submit();
       return true;
    };
    
    $.validator.addMethod("pwcheck", function(value) {
        return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
            && /[A-Za-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
     });    
     
     jQuery.validator.addMethod("nonNumeric", function(value) {
        return /^([^0-9]*)$/.test(value) // consists of only these
     });    

     $.validator.addMethod("checkDBreg", function(value) {
        if (window.localStorage.getItem(value) != null){
            return false;
        }
        return true;
     });    

});


$().ready(function() {
    // validate the comment form when it is submitted
    // $("#commentForm").validate();

    // validate signup form on keyup and submit
    $("#login_page").validate({
        rules: {
            user_name_login: {
                required: true,
                checkDBlogin: true,
            },
            psw_login: {
                required: true,
                minlength: 5,
                checkPassword: true,
            },
        },
        messages: {
            user_name_login: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 2 characters",
                checkDBlogin: "Username does not exist"
            },
            psw_login: {
                required: "Please provide a password",
                checkPassword: "Password is incorrect",
                // pwcheck: "password must at least contain 1 letter and 1 digit",
                minlength: "Your password must be at least 5 characters long"
            },
        },
        // submitHandler: function() {
        //     alert("success!")
        //     to_main_page_from_register()
        // }
        // return: true
    }),
    
    $.validator.addMethod("checkDB", function(value) {
        if (window.localStorage.getItem(value) == null){
            return false;
        }
        return true;
     });    

     $.validator.addMethod("checkDBlogin", function(value) {
        if (window.localStorage.getItem(value) == null){
            return false;
        }
        return true;
     });    

     $.validator.addMethod("checkPassword", function(value) {
        if ((JSON.parse(window.localStorage.getItem(value))).pass != psw_login){
            return false;
        }
        return true;
     });    


});



