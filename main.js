window.addEventListener("camera-init", (data) => {
    console.log("camera-init", data);
});

window.addEventListener("camera-error", (error) => {
    console.log("camera-error", error);
});

AFRAME.registerComponent("registerevents", {
    init: function () {
        var marker = this.el;
        let markerStatus = document.getElementById("markerStatus");

        marker.addEventListener("markerFound", function () {
            var markerId = marker.id;
            console.log("markerFound", markerId);
            // TODO: Add your own code here to react to the marker being found.
            markerStatus.style.setProperty("background-color", "#AAFF00");
            console.log(markerStatus);
        });

        marker.addEventListener("markerLost", function () {
            var markerId = marker.id;
            console.log("markerLost", markerId);
            // TODO: Add your own code here to react to the marker being lost.
            // let markerStatus = document.getElementById('markerStatus');
            markerStatus.style.setProperty("background-color", "#FF002A");
            console.log(markerStatus);
        });
    },
});

let gltf_models_assests = document.getElementsByClassName("gltf-model");
let models = [];
for (let i = 0; i < gltf_models_assests.length; i++) {
    models.push(gltf_models_assests[i].id);
    console.log(gltf_models_assests[i].id);
}

// init slider
var spanScaleText = document.getElementById("spanScaleText");
var modelRange = document.getElementById("modelRange");
spanScaleText.innerText = modelRange.value;

// <button class="dropdown-item" onclick="model()" value="#model-skeith">Skeith</button>
for (let i = 0; i < models.length; i++) {
    var drop_button = document.createElement("button");
    drop_button.setAttribute("class", "dropdown-item");
    drop_button.setAttribute("onclick", "loadModel()");
    drop_button.setAttribute("value", "#" + models[i]);

    var node = document.createTextNode(models[i]);

    drop_button.appendChild(node);
    document
        .getElementsByClassName("dropdown-menu")[0]
        .appendChild(drop_button);
}



function loadModel() {
    var triggerId = document.getElementById("triggerId");
    triggerId.innerText = event.target.value.replace("#", "");

    var assetModelId = event.target.value;
    let entityForModel = document.querySelector("a-entity");
    console.log(entityForModel);
    entityForModel.removeAttribute("gltf-model");
    entityForModel.setAttribute("gltf-model", assetModelId);
    modelRange.value = 0.5
    spanScaleText.innerText = modelRange.value;

}

function scaleModel() {
    let entityForModel = document.querySelector("a-entity");
    console.log(event.target.value);
    let scale = event.target.value;
    spanScaleText.innerText = event.target.value;
    // entityForModel.removeAttribute('scale');
    // to follow the attribute format:  scale="0.1 0.1 0.1", pretty ugly code
    let scaleToString = scale + " " + scale + " " + scale;

    entityForModel.setAttribute("scale", scaleToString);
}