#!/usr/bin/env python3

import json
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
BLUEPRINT_PATH = REPO_ROOT / "design" / "phase-1-blueprint.json"
CATALOG_PATH = REPO_ROOT / "content" / "experience-catalog.json"
DIRECTION_PATH = REPO_ROOT / "docs" / "design" / "phase-1-design-direction.md"


class PhaseOneDesignBlueprintTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.blueprint = json.loads(BLUEPRINT_PATH.read_text(encoding="utf-8"))
        cls.catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))

    def test_blueprint_matches_the_confirmed_visual_direction(self):
        self.assertEqual(3, self.blueprint["schema_version"])
        self.assertEqual("implementation_ready", self.blueprint["status"])
        self.assertEqual("SOFT IRIDESCENT EDITORIAL", self.blueprint["style_name"])
        self.assertEqual("2026-09-11", self.blueprint["updated_at"])

        colors = self.blueprint["design_tokens"]["color"]
        self.assertEqual("#F4F4F4", colors["paper"])
        self.assertEqual("#242424", colors["ink"])
        self.assertEqual("#3B2561", colors["deep_violet"])
        self.assertNotIn("#050505", colors.values())

    def test_bright_background_share_and_guardrails_are_explicit(self):
        backgrounds = {item["id"]: item for item in self.blueprint["background_system"]}
        self.assertGreaterEqual(backgrounds["paper-editorial"]["share_percent"], 70)
        self.assertLessEqual(backgrounds["deep-violet-anchor"]["share_percent"], 15)
        self.assertEqual(100, sum(item["share_percent"] for item in backgrounds.values()))

        avoid = " ".join(self.blueprint["design_guardrails"]["avoid"])
        for phrase in ["黑色主背景", "clip-path polygon", "尖角", "玻璃拟态", "高对比衬线"]:
            self.assertIn(phrase, avoid)

    def test_language_contract_is_chinese_first_and_bilingual(self):
        language = self.blueprint["language_contract"]
        self.assertEqual(["zh-CN", "en"], language["supported"])
        self.assertEqual("zh-CN", language["default"])
        self.assertFalse(language["browser_detection"])
        self.assertIn("localStorage", language["persistence"])
        self.assertIn("hash", language["switch_behavior"])
        self.assertIn("404", language["coverage"])
        self.assertIn("image alt text", language["coverage"])

    def test_page_map_covers_the_mvp_routes(self):
        pages = {page["path"]: page for page in self.blueprint["page_map"]}
        expected = {"/", "/work", "/work/[slug]", "/thoughts", "/life", "/shareen-song-resume.pdf", "/#contact"}
        self.assertEqual(expected, set(pages))
        self.assertEqual(
            ["context", "problem", "research", "insight", "decision", "solution", "role", "outcome", "reflection"],
            pages["/work/[slug]"]["sections"],
        )

    def test_featured_work_uses_catalog_flagships(self):
        flagships = {item["id"] for item in self.catalog["experiences"] if item["importance"] == "S"}
        self.assertEqual(flagships, set(self.blueprint["experience_mapping"]["flagship_ids"]))

    def test_supplied_assets_and_accessibility_are_recorded(self):
        serialized = json.dumps(self.blueprint, ensure_ascii=False)
        for asset in ["02.png", "03.png", "04.png", "05.png", "06.png"]:
            self.assertIn(asset, serialized)
        self.assertIn("pointer:fine", self.blueprint["accessibility_and_performance"]["pointer"])
        self.assertIn("keyboard", self.blueprint["accessibility_and_performance"]["keyboard"])
        self.assertIn("prefers-reduced-motion", self.blueprint["accessibility_and_performance"]["motion"])
        self.assertIn("No Youdoo or YSL media", serialized)

    def test_direction_document_has_required_sections_and_clean_lines(self):
        text = DIRECTION_PATH.read_text(encoding="utf-8")
        for heading in [
            "## 2. PPT 的可核验视觉事实", "## 3. 新的专属视觉概念", "## 4. 色彩与光感",
            "## 5. 形状系统", "## 6. Hero 设计方向", "## 7. 字体与排版",
            "## 8. 页面节奏与组件语法", "## 9. 动效、响应式与无障碍", "## 10. 明确禁用项",
        ]:
            self.assertIn(heading, text)
        self.assertIn("SOFT IRIDESCENT EDITORIAL", text)
        violations = [number for number, line in enumerate(text.splitlines(), 1) if line != line.rstrip()]
        self.assertEqual([], violations, f"Trailing whitespace on lines: {violations}")


if __name__ == "__main__":
    unittest.main()
