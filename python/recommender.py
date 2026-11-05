"""Offline destination recommendation engine for Explore Nepal.

This Python module is a standalone demonstration; the GitHub Pages website
uses JavaScript and does not execute Python on the server.
"""
from __future__ import annotations

import argparse
from dataclasses import dataclass


@dataclass(frozen=True)
class Destination:
    name: str
    interests: frozenset[str]
    min_days: int
    note: str


DESTINATIONS = (
    Destination("Kathmandu", frozenset({"culture", "food", "history"}), 2,
                "Historic districts and heritage sites."),
    Destination("Pokhara", frozenset({"nature", "relaxation", "adventure"}), 2,
                "Lakeside scenery and access to mountain adventures."),
    Destination("Manang & Mustang", frozenset({"adventure", "nature", "trekking"}), 7,
                "High-altitude travel requires careful planning and acclimatization."),
)
VALID_INTERESTS = frozenset().union(*(place.interests for place in DESTINATIONS))


def recommend(interests: set[str], days: int) -> list[dict[str, object]]:
    """Score matches; prefer places compatible with the available days."""
    if days < 1:
        raise ValueError("days must be positive")
    if not interests:
        raise ValueError("provide at least one interest")
    unknown = interests - VALID_INTERESTS
    if unknown:
        raise ValueError(f"Unknown interests: {', '.join(sorted(unknown))}")
    results = []
    for place in DESTINATIONS:
        matches = sorted(place.interests & interests)
        if not matches:
            continue
        feasible = days >= place.min_days
        results.append({
            "destination": place.name,
            "matches": matches,
            "score": 10 * len(matches) + (5 if feasible else 0),
            "fits_duration": feasible,
            "minimum_suggested_days": place.min_days,
            "note": place.note,
        })
    return sorted(results, key=lambda r: (-int(r["score"]), str(r["destination"])))


def main() -> None:
    parser = argparse.ArgumentParser(description="Explore Nepal offline recommender")
    parser.add_argument("--days", type=int, default=5)
    parser.add_argument("--interests", nargs="+", default=["culture", "nature"])
    args = parser.parse_args()
    try:
        results = recommend(set(args.interests), args.days)
    except ValueError as exc:
        parser.error(str(exc))
    if not results:
        print("No destinations matched these interests.")
    for item in results:
        label = "Suitable for trip length" if item["fits_duration"] else "May need more days"
        print(f"{item['destination']}: {item['score']} points | {label}")
        print(f"  Matches: {', '.join(item['matches'])}. {item['note']}")


if __name__ == "__main__":
    main()
