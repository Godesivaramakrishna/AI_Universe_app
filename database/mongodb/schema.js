// MongoDB collection schema examples for AI Universe

db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "createdAt"],
      properties: {
        name: { bsonType: "string" },
        email: { bsonType: "string" },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

db.createCollection("tools", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "category"],
      properties: {
        name: { bsonType: "string" },
        category: { bsonType: "string" },
        pricing: { bsonType: "string" },
        score: { bsonType: ["double", "int"] }
      }
    }
  }
});
