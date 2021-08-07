export default function getData(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("There was a problem loading data.");
    }

    return response.json();
  });
}
