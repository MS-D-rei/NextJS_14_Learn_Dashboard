## Next.js App Router Course - Memo 

This is my note for [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Chapter 3 Optimizing Fonts and Images

### 1. Why optimize font?
This is for Cumulative Layout Shift (CLS) problem
what is CLS? (Ref: https://web.dev/articles/cls)
CLS is a measure of the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifespan of a page.

Layout shift score = impact fraction * distance fraction

impact fraction: indicates the impact unstable elements affect on the current user screen
distance fraction: indicates the distance the unstable elements moved from starting point

check the detailed example in the URL above.

### 2. Why optimize images?
We can use <img>. However, we have to manually do the following things.
- Ensure our image is responsive on screen sizes.
- Specify image sizes for different devices.
- Prevent layout shift when load image.
- Lazy load images that are outside the user's viewpoint.
NextJS Image resolves these issues.

## Chapter 4, 5 Layouts, pages and Navigation

How Routing and Navigation works
Ref: https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works

### 1. Prefetching
- <Link> components: automatically prefetch the page contents of the link.
Prefetching happens when the page first loads or it comes into view through scrolling.
<Link> for static routes => the entire route is prefetched and cached by default
<Link> for dynamic routes => fetch only shared layout until first loading.tsx is fetched and cached for 30s.
fetch all dynamic routes are not effective.
- router.prefetch(): useRouter hook

### 2. Caching
NextJS has an in-memory client-side cache called Router Cache.
As users navigate around the app, the prefetched payload of React Server Components and visited routes are stored in the cache.

### 3. Partial Rendering
Even if dashboard/xxx/page.tsx is re-rendered, the shared layout, dashboard/layout.tsx is not re-rendered.

### 4. Soft Navigation
NextJS uses Soft Navigation
Hard Navigation: reset React state, full page reload. reset browser scroll position, focused element.
Soft Navigation: only renders the segments which the state have changed. There is no full page reload.
remain scroll position, focus element by default.

### 5. Back and Forward Navigation
I think this is included in soft navigation explanation.

## Chapter 6 Setting Up Database
I got error below

```
Created "invoices" table
Error seeding invoices: NeonDbError: db error: ERROR: prepared statement "s6649510" does not exist

Caused by:
    ERROR: prepared statement "s6649510" does not exist
    at execute (/Users/nextjs-dashboard/node_modules/@neondatabase/serverless/index.js:1539:48)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async Promise.all (index 0)
    at async seedInvoices (/Users/nextjs-dashboard/scripts/seed.js:67:30)
    at async /Users/nextjs-dashboard/scripts/seed.js:166:3 {
  code: '26000',
  sourceError: undefined
}
node:internal/process/promises:288
            triggerUncaughtException(err, true /* fromPromise */);
            ^

```
Solution: https://github.com/vercel/next-learn/pull/314
```js
// seed.js

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

// abbriviate seedInvoices, seedCustomers, seedRevenue

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedInvoices(client);
  await seedCustomers(client);
  await seedRevenue(client);

  await client.end();
}

main().catch((error) => {
  console.error("Error occurred while seeding database:", error);
});
```
