# FleetPulse API 🚚⚡

An enterprise-grade, multi-tenant logistics management and real-time delivery tracking engine. This platform coordinates companies, hub distribution warehouses, transport fleets, and shipment lifecycles utilizing an event-driven architecture shielded by strict cryptographic authorization boundaries.

---

## 🛠️ Tech Stack & Key Paradigms

* **Framework:** NestJS (TypeScript) with modular structures
* **Database ORM:** Prisma Client linked to a relational **PostgreSQL** instance
* **Caching & Fast Storage:** **Redis** for sub-millisecond leaderboard array tracking and atomic tracking statistics
* **Security Perimeter:** Passport JWT Strategy with dynamic custom multi-stage Roles Guards (`ADMIN`, `HUB_MANAGER`, `DRIVER`, `OPERATOR`)
* **Data Integrity Check:** Structural validation bouncers built using `class-validator` DTO contracts
* **System Communications:** Asynchronous, decoupled internal pub/sub event loops managed via `@nestjs/event-emitter`

---

## 🏗️ Architecture Design Hierarchy

The system enforces strict dependency constraints and relational isolation logic across database borders:

$$\text{Company (Master Tenant)} \longrightarrow \text{Logistics Hubs} \longrightarrow \text{Fleet Vehicles} \longrightarrow \text{Nested Shipment Packages}$$

* **Decoupled Async Boundaries:** Core lifecycle updates instantly release the user HTTP thread response window while downstream analytical metrics are delegated directly to non-blocking background event subscribers.
* **Defensive Foreign-Key Controls:** Configured with `onDelete: SetNull` parameters. Deleting a retired transport asset resets container reference indices but actively preserves valuable customer package lifecycles.

---

## 💾 Installation & Environment Assembly

### 1. Pre-requisites
Ensure you have **Node.js (v18+)**, a running **PostgreSQL** database, and an initialized **Redis** instance (`port 6379`).

### 2. Configure Environment Properties
Create a `.env` file in the root workspace project layout:
```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/fleetpulse?schema=public"
JWT_SECRET="FLEET_ACCESS_SECRET_KEY_2026"

# Install node packages
npm install

# Run database schema migrations
npx prisma migrate dev --name init_logistics_core

# Fire up the engine compiler in watch mode
npm run start:dev

🌐 Complete API Endpoints Testing Blueprint
All non-auth mutations explicitly require an authentication header pass:

Authorization: Bearer <YOUR_DECRYPTED_ACCESS_TOKEN>

🔑 1. Security & Authentication Module
POST /auth/register - Creates a new system operator profile with a structured system role (ADMIN, HUB_MANAGER, OPERATOR, DRIVER).

POST /auth/login - Verifies passwords via Bcrypt and returns a valid session signature token pair.

GET /auth/admin-only - Firewall checkpoint verification route isolating root administration profiles.

🏢 2. Tenant Infrastructure & Facility Boundaries
POST /company - Registers a new master e-commerce logistics tenant (Admin Role Only).

GET /company - Lists all registered tenant maps with their child nodes joined.

POST /hub - Establishes a localized distribution warehouse facility linked to a parent tenant.

GET /hub?companyId=<uuid> - Returns all warehouses within a company zone boundaries.

🚛 3. Fleet Assets & Shipment Registry
POST /vehicle - Registers a vehicle (TRUCK, VAN, MOTORCYCLE) and maps it to a warehouse platform.

GET /vehicle/:id - Pulls a vehicle profile with all items inside its container.

POST /shipment - Manifests a customer parcel delivery entry with an automatic starting state status (MANIFESTED).

⚡ 4. Asynchronous Event Updates & Caching Analytics
PATCH /shipment/:id - Triggers state transitions (MANIFESTED ➔ IN_TRANSIT ➔ DELIVERED). Setting status to DELIVERED dispatches an async background event signal.

GET /fleet-analytics/live-score - Serves total atomic counter variables computed from high-speed Redis instances.

GET /fleet-analytics/driver-ranking?hubId=<uuid> - Pulls top 5 performing drivers using Redis Sorted Sets optimization scores.

📈 System Scalability Metrics
By pairing Event-Driven Pub/Sub architecture with Redis In-Memory Key Stores, operational write speeds remain isolated from analytic execution paths. High-traffic warehouse reporting tools load dashboard states within < 5 milliseconds, completely shielding the transactional PostgreSQL core from performance degradation.
