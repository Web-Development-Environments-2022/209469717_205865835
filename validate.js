$.ajaxSetup({
    async: false
});
$().ready(function() {
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
                regUser();
            ;
        }
        
    });
    $(".cancel").click(function() {
        validator.resetForm();
    });
});

    function regUser(){
        var newUser = {
        name: null,
        pass: null,
    }
    newUser.name = un.value
    newUser.pass = password.value
    window.localStorage.setItem(newUser.name, newUser.pass );
    to_main_page_from_register();
    $("#register_page")[0].reset();
    }


    $("#username").focus(function() {
        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        if (fullname && !this.value) {
            this.value = firstname + "." + lastname;
        }
    });

    window.onbeforeunload = function() {
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
     
    
$().ready(function() {
    
    $("#login_page").validate({
        submitHandler: function() {
            loginNext();
        },
        onfocusout: false,

        rules: {
            user_name_login: {
                required: true,
                checkDBlogin: true,
            },
            psw_login: {
                required: true,
            },
        },
        messages: {
            user_name_login: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 2 characters",
                checkDBlogin: "Username does not exist or password is incorrect"
            },
        },
    }),

     $.validator.addMethod("checkDBlogin", function(value) {
        var checkLoginUser = {
            name: null,
            pass: null
        }
        checkLoginUser.name = user_name_login.value
        checkLoginUser.pass = psw_login.value
        for ( var i = 0, len = localStorage.length; i < len; ++i ) {
            if(localStorage.key(i) == user_name_login.value){
                if(localStorage.getItem(localStorage.key(i)) == psw_login.value){
                    return true;
                }
            }
        }
        return false;
     });    
     $(".cancel").click(function() {
        validator.resetForm();
    });
});



















