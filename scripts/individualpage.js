let id = JSON.parse(localStorage.getItem("individual_id"));
const BASE = window.API_CONFIG.BASE_URL;

let fetching_data = async (id) => {
    try {
        let res = await fetch(`${BASE}/studios/${id}`);
        let data = await res.json();
        renderData([data]);  // directly using an array with one object
    } catch (error) {
        console.log(error.message);
    }
};

fetching_data(id);

let main_div = document.querySelector("#main_div");
let renderData = (data) => {
    main_div.innerHTML = `${data.map((elem) => {
        return `
    <div>
        <div class="profile_img">
            <img class="p_img" src=${elem.profile_image} alt="">
        </div>
        <div>
            <h2 class="head">${elem.name}</h2>
            <h3 class="dark">${elem.street}, ${elem.city}, ${elem.state}</h3>
            <h3 class="dark">${elem.mobile}</h3>
            <h4 class="charges">Booking Charges : Rs ${elem.price}</h4>
            <h4 class="hour">Working Hours : ${elem.start_time} AM - ${elem.end_time} PM</h4>
            <button class="profile_btn">Wedding</button>
            <button class="profile_btn">Babies</button>
            <button class="profile_btn">Birthday</button>
            <button class="profile_btn">Party</button>
            <button class="profile_btn">Events</button>
            <br>
            <button class="see_btn">Go Down For Booking ⬇️</button>
        </div>
    </div>
    `;
    }).join("")}`;
};

// Booking section
let date_value = document.getElementById("date_value");
let date_btn = document.getElementById("date_btn");
let studio_id = JSON.parse(localStorage.getItem("individual_id"));

async function trigger() {
    let obj = {
        date: date_value.value
    };
    console.log("Studio ID:", studio_id, obj);
    let res = await fetch(`${BASE}/studios/slots/${studio_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    });
    let data = await res.json();
    renderTime(data);
}

let flag = false;
document.querySelector(".slots_div").style.display = "none";
let slot_div = document.querySelector(".slots_div_ul");

let renderTime = (data) => {
    document.querySelector(".slots_div").style.display = "block";
    slot_div.innerHTML = `
        ${data.map((elem) => `<li>${elem.start_time} - ${elem.end_time}</li>`).join("")}
    `;
};

// Slot Booking
let start_time = document.getElementById("start_time");
let end_time = document.getElementById("end_time");

async function book_slot() {
    let obj = {
        start_time: start_time.value,
        end_time: end_time.value,
        date: date_value.value
    };
    console.log("Booking Slot:", obj);
    let res = await fetch(`${BASE}/studios/slots/book/${studio_id}`, {
        method: "POST",
        headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    });

    let data = await res.json();
    alert(data.message);

    if (data.message === "Slot not available on given time") {
        alert("Please choose a different time.");
    } else {
        alert("Slot booked successfully!");
        // Optionally redirect:
        // window.location.href="./users/users.html";
    }
}
