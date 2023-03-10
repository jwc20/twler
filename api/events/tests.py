from django.test import TestCase
from .models import Event


class EventModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Event.objects.create(
            name="European Championships",
            event_url="?event_id=508",
            location="RUS",
            date="2021-04-03",
        )

    def test_name_content(self):
        event = Event.objects.get(id=1)
        expected_object_name = f"{event.name}"
        self.assertEqual(expected_object_name, "European Championships")

    def test_event_url_content(self):
        event = Event.objects.get(id=1)
        expected_object_name = f"{event.event_url}"
        self.assertEqual(expected_object_name, "?event_id=508")

    def test_location_content(self):
        event = Event.objects.get(id=1)
        expected_object_name = f"{event.location}"
        self.assertEqual(expected_object_name, "RUS")

    def test_date_content(self):
        event = Event.objects.get(id=1)
        expected_object_name = f"{event.date}"
        self.assertEqual(expected_object_name, "2021-04-03")
