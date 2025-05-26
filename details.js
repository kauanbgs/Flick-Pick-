document.addEventListener('DOMContentLoaded', async () => {
  const API_KEY = '2f0827999d2cf4e89ab895d9e21d5c0a';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';
  const BACKDROP_URL = 'https://image.tmdb.org/t/p/original';

  const urlParams = new URLSearchParams(window.location.search);
  const contentId = urlParams.get('id');
  const contentType = urlParams.get('type');
  const detailsContainer = document.getElementById('details-container');
  const contentTitleElement = document.getElementById('content-title');
  const contentDescriptionElement = document.getElementById('content-description');
  const contentReleaseDateElement = document.getElementById('content-release-date');
  const contentRatingElement = document.getElementById('content-rating');
  const contentGenresElement = document.getElementById('content-genres');

  if (!contentId || !contentType) {
    detailsContainer.innerHTML = 'Conteúdo não encontrado.';
    return;
  }

  try {
    const url = `${BASE_URL}/${contentType}/${contentId}?api_key=${API_KEY}&language=pt-BR`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      // Definir a imagem de fundo usando o backdrop_path
      if (data.backdrop_path) {
        document.getElementById('background-image').style.backgroundImage = `url(${BACKDROP_URL}${data.backdrop_path})`;
      }

      // Logo do filme - Buscar a imagem do logo
      const logosUrl = `${BASE_URL}/${contentType}/${contentId}/images?api_key=${API_KEY}`;
      const logosResponse = await fetch(logosUrl);
      const logosData = await logosResponse.json();
      
      // Se existir logo, exibe ela
      const logo = logosData.logos.find(logo => logo.iso_639_1 === 'en'); // Logo em inglês

      if (logo) {
        contentTitleElement.innerHTML = `<img src="${IMG_URL}${logo.file_path}" alt="Logo do Filme" class="movie-logo">`;
      } else {
        // Caso não haja logo, exibe o título
        contentTitleElement.textContent = data.title || data.name;
      }

      // Exibe as caixas de ano de lançamento e nota
      const releaseYear = data.release_date ? new Date(data.release_date).getFullYear() : 'Desconhecido';
      contentReleaseDateElement.innerHTML = `<span class="details-box">Ano: ${releaseYear}</span>`;

      const rating = data.vote_average ? data.vote_average : 'N/A';
      contentRatingElement.innerHTML =`<span class="details-box">Nota: ${rating}</span>`;

      // Exibe os gêneros
      contentGenresElement.textContent = `Gêneros: ${data.genres.map(genre => genre.name).join(', ') || 'Desconhecido'}`;

      // Exibe a descrição
      contentDescriptionElement.textContent = data.overview || 'Descrição não disponível.';
    } else {
      detailsContainer.innerHTML = 'Erro ao carregar os detalhes.';
    }
  } catch (error) {
    detailsContainer.innerHTML = 'Erro ao buscar os detalhes.';
  }
});
