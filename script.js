// Wedding details: ceremony time is India Standard Time (UTC+05:30).
const WEDDING_DATE = new Date("2026-11-29T07:35:00+05:30");
const EVENT_END = new Date("2026-11-29T09:00:00+05:30");
const VENUE = "Villur Arulmigu Shri Rukmani Sathyabamasamedha Shri Rajagobala Krishnasamy Temple, Villur, Madurai, Tamil Nadu, India";
const RECEPTION_VENUE = "Amman Marriage Hall, Villur, Madurai, Tamil Nadu, India";
const MAP_URL = "https://maps.app.goo.gl/aRfdmDVGDPX4Pda89";

const byId = (id) => document.getElementById(id);

function updateCountdown() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) {
    byId("days").textContent = "♥";
    byId("hours").textContent = "♥";
    byId("minutes").textContent = "♥";
    byId("seconds").textContent = "♥";
    byId("countdownMessage").textContent = "Today, our forever begins. Thank you for celebrating with us!";
    return;
  }
  byId("days").textContent = Math.floor(diff / 86400000);
  byId("hours").textContent = Math.floor((diff % 86400000) / 3600000);
  byId("minutes").textContent = Math.floor((diff % 3600000) / 60000);
  byId("seconds").textContent = Math.floor((diff % 60000) / 1000);
}
updateCountdown();
setInterval(updateCountdown, 1000);

const music = byId("weddingMusic");
const musicToggle = byId("musicToggle");
let autoplayStarted = false;

function showMusicState(playing) {
  musicToggle.innerHTML = playing ? "♫ <span>Pause music</span>" : "♫ <span>Play music</span>";
  musicToggle.setAttribute("aria-pressed", String(playing));
}

async function tryStartMusic() {
  if (!music.paused) {
    showMusicState(true);
    autoplayStarted = true;
    return true;
  }
  try {
    await music.play();
    autoplayStarted = true;
    showMusicState(true);
    return true;
  } catch (error) {
    // Browsers may block autoplay with sound until the visitor interacts.
    musicToggle.innerHTML = "♫ <span>Tap anywhere for music</span>";
    showMusicState(false);
    return false;
  }
}

// Attempt sound-on autoplay as soon as the page is ready.
function initializeMusic() {
  tryStartMusic();
}

// If autoplay is blocked, start music on the visitor's first interaction
// anywhere on the page, instead of requiring the separate music button.
window.addEventListener("DOMContentLoaded", initializeMusic);
window.addEventListener("pageshow", () => {
  if (music.paused && !autoplayStarted) tryStartMusic();
});

function startMusicOnFirstInteraction() {
  if (music.paused) tryStartMusic();
  window.removeEventListener("pointerdown", startMusicOnFirstInteraction);
  window.removeEventListener("keydown", startMusicOnFirstInteraction);
  window.removeEventListener("touchstart", startMusicOnFirstInteraction);
}
window.addEventListener("pointerdown", startMusicOnFirstInteraction, { once: true });
window.addEventListener("keydown", startMusicOnFirstInteraction, { once: true });
window.addEventListener("touchstart", startMusicOnFirstInteraction, { once: true, passive: true });

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    await tryStartMusic();
  } else {
    music.pause();
    showMusicState(false);
  }
});

music.addEventListener("play", () => showMusicState(true));
music.addEventListener("pause", () => showMusicState(false));

function makeCalendarFile() {
  const formatUTC = (date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const engagementStart = new Date("2026-11-28T18:00:00+05:30");
  const engagementEnd = new Date("2026-11-28T21:00:00+05:30");
  const stamp = formatUTC(new Date());
  const event = (uid, start, end, summary, description) => [
    "BEGIN:VEVENT", `UID:${uid}`, `DTSTAMP:${stamp}`,
    `DTSTART:${formatUTC(start)}`, `DTEND:${formatUTC(end)}`,
    `SUMMARY:${summary}`, `LOCATION:${VENUE.replace(/,/g, "\\,")}`,
    `DESCRIPTION:${description} Directions: ${MAP_URL}`, "URL:" + MAP_URL, "END:VEVENT"
  ].join("\r\n");
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//K. Thirukumaran and M. Nesin Saranya//Wedding//EN", "CALSCALE:GREGORIAN",
    event("nesin-thirukumaran-engagement-20261128@example.com", engagementStart, engagementEnd, "Engagement of K. Thirukumaran and M. Nesin Saranya", "Join us for our engagement ceremony."),
    event("nesin-thirukumaran-wedding-20261129@example.com", WEDDING_DATE, EVENT_END, "Muhurtham — K. Thirukumaran and M. Nesin Saranya", "Muhurtham at Villur Arulmigu Shri Rukmani Sathyabamasamedha Shri Rajagobala Krishnasamy Temple."),
    "END:VCALENDAR"
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Nesin-Thirukumaran-Celebrations.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

byId("calendarButton").addEventListener("click", () => {
  const googleUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE"
    + "&text=" + encodeURIComponent("Wedding of K. Thirukumaran and M. Nesin Saranya")
    + "&dates=" + encodeURIComponent("20261129T020500Z/20261129T033000Z")
    + "&details=" + encodeURIComponent("We warmly invite you to celebrate our wedding. Directions: " + MAP_URL)
    + "&location=" + encodeURIComponent(VENUE);
  const choose = confirm("Press OK to add the event to Google Calendar. Press Cancel to download an .ics file containing both the engagement and wedding.");
  if (choose) window.open(googleUrl, "_blank", "noopener,noreferrer");
  else makeCalendarFile();
});
