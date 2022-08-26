## bug types
![img_2.png](img_2.png)



### tricks
https://twitter.com/_bughunter/status/1550117700214460418

https://github.com/Net-hunter121/API-Wordlist

`ffuf -u https://target.com/api/v2/FUZZ -w api_seen_in_wild.txt -c -ac -t 250 -fc 400,404,412`

### 比较重要的api字典:


https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/common-api-endpoints-mazen160.txt

https://github.com/fuzzdb-project/fuzzdb/blob/master/discovery/common-methods/common-methods.txt

https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/raft-small-words.txt

![img_5.png](img_5.png)

https://github.com/chrislockard/api_wordlist

https://github.com/danielmiessler/SecLists/blob/master/Fuzzing/http-request-methods.txt

https://github.com/assetnote/wordlists/blob/master/data/automated.json

https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/common-api-endpoints-mazen160.txt

https://github.com/Bo0oM/fuzz.txt

https://www.fuzzingbook.org/html/APIFuzzer.html

https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/graphql.txt

https://github.com/hAPI-hacker/Hacking-APIs

https://github.com/assetnote/wordlists/blob/master/data/kiterunner.json

https://gist.github.com/yassineaboukir/8e12adefbd505ef704674ad6ad48743d

https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/swagger.txt

https://github.com/danielmiessler/SecLists/tree/master/Discovery/Web-Content/api






## methods

![img_1.png](img_1.png)


## tools
![img.png](img.png)

## fuzz出潜在的危险文件可以造成信息泄露
https://github.com/Bo0oM/fuzz.txt/blob/master/fuzz.txt


## how  to find Hidden API Functionality Exposure

https://github.com/KathanP19/HowToHunt/blob/master/API_Testing/Hidden_API_Functionality_Exposure.md

Application programming interfaces (APIs) have become a critical part of almost every business. APIs are responsible for transferring information between systems within a company or to external companies. For example, when you log in to a website like Google or Facebook, an API processes your login credentials to verify they are correct.
- Swagger UI Documentation
- Attack | Brute force
- Common wordlist for API Enum :

- https://wordlists.assetnote.io/
- https://github.com/Net-hunter121/API-Wordlist


## Steps to Perform This Attack :
>Step 1 : Capture the request into Burp, Send the request to repeater and intruder tab. <br>
Step 2 : Add the endpoint into the intruder tab and add the payload from the word-list. <br>
Step 3 : First use dictionary attack with SecLists (https://github.com/danielmiessler/SecLists) on the Endpoint. <br>
Step 4 : Either use your customized list or use the ones which I have provided in the above step. <br>
Step 5 : Then simply start the attack, start checking for 200 status.  <br>
Step 7 : Once there is HTTP 200 OK status, start the recursive scan on the same endpoint for juicy information like swagger doc and so on.  <br>
step 8 : Other method is to change the API version and try bruteforcing the same endpoint  <br>

Eg:Redacted.com/api/v1/{Endpoint} ----- Redacted.com/api/v2/{Endpoint}   <br>

Note: There will be minimum limits per request which will be assigned without API keys so make sure to utilize manual approach as much as you can, then the rest can be automated for scanning the vulnerability in API with automated tools.


## ffuf
https://twitter.com/intigriti/status/1462038022787158018

![img_4.png](img_4.png)


## API-Recon
![API_RECON.png](00_API_RECON.png)

