#!/usr/bin/env python3

import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
SPEC_PATH = REPO_ROOT / "docs" / "product-spec-v1.md"
SITE_APP = REPO_ROOT / "site" / "app"
PUBLIC = REPO_ROOT / "site" / "public"


class ProductSpecImplementationTest(unittest.TestCase):
    def test_product_spec_records_mvp_routes_and_content_boundaries(self):
        spec = SPEC_PATH.read_text(encoding="utf-8")
        for route in ["`/`", "`/work`", "`/work/[slug]`", "`/thoughts`", "`/life`"]:
            with self.subTest(route=route):
                self.assertIn(route, spec)
        self.assertIn("LinkedIn URL 尚未提供", spec)
        self.assertIn("不虚构该案例", spec)
        self.assertIn("不创建空白详情页或虚假外链", spec)

    def test_mvp_route_files_and_assets_exist(self):
        expected = [
            SITE_APP / "page.tsx",
            SITE_APP / "work" / "page.tsx",
            SITE_APP / "work" / "[slug]" / "page.tsx",
            SITE_APP / "thoughts" / "page.tsx",
            SITE_APP / "life" / "page.tsx",
            PUBLIC / "shareen-song-resume.pdf",
            PUBLIC / "og.png",
        ]
        for path in expected:
            with self.subTest(path=path.name):
                self.assertTrue(path.is_file(), f"Missing MVP artifact: {path}")

    def test_source_photos_are_excluded_from_git(self):
        ignore = (REPO_ROOT / ".gitignore").read_text(encoding="utf-8")
        self.assertIn("/photo/", ignore)

    def test_spec_has_no_trailing_whitespace(self):
        lines = SPEC_PATH.read_text(encoding="utf-8").splitlines()
        violations = [number for number, line in enumerate(lines, 1) if line != line.rstrip()]
        self.assertEqual([], violations, f"Trailing whitespace on lines: {violations}")


if __name__ == "__main__":
    unittest.main()
