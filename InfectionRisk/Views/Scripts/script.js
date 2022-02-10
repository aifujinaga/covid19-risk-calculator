async function callApi() {
    aria = ariaSelect.value;
    if (!aria) {
        aria = "大阪府"
    }

    url = "https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/all_patient_v2_prefecture_point_view/FeatureServer/0/query?where=Name='" + aria + "'&outFields=人口10万人あたり感染者数&outSR=4326&f=json"
    const res = await fetch(url);
    const resjson = await res.json();

    let infectioncount = 0;
    let count = 7

    let len = resjson.features.length;
    for (var index = len - 1; index > len - 1 - count; --index) {
        infectioncount += resjson.features[index].attributes.人口10万人あたり感染者数;
    };
    infectioncount /= count;

    document.getElementById('inputInfectionCount').value = Math.round(infectioncount, 0);

};

window.onload = function () {
    let ariaSelectElement = document.getElementById('ariaSelect');
    let infectionCountElement = document.getElementById('inputInfectionCount');

    ariaSelectElement.addEventListener("change", callApi);

    callApi();
};
