#!/usr/bin/env python3

import json
import re
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = REPO_ROOT / "content" / "experience-catalog.json"
ANALYSIS_PATH = REPO_ROOT / "docs" / "website-content-analysis.md"
MONTH_PATTERN = re.compile(r"^\d{4}-(0[1-9]|1[0-2])$")


class ExperienceCatalogTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
        cls.experiences = cls.catalog["experiences"]
        cls.experience_ids = {item["id"] for item in cls.experiences}

    def test_catalog_has_expected_top_level_sections(self):
        required = {
            "schema_version",
            "updated_at",
            "source_materials",
            "importance_scale",
            "narrative_pillars",
            "experiences",
            "capability_groups",
            "credentials",
            "personal_dimensions",
            "open_questions",
            "resolved_conflicts",
            "privacy",
        }
        self.assertTrue(required.issubset(self.catalog))
        self.assertEqual(2, self.catalog["schema_version"])
        self.assertGreaterEqual(len(self.experiences), 18)

    def test_experience_records_are_complete_and_unique(self):
        required = {
            "id",
            "title",
            "type",
            "organization",
            "role",
            "period",
            "importance",
            "importance_reason",
            "website_placement",
            "verification_status",
            "public_safe_summary",
            "proof_points",
            "claim_ids",
            "cautions",
        }
        ids = [item["id"] for item in self.experiences]
        self.assertEqual(len(ids), len(set(ids)))

        for item in self.experiences:
            with self.subTest(experience=item["id"]):
                self.assertTrue(required.issubset(item))
                self.assertIn(item["importance"], {"S", "A", "B", "C"})
                self.assertIn(
                    item["verification_status"],
                    {"confirmed", "partial", "conflict"},
                )
                self.assertTrue(item["website_placement"])
                self.assertTrue(item["proof_points"])
                self.assertTrue(item["public_safe_summary"])

    def test_periods_are_valid_and_ordered(self):
        for item in self.experiences:
            period = item["period"]
            with self.subTest(experience=item["id"]):
                self.assertRegex(period["start"], MONTH_PATTERN)
                self.assertTrue(period["display"])
                if period["end"] is not None:
                    self.assertRegex(period["end"], MONTH_PATTERN)
                    self.assertLessEqual(period["start"], period["end"])

    def test_flagship_experiences_are_evidence_ready_drafts(self):
        flagships = [item for item in self.experiences if item["importance"] == "S"]
        self.assertEqual(
            {item["id"] for item in flagships},
            {
                "fairland-competitor-agent",
                "fairland-igarden",
                "baike-ai-education",
            },
        )
        for item in flagships:
            with self.subTest(experience=item["id"]):
                self.assertGreaterEqual(len(item["proof_points"]), 4)
                self.assertTrue(item["claim_ids"])

    def test_all_reported_conflicts_are_resolved(self):
        self.assertEqual([], self.catalog["open_questions"])
        expected_ids = {
            "q-hkbu-ranking",
            "q-agent-users",
            "q-agent-sqlite",
            "q-agent-brands",
            "q-studio-outreach",
            "q-mindcare-sample",
            "q-sasa-sample",
            "q-baike-school-scope",
            "q-vibecoders-scale",
        }
        resolutions = self.catalog["resolved_conflicts"]
        resolution_ids = [item["id"] for item in resolutions]
        self.assertEqual(expected_ids, set(resolution_ids))
        self.assertEqual(len(resolution_ids), len(set(resolution_ids)))

        for resolution in resolutions:
            self.assertTrue(resolution["resolution"])
            self.assertEqual("user", resolution["confirmed_by"])
            self.assertEqual("2026-09-03", resolution["confirmed_at"])
            self.assertTrue(resolution["experience_ids"])
            for experience_id in resolution["experience_ids"]:
                self.assertIn(experience_id, self.experience_ids)

        self.assertFalse(
            any(item["verification_status"] == "conflict" for item in self.experiences)
        )

    def test_confirmed_conflict_values_are_used_in_experience_records(self):
        records = {item["id"]: item for item in self.experiences}

        hkbu = " ".join(records["hkbu-masters"]["proof_points"])
        self.assertIn("专业排名前 5%", hkbu)

        agent = json.dumps(records["fairland-competitor-agent"], ensure_ascii=False)
        for fact in ["正式监控 20+ 品牌", "公司内部 200+ 用户", "SQLite", "钉钉"]:
            with self.subTest(agent_fact=fact):
                self.assertIn(fact, agent)
        self.assertNotIn("候选试跑覆盖 3 个品牌", agent)
        self.assertNotIn("候选", agent)

        igarden = json.dumps(records["fairland-igarden"], ensure_ascii=False)
        self.assertIn("联络 114 家游戏工作室和 Steam 游戏开发者", igarden)
        self.assertIn("北美多家游戏工作室进行会议交流", igarden)

        mindcare = " ".join(records["mindcare"]["proof_points"])
        self.assertIn("用户研究样本 N=60", mindcare)

        sasa = json.dumps(records["sasa-beauty"], ensure_ascii=False)
        self.assertIn("全量用户研究样本 N=158", sasa)
        self.assertIn("全部研究样本", sasa)

        vibecoders = " ".join(records["vibecoders"]["proof_points"])
        self.assertIn("5 场线下活动运营，累计规模 1000+ 人", vibecoders)

        baike = json.dumps(records["baike-ai-education"], ensure_ascii=False)
        self.assertIn("方案覆盖 15 所高校", baike)

    def test_catalog_does_not_store_private_contact_details_or_paths(self):
        serialized = json.dumps(self.catalog, ensure_ascii=False)
        for forbidden in ["18063135150", "@163.com", "/Users/", "中共党员"]:
            with self.subTest(forbidden=forbidden):
                self.assertNotIn(forbidden, serialized)

        for source in self.catalog["source_materials"]:
            self.assertNotIn("/", source["name"])

    def test_analysis_document_contains_decision_sections(self):
        analysis = ANALYSIS_PATH.read_text(encoding="utf-8")
        for heading in [
            "## 二、经历分类、时间与重要程度",
            "## 三、建议的网站板块",
            "## 五、已确认口径与保留补证项",
            "## 六、公开边界与隐私",
            "## 七、下一步建议",
        ]:
            with self.subTest(heading=heading):
                self.assertIn(heading, analysis)

    def test_analysis_document_uses_resolved_conflict_values(self):
        analysis = ANALYSIS_PATH.read_text(encoding="utf-8")
        confirmed_facts = [
            "专业排名使用前 5%",
            "公司内部 200+ 用户",
            "SQLite 数据中台真实写入业务数据",
            "正式监控 20+ 品牌",
            "联络 114 家游戏工作室和 Steam 游戏开发者",
            "MindCare 用户研究样本使用 N=60",
            "N=158 为全部研究样本",
            "5 场、累计 1000+ 人",
            "方案覆盖使用 15 所高校",
        ]
        for fact in confirmed_facts:
            with self.subTest(fact=fact):
                self.assertIn(fact, analysis)

    def test_analysis_document_has_no_trailing_whitespace(self):
        lines = ANALYSIS_PATH.read_text(encoding="utf-8").splitlines()
        violations = [number for number, line in enumerate(lines, 1) if line != line.rstrip()]
        self.assertEqual([], violations, f"Trailing whitespace on lines: {violations}")


if __name__ == "__main__":
    unittest.main()
