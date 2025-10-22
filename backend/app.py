# app.py
from flask import Flask, jsonify, send_file
from flask_cors import CORS
import logging
import os

from config import AWS_REGION, REPORT_FILE, USERS_FILE, PORT
from iam_assessment.aws_utils import list_all_iam_users, save_json_file
from iam_assessment.base_assessment import IAMSecurityAssessment
from iam_assessment.checks.mfa_check import check_users_without_mfa
from iam_assessment.checks.old_keys_check import check_old_access_keys
from iam_assessment.report_writer import load_json_report

# Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)


@app.route("/api/list-users", methods=["GET"])
def list_users():
    """
    Task 1: List all IAM users and save iam_users.json file.
    """
    try:
        users = list_all_iam_users()
        save_json_file(USERS_FILE, {"Users": users})
        return jsonify({"Users": users})
    except Exception as exc:
        logger.exception("Failed to list IAM users")
        return jsonify({"error": str(exc)}), 500


@app.route("/api/download-users", methods=["GET"])
def download_users():
    if not os.path.exists(USERS_FILE):
        return jsonify({"error": "Users file not found. Call /api/list-users first."}), 404
    return send_file(USERS_FILE, mimetype="application/json", as_attachment=True, download_name=USERS_FILE)


@app.route("/api/run-assessment", methods=["GET"])
def run_assessment():
 
    try:
        assessment = IAMSecurityAssessment(report_path=REPORT_FILE)
        
        # Register security checks
        # Add new checks here after implementing them in the checks/ directory
        assessment.register_check(lambda a: check_users_without_mfa(a))
        assessment.register_check(lambda a: check_old_access_keys(a, days_threshold=90))
        
        report = assessment.run()
        return jsonify(report)
    except Exception as exc:
        logger.exception("Failed to run assessment")
        return jsonify({"error": str(exc)}), 500


@app.route("/api/download-report", methods=["GET"])
def download_report():
    if not os.path.exists(REPORT_FILE):
        return jsonify({"error": "Report file not found. Call /api/run-assessment first."}), 404
    return send_file(REPORT_FILE, mimetype="application/json", as_attachment=True, download_name=REPORT_FILE)


if __name__ == "__main__":
    # Running locally for VS Code
    app.run(host="0.0.0.0", port=PORT)
