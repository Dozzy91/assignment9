let pushData = document.getElementById('users');

async function userData() {
    try {
        const result = await fetch('/users');
        const response = await result.json();

        pushData.innerText = JSON.stringify(response, null, 2);
        console.log(response)
        
        
    } catch (error) {
        console.log(error)
    }  
};

async function welcome() {
    try {
        const result = await fetch('/welcome');
        const response = await result.json();

        pushData.innerText = response.message;
        console.log(response);
        
    } catch (error) {
        console.log(error)
    }  
};

// if(window.location.pathname === "/users") {
//     userData();
// } else if (window.location.pathname === "/welcome"){
//     welcome();
// } else {
//     console.log('lamb')
// }