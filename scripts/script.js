
const BACKEND_URL = "http://localhost:3000"
const FRONT_END_URL = "http://127.0.0.1:5500/FrontEnd"

function checkNull(element, elementName)
{
    if(!element)
    {
        document.getElementById("alertType").className = '';
        document.getElementById("alertType").classList.add("alert", "alert-danger", "alert-dismissable");
        document.getElementById("alertKey").innerText = elementName;
        document.getElementById("alertMessage").innerText =  "Can't be empty!"
        document.getElementById("alertType").style.display = "block";
        return false
    }
    return true
}

function goHome()
{
    window.location.href = FRONT_END_URL;
}


function login()
{
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if(checkNull(email, "Email Id") && checkNull(password, "Password"))
    {
        let data = {
            "email": email,
            "password": password
        }

        console.log(data)

        fetch(BACKEND_URL + "/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        }).then((res)=>res.json())
        .then((res)=> {
            console.log(res)
            if(!res.result)
            {
                document.getElementById("alertType").className = '';
                document.getElementById("alertType").classList.add("alert", "alert-danger", "alert-dismissible");
                document.getElementById("alertKey").innerText = "";
                document.getElementById("alertMessage").innerText =  res.message;
                document.getElementById("alertType").style.display = "block";
            }
        })
        return true
    }
    return false
}

function register()
{
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    if(checkNull(email, "Email") && checkNull(firstName, "First Name") &&
    checkNull(password, "Password") && checkNull(lastName, "Last Name"))
    {
        let data = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password
        }
        fetch(BACKEND_URL + "/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        }).then((res)=>res.json())
        .then((res)=> {
            console.log(res)
            if(!res.result)
            {
                document.getElementById("alertType").className = '';
                document.getElementById("alertType").classList.add("alert", "alert-danger", "alert-dismissible");
                document.getElementById("alertKey").innerText = res.status;
                document.getElementById("alertMessage").innerText =  res.message;
                document.getElementById("alertType").style.display = "block";
                return 
            }
            document.getElementById("alertType").className = '';
            document.getElementById("alertType").classList.add("alert", "alert-success", "alert-dismissible");
            document.getElementById("alertKey").innerText = res.status;
            document.getElementById("alertMessage").innerText =  res.message;
            document.getElementById("alertType").style.display = "block";
        })
    }
}

function activateAccount()
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get("token");
    fetch(BACKEND_URL + "/users/active/" + token, {
        method: "POST"
    }).then((res)=>res.json())
    .then((res)=> {
        if(!res.result)
        {
            document.getElementById("errorTitle").innerText = "Activation Failed";
            document.getElementById("errorText").innerText = res.message;
            $("#errorModalLong").modal("show");
            
            return
        }
        document.getElementById("errorTitle").innerText = "Activation Successful";
        document.getElementById("errorText").innerText = res.message;
        $("#errorModalLong").modal("show");
        return
        
    });
}

function confirmEmail()
{
    let email = document.getElementById("email").value;
    if(checkNull(email, "Email"))
    {
        fetch(BACKEND_URL + "/users/" + email, {
            method: "POST"
        }).then((res)=>res.json())
        .then((res)=> {
            console.log(res)
            if(!res.result)
            {
                document.getElementById("alertType").className = '';
                document.getElementById("alertType").classList.add("alert", "alert-danger");
                document.getElementById("alertKey").innerText = res.status;
                document.getElementById("alertMessage").innerText =  res.message;
                document.getElementById("alertType").style.display = "block";
                return 
            }
        })

        fetch(BACKEND_URL + "/users/forgotPassword/" + email, {
            method: "POST"
        }).then((res)=>res.json())
        .then((res)=> {
            console.log(res)
            if(!res.result)
            {
                document.getElementById("alertType").className = '';
                document.getElementById("alertType").classList.add("alert", "alert-danger");
                document.getElementById("alertKey").innerText = res.status;
                document.getElementById("alertMessage").innerText =  res.message;
                document.getElementById("alertType").style.display = "block";
                return 
            }
            document.getElementById("alertType").className = '';
            document.getElementById("alertType").classList.add("alert", "alert-success");
            document.getElementById("alertKey").innerText = res.status;
            document.getElementById("alertMessage").innerText =  res.message;
            document.getElementById("alertType").style.display = "block";
        })
    }
}

function verifyPasswordResetLink()
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get("token");
    const email = urlParams.get("email");
    
    fetch(BACKEND_URL + "/users/passwordReset/" + email, {
        method: "POST",
        body: JSON.stringify({
            email
        }),
        "Content-type": "application/json"
    }).then((res)=>res.json())
    .then((res)=> {
        if(!res.result)
        {
            document.getElementById("errorTitle").innerText = "Password Reset Failed";
            document.getElementById("errorText").innerText = res.message;
            $("#errorModalLong").modal("show");
            
            return
        }
        window.location.href = "resetPassword.html?email=" + email;
        
    });
}

function updatePassword()
{
    let newPassword = document.getElementById("password").value;
    let CPassword = document.getElementById("cpassword").value;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get("email");

    if(checkNull(newPassword, "New Password") && checkNull(CPassword, "Confirm Password"))
    {
        if(newPassword!==CPassword)
        {
            document.getElementById("alertType").className = '';
            document.getElementById("alertType").classList.add("alert", "alert-danger");
            document.getElementById("alertKey").innerText = "Validation Error: ";
            document.getElementById("alertMessage").innerText =  "Passwords Don't match !";
            document.getElementById("alertType").style.display = "block";
            return
        }
      
        fetch(BACKEND_URL + "/users/changePassword/" + email, {
            method: "POST",
            body: JSON.stringify({
                password: CPassword 
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then((res)=>res.json())
        .then((res)=> {
            console.log(res)
            if(!res.result)
            {
                document.getElementById("alertType").className = '';
                document.getElementById("alertType").classList.add("alert", "alert-danger");
                document.getElementById("alertKey").innerText = res.status;
                document.getElementById("alertMessage").innerText =  res.message;
                document.getElementById("alertType").style.display = "block";
                return 
            }
            document.getElementById("alertType").className = '';
            document.getElementById("alertType").classList.add("alert", "alert-success");
            document.getElementById("alertKey").innerText = res.status;
            document.getElementById("alertMessage").innerText =  res.message;
            document.getElementById("alertType").style.display = "block";
            setTimeout(()=>{ window.location.href = FRONT_END_URL}, 1300)
        })

    }
}
