# Dyte SDE-1 Assignment

This SDE-1 Assignment require the development of a robust log ingestor system and a user-friendly query interface. The goal is to efficiently handle large volumes of log data and provide a simple yet powerful interface for querying based on various parameters. The log ingestor should scale seamlessly, mitigating potential bottlenecks, and logs should be ingested via an HTTP server on port 3000. The query interface should support full-text search and offer filters for different log attributes. Bonus features include date range search, regular expression support, combining multiple filters, real-time capabilities, and role-based access.

## Tech Stack

*Client:* React.Js, Redux, Material UI

*Server:* Node.Js, Express.Js ,Mongodb

## Features Implemented

#### 1. Mechanism for Log Ingestion

- Implement a robust mechanism to ingest logs in the specified JSON format.

#### 2. Scalability

- Ensure the system's scalability to handle high volumes of logs efficiently.

#### 4. HTTP Server for Ingestion

- Logs should be ingested via an HTTP server running on the default port '3000'

## Bonus Features Implemented

#### 1. Search within Specific Date Ranges

- Enhance the log ingestor to support searching within specific date ranges, providing more flexibility for querying.

#### 2. Real-Time Log Ingestion

- Implement real-time log ingestion capabilities, ensuring that logs are processed and made available for querying in real-time.

#### 3. Regular Expression Support

- Extend the log ingestor to support search queries using regular expressions for more advanced log filtering.

#### 4. Combined Multiple Filters

- Allow users to combine multiple filters in a single query, enabling more complex and specific log searches.

#### 5. Role-Based Access

- Implement role-based access control to the log ingestor, restricting access based on user roles for enhanced security.

---

### File Examined When there is no indexing in DB

![logind](https://github.com/AnuragRoshan/images/blob/main/notIndex.png)

Total File Examined For Search Query On Level : "Err" is 47 , Here it is applying Linear Search

## File Examined When there is indexing in DB

![logind2](https://raw.githubusercontent.com/AnuragRoshan/images/main/index.png)

Total File Examined For Search Query On Level : “Err” is 14 , Here it is applying Binary Search

#### Indexing Optimised the search query by Logarthmic Time Complexity

---

## Demo

Video Demo Here

https://drive.google.com/file/d/1yEWF9ce-nk-nmuk6jfYmPpPu9XFLyz4_/view?usp=sharing

## Required Software

- Node Js must be installed before running project
- MongoDB compass is helpful for view database collection

## Run Locally

Clone the project

```bash
  git clone https://github.com/Suman-ojha/chat360Assignment.git
```

Move into Project folder



Move into server and install node dependencies for server side

```bash
cd server
npm i
```

Install react dependencies in client folder

```bash
cd ..
cd client
npm i
```

Run node backend in other shell

```bash
npm start
```

Run react frontend in third shell

```bash
cd ..
cd client
npm start
```

## References

- MongoDB Official Documentation : https://www.mongodb.com/docs/
- Indexing On Database : https://youtu.be/yo6ZXsgsyBA?si=Ft5swjQ9MgU-TkPi
- Front End UI : https://devsnap.me/css-toggle-switches

## Authors

- [@Suman-ojha](https://github.com/Suman-ojha)

## Feedback

If you have any feedback, please reach out to us at sumanojha1999@gmail.com

## Toggle Role Page

![mvrs6](https://github.com/AnuragRoshan/images/blob/main/log1.png)

The "Toggle Role" page enables administrators to effortlessly switch between roles, granting access to specialized query filters. This streamlined interface empowers administrators with exclusive capabilities, ensuring users maintain restricted access without compromising security.

## Filter Page

![mvrse1](https://github.com/AnuragRoshan/images/blob/main/log2.png)

![mvrs9](https://github.com/AnuragRoshan/images/blob/main/log3.png)
