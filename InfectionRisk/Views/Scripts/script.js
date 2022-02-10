async function callApi() {
    url = "https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/all_patient_v2_prefecture_point_view/FeatureServer/0/query?where=PrefCode=28&outFields=人口10万人あたり感染者数&outSR=4326&f=json"
    const res = await fetch(url);
    const resjson = await res.json();

    let infectioncount = 0;
    let count = 7

    let len = resjson.features.length;
    for (var index = len - 1; index > len - 1 - count; --index) {
        infectioncount += resjson.features[index].attributes.人口10万人あたり感染者数;
    };
    infectioncount /= count;

    return Math.round(infectioncount, 0);
};

let infectioncount = callApi().then(response => {
    document.getElementById('inputInfectionCount').value = response;
});
