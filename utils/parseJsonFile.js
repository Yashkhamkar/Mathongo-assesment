function parseJsonFile(data) {
  try {
    const json = JSON.parse(data);
    if (!Array.isArray(json)) {
      throw new Error("JSON must be an array of chapter objects");
    }
    return json;
  } catch (error) {
    throw new Error("Invalid JSON format");
  }
}

module.exports = { parseJsonFile };
