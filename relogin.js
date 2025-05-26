function validateForm() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  let isValid = true;

  // Validação do nome de usuário
  if (username === "") {
    setError("user-box", "Username is required.", "user-error");
    isValid = false;
  } else {
    removeError("user-box", "user-error");
  }

  // Validação do email
  if (email === "") {
    setError("email-box", "Email is required.", "email-error");
    isValid = false;
  } else if (!validateEmail(email)) {
    setError("email-box", "Invalid email format.", "email-error");
    isValid = false;
  } else {
    removeError("email-box", "email-error");
  }

  // Validação da senha
  if (password === "") {
    setError("password-box", "Password is required.", "password-error");
    isValid = false;
  } else {
    removeError("password-box", "password-error");
  }

  if (isValid) {
    // Enviar os dados para o servidor (JSONPlaceholder)
    sendData(username, email, password);
  }
}

// Função para validar o formato do email
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
}

// Função para exibir mensagem de erro
function setError(elementId, message, errorId) {
  const element = document.getElementById(elementId);
  element.classList.add("error");
  const errorMessage = document.getElementById(errorId);
  errorMessage.innerText = message;
  errorMessage.style.display = "block"; // Torna a mensagem de erro visível
}

// Função para remover mensagem de erro
function removeError(elementId, errorId) {
  const element = document.getElementById(elementId);
  element.classList.remove("error");
  const errorMessage = document.getElementById(errorId);
  errorMessage.innerText = "";
  errorMessage.style.display = "none"; // Oculta a mensagem de erro
}

// Função para enviar os dados para o JSONPlaceholder
function sendData(username, email, password) {
  const data = {
    username: username,
    email: email,
    password: password,
  };

  // Envia os dados para o JSONPlaceholder (endpoint de criação de posts)
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      // Exibe uma mensagem de sucesso
      alert("Registration successful!");
      console.log("Response from server:", data);  // Exibe a resposta do servidor no console
    })
    .catch(error => {
      // Exibe uma mensagem de erro se algo der errado
      console.error("Error:", error);
      alert("There was an error submitting the form.");
    });
}
