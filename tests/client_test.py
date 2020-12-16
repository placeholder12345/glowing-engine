from unittest import TestCase

from server import create_app
from config import Config


class DatabaseTest(TestCase):
    def setUp(self):
        config = Config()
        self.app = create_app(config)
        self.client = self.app.test_client()

    def test_index_page(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
