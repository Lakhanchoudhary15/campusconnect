# CampusConnect

A unified campus event platform for IIIT Manipur, with a Student Portal and an Organizer Portal.

Built with React 18, plain CSS and `localStorage`. No server, database or build step.

## Features

**Students**
- Profile (name, roll number, branch, year)
- Featured 3D event ring, category chips and search by name
- Event grid and event details
- Registration form with ticket, and cancel registration (with confirmation)
- My events page
- Light and dark theme

**Organizers**
- Pick a club and see its events with registration counts and status
- View the registrants list (name, roll number, branch)
- Create and edit events with validation
- Cancel an event (with confirmation)

Data is saved in the browser (`localStorage`). To reset the demo, clear site data.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

An internet connection is needed only to load React and the fonts.

## Deploy

**GitHub Pages (included workflow)**
1. Push this repo to GitHub on the `main` branch.
2. Go to *Settings > Pages* and set *Source* to **GitHub Actions**.
3. The workflow in `.github/workflows/pages.yml` publishes the site on every push.

**Netlify:** drag the folder into app.netlify.com/drop.
**Vercel:** run `npx vercel` inside the folder.

## Project structure

```
index.html               page shell, loads React and all scripts below
css/styles.css           all styling (light/dark theme, responsive)
js/data.js               constants, seed events, storage and date helpers
js/events-ui.js          Tilt, Card, Ring (3D event ring)
js/dashboard.js          Dashboard (student home), Mine (my events)
js/organizer-form.js     event create/edit form
js/profile-fields.js     theme icons, demo data, validation, Fields
js/student-modals.js     Welcome, ProfileModal, RegForm, Ticket, RegistrantsModal
js/details-organizer.js  Details page, Organizer portal
js/app.js                App root and render
```

Scripts load in the order listed in `index.html`; each depends on the ones before it, so keep that order.

## Libraries (pinned)

React 18.3.1 and ReactDOM 18.3.1 from cdnjs. Fonts: Bricolage Grotesque and Figtree from Google Fonts.

## License

MIT. See [LICENSE](LICENSE).
