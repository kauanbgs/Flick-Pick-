document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = '2f0827999d2cf4e89ab895d9e21d5c0a';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';
  const moviesContainer = document.getElementById('movies-container');
  const searchInput = document.getElementById('search-input');
  const genreSelect = document.getElementById('genre-select');
  const typeSelect = document.getElementById('type-select');

  let selectedGenre = '';
  let selectedType = 'movie'; // Tipo inicial: 'movie' (filmes)

  // Função para buscar gêneros de filmes ou séries
  async function fetchGenres() {
    try {
      const url = `${BASE_URL}/genre/${selectedType}/list?api_key=${API_KEY}&language=pt-BR`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        populateGenres(data.genres); // Popula o menu de gêneros
      } else {
        console.error('Erro ao buscar gêneros:', response.status);
      }
    } catch (error) {
      console.error('Erro durante a requisição:', error);
    }
  }

  // Função para popular o menu de gêneros
  function populateGenres(genres) {
    genreSelect.innerHTML = '<option value="">Selecione um Gênero</option>'; // Limpa as opções
    genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre.id;
      option.textContent = genre.name;
      genreSelect.appendChild(option);
    });
  }

  // Função para buscar filmes ou séries
  async function fetchContent(query = '', genreId = '') {
    try {
      let url;
      if (query) {
        url = `${BASE_URL}/search/${selectedType}?api_key=${API_KEY}&query=${query}&language=pt-BR`;
      } else if (genreId) {
        url = `${BASE_URL}/discover/${selectedType}?api_key=${API_KEY}&with_genres=${genreId}&language=pt-BR`;
      } else {
        url = `${BASE_URL}/${selectedType}/popular?api_key=${API_KEY}&language=pt-BR`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        displayContent(data.results);
      } else {
        console.error('Erro ao buscar filmes ou séries:', response.status);
      }
    } catch (error) {
      console.error('Erro durante a requisição:', error);
    }
  }

  // Função para exibir os filmes ou séries
  function displayContent(content) {
    if (!content || content.length === 0) {
      moviesContainer.innerHTML = 'Nenhum conteúdo encontrado.';
      return;
    }

    moviesContainer.innerHTML = '';

    content.forEach(item => {
      const contentElement = document.createElement('div');
      contentElement.classList.add('movie');
      contentElement.dataset.id = item.id;

      const contentImageWrapper = document.createElement('div');
      contentImageWrapper.classList.add('movie-image-wrapper');

      const posterPath = item.poster_path ? `${IMG_URL}${item.poster_path}` : 'https://via.placeholder.com/500x281?text=No+Image+Available';
      const contentImage = document.createElement('img');
      contentImage.src = posterPath;
      contentImage.alt = item.title || item.name;
      contentImage.classList.add('movie-image');

      contentImageWrapper.appendChild(contentImage);

      const contentTitle = document.createElement('h3');
      contentTitle.textContent = item.title || item.name;

      contentElement.appendChild(contentImageWrapper);
      contentElement.appendChild(contentTitle);

      // Adiciona evento de clique para abrir uma nova página
      contentElement.addEventListener('click', () => {
        window.location.href = `details.html?id=${item.id}&type=${selectedType}`;
      });

      moviesContainer.appendChild(contentElement);
    });
  }

  // Eventos de pesquisa e filtros
  searchInput.addEventListener('input', (event) => {
    const query = event.target.value;
    fetchContent(query, selectedGenre);
  });

  genreSelect.addEventListener('change', (event) => {
    selectedGenre = event.target.value;
    fetchContent('', selectedGenre);
  });

  typeSelect.addEventListener('change', (event) => {
    selectedType = event.target.value;
    fetchGenres();
    fetchContent();
  });

  // Busca inicial de filmes e gêneros
  fetchGenres();
  fetchContent();
});
