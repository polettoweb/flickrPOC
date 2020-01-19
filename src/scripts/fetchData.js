const fetchData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (err) {
    console.log("Error from fetchData:", err);
  }
};

export default fetchData;
