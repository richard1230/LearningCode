
## tips-01
https://twitter.com/_zwink/status/1532768073052213248
### 10个技巧
When hunting broken access control issues, try this:
1. First use EVERY exposed GUI function available
2. Look for API docs and extract URLs
3. Look for URLs in code
4. Look for URLs in search engines
5. Look for URLs in Wayback Engine
6. Use word lists to fuzz known API paths for additional end points
7. Create two lists of all known object IDs for two different accounts
8. Logged in as account 1, try to access the object IDs of account 2 in all URLs where IDs are used
9. Replay all authenticated requests without the cookies or authorization header present.
10. On high risk endpoints which return PII or sensitive info, try parameter fuzzing to see if IDs are accepted via parameters.  

### 小结


