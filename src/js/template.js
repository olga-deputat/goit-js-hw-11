export function photoTemplate(hits) {
  return hits
    .map(item =>
      `<div class="photo-card">
        <img src="${item.webformatURL}" alt="${item.id}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes:<span class="item">${item.likes}</span></b>
          </p>
          <p class="info-item">
            <b>Views:<span class="item">${item.views}</span></b>
          </p>
          <p class="info-item">
            <b>Comments:<span class="item">${item.comments}</span></b>
          </p>
          <p class="info-item">
            <b>Downloads:<span class="item">${item.downloads}</span></b>
          </p>
        </div>
      </div>`
    )
    .join('');
}

