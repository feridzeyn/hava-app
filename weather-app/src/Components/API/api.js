
export async function getData(city_name) {
    const API_Key = "bee597e2f4c0c24c218f0a97162fc5a7";
    const BASE_URL = "https://api.openweathermap.org/data/2.5";

    let response = await fetch(`${BASE_URL}/forecast?q=${city_name}&appid=${API_Key}&units='metric'`)

    let result = await response.json()
    console.log(result)
    result.list.forEach(element => {

        console.log(element.dt)

    });




}