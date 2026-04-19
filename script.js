const API_URL = "https://anilkava-viral-news-india.hf.space/my-api";

async function fetchNews(category) {
    const container = document.getElementById('news-grid');
    const title = document.getElementById('category-title');
    
    title.innerText = `Latest ${category.charAt(0).toUpperCase() + category.slice(1)} News`;
    container.innerHTML = "<p>Loading news from Hugging Face...</p>";

    try {
        const response = await fetch(`${API_URL}?cat=${category}`);
        const data = await response.json();

        if (data.status === "success" && data.results.length > 0) {
            container.innerHTML = "";
            data.results.forEach(item => {
                container.innerHTML += `
                    <div class="news-card">
                        <img src="${item.image || 'https://via.placeholder.com/220x140'}" alt="img">
                        <div class="news-info">
                            <h3><a href="${item.url}" target="_blank" style="text-decoration:none; color:inherit;">${item.title}</a></h3>
                            <p>${item.description ? item.description.substring(0, 150) : 'No description available'}...</p>
                        </div>
                    </div>`;
            });
            updateTrending(data.results.slice(0, 5));
        } else {
            container.innerHTML = "<p>Koi news nahi mili.</p>";
        }
    } catch (e) {
        container.innerHTML = "<p>Backend connection error!</p>";
    }
}

function updateTrending(items) {
    const trendBox = document.getElementById('trending-list');
    trendBox.innerHTML = items.map(item => `
        <p style="padding: 10px 0; border-bottom: 1px solid #eee; font-size:14px;">
            <a href="${item.url}" target="_blank" style="text-decoration:none; color:#333;">• ${item.title}</a>
        </p>
    `).join('');
}

window.onload = () => fetchNews('india');