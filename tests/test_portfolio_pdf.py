#!/usr/bin/env python3

import shutil
import subprocess
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = REPO_ROOT / "output" / "pdf" / "shareen-song-portfolio-website.pdf"


class PortfolioPdfTest(unittest.TestCase):
    def test_pdf_intermediates_are_not_committed(self):
        ignore = (REPO_ROOT / ".gitignore").read_text(encoding="utf-8")
        self.assertIn("/tmp/", ignore)

    def test_export_is_a_substantial_pdf(self):
        self.assertTrue(PDF_PATH.is_file(), f"Missing PDF export: {PDF_PATH}")
        self.assertGreater(PDF_PATH.stat().st_size, 1_000_000)
        self.assertEqual(b"%PDF-", PDF_PATH.read_bytes()[:5])

    def test_export_is_a_twelve_page_tagged_a4_document(self):
        pdfinfo = shutil.which("pdfinfo")
        if not pdfinfo:
            self.skipTest("pdfinfo is not installed")

        result = subprocess.run(
            [pdfinfo, str(PDF_PATH)],
            check=True,
            capture_output=True,
            text=True,
        )
        self.assertIn("Title:           Shareen Song", result.stdout)
        self.assertIn("Tagged:          yes", result.stdout)
        self.assertIn("Pages:           12", result.stdout)
        self.assertIn("A4", result.stdout)
        self.assertIn("Encrypted:       no", result.stdout)


if __name__ == "__main__":
    unittest.main()
