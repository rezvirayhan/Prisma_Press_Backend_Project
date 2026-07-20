import app from "./app";

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    app.listen(PORT, () => {
      console.log(`Server Is Running On Port ${PORT}`);
    });
  } catch (error) {
    console.error("Error Stating the server", error);
    process.exit(1);
  }
}

main();
