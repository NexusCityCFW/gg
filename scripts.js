document.getElementById('packageType').addEventListener('change', function() {
    var freeFeatures = document.getElementById('freeFeatures');
    var premiumFeatures = document.getElementById('premiumFeatures');
    if (this.value === 'free') {
        freeFeatures.style.display = 'block';
        premiumFeatures.style.display = 'none';
    } else {
        freeFeatures.style.display = 'none';
        premiumFeatures.style.display = 'block';
    }
});

document.getElementById('gangName').addEventListener('change', function() {
    var customGangNameContainer = document.getElementById('customGangNameContainer');
    if (this.value === 'custom') {
        customGangNameContainer.style.display = 'block';
    } else {
        customGangNameContainer.style.display = 'none';
    }
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Generate random invoice number
    var invoiceNumber = 'INV' + Math.floor(Math.random() * 1000000);

    // Collect form data
    var formData = new FormData(this);
    var data = {};
    formData.forEach((value, key) => data[key] = value);
    data.invoiceNumber = invoiceNumber;

    // Prepare embed message
    var embed = {
        title: 'تقديم طلب جديد',
        description: `**الاسم:** ${data.name}\n**اسمك باللعبة:** ${data.gameName}\n** Discord:** ${data.discordName}`,
        fields: [
            { name: 'نوع الحزمة', value: data.packageType },
            { name: 'اسم العصابة', value: data.gangName },
            { name: 'عدد العصابة', value: data.memberCount },
            { name: 'هل أنت موظف في أحد القطاعات؟', value: data.employment } // افترض أن لديك حقل في النموذج يحمل اسم 'employeeStatus'
        ],
        footer: { text: `رقم الفاتورة: ${invoiceNumber}` }
    };

    // Send data to Discord webhook
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://discord.com/api/webhooks/1251007183236366437/JUfmoKDadxgHErGOMnY_VJ47qgcMkfqsvIKkjQTOFu5xHx1J8-Z-IdadaPL3eOwhZvJZ', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Construct JSON payload with embed
    var payload = {
        embeds: [embed]
    };

    xhr.send(JSON.stringify(payload));

    // Display submitted data on the webpage
    showSubmittedData(data);
});

function showSubmittedData(data) {
    // Assuming you have a div with id "submittedData" to display the data
    var submittedDataDiv = document.getElementById('submittedData');
    submittedDataDiv.innerHTML = `
        <h2>البيانات المقدمة</h2>
        <p><strong>الاسم:</strong> ${data.name}</p>
        <p><strong>اسمك باللعبة:</strong> ${data.gameName}</p>
        <p><strong> Discord:</strong> ${data.discordName}</p>
        <p><strong>نوع الحزمة:</strong> ${data.packageType}</p>
        <p><strong>اسم العصابة:</strong> ${data.gangName}</p>
        <p><strong>هل أنت موظف في أحد القطاعات؟</strong> ${data.employment}</p>
        <p><strong>عدد العصابة</strong> ${data.memberCount}</p>
        <p><strong>رقم الفاتورة:</strong> ${data.invoiceNumber}</p>
    `;
}
