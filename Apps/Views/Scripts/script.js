const ariaSelectElement = document.getElementById('ariaSelect');
const formElement = document.forms.infectionForm;
const forms = document.querySelectorAll('.needs-validation')
const infectionRiskElement = document.getElementById("infectionRisk");
const contactProbabilityElement = document.getElementById("contactProbability");
const aerosolRiskElement = document.getElementById("aerosolRisk");
const contactRiskElement = document.getElementById("contactRisk");
const isValidButtionElement = document.getElementById("isvalid-button");
const modalTriggerElement = document.getElementById("modal-trigger");
const towWeekDay = 14

async function callApi() {
    aria = ariaSelect.value;
    if (!aria) {
        document.getElementById('infectedPeople').value = "";
        return;
    }

    url = "https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/all_patient_v2_prefecture_point_view/FeatureServer/0/query?where=Name='" + aria + "'&outFields=人口10万人あたり感染者数,&outSR=4326&f=json"
    const res = await fetch(url);
    const resjson = await res.json();
    let twoWeekInfectionCount = 0;
    let len = resjson.features.length;
    let index = len - 1;
    twoWeekInfectionCount = resjson.features[len-1].attributes.人口10万人あたり感染者数 - resjson.features[len - 15].attributes.人口10万人あたり感染者数;
    document.getElementById('infectedPeopleId').value = Math.round(twoWeekInfectionCount, 0) + " 人";
};

function calcRisk() {
    infectedPeople = parseInt(formElement.infectedPeople.value);
    contactCountPerDay = parseInt(formElement.contactCountPerDay.value);
    maskType = parseFloat(formElement.maskType.value);
    distance = parseFloat(formElement.distance.value);
    ventilation = parseFloat(formElement.ventilation.value);
    handWash = parseFloat(formElement.handWash.value);
    disinfection = parseFloat(formElement.disinfection.value);
    contactRate = parseFloat(formElement.contactRate.value);

    contactProbability = infectedPeople / 10**5 * 2 * contactCountPerDay;
    aerosolRisk = maskType * distance * ventilation;
    contactRisk = handWash * disinfection * contactRate;
    infectionRisk = contactProbability * (aerosolRisk + contactRisk) * 100;

    contactProbability = Math.round(contactProbability * 1000) / 1000;
    aerosolRisk = Math.round(aerosolRisk * 1000) / 1000;
    contactRisk = Math.round(contactRisk * 1000) / 1000;
    infectionRisk = Math.round(infectionRisk * 1000) / 1000;

    infectionRiskElement.textContent = infectionRisk + " %";
    contactProbabilityElement.textContent = contactProbability + " %";
    aerosolRiskElement.textContent = aerosolRisk + " %";
    contactRiskElement.textContent = contactRisk + " %";
}

function validator(calcEvent) {
    isValid = false;
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            if (!form.checkValidity()) {
                calcEvent.preventDefault()
                calcEvent.stopPropagation()
                isValid = true;
            }

            form.classList.add('was-validated')
        })
    return isValid
}

function calcHandler(event) {
    event.preventDefault();

    isValid = validator(event);
    if (isValid) {
        return
    };

    calcRisk();

    modalTriggerElement.click();
}

window.onload = function () {
    ariaSelectElement.addEventListener("change", callApi);
    formElement.addEventListener("submit", calcHandler);
};
