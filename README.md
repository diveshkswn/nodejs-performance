# Node.js Performance Repository

This repository is designed to test and optimize the performance of a Node.js application using clustering and load testing.

## Getting Started

### Step 1: Run the Development Server

To start the development server in cluster mode, use the following command:

```bash
npm run dev-cluster
```

### Step 2: Perform a Load Test

Once the server is running, simulate load on the application by running the following command:

```bash
npx loadtest -c 10 --rps 20 http://localhost:3000
```

### Step 3: Optimize Forks

To improve performance, consider increasing the number of forks in the `server-with-cluster.js` file.

### Step 4: Re-run the Development Server

After adjusting the fork settings, restart the development server:

```bash
npm run dev-cluster
```

### Step 5: Re-run the Load Test

Finally, re-run the load test to evaluate the impact of the changes:

```bash
npx loadtest -c 10 --rps 20 http://localhost:3000
```
