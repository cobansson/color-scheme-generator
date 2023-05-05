let colorArr = [];

document.getElementById("color-form").addEventListener("submit", renderColor);

function renderColor(e) {
    e.preventDefault();
    let selectedColorArr = [];
    const selectedMode = document.getElementById("mode").value;
    const inputNumber = document.getElementById("number-input").value;
    const colorInput = document.getElementById("color-input").value.replace('#','');
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorInput}&mode=${selectedMode}&count=${inputNumber}`, {method: "GET"})
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.colors.length; i++) {
                selectedColorArr.unshift(data.colors[i].hex.value);
                colorArr = selectedColorArr.slice(0, inputNumber);
            }
            document.getElementById("colors-section").innerHTML = renderHtml();
            document.getElementById("info-text").style.display = "block";
        });
}

function renderHtml() {
    return colorArr.map(i => {
        return `
        <div class="color-and-hexcode-section">
            <div data-id="${i}" onclick="copyToClipboard(this.dataset.id)" class="color-section" style="background-color: ${i};"></div>
            <p data-id="${i}" onclick="copyToClipboard(this.dataset.id)" class="hexcode-section">${i}</p>
        </div>`
    }).join("");
}

async function copyToClipboard(id) {
    try {
        await navigator.clipboard.writeText(id);
        document.getElementById("info-text").textContent = "Copied on clipboard!";
        setTimeout(() => {
            document.getElementById("info-text").textContent = "You can click on the color block or the hex code to copy";
        }, 1500)
    } catch (err) {
        console.error("Failed to copy to clipboard: " + err);
    }
}