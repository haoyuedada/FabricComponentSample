import("./data1.js").then((data) => {
  console.log("data:", data);
}).catch((error) => {
  console.error("Error importing data:", error);
});