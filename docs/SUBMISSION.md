# Submission Notes

## What is implemented

All mandatory assignment requirements are implemented:

1. React frontend
2. Multi Page Application
3. Todo list page
4. Todo detail page using `?id=`
5. JavaScript backend
6. CRUD APIs
7. MongoDB persistence
8. Backend tests
9. Postman API collection
10. Markdown documentation
11. Organized code structure

## Suggested demo flow

1. Start MongoDB.
2. Run `npm install`, `npm install --prefix client`, and `npm install --prefix server`.
3. Configure `server/.env`.
4. Run `npm run dev`.
5. Open the list page.
6. Create 2–3 todos with different priorities.
7. Demonstrate search/filter/sort.
8. Mark one complete.
9. Open a todo's detail page and show the URL contains `?id=...`.
10. Edit it and save.
11. Delete a todo.
12. Run `npm test` to demonstrate automated API tests.
13. Import the Postman collection and demonstrate the CRUD endpoints.

## Interview talking points

### Why MPA?

The assignment explicitly asks for MPA instead of SPA. Rather than using React Router, the project has two Vite HTML entry points and two React entry modules. That makes the page boundary explicit.

### Why MongoDB?

The assignment gives database persistence as an option. MongoDB provides durable document storage and Mongoose gives schema validation and timestamps.

### Why controllers?

Keeping route declarations small and moving behavior into controllers makes the API easier to test and maintain.

### Why tests with MongoDB Memory Server?

Tests should be isolated from local developer data. Each test run gets a temporary MongoDB instance.

### What would I improve for production?

- Authentication/authorization
- Pagination for large todo lists
- Rate limiting
- Request logging
- Input sanitization
- Automated CI pipeline
- API versioning
- Better observability/metrics
- Integration tests for frontend behavior
