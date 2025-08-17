const apiKey = "49820b8ceb1f035ea9d94f14c3827c25"; // 🔑 Your GNews API Key
const url = `https://gnews.io/api/v4/top-headlines?lang=en&max=10&apikey=${apiKey}`;

async function fetchNews() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);


    if (data.articles && data.articles.length > 0) {
      displayNews(data.articles);
    } else {
      document.getElementById("news-container").innerHTML = "<p>No news available.</p>";
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    document.getElementById("news-container").innerHTML = "<p>Failed to load news.</p>";
  }
}

function displayNews(articles) {
  const container = document.getElementById("news-container");
  container.innerHTML = "";

  articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "news-card";

    card.innerHTML = `
      <img src="${article.image || 'https://via.placeholder.com/300'}" alt="News Image">
      <div class="news-content">
        <h2>${article.title}</h2>
        <p>${article.description || "No description available."}</p>
        <small>Published: ${new Date(article.publishedAt).toLocaleDateString()}</small><br>
        <a href="${article.url}" target="_blank">Read More →</a>
      </div>
    `;
    container.appendChild(card);
  });
}

fetchNews();
