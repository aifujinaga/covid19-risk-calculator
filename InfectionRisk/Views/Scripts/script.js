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

    document.getElementById('infectedPeople').value = Math.round(infectioncount, 0) + " 人";
};

window.onload = function () {
    const ariaSelectElement = document.getElementById('ariaSelect');
    ariaSelectElement.addEventListener("change", callApi);
};

function calcRisk() {
    let formElement = document.forms.infectionForm;

    infectedPeople = parseFloat(formElement.infectedPeople.value)
    contactCountPerDay = parseFloat(formElement.contactCountPerDay.value)
    maskType = parseFloat(formElement.maskType.value)
    distance = parseFloat(formElement.distance.value)
    ventilation = parseFloat(formElement.ventilation.value)
    handWash = parseFloat(formElement.handWash.value)
    disinfection = parseFloat(formElement.disinfection.value)
    contactRate = parseFloat(formElement.contactRate.value)

    //TODO 式の調整
    contactProbability = infectedPeople / 1000000 * 2
    aerosolRisk = maskType * distance * ventilation
    contactRisk = handWash * disinfection * contactRate
    infectionRisk = contactProbability * (aerosolRisk + contactRisk)
}