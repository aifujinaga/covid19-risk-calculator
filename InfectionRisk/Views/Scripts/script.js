const ariaSelectElement = document.getElementById('ariaSelect');
const formElement = document.forms.infectionForm;
const forms = document.querySelectorAll('.needs-validation')
const infectionRiskElement = document.getElementById("infectionRisk");
const contactProbabilityElement = document.getElementById("contactProbability");
const aerosolRiskElement = document.getElementById("aerosolRisk");
const contactRiskElement = document.getElementById("contactRisk");
const modalButtonElement = document.getElementById("modalButton");

async function callApi() {
    aria = ariaSelect.value;
    if (!aria) {
        document.getElementById('infectedPeople').value = "";
        return;
    }

    url = "https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/all_patient_v2_prefecture_point_view/FeatureServer/0/query?where=Name='" + aria + "'&outFields=人口10万人あたり感染者数&outSR=4326&f=json"
    const res = await fetch(url);
    const resjson = await res.json();

    let infectionCount = 0;
    let count = 7

    let len = resjson.features.length;
    for (var index = len - 1; index > len - 1 - count; --index) {
        infectionCount += resjson.features[index].attributes.人口10万人あたり感染者数;
    };
    infectionCount /= count;

    document.getElementById('infectedPeopleId').value = Math.round(infectionCount, 0) + " 人";
};

function validDetector(hoge) {
    isValid = false;
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            if (!form.checkValidity()) {
                hoge.preventDefault()
                hoge.stopPropagation()
                isValid = true;
            }

            form.classList.add('was-validated')
        })
    return isValid
}

function calcHandler(event) {
    isValid = validDetector(event)
    if (isValid) {
        return
    }

    infectedPeople = parseFloat(formElement.infectedPeople.value);
    contactCountPerDay = parseFloat(formElement.contactCountPerDay.value);
    maskType = parseFloat(formElement.maskType.value);
    distance = parseFloat(formElement.distance.value);
    ventilation = parseFloat(formElement.ventilation.value);
    handWash = parseFloat(formElement.handWash.value);
    disinfection = parseFloat(formElement.disinfection.value);
    contactRate = parseFloat(formElement.contactRate.value);

    //TODO 式の調整
    contactProbability = infectedPeople / 1000000 * 2;
    aerosolRisk = maskType * distance * ventilation;
    contactRisk = handWash * disinfection * contactRate;
    infectionRisk = contactProbability * (aerosolRisk + contactRisk) * 100;
    infectionRisk = Math.round(infectionRisk * 1000) / 1000;

    infectionRiskElement.textContent = infectionRisk + " %";
    contactProbabilityElement.textContent = contactProbability;
    aerosolRiskElement.textContent = aerosolRisk
    contactRiskElement.textContent = contactRisk

    // modalButtonElement.setAttribute(data-bs-toggle, "modal")

    event.preventDefault();
}

window.onload = function () {
    ariaSelectElement.addEventListener("change", callApi);
    formElement.addEventListener("submit", calcHandler);
};

// function calcRisk(event) {
//     isValid = false;
//     Array.prototype.slice.call(forms)
//         .forEach(function (form) {
//             if (!form.checkValidity()) {
//                 event.preventDefault()
//                 event.stopPropagation()
//                 isValid = true;
//             }

//             form.classList.add('was-validated')
//         })

//     if (isValid) {
//         return
//     }

//     infectedPeople = parseFloat(formElement.infectedPeople.value);
//     contactCountPerDay = parseFloat(formElement.contactCountPerDay.value);
//     maskType = parseFloat(formElement.maskType.value);
//     distance = parseFloat(formElement.distance.value);
//     ventilation = parseFloat(formElement.ventilation.value);
//     handWash = parseFloat(formElement.handWash.value);
//     disinfection = parseFloat(formElement.disinfection.value);
//     contactRate = parseFloat(formElement.contactRate.value);

//     //TODO 式の調整
//     contactProbability = infectedPeople / 1000000 * 2;
//     aerosolRisk = maskType * distance * ventilation;
//     contactRisk = handWash * disinfection * contactRate;
//     infectionRisk = contactProbability * (aerosolRisk + contactRisk) * 100;
//     infectionRisk = Math.round(infectionRisk * 1000) / 1000;

//     infectionRiskElement.textContent = infectionRisk + " %";
//     contactProbabilityElement.textContent = contactProbability;
//     aerosolRiskElement.textContent = aerosolRisk
//     contactRiskElement.textContent = contactRisk

//     event.preventDefault();
// }

// window.onload = function () {
//     ariaSelectElement.addEventListener("change", callApi);
//     formElement.addEventListener("submit", calcRisk);
// };

// TODO submitHandler入れる?

// (function () {
//     var forms = document.querySelectorAll('.needs-validation')

//     Array.prototype.slice.call(forms)
//         .forEach(function (form) {
//             form.addEventListener('submit', function (event) {
//                 if (!form.checkValidity()) {
//                     event.preventDefault()
//                     event.stopPropagation()
//                 }

//                 form.classList.add('was-validated')
//             }, false)
//         })

// })()