import asyncio
import os
import uuid

from dotenv import load_dotenv
from livekit import api

load_dotenv(".env.local")

AGENT_NAME = "my-agent"


async def make_outbound_call(phone_number: str):

    room_name = f"learnmate-outbound-{uuid.uuid4().hex[:8]}"

    lkapi = api.LiveKitAPI(
        url=os.environ["LIVEKIT_URL"],
        api_key=os.environ["LIVEKIT_API_KEY"],
        api_secret=os.environ["LIVEKIT_API_SECRET"],
    )

    try:
        # Dispatch LearnMate agent into the room
        await lkapi.agent_dispatch.create_dispatch(
            api.CreateAgentDispatchRequest(
                agent_name=AGENT_NAME,
                room=room_name,
            )
        )

        # Start outbound phone call
        await lkapi.sip.create_sip_participant(
            api.CreateSIPParticipantRequest(
                sip_trunk_id=os.environ["SIP_TRUNK_ID"],
                sip_call_to=phone_number,
                room_name=room_name,
                participant_identity="learnmate-learner",
                participant_name="LearnMate Learner",
                wait_until_answered=True,
            )
        )

        print("====================================")
        print("LearnMate outbound call started!")
        print(f"Room: {room_name}")
        print(f"Calling: {phone_number}")
        print("====================================")

    except Exception as e:
        print(f"Outbound call failed: {e}")

    finally:
        await lkapi.aclose()


async def main():

    phone_number = input(
        "Enter phone number (+91XXXXXXXXXX): "
    ).strip()

    await make_outbound_call(phone_number)


if __name__ == "__main__":
    asyncio.run(main())
