import json
import uuid
from datetime import datetime, timezone
from pathlib import Path

ESCALATION_FILE = Path(__file__).parent / "escalations.json"


def create_escalation(
    user_id: str,
    name: str,
    reason: str,
    summary: str,
    urgency: str,
    language: str,
    preferred_follow_up: str,
) -> str:
    """
    Creates a human-help request for LearnMate.

    Use this when:
    1. A learner is significantly frustrated or unable to continue.
    2. A learner explicitly asks to speak with a teacher.

    Always ask the learner for permission before calling this function.
    Never include passwords, OTPs, PINs, account numbers, or sensitive data.
    """

    reference_id = f"LM-{uuid.uuid4().hex[:8].upper()}"

    request = {
        "reference_id": reference_id,
        "user_id": user_id,
        "name": name,
        "reason": reason,
        "summary": summary,
        "urgency": urgency,
        "language": language,
        "preferred_follow_up": preferred_follow_up,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "open",
    }

    if ESCALATION_FILE.exists():
        try:
            requests = json.loads(ESCALATION_FILE.read_text())
        except (json.JSONDecodeError, OSError):
            requests = []
    else:
        requests = []

    requests.append(request)

    ESCALATION_FILE.write_text(
        json.dumps(requests, indent=2),
        encoding="utf-8",
    )

    return reference_id