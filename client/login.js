PlayFab.settings.titleId = '5417';

$("form").submit(function (e) {

    e.preventDefault();

    var email = $('#email').val();
    var password = $('#password').val();

    var isValid = true;

    if (password.length < 6 || password.length > 100) {
        $('#password').addClass('is-invalid').focus();
        $('.form-error').text('Invalid password');
        isValid = false;
    } else {
        $('#password').removeClass('is-invalid');
    }

    if (!checkEmail(email)) {
        $('#email').addClass('is-invalid').focus();
        $('.form-error').text('Invalid email address').show();
        isValid = false;
    } else {
        $('#email').removeClass('is-invalid');
    }

    if (isValid) {
        PlayFabClientSDK.LoginWithEmailAddress({
            TitleId: '5417',
            Email: email,
            Password: password
        }, function (result, error) {
            if (error) {
                console.error(error);
                $('.form-error').text(error.errorMessage).show();
            } else if (result) {
                console.log(result);
                sessionStorage.setItem("playerId", result.data.PlayFabId);
                sessionStorage.setItem("sessionTicket", result.data.SessionTicket);
                sessionStorage.setItem("isNewPlayer", result.data.NewlyCreated);
                document.location.href = '/play/index.html';
            } else {
                $('.alert').text('Grub! Something went wrong');
            }
        });
    }

});
