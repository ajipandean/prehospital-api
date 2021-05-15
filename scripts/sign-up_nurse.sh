PAYLOAD=$(cat scripts/payload/sign-up_nurse_payload.json)

curl -X POST http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  -d "$PAYLOAD"
