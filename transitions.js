// Arquivo: script.js
document.querySelectorAll(".link-transicao").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // Impede o redirecionamento imediato
    const destino = this.href; // Pega o link do href
    document.body.classList.add("fade-out"); // Adiciona a classe de transição

    // Aguarda a animação terminar antes de redirecionar
    setTimeout(() => {
      window.location.href = destino;
    }, 100); // Tempo deve ser igual ao da transição no CSS
  });
});
