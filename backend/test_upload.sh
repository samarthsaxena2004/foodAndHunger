#!/bin/bash

# Create a dummy image file
echo "dummy image content" > test_image.jpg

# Test the upload API
# Note: We use -F to send multipart/form-data. curl automatically sets the Content-Type header with the boundary.
curl -v -X POST "http://localhost:8080/api/recipient/2/upload" \
  -F "photo=@test_image.jpg" \
  -F "certificate=@test_image.jpg" \
  -F "signature=@test_image.jpg"

# Clean up
rm test_image.jpg
