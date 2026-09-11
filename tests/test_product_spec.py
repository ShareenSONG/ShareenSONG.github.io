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

    def test_chinese_only_requirements_have_scope_behavior_and_acceptance(self):
        spec = SPEC_PATH.read_text(encoding="utf-8")
        requirements = spec.split("### 7.2 全中文内容范围", 1)[1].split("## 8.", 1)[0]
        acceptance = spec.split("### 中文版本验收", 1)[1].split("### 通用验收", 1)[0]
        for requirement in [
            "站点仅提供简体中文（`zh-CN`）版本",
            "不提供英文切换",
            "不读取或保存语言偏好",
            "仅必要的英文单词保留原文",
            "历史遗留的英文语言偏好不得影响页面",
            "任意子页面都显示中文",
        ]:
            with self.subTest(requirement=requirement):
                self.assertIn(requirement, requirements)
        for scenario in [
            "浏览器语言为英文", "旧的英文偏好", "没有遗留英文",
            "桌面导航保持单行", "不显示语言切换", "移动端菜单可操作",
            "PDF 保持原文件语言",
        ]:
            with self.subTest(scenario=scenario):
                self.assertIn(scenario, acceptance)
        self.assertIn("全中文站点与单行精简导航", spec)

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
