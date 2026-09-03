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
            "privacy",
        }
        self.assertTrue(required.issubset(self.catalog))
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

    def test_open_questions_reference_known_experiences(self):
        question_ids = []
        referenced = set()
        for question in self.catalog["open_questions"]:
            question_ids.append(question["id"])
            self.assertTrue(question["issue"])
            self.assertTrue(question["recommended_evidence"])
            self.assertTrue(question["experience_ids"])
            for experience_id in question["experience_ids"]:
                self.assertIn(experience_id, self.experience_ids)
                referenced.add(experience_id)

        self.assertEqual(len(question_ids), len(set(question_ids)))
        conflicted = {
            item["id"]
            for item in self.experiences
            if item["verification_status"] == "conflict"
        }
        self.assertTrue(conflicted.issubset(referenced))

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
            "## 五、内容冲突与补证清单",
            "## 六、公开边界与隐私",
            "## 七、下一步建议",
        ]:
            with self.subTest(heading=heading):
                self.assertIn(heading, analysis)


if __name__ == "__main__":
    unittest.main()
