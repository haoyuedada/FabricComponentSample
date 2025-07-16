import("./data.js").then((module) => {
  console.log("imported module:", module);
}).catch((error) => {
  console.error("Error importing module:", error);
});