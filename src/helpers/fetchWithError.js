export default async function fetchWithError(url, options) {
  const response = await fetch(url, options);
  if (response.status === 200 || response.status === 201) {
    const result = response.json();
    // console.log(result, options, 'asdf');
    //if the server returns a json with error inside of it but with a 200 status code
    if (result.error) {
      throw new Error(result.error);
    }
    return result;
  }
  throw new Error(
    `Error - ${response.status}: ${response.statusText}`
  );
}
