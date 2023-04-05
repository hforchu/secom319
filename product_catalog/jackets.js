fetch('./jackets.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error:' + err);
    });

function appendData(data) {
    let mainContainer = document.getElementById('myData');

    data.forEach((result) => {
        const card = document.createElement('div');
        card.classList = "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3";
        const content = 
        `
            <div class="col">
              <div class="card shadow-sm">
                <img
                  src="${result.img_url}"
                  alt="${result.product_name}"
                />
                <div class="card-body">
                  <p class="card-text">
                    ${result.description}
                  </p>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        onclick="window.open('${result.img_url}', 'targetWindow', 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1090px, height=550px, top=25px left=120px'); return false;"
                      >
                        View
                      </button>
                    </div>
                    <small class="text-muted"></small>
                  </div>
                </div>
              </div>
            </div>
        `;
        mainContainer.innerHTML += content;
    })
}