const { db } = require("@vercel/postgres");

async function deleteUsers(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS users;`;
    console.log(`Deleted "users" table`);
  } catch (error) {
    console.error("Error deleting users:", error);
    throw error;
  }
}

async function deleteInvoices(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS invoices;`;
    console.log(`Deleted "invoices" table`);
  } catch (error) {
    console.error("Error deleting invoices:", error);
    throw error;
  }
}

async function deleteCustomers(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS customers;`;
    console.log(`Deleted "customers" table`);
  } catch (error) {
    console.error("Error deleting customers:", error);
    throw error;
  }
}

async function deleteRevenue(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS revenue;`;
    console.log(`Deleted "revenue" table`);
  } catch (error) {
    console.error("Error deleting revenue:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await deleteUsers(client);
  await deleteInvoices(client);
  await deleteCustomers(client);
  await deleteRevenue(client);

  client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
