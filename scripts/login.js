document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", login);

  async function login(event) {
    event.preventDefault();
    try {
      let mobile = document.querySelector("#mobile").value;
      let password = document.querySelector("#password").value;
      let role = document.querySelector("#role").value;

      let logdata = {
        mobile,
        password,
      };

      let logurl = `${window.API_CONFIG.BASE_URL}/${role}/login`;

      console.log("BASE_URL:", window.API_CONFIG.BASE_URL);
      console.log("Login URL:", logurl);
      console.log("Login Data:", logdata);

      let res = await fetch(logurl, {
        method: "POST",
        body: JSON.stringify(logdata),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await res.json();

      if (res.ok) {
        console.log("User:", data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', role);
        // localStorage.setItem('userName', data.user.name);
        if (data.user && data.user.name) {
          localStorage.setItem('userName', data.user.name);
        }

        alert(data.message);
        window.location = "../index.html";
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error("Fetch error:", err);
      alert("Login failed. Please try again later.");
    }
  }
});
