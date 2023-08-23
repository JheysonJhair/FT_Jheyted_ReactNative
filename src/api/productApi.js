export async function getPromociones() {
  const response = await fetch(
    "https://soundthezerb.ccontrolz.com/api/videos/getAll"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.result;
}

export async function getProducts() {
  const response = await fetch(
    "https://soundthezerb.ccontrolz.com/api/musics/getAll"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.result;
}
