import unittest

from recommender import recommend


class RecommendationTests(unittest.TestCase):
    def test_nature_favors_pokhara(self):
        results = recommend({"nature", "relaxation"}, 5)
        self.assertEqual(results[0]["destination"], "Pokhara")

    def test_short_trip_flags_high_altitude(self):
        results = recommend({"trekking"}, 3)
        self.assertFalse(results[0]["fits_duration"])

    def test_unknown_interest_rejected(self):
        with self.assertRaises(ValueError):
            recommend({"skiing"}, 5)

    def test_zero_days_rejected(self):
        with self.assertRaises(ValueError):
            recommend({"culture"}, 0)


if __name__ == "__main__":
    unittest.main()
