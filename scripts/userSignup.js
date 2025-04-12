document.querySelector("form").addEventListener("submit", register);
    

    async function register(event) {
    event.preventDefault();
    console.log("Form submitted");
    try {
        let name = document.querySelector("#name").value;
        let mobile = document.querySelector("#mobile").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;

        console.log("Form data:", { name, mobile, email, password });

        let regdata = {
        name,
        mobile,
        email,
        password,
        };

        let regurl = `${window.API_CONFIG.BASE_URL}/users/signup`;
        console.log("API URL:", regurl);

        let res = await fetch(regurl, {
        method: "POST",
        body: JSON.stringify(regdata),
        headers: {
            "Content-type": "application/json",
        },
        });
        console.log("Response status:", res.status);
        let data = await res.json();
        console.log("Response data:", data);
        
        alert(data.message);
        window.location = "login.html";
    } catch (err) {
        console.log("Error:", err);
        alert("An error occurred. Please check console for details.");
    }
    }