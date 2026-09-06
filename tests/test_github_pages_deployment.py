#!/usr/bin/env python3

import json
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
SITE_ROOT = REPO_ROOT / "site"
WORKFLOW_PATH = REPO_ROOT / ".github" / "workflows" / "deploy-pages.yml"


class GitHubPagesDeploymentTest(unittest.TestCase):
    def test_next_build_exports_a_pages_compatible_static_site(self):
        config = (SITE_ROOT / "next.config.ts").read_text(encoding="utf-8")
        self.assertIn("process.env.GITHUB_PAGES === 'true'", config)
        self.assertIn("output: 'export' as const", config)
        self.assertIn("trailingSlash: true", config)
        self.assertIn("unoptimized: true", config)
        self.assertTrue((SITE_ROOT / "public" / ".nojekyll").is_file())

    def test_package_exposes_a_dedicated_pages_build(self):
        package = json.loads((SITE_ROOT / "package.json").read_text(encoding="utf-8"))
        self.assertEqual(
            "GITHUB_PAGES=true next build",
            package["scripts"]["build:pages"],
        )

    def test_workflow_builds_and_deploys_the_static_export(self):
        workflow = WORKFLOW_PATH.read_text(encoding="utf-8")
        for required in [
            "pages: write",
            "id-token: write",
            "npm ci",
            "npm run build:pages",
            "actions/upload-pages-artifact@v4",
            "path: site/out",
            "actions/deploy-pages@v4",
        ]:
            with self.subTest(required=required):
                self.assertIn(required, workflow)

    def test_public_metadata_uses_the_github_pages_origin(self):
        layout = (SITE_ROOT / "app" / "layout.tsx").read_text(encoding="utf-8")
        self.assertIn("https://shareensong.github.io", layout)
        self.assertNotIn("chatgpt.site", layout)


if __name__ == "__main__":
    unittest.main()
