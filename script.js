document.addEventListener("DOMContentLoaded", () => {
    const logOutput = document.getElementById("log-output");
    const commandInput = document.getElementById("command-input");
    const sendCommandButton = document.getElementById("send-command");

    // Fetch logs
    if (logOutput) {
        fetch("/logs")
            .then(response => response.text())
            .then(data => {
                logOutput.textContent = data;
            })
            .catch(err => {
                logOutput.textContent = "Failed to load logs.";
                console.error(err);
            });
    }

    // Send command
    if (sendCommandButton) {
        sendCommandButton.addEventListener("click", () => {
            const command = commandInput.value;
            if (command.trim() === "") {
                alert("Please enter a command.");
                return;
            }

            fetch("/command", {
                method: "POST",
                body: command
            })
                .then(response => {
                    if (response.ok) {
                        alert("Command sent successfully!");
                    } else {
                        alert("Failed to send command.");
                    }
                })
                .catch(err => {
                    alert("Error sending command.");
                    console.error(err);
                });
        });
    }
});
