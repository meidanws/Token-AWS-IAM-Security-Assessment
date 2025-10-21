from typing import List, Dict, Any
import boto3
import json
import logging

logger = logging.getLogger(__name__)

def get_iam_client():
    """
    Return boto3 IAM client. boto3 reads AWS credentials from environment automatically.
    """
    return boto3.client("iam")

def list_all_iam_users() -> List[Dict[str, Any]]:
    """
    Return all IAM users using a paginator.
    """
    iam = get_iam_client()
    paginator = iam.get_paginator("list_users")
    users: List[Dict[str, Any]] = []
    for page in paginator.paginate():
        users.extend(page.get("Users", []))
    logger.info("Found %d IAM users", len(users))
    return users

def save_json_file(path: str, obj: Any) -> None:
    """
    Save any JSON-serializable object to path.
    """
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(obj, fh, indent=4, default=str)
    logger.info("Saved JSON file: %s", path)
