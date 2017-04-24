
// function checkLoginState() {
// 	//  FB.login(function(response) {
// 	// console.log("response from FB.login:", response);
//  //    Log.info('FB.login response', response);
//  //  });
// FB.getLoginStatus(function(response) {
// 	console.log("response from getLoginStatus:", response);
//     statusChangeCallback(response);
// });
// FB.api('/me', {fields: 'id,name,email'}, function(response) {
//   console.log("response from api:",response);
// });
//   return false;
// }

function checkLoginState() {
	FB.getLoginStatus(function(response) {
	  if (response.status === 'connected') {
	    console.log('Logged in.',response);
	   	getFBData();
	  }
	  else {
	    console.log('need to be logged in.');
	    FB.login();
	  }
	},{ auth_type: 'reauthenticate' });
}
function logoutFB() {
	FB.logout(function(response) {
   console.log('response:',response);
});
}
function getFBData(){
	FB.api('/me', {fields: 'id,email,gender,birthday,first_name,last_name'}, function(response) {
	  console.log("response from api:",response);
	  $('#first_name').val(response.first_name);
	  // $('#first_name').change();
	  $('#last_name').val(response.last_name);
	  $('#email').val(response.email);
	  $('#gender').val(response.gender);
	  $('#bday').val(response.birthday);
	  validateInfo();
	});
}

function validateInfo(){
	  $('#contact_form')[0].checkValidity();
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            first_name: {
            	trigger: 'change keyup',
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please supply your first name'
                    }
                }
            },
             last_name: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your last name'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your email address'
                    },
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            },
            phone: {
            	trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: 'Please supply your phone number'
                    },
                    phone: {
                        country: 'US',
                        message: 'Please supply a vaild phone number with area code'
                    }
                }
            },
            address: {
                validators: {
                     stringLength: {
                        min: 8,
                    },
                    notEmpty: {
                        message: 'Please supply your street address'
                    }
                }
            },
            city: {
                validators: {
                     stringLength: {
                        min: 4,
                    },
                    notEmpty: {
                        message: 'Please supply your city'
                    }
                }
            },
            zip: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your zip code'
                    },
                    zipCode: {
                        country: 'US',
                        message: 'Please supply a vaild zip code'
                    }
                }
            },
            comment: {
                validators: {
                      stringLength: {
                        min: 10,
                        max: 200,
                        message:'Please enter at least 10 characters and no more than 200'
                    },
                    notEmpty: {
                        message: 'Please supply a description of your project'
                    }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
        	 $('#success_message').slideDown({ opacity: "show" }, "slow");
        	console.log("success:");
        });




}