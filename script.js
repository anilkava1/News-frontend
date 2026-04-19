const API_URL = "https://anilkava-viral-news-india.hf.space/my-api";

async function fetchNews(category) {
    const container = document.getElementById('news-grid');
    const title = document.getElementById('category-title');
    
    title.innerText = `${category.charAt(0).toUpperCase() + category.slice(1)} News`;
    container.innerHTML = "<div class='loading'>Fetching latest stories...</div>";

    try {
        const response = await fetch(`${API_URL}?cat=${category}`);
        const data = await response.json();

        if (data.status === "success" && data.results.length > 0) {
            container.innerHTML = "";
            data.results.forEach(item => {
                container.innerHTML += `
                    <article class="news-card">
                        <img src="${item.image || 'https://via.placeholder.com/300x200?text=News+Image'}" alt="Viral News">
                        <div class="news-info">
                            <h3><a href="${item.url}" target="_blank" style="text-decoration:none; color:inherit;">${item.title}</a></h3>
                            <p>${item.description ? item.description.substring(0, 140) : 'Click to read the full story on Viral News India.'}...</p>
                        </div>
                    </article>`;
            });
            updateTrending(data.results.slice(0, 5));
        } else {
            container.innerHTML = "<p>Nayi khabrein abhi raaste mein hain. Dobara try karein!</p>";
        }
    } catch (e) {
        container.innerHTML = "<p>Server se connect nahi ho pa raha. Internet check karein.</p>";
    }
}

function updateTrending(items) {
    const trendBox = document.getElementById('trending-list');
    trendBox.innerHTML = items.map(item => `
        <div style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
            <a href="${item.url}" target="_blank" style="text-decoration:none; color:#444; font-size:14px; font-weight:600;">• ${item.title}</a>
        </div>
    `).join('');
}

window.onload = () => fetchNews('india');