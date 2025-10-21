# mfa_check.py
from typing import Any
from botocore.exceptions import ClientError
import logging

logger = logging.getLogger(__name__)

def check_users_without_mfa(assessment: Any) -> None:
    """
    For each IAM user, check if there are MFA devices attached.
    If none, append a finding: "MFA not enabled".
    """
    iam = assessment.iam
    paginator = iam.get_paginator("list_users")
    for page in paginator.paginate():
        for user in page.get("Users", []):
            user_name = user.get("UserName")
            user_arn = user.get("Arn")
            try:
                resp = iam.list_mfa_devices(UserName=user_name)
                devices = resp.get("MFADevices", [])
                if not devices:
                    assessment.append_finding(user_name, "MFA not enabled", {"user_arn": user_arn, "check": "mfa_check"})
            except ClientError as e:
                logger.exception("list_mfa_devices failed for %s", user_name)
                assessment.append_finding(user_name, f"Error checking MFA: {e.response.get('Error', {}).get('Message')}", {"user_arn": user_arn, "check": "mfa_check"})
