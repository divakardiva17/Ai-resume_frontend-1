document.getElementById("upload-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the file input
    const fileInput = document.getElementById("resume-file");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a resume file.");
        return;
    }

    // Prepare FormData to send as multipart form data
    const formData = new FormData();
    formData.append("resume", file);

    // Display loading message
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = "Processing your resume... Please wait.";

    try {
        // Send POST request to backend
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            body: formData,
        });

        // Check if the response is successful
        if (response.ok) {
            const result = await response.json();
            const prediction = result.prediction === 1 ? "Accepted" : "Rejected";
            resultDiv.innerHTML = `<strong>Prediction: </strong>${prediction}`;
        } else {
            resultDiv.textContent = "Error: Unable to process your resume. Please try again.";
        }
    } catch (error) {
        resultDiv.textContent = "Error: Something went wrong. Please try again later.";
        console.error("Error:", error);
    }
});
