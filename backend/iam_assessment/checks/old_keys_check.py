# old_keys_check.py
from typing import Any
from datetime import datetime, timedelta
from botocore.exceptions import ClientError
import logging

logger = logging.getLogger(__name__)

def check_old_access_keys(assessment: Any, days_threshold: int = 90) -> None:
    """
    Find access keys older than days_threshold days.
    Append finding: "Access key older than X days".
    """
    iam = assessment.iam
    cutoff = datetime.utcnow() - timedelta(days=days_threshold)
    paginator = iam.get_paginator("list_users")
    for page in paginator.paginate():
        for user in page.get("Users", []):
            user_name = user.get("UserName")
            user_arn = user.get("Arn")
            try:
                keys_resp = iam.list_access_keys(UserName=user_name)
                keys = keys_resp.get("AccessKeyMetadata", [])
                for k in keys:
                    created = k.get("CreateDate")
                    if created:
                        created_naive = created.replace(tzinfo=None) if getattr(created, "tzinfo", None) else created
                        if created_naive < cutoff:
                            assessment.append_finding(user_name, f"Access key older than {days_threshold} days", {"access_key_id": k.get("AccessKeyId"), "user_arn": user_arn, "check": "old_keys_check"})
            except ClientError as e:
                logger.exception("list_access_keys failed for %s", user_name)
                assessment.append_finding(user_name, f"Error checking access keys: {e.response.get('Error', {}).get('Message')}", {"user_arn": user_arn, "check": "old_keys_check"})
