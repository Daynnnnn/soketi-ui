#!/bin/bash

websocat -t - autoreconnect:ws://127.0.0.1:6001/app/app-key -v --ping-interval=15


# Send this event for testing:
# {"event": "pusher:subscribe", "data": { "channel": "public" } }
