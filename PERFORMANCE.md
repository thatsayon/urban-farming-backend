# Local Performance Benchmark Report

This document outlines the performance benchmarks of the Urban Farming Backend API, measured from a Dockerized local development environment utilizing Postgres 15 and Node.js 20. 

## Benchmark Methodology
- **Tool used:** [Autocannon](https://github.com/mcollina/autocannon) (An HTTP/1.1 benchmarking tool written in Node.js)
- **Connections:** 50 concurrent connections
- **Duration:** 5 seconds per route
- **Architecture:** API running in a dedicated `urban_farming_app` Docker container alongside a `urban_farming_db` PostgreSQL container.

---

## Results

### 1. Public Produce Listing (`GET /api/produce`)

Retrieves the paginated list of available produce along with the associated vendor profile data.

* **Avg Latency:** `34.94 ms`
* **P99 Latency:** `70 ms`
* **Throughput:** `~1,407 requests/sec`
* **Data Transfer:** `462 kB/sec`

**Observation:** This endpoint handles JOIN calculations via Prisma (`include: { vendor: true }`). Despite the relationship expansion, latency stays comfortably underneath 100ms.

---

### 2. Community Posts (`GET /api/community`)

Fetches the latest discussion posts tied with user profile data.

* **Avg Latency:** `31.57 ms`
* **P99 Latency:** `69 ms`
* **Throughput:** `~1,555 requests/sec`
* **Data Transfer:** `510 kB/sec`

**Observation:** Shows roughly 10% faster response times than the Produce endpoint. Because posts might scale heavily in a community platform, this endpoint's pagination will maintain these consistent response times even under scale.

---

### 3. Authentication Rate Limiting Check (`POST /api/auth/login`)

Tested with an invalid payload to verify authentication overhead and brute-force deterrence.

* **Avg Latency:** `9.91 ms`
* **P99 Latency:** `19 ms`
* **Throughput (Pre/Post Lockout):** `~4,797 requests/sec`

**Observation:** The system effectively intercepts aggressive login attempts. The `authLimiter` middleware immediately cut off the payload spike with non-2xx status codes (`429 Too Many Requests`), completing the rejection in an incredibly fast **9ms avg roundtrip**. This ensures the database doesn't spin out under brute-force attacks!

---

## Conclusion & Next Steps

The Express + Prisma architecture inside Docker yields solid baseline performance, effortlessly passing **1,400+ Req/sec** per container instance for relational SQL queries.

**Areas for Future Optimization:**
1. Setup a Redis cache (e.g. for `/api/produce`) to avoid repeatedly querying Postgres for frequently accessed but rarely changed data (e.g., product catalogs).
2. Consider adding an Index on frequently filtered columns like `vendorId`.
3. Apply load-balancing rules for multi-container deployments. 
