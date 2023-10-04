document.addEventListener("DOMContentLoaded", function () {
    const terminal = document.querySelector(".terminal");
    const titleBar = document.querySelector(".title-bar");
    const title = document.querySelector(".title");
    const outputContainer = document.querySelector(".output-container");
    const output = document.querySelector(".output");
    const inputElement = document.getElementById("input");
    const buttons = document.querySelectorAll(".button");
    const clearButton = document.getElementById("clear-button");
    const commandHistory = document.getElementById("command-history");

    function sendMessageToDiscord(message) {
        const webhookUrl = "discordWebhookUrl"; // add here your webhook url

        
        const embedMessage = {
            embeds: [
                {
                    title: "New Message",
                    description: message,
                    color: 16777215,
                    timestamp: new Date(),
                    footer: {
                        text: "Terminal Chat",
                    },
                },
            ],
        };

        fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(embedMessage),
        })
            .then(response => {
                if (response.status === 204) {
                    console.log("Message sent successfully to Discord!");
                } else {
                    console.error("Failed to send message to Discord.");
                }
            })
            .catch(error => {
                console.error("Error sending message to Discord:", error);
            });
    }

    const initialOutputText = "Welcome to the Terminal Chat. Type your message and press Enter.";
    const outputElement = document.querySelector(".output");
    outputElement.classList.add("typing");

    setTimeout(function () {
        terminal.classList.add("animate");
        titleBar.classList.add("animate");
        title.classList.add("animate");
        outputContainer.classList.add("animate");
        output.classList.add("animate");
        inputElement.classList.add("animate");

        
        outputElement.textContent = initialOutputText;
    }, 1000);

    inputElement.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const userInput = inputElement.value;
            inputElement.value = "";
            const outputText = `$ ${userInput}`;
            const outputElement = document.createElement("pre");
            outputElement.textContent = outputText;
            output.appendChild(outputElement);
            sendMessageToDiscord(userInput);
            outputContainer.scrollTop = outputContainer.scrollHeight;
            outputElement.classList.add("executed");
        }
    });

    clearButton.addEventListener("click", function () {
        output.innerHTML = "";
        commandHistory.innerHTML = "";
    });

    buttons.forEach(button => {
        button.addEventListener("mouseenter", function () {
            button.classList.add("hover");
        });
        button.addEventListener("mouseleave", function () {
            button.classList.remove("hover");
        });
        button.addEventListener("click", function () {
            button.classList.toggle("active");
        });
    });
});
