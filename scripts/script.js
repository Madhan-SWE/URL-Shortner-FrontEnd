
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
        return false
    }
    return false
}

function register()
{
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    if(checkNull(email, "Email") && checkNull(password, "Password") &&
       checkNull(firstName, "First Name") && checkNull(lastName, "Last Name"))
    {
        alert("Success !")
    }
}