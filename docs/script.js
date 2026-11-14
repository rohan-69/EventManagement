// List of college events. To add a new event, copy one block and change the details.
const events = [
    {
        title: "Annual Tech Fest",
        type: "Event",
        date: "2026-12-05",
        time: "9:00 AM",
        venue: "Main Auditorium",
        details: "Coding contests, project exhibition and robotics showcase."
    },
    {
        title: "Web Development Workshop",
        type: "Workshop",
        date: "2026-11-25",
        time: "10:00 AM",
        venue: "Computer Lab 2",
        details: "Hands-on session on HTML, CSS and JavaScript for beginners."
    },
    {
        title: "Data Science Seminar",
        type: "Seminar",
        date: "2026-12-12",
        time: "2:00 PM",
        venue: "Seminar Hall",
        details: "Talk by an industry expert on careers in data science."
    },
    {
        title: "DevOps with Jenkins Workshop",
        type: "Workshop",
        date: "2026-12-18",
        time: "11:00 AM",
        venue: "Computer Lab 1",
        details: "Learn Maven, Git and Jenkins to automate software builds."
    },
    {
        title: "Cultural Day",
        type: "Event",
        date: "2027-01-15",
        time: "4:00 PM",
        venue: "College Ground",
        details: "Music, dance, drama and food stalls organised by students."
    },
    {
        title: "Placement Preparation Seminar",
        type: "Seminar",
        date: "2026-10-20",
        time: "10:30 AM",
        venue: "Seminar Hall",
        details: "Tips on resumes, aptitude tests and interviews."
    }
];

const container = document.getElementById("events");
const count = document.getElementById("count");
const buttons = document.querySelectorAll(".filter");

// Check if an event date is today or in the future
function isUpcoming(dateText) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dateText) >= today;
}

// Make a readable date like "05 Dec 2026"
function formatDate(dateText) {
    return new Date(dateText).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

// Show the event cards on the page
function showEvents(type) {
    container.innerHTML = "";

    const list = events
        .filter(e => type === "All" || e.type === type)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    list.forEach(e => {
        const upcoming = isUpcoming(e.date);
        const card = document.createElement("div");
        card.className = "card " + e.type;
        card.innerHTML =
            '<span class="tag">' + e.type + '</span>' +
            '<h3>' + e.title + '</h3>' +
            '<p><b>Date:</b> ' + formatDate(e.date) + '</p>' +
            '<p><b>Time:</b> ' + e.time + '</p>' +
            '<p><b>Venue:</b> ' + e.venue + '</p>' +
            '<p>' + e.details + '</p>' +
            '<p class="status ' + (upcoming ? "upcoming" : "past") + '">' +
            (upcoming ? "Upcoming" : "Completed") + '</p>';
        container.appendChild(card);
    });

    count.textContent = "Showing " + list.length + " item(s)";
}

// When a filter button is clicked, show only that type
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        showEvents(btn.dataset.type);
    });
});

// Show everything when the page first opens
showEvents("All");
