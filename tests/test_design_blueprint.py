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

    def test_blueprint_has_revised_phase_one_contract(self):
        self.assertEqual(2, self.blueprint["schema_version"])
        self.assertEqual(1, self.blueprint["phase"])
        self.assertEqual("visual_direction_revised", self.blueprint["status"])
        self.assertEqual("BLACK / MOTION / EDITORIAL", self.blueprint["style_name"])
        self.assertIn("编写页面或组件", self.blueprint["scope"]["not_in_scope"])
        self.assertIn("部署网站", self.blueprint["scope"]["not_in_scope"])

    def test_both_reference_sites_and_roles_are_recorded(self):
        sites = {
            site["id"]: site
            for site in self.blueprint["source_interpretation"]["reference_sites"]
        }
        self.assertEqual({"youdoo", "ysl"}, set(sites))
        self.assertEqual("https://youdooplay.com/", sites["youdoo"]["url"])
        self.assertEqual("https://www.ysl.com/en-en", sites["ysl"]["url"])
        self.assertIn("交互骨架", sites["youdoo"]["primary_role"])
        self.assertIn("视觉气质", sites["ysl"]["primary_role"])

        ratios = self.blueprint["brief_interpretation"]["blend_ratio"]
        for ratio in ratios.values():
            self.assertEqual(100, sum(ratio.values()))

    def test_measured_reference_baselines_are_preserved(self):
        observations = self.blueprint["reference_observations"]
        youdoo_desktop = observations["youdoo"]["desktop_1440x900"]
        youdoo_mobile = observations["youdoo"]["mobile_390x844"]
        ysl_desktop = observations["ysl"]["desktop_1440x900"]

        self.assertEqual(1180, youdoo_desktop["container_max_width_px"])
        self.assertEqual(56, youdoo_desktop["header"]["height_px"])
        self.assertEqual(900, youdoo_desktop["home_hero"]["height_px"])
        self.assertEqual(40, youdoo_mobile["hero_title_size_px"])

        self.assertEqual(80, ysl_desktop["header"]["height_px"])
        self.assertEqual([1440, 900], ysl_desktop["hero"]["size_px"])
        self.assertEqual([534, 667], ysl_desktop["editorial_gallery"]["image_size_px"])
        self.assertFalse(ysl_desktop["custom_cursor_observed"])

    def test_personal_palette_is_black_first_and_has_no_yellow(self):
        colors = self.blueprint["design_tokens"]["color"]
        for name, value in colors.items():
            with self.subTest(color=name):
                self.assertRegex(value, HEX_COLOR)

        self.assertEqual("#050505", colors["black_canvas"])
        self.assertEqual("#F3F0E9", colors["ivory"])
        self.assertEqual("#5A1018", colors["oxblood"])
        self.assertNotIn("#FFDF00", colors.values())

        guardrails = " ".join(self.blueprint["design_guardrails"]["avoid"])
        self.assertIn("黄色主色", guardrails)

    def test_page_map_has_portfolio_routes_and_valid_sections(self):
        pages = {page["path"]: page for page in self.blueprint["page_map"]}
        self.assertTrue({"/", "/work", "/work/[slug]", "/notes", "/about"}.issubset(pages))
        for path, page in pages.items():
            with self.subTest(path=path):
                self.assertTrue(page["purpose"])
                self.assertTrue(page["reference_pattern"])
                self.assertTrue(page["sections"])

    def test_high_level_home_flow_is_unique_and_matches_page_map(self):
        flow = self.blueprint["high_level_site_flow"]
        flow_ids = [section["id"] for section in flow]
        self.assertEqual(len(flow_ids), len(set(flow_ids)))
        home_page = next(page for page in self.blueprint["page_map"] if page["path"] == "/")
        self.assertEqual(home_page["sections"], flow_ids)

        for section in flow:
            with self.subTest(section=section["id"]):
                self.assertTrue(section["purpose"])
                self.assertTrue(section["layout"])
                self.assertTrue(section["source_blend"])

    def test_featured_work_uses_catalog_flagships(self):
        flagship_ids = {
            item["id"]
            for item in self.catalog["experiences"]
            if item["importance"] == "S"
        }
        featured = set(self.blueprint["experience_mapping"]["flagship_ids"])
        self.assertEqual(flagship_ids, featured)

        serialized = json.dumps(self.blueprint, ensure_ascii=False)
        for experience_id in re.findall(r'"([a-z0-9-]+)"', serialized):
            if experience_id.startswith(("fairland-", "baike-", "hkbu-", "jinan-")):
                self.assertIn(experience_id, self.experience_ids)

    def test_interaction_inventory_covers_core_reference_patterns(self):
        interactions = {
            interaction["id"]: interaction
            for interaction in self.blueprint["interaction_inventory"]
        }
        required = {
            "cursor_follow",
            "smooth_scroll",
            "full_screen_scene_transition",
            "pinned_case_story",
            "radial_case_wheel",
            "horizontal_media_rail",
            "nav_flip",
            "header_morph",
            "split_editorial_gallery",
            "page_transition",
            "video_control",
        }
        self.assertTrue(required.issubset(interactions))

        for interaction_id, interaction in interactions.items():
            with self.subTest(interaction=interaction_id):
                self.assertTrue(interaction["source"])
                self.assertTrue(interaction["behavior"])
                self.assertTrue(interaction["touch_fallback"])
                self.assertTrue(interaction["reduced_motion"])

    def test_background_shares_and_accessibility_contract(self):
        self.assertEqual(
            100,
            sum(scene["share_percent"] for scene in self.blueprint["background_system"]),
        )
        accessibility = self.blueprint["accessibility_and_performance"]
        self.assertIn("pointer:fine", accessibility["pointer"])
        self.assertIn("keyboard", accessibility["keyboard"])
        self.assertIn("prefers-reduced-motion", accessibility["motion"])
        self.assertIn("muted", accessibility["video"])

    def test_blueprint_does_not_hotlink_reference_assets(self):
        serialized = json.dumps(self.blueprint, ensure_ascii=False)
        self.assertNotIn("/uploads/", serialized)
        self.assertNotIn("/template/pc/", serialized)
        self.assertIn("No Youdoo or YSL media", serialized)

    def test_direction_document_has_required_sections_and_clean_lines(self):
        text = DIRECTION_PATH.read_text(encoding="utf-8")
        for heading in [
            "## 2. 两个参考站分别提供什么",
            "## 3. 专属视觉概念",
            "## 4. 色彩、字体与材质",
            "## 5. 背景与影像系统",
            "## 6. 总体布局语法",
            "## 7. 交互方式清单",
            "## 8. 响应式与无障碍原则",
            "## 9. 素材与内容准备",
            "## 10. 第一阶段决策与下一步",
        ]:
            with self.subTest(heading=heading):
                self.assertIn(heading, text)

        self.assertIn("YSL 提供视觉气质，Youdoo 提供交互骨架", text)
        self.assertIn("`#050505`", text)
        self.assertIn("鼠标跟随", text)

        violations = [
            number
            for number, line in enumerate(text.splitlines(), 1)
            if line != line.rstrip()
        ]
        self.assertEqual([], violations, f"Trailing whitespace on lines: {violations}")


if __name__ == "__main__":
    unittest.main()
