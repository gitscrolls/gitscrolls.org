#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🧪 Starting GitScrolls E2E Tests in Docker${NC}"

# Clean up previous test results
rm -rf playwright-report test-results

# Run tests
echo -e "${GREEN}🐳 Starting test environment...${NC}"
docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit

# Check exit code
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
    echo -e "${GREEN}📊 Test report available at: playwright-report/index.html${NC}"
else
    echo -e "${RED}❌ Some tests failed!${NC}"
    echo -e "${YELLOW}📊 Check the test report at: playwright-report/index.html${NC}"
    exit 1
fi

# Clean up
echo -e "${YELLOW}🧹 Cleaning up...${NC}"
docker-compose -f docker-compose.test.yml down

echo -e "${GREEN}✨ Done!${NC}"