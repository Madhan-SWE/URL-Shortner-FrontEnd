const BACKEND_URL = "https://url-shortner-by-madhan.herokuapp.com"
const FRONT_END_URL = "https://url-shortner-by-madhan.netlify.app"
const SHORTENING_URL = FRONT_END_URL + "/short.html?token="

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

function isLogin()
{
    let getURL = BACKEND_URL + "/login";
    let token = sessionStorage.getItem("LoginToken");
    if(!token)
    {
      window.location.href = "index.html"
    }
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', token);

    fetch(getURL, {
        headers: myHeaders
      }).then((res) => res.json())
      .then((res) => { 
        if (!res.result) {
            window.location.href = "index.html"
        }
    });
    return 
}


function deleteToken()
{
    sessionStorage.removeItem('LoginToken');
    window.location.href = "index.html"
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

        fetch(BACKEND_URL + "/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        }).then((res)=>res.json())
        .then((res)=> {
            if(!res.result)
            {
                document.getElementById("alertType").className = '';
                document.getElementById("alertType").classList.add("alert", "alert-danger", "alert-dismissible");
                document.getElementById("alertKey").innerText = "";
                document.getElementById("alertMessage").innerText =  res.message;
                document.getElementById("alertType").style.display = "block";
                return
            }
            sessionStorage.setItem("LoginToken", res.token);
            window.location.href = "dashboard.html"
        })
    }
    
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


function getURLs() {
    let getURL = BACKEND_URL + "/urls";
    let token = sessionStorage.getItem("LoginToken");
    if(!token)
    {
      window.location.href = "index.html"
    }
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', token);

    fetch(getURL, {
        headers: myHeaders
  
      }).then((res) => res.json()).then((res) => { 
        if (!res.result) {
            if(res.status===403 || res.status === 401)
            {
                window.location.href = "index.html"
            }
            document.getElementById("alertType").className = '';
            document.getElementById("alertType").classList.add("alert", "alert-danger");
            document.getElementById("alertKey").innerText = "Fetch Error";
            document.getElementById("alertMessage").innerText =  res.message;
            document.getElementById("alertType").style.display = "block";
            return 
        }
        if(res.body.length===0)
        {
            document.getElementById("alertType").className = '';
            document.getElementById("alertType").classList.add("alert", "alert-danger");
            document.getElementById("alertKey").innerText = "No data:";
            document.getElementById("alertMessage").innerText =  "No URLs list found for the user!, ";
            document.getElementById("alertType").style.display = "block";
            return 
        }

        let table = document.createElement("table");
        table.classList.add("table");

        let thead = document.createElement("thead");
        let trh = document.createElement("tr");
        let th1 = document.createElement("th");
        th1.setAttribute("scope", "col");
        th1.innerText = "#";
        let th2 = document.createElement("th");
        th2.setAttribute("scope", "col");
        th2.innerText = "URL";
        let th3 = document.createElement("th");
        th3.setAttribute("scope", "col");
        th3.innerText = "Shortened URL";
        

        trh.append(th1, th2, th3);
        thead.append(trh);
        table.append(thead);

        let tbody = document.createElement("tbody");
        let rowNo = 1;
        res.body.forEach((element) => {
            let tr = document.createElement("tr");
            let th1 = document.createElement("td");
            th1.setAttribute("scope", "row");
            th1.innerText = rowNo++;
            let td2 = document.createElement("td");
            td2.innerHTML = "<a href='"+ element.url + "'>" + element.url + "</a>";
            let td3 = document.createElement("td");
            td3.innerHTML = "<a href='"+ SHORTENING_URL + element.token + "' target='_blank'>" + SHORTENING_URL + element.token + "</a>" ;
            
            tr.append(th1, td2, td3);
            tbody.append(tr);
        });
        table.append(tbody);
        document.getElementById("tableConetent").append(table);
    });
}


function shortenURL()
{
    let url = document.getElementById("url").value;
    let token = sessionStorage.getItem("LoginToken");
    if(!token)
    {
      window.location.href = "index.html"
    }
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', token);

    
    if(checkNull(url, "URL"))
    {
        let data = {
            url: url
        }
        fetch(BACKEND_URL + "/shortenUrls", {
            method: "POST",
            body: JSON.stringify(data),
            headers:myHeaders   
        }).then((res)=>res.json())
        .then((res)=> {
            if(!res.result)
            {   
                if(res.status===403 || res.status === 401)
               {
                  window.location.href = "index.html"
                }
                document.getElementById("alertType").className = '';
                document.getElementById("alertType").classList.add("alert", "alert-danger");
                document.getElementById("alertKey").innerText = res.status;
                document.getElementById("alertMessage").innerText =  res.message;
                document.getElementById("alertType").style.display = "block";
                return 
            }
            document.getElementById("alertType").className = '';
            document.getElementById("alertType").classList.add("alert", "alert-success");
            document.getElementById("alertKey").innerText = res.message;
            document.getElementById("alertMessage").innerText = " Shortened URL: " + SHORTENING_URL + res.token;
            document.getElementById("alertType").style.display = "block";
        
        });
    }
}

function redirectURL()
{

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlToken = urlParams.get("token");
    let token = sessionStorage.getItem("LoginToken");
    if(!token)
    {
      window.location.href = "index.html"
    }
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', token);

    fetch(BACKEND_URL + "/redirect/"+urlToken, {
        headers:myHeaders   
    })
    .then((res)=>res.json())
    .then((res)=> {
        if(!res.result)
        {
            if(res.status===403 || res.status === 401)
            {
                window.location.href = "index.html"
            }
            document.getElementById("alertType").className = '';
            document.getElementById("alertType").classList.add("alert", "alert-danger", "alert-dismissible");
            document.getElementById("alertKey").innerText = res.status;
            document.getElementById("alertMessage").innerText =  res.message;
            document.getElementById("alertType").style.display = "block";
            return 
        }
        window.location.href = res.url;
    });
}