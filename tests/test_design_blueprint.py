#!/usr/bin/env python3

import json
import re
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
BLUEPRINT_PATH = REPO_ROOT / "design" / "phase-1-blueprint.json"
CATALOG_PATH = REPO_ROOT / "content" / "experience-catalog.json"
DIRECTION_PATH = REPO_ROOT / "docs" / "design" / "phase-1-design-direction.md"
HEX_COLOR = re.compile(r"^#[0-9A-F]{6}$")


class PhaseOneDesignBlueprintTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.blueprint = json.loads(BLUEPRINT_PATH.read_text(encoding="utf-8"))
        cls.catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
        cls.experience_ids = {item["id"] for item in cls.catalog["experiences"]}

    def test_blueprint_has_phase_one_contract(self):
        self.assertEqual(1, self.blueprint["phase"])
        self.assertEqual("design_direction_ready", self.blueprint["status"])
        self.assertIn("编写页面或组件", self.blueprint["scope"]["not_in_scope"])
        self.assertIn("部署网站", self.blueprint["scope"]["not_in_scope"])

    def test_all_reference_pages_are_recorded(self):
        expected = {
            "https://youdooplay.com/",
            "https://youdooplay.com/News/",
            "https://youdooplay.com/Support/",
            "https://youdooplay.com/AboutUs/",
        }
        self.assertEqual(
            expected,
            set(self.blueprint["source_interpretation"]["reference_pages"]),
        )

    def test_measured_layout_baseline_is_preserved(self):
        desktop = self.blueprint["reference_observations"]["desktop_1440"]
        mobile = self.blueprint["reference_observations"]["mobile_390"]
        self.assertEqual(1180, desktop["container_max_width_px"])
        self.assertEqual(56, desktop["header"]["height_px"])
        self.assertEqual(900, desktop["home_hero"]["height_px"])
        self.assertEqual(72, desktop["home_hero"]["title_size_px"])
        self.assertEqual(360, mobile["header_width_px"])
        self.assertEqual(844, mobile["hero_height_px"])
        self.assertEqual(40, mobile["hero_title_size_px"])

    def test_design_colors_are_valid_and_include_core_palette(self):
        colors = self.blueprint["design_tokens"]["color"]
        for name, value in colors.items():
            with self.subTest(color=name):
                self.assertRegex(value, HEX_COLOR)
        self.assertEqual("#FFDF00", colors["signal_yellow"])
        self.assertEqual("#131924", colors["ink"])
        self.assertEqual("#F7F8FA", colors["canvas"])

    def test_page_map_has_portfolio_routes(self):
        pages = {page["path"]: page for page in self.blueprint["page_map"]}
        self.assertTrue({"/", "/work", "/work/[slug]", "/notes", "/about"}.issubset(pages))
        for path, page in pages.items():
            with self.subTest(path=path):
                self.assertTrue(page["purpose"])
                self.assertTrue(page["reference_pattern"])
                self.assertTrue(page["sections"])

    def test_home_sections_are_unique_and_match_page_map(self):
        home_sections = self.blueprint["home_sections"]
        section_ids = [section["id"] for section in home_sections]
        self.assertEqual(len(section_ids), len(set(section_ids)))
        page_home = next(page for page in self.blueprint["page_map"] if page["path"] == "/")
        self.assertEqual(page_home["sections"], section_ids)

        for section in home_sections:
            with self.subTest(section=section["id"]):
                self.assertIn(section["priority"], {"S", "A", "B"})
                self.assertTrue(section["objective"])
                self.assertTrue(section["layout"])
                self.assertTrue(section["motion"])
                self.assertTrue(section["asset_needs"])

    def test_featured_work_uses_catalog_flagships(self):
        flagship_ids = {
            item["id"]
            for item in self.catalog["experiences"]
            if item["importance"] == "S"
        }
        featured = next(
            section
            for section in self.blueprint["home_sections"]
            if section["id"] == "home-flagship-work"
        )["content"]["experience_ids"]
        self.assertEqual(flagship_ids, set(featured))

        serialized = json.dumps(self.blueprint, ensure_ascii=False)
        for experience_id in re.findall(r'"([a-z0-9-]+)"', serialized):
            if experience_id.startswith(("fairland-", "baike-", "hkbu-", "jinan-")):
                self.assertIn(experience_id, self.experience_ids)

    def test_blueprint_does_not_hotlink_reference_assets(self):
        serialized = json.dumps(self.blueprint, ensure_ascii=False)
        self.assertNotIn("/uploads/", serialized)
        self.assertNotIn("/template/pc/", serialized)
        self.assertIn("prefers-reduced-motion", serialized)

    def test_direction_document_has_required_sections_and_clean_lines(self):
        text = DIRECTION_PATH.read_text(encoding="utf-8")
        for heading in [
            "## 2. 参考站实测观察",
            "## 3. 个人品牌方向",
            "## 4. 视觉系统",
            "## 5. 页面信息架构",
            "## 7. 动效原则",
            "## 8. 响应式策略",
            "## 9. 素材盘点",
            "## 10. 第一阶段决策与下一步",
        ]:
            with self.subTest(heading=heading):
                self.assertIn(heading, text)

        violations = [
            number
            for number, line in enumerate(text.splitlines(), 1)
            if line != line.rstrip()
        ]
        self.assertEqual([], violations, f"Trailing whitespace on lines: {violations}")


if __name__ == "__main__":
    unittest.main()
