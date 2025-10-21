# report_writer.py
from typing import Any
import json

def load_json_report(path: str) -> Any:
    with open(path, "r", encoding="utf-8") as fh:
        return json.load(fh)
