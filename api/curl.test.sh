set -e  # Exit immediately if a command exits with a non-zero status.

# Register the user
echo "Running register test..."
RESPONSE=$(curl -X POST http://localhost:4321/users \
    -H "Content-Type: application/json" \
    -d '{"email":"charlie@mail.com","password":"123456789"}' -s -w "%{http_code}" -o /dev/null)
if [ "$RESPONSE" -ne 204 ]; then
    echo "Register test failed with status code $RESPONSE"
    exit 1
fi

echo "Register test passed successfully"

# Authenticate the user and extract the token
echo "Running authenticate test..."
RESPONSE=$(curl -X POST http://localhost:4321/users/auth \
    -H "Content-Type: application/json" \
    -d '{"email":"charlie@mail.com","password":"123456789"}' -s)

# Remove surrounding quotes if present
TOKEN=$(echo $RESPONSE | sed 's/"//g')

# Check if the token was extracted successfully
if [ -z "$TOKEN" ]; then
    echo "Failed to retrieve token"
    exit 1
fi

echo "Token saved successfully: $TOKEN"

# Use the token to retrieve the user's information
echo "Running retrieve test..."
RESPONSE=$(curl -X GET http://localhost:4321/users \
    -H "Authorization: Bearer $TOKEN" -s -w "%{http_code}" -o /dev/null)
if [ "$RESPONSE" -ne 200 ]; then
    echo "Retrieve test failed with status code $RESPONSE"
    exit 1
fi

echo "Retrieve test passed successfully"