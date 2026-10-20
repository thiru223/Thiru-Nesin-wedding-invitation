# K. Thirukumaran & M. நேசின் சரண்யா — Wedding Invitation Website

A responsive, static wedding website designed with a traditional Tamil wedding palette and modern romantic typography. It includes a live countdown, music toggle, Google Maps link + QR code, and calendar actions.

## Your current details
- Couple: K. Thirukumaran & M. நேசின் சரண்யா
- Tamil groom name: திருக்குமரன்
- Date: Sunday, 29 November 2026
- Muhurtham: 7:35–9:00 AM IST at Villur Arulmigu Shri Rukmani Sathyabamasamedha Shri Rajagobala Krishnasamy Temple
- Reception: Amman Marriage Hall, Villur, Madurai, Tamil Nadu
- Hall directions: https://maps.app.goo.gl/aRfdmDVGDPX4Pda89

## Before publishing
1. Open `index.html` and update any names, family invitation text, or venue details.
2. The countdown and calendar event are configured in `script.js`. If the date/time changes, update `WEDDING_DATE`, `EVENT_END`, and the Google Calendar dates.
3. The 30-second clip from 2:00–2:30 of the MP3 you supplied is included at `assets/wedding-music.mp3` and loops continuously. The page attempts autoplay on open, but browsers may block sound autoplay; guests can tap the Play Music button if needed. Use music you have permission to share.
4. Optional: add a couple illustration or photos by placing image files in `assets/` and adding an `<img>` element where you want them.
5. The map QR currently uses a QR image service, so the visitor's browser needs an internet connection. If you prefer a self-hosted QR image, download/generate a QR for the map URL and replace the `src` of `#mapQr` in `index.html`.

## Preview locally
Double-click `index.html` to open it in a browser. Internet access is needed for Google Fonts and the online QR image.

## Publish free with GitHub Pages
1. Sign in at https://github.com and click **New repository**.
2. Name it `wedding-invitation`. For easiest setup, make it **Public**.
3. Upload `index.html`, `style.css`, `script.js`, and the `assets` folder (including your music file, if you have one) to the repository's root.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**. Select branch `main` and folder `/ (root)`, then save.
6. Wait for deployment. Your site should appear at:
   `https://YOUR-GITHUB-USERNAME.github.io/wedding-invitation/`
7. Open the link on your phone and ask one other person to test it before sharing widely.

## Notes
- GitHub Pages is static hosting; this site does not collect RSVPs or store guest responses.
- The music control expects `assets/wedding-music.mp3`; if that file is missing, the site will show a helpful alert when Play is pressed.
- The calendar button opens a Google Calendar draft or downloads an `.ics` file for Apple Calendar and compatible apps.
- Verify venue spelling, date, time, and map pin before distributing the invitation.


## Content note
The invitation content has been adapted from the supplied Tamil invitation image. The section beginning with “ஸ்ரீ அன்புமாரி ஜி … தலைமையில்” and the associated organizer/leader list has intentionally been omitted as requested. Please verify the family names, venue name, and family names before publishing.


The invitation page now presents the main invitation copy and event details in both Tamil and English.


Requested cleanup: removed the specified Chennai reference and the academic/professional credential lines from the invitation display.
