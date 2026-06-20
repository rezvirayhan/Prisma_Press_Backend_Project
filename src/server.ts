import app from "./app";

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    app.listen(PORT, () => {
      console.log(`Server Is Running On ${PORT}`);
    });
  } catch (error) {
    console.error("Error Starting the Server", error);
    process.exit(1);
  }
}

main();
