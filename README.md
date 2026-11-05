# Explore Nepal 🇳🇵

A responsive travel-inspiration site with searchable destinations, interest filters, favorite places, and a sample itinerary builder. Designed to be usable on **GitHub Pages** without a backend.

**[Visit the website](https://aashish-siingh.github.io/ExploreNepal/)**

## Features

- Responsive, keyboard-accessible navigation and content
- Search and category filtering for destination cards
- Save/remove favorites in your browser (localStorage; no account)
- Build a sample 3-, 5-, 7-, or 10-day itinerary by interest
- Add selected destinations directly from destination cards
- Travel preparation tips and improved mobile layout
- Separate **Python recommendation CLI** showing scoring, data modeling and unit tests

## Tech stack

- **Website:** semantic HTML, CSS, vanilla JavaScript
- **Python:** standard-library data classes, scoring, command-line arguments and `unittest`
- **Hosting:** static GitHub Pages

## Run the website locally

Open `index.html` directly or start a local static server:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Run the Python project

```bash
cd python
python recommender.py --days 5 --interests nature relaxation
python -m unittest discover -p "test_*.py"
```

The Python CLI is **not connected to the live GitHub Pages website** because GitHub Pages only serves static files. The front-end itinerary builder runs in JavaScript. Deploying a Python-backed recommendation API later would require an external hosting service.

## Limitations and honest scope

Explore Nepal is a personal portfolio and travel inspiration project, **not a travel agency**. No bookings or payments are processed. Itinerary suggestions are illustrative; they are not verified travel routes, pricing, or real-time availability. Mountain transfers and altitude considerations may require many additional days. The Python minimum-days rule is a demonstration heuristic, not professional travel advice.

## Suggested future enhancements

- More destinations with independently verified photos and geographic information
- Travel-time-aware routing and realistic multi-day itinerary planning
- Accessible maps and multilingual support
- Offline destination content and browser tests
- Deployable Python FastAPI backend with caching and tests

Built as a portfolio project to practice UI design and practical programming.
