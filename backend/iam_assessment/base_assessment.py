# base_assessment.py
from typing import List, Dict, Callable, Any
from datetime import datetime
import json
import logging

logger = logging.getLogger(__name__)

class IAMSecurityAssessment:
    """
    Core assessment runner. Checks can register themselves via register_check.
    Each finding will include the exact fields required by the assignment:
      - "Time Issue Found"
      - "Identity Name"
      - "Issue Name"
    """

    def __init__(self, iam_client=None, report_path: str = "iam_security_report.json"):
        import boto3
        self.iam = iam_client or boto3.client("iam")
        self.report_path = report_path
        self.report: List[Dict[str, Any]] = []
        self.checks: List[Callable[["IAMSecurityAssessment"], None]] = []

    def register_check(self, check_func: Callable[["IAMSecurityAssessment"], None]) -> None:
        self.checks.append(check_func)

    def append_finding(self, identity: str, issue: str, extra: Dict[str, Any] | None = None) -> None:
        finding = {
            "Time Issue Found": datetime.utcnow().isoformat() + "Z",
            "Identity Name": identity,
            "Issue Name": issue
        }
        if extra:
            finding.update(extra)
        self.report.append(finding)
        logger.debug("Appended finding: %s", finding)

    def run(self) -> List[Dict[str, Any]]:
        logger.info("Running %d checks", len(self.checks))
        for check in self.checks:
            try:
                check(self)
            except Exception as exc:
                logger.exception("Check '%s' raised an exception: %s", getattr(check, "__name__", str(check)), exc)
        self._save()
        return self.report

    def _save(self) -> None:
        with open(self.report_path, "w", encoding="utf-8") as fh:
            json.dump(self.report, fh, indent=4, default=str)
        logger.info("Saved report to %s with %d findings", self.report_path, len(self.report))
