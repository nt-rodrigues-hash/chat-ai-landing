# Security Best Practices

## Input Validation
- Always validate and sanitize user input
- Use libraries like Joi or Yup for validation
- Implement rate limiting to prevent brute force attacks

## Authentication & Authorization
- Use strong, salted passwords
- Implement JWT with short lifetimes
- Store secrets in environment variables

## HTTPS & Headers
- Enforce HTTPS in production
- Use Helmet middleware in Node.js
- Set CORS policies appropriately

## Data Protection
- Encrypt sensitive data at rest
- Use parameterized queries to prevent SQL injection
- Follow the principle of least privilege

[[node_best_practices]]
[[testing_strategies]]
[[logging_and_monitoring]]
