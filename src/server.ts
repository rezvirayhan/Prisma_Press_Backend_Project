import "dotenv/config";
import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully");
    app.listen(PORT, () => {
      console.log(`Server Is Running On ${PORT}`);
    });
  } catch (error) {
    console.error("Error Starting the Server", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
