
//function for the id of the origin/destination station

async function getLocationId(url) {
    let locations = await fetch(url);
    let data = await locations.json();
    return data[0].id;
}



function getInputValue() {

    //Get the input value
    let origin = document.getElementById("myInput").value;
    let destination = document.getElementById("myInput2").value;

    //setting the query url
    let originUrl = "https://1.bvg.transport.rest/locations?query=" + encodeURIComponent(origin) + "&tram=true&results=1";
    let destinationUrl = "https://1.bvg.transport.rest/locations?query=" + encodeURIComponent(destination) + "&tram=true&results=1";



    //Get the Journey data

    async function getId() {

        let originID = await getLocationId(originUrl);
        let destinationID = await getLocationId(destinationUrl);

        console.log(originID + " " + destinationID)

        let JourneyUrl = "https://1.bvg.transport.rest/journeys?from=" + originID + "&to=" + destinationID + "&tram=true&suburban=false&bus=false&ferry=false&express=false&regional=false&subway=false&results=1#";
        let response = await fetch(JourneyUrl);
        let cData = await response.json();


        let depart = cData[0].legs[0].departure;
        let arrival = cData[0].legs[0].arrival;

        console.log(depart + " " + arrival)

        let a = moment(depart);
        let b = moment(arrival);

        console.log(moment.duration(a.diff(b)).humanize());


        let outputDiv = document.getElementById("duration");
        outputDiv.textContent = "The Journey duration is " + moment.duration(a.diff(b)).humanize();

    };

    getId();

}
