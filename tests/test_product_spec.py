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

    def test_language_requirements_have_scope_behavior_and_acceptance(self):
        spec = SPEC_PATH.read_text(encoding="utf-8")
        requirements = spec.split("### 7.2 默认语言与内容范围", 1)[1].split("## 8.", 1)[0]
        acceptance = spec.split("### 语言功能验收", 1)[1].split("### 通用验收", 1)[0]
        for requirement in [
            "仅支持简体中文（`zh-CN`）和英文（`en`）",
            "首次访问、无有效语言偏好时默认中文",
            "不根据浏览器或系统语言自动切换英文",
            "仅必要的英文单词保留原文",
            "所有页面右上角显示 `中 / EN`",
            "无需先打开菜单",
            "保持当前页面、项目与锚点",
            "语言选择保存在当前浏览器本地",
            "浏览器本地存储不可用时",
            "控件支持键盘操作",
        ]:
            with self.subTest(requirement=requirement):
                self.assertIn(requirement, requirements)
        for scenario in [
            "浏览器语言为英文", "没有遗留英文", "桌面与手机",
            "项目详情或带锚点", "再次访问", "记录无效", "本地存储不可用",
            "键盘切换", "PDF 保持原文件语言",
        ]:
            with self.subTest(scenario=scenario):
                self.assertIn(scenario, acceptance)
        self.assertIn("默认中文与全站中英切换需求已确认，待页面实现", spec)

    def test_visual_direction_reference_resolves_and_replaces_old_guidance(self):
        spec = SPEC_PATH.read_text(encoding="utf-8")
        reference = "design/phase-1-design-direction.md"
        self.assertIn(f"[视觉设计规范]({reference})", spec)
        self.assertTrue((SPEC_PATH.parent / reference).is_file())
        self.assertNotIn("BLACK / MOTION / EDITORIAL", spec)
        self.assertNotIn("黑色电影式排版", spec)
        self.assertNotIn("黑色全屏层", spec)

    def test_source_photos_are_excluded_from_git(self):
        ignore = (REPO_ROOT / ".gitignore").read_text(encoding="utf-8")
        self.assertIn("/photo/", ignore)

    def test_spec_has_no_trailing_whitespace(self):
        lines = SPEC_PATH.read_text(encoding="utf-8").splitlines()
        violations = [number for number, line in enumerate(lines, 1) if line != line.rstrip()]
        self.assertEqual([], violations, f"Trailing whitespace on lines: {violations}")


if __name__ == "__main__":
    unittest.main()
