export async function coordenadas(direccion) {
  const response = await fetch(
    "https://nominatim.openstreetmap.org/search?q=" +
      direccion +
      "&format=json&limit=1&countrycodes=ES&addressdetails=1&accept-language=ES"
  );
  const json = await response.json();
  if (json.length > 0) {
    return { lat: json[0].lat, lon: json[0].lon };
  } else {
    return null;
  }
}

export async function buscarDireccion(direccion) {
  const response = await fetch(
    "https://nominatim.openstreetmap.org/search?q=" +
      direccion +
      "&format=json&limit=1&countrycodes=ES&addressdetails=1&accept-language=ES"
  );
  const json = await response.json();

  if (json.length > 0) {
    return json[0].display_name;
  } else {
    return "No se ha encontrado";
  }
}

export function distanciaCoordenadas(coordenadas1, coordenadas2) {
  if (typeof coordenadas1 == "string") {
    coordenadas2 = {
      lat: coordenadas1.split(", ")[0],
      lon: coordenadas1.split(", ")[1],
    };
  }
  if (typeof coordenadas2 == "string") {
    coordenadas2 = {
      lat: coordenadas2.split(", ")[0],
      lon: coordenadas2.split(", ")[1],
    };
  }

  const R = 6371e3; // metres
  const φ1 = (coordenadas1.lat * Math.PI) / 180; // φ, λ in radians
  const φ2 = (coordenadas2.lat * Math.PI) / 180;
  const Δφ = ((coordenadas2.lat - coordenadas1.lat) * Math.PI) / 180;
  const Δλ = ((coordenadas2.lon - coordenadas1.lon) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round((R * c) / 100) / 10;
}
