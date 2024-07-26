const baseURL = "http://numbersapi.com/";
const numbers = [1, 3, 4, 10];

async function getFacts() {
    try {
        const f1 = await axios.get(`${baseURL}14`);
        console.log(`A fun fact about number 14 is: ${f1.data}`);
        
        const response = await axios.get(`${baseURL}${numbers.join(',')}`);
        const facts = response.data;
        
        for (const [number, fact] of Object.entries(facts)) {
            document.body.innerHTML += `<p><strong>Number ${number}:</strong> ${fact}</p>`;
        }
    } catch (error) {
        console.error("An error occurred:", error);
        document.body.innerHTML += `<p>Error: ${error.message}</p>`;
    }
}

getFacts();