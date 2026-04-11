// ===== Global State =====
let currentLanguage = 'es';
let cart = [];
let currentProductId = null;
let userRating = 0;
let productReviews = {
  '1': [],
  '2': [],
  '3': []
};

// ===== Translations =====
const translations = {
  es: {
    navSubtitle: '| Poesias',
    langText: 'ES | 한국어',
    heroTitle: 'HAN',
    heroSubtitle: 'Una Argentina con alma y corazon coreano',
    heroQuote: '"Poesias Musicales - Cada poema tiene un QR para escuchar la version cantada"',
    exploreCta: 'Explorar Coleccion',
    preview: 'Vista Previa',
    poemTitle: 'EL COMIENZO DE UN AMOR ETERNO',
    poemText: `Donde verdades y secretos se entrelazaron,
sus corazones danzaron antes del fin de cada cancion,
y sus almas se unieron hasta que el dia se despidio.

Voraces contra las corrientes del mar,
audaces frente al destino,
sus vivencias y memorias esperan ser contadas,
una galaxia de sentimientos los inunda.

Esa historia solo esta escrita con tinta,
la clave de sol marca el inicio del pentagrama,
notas blancas y negras se deslizan,
como las mas bellas melodias que emergen de su union,
cuando susurran "te amo" y el tiempo parece detenerse.`,
    qrText: 'Escanea el QR para escuchar un adelanto de los poemas convertidos en canciones',
    aboutTitle: 'Sobre la Autora',
    aboutBio: `<p>Silvana A. Monelli nacio en Cordoba, Argentina. Esta felizmente casada y es madre de cuatro hijos. Su familia es su refugio de amor. La autora comparte el amor a la medicina y a la poesia, disfrutando del arte de escribir poemas.</p>
<p>Silvana nos presenta el primer libro de esta coleccion de POESIAS MUSICALES llamado "HAN", que tienen la peculiaridad que estan escrito en espanol y coreano, cada poema tiene un QR a donde se puede escuchar la version cantada, buscando eliminar barreras, ofreciendo una experiencia sensorial completa tanto para lectores como para las personas con discapacidad visual que deseen sumergirse en sus melodias.</p>
<p>La autora se encuentra trabajando para lanzar los proximos libros de esta coleccion de una argentina con alma y corazon coreano de la mano de Editorial Gema Azul.</p>`,
    aboutQuote: '"En el encuentro de dos culturas descubri que lo esencial no se ve ni se oye... se siente; y es en ese sentir donde el alma aprende a sanar sus huellas mas ocultas."',
    bookTitle: '¿Por que leer HAN?',
    bookDescription: `<p>Porque es el primer libro de poemas inclusivo para personas con discapacidad visual, quienes podran acceder con a traves de un QR y escucharlos en forma de cancion. Esta innovacion parte por iniciativa de la autora, quien quiere llegar a la mayor cantidad de lectores amantes de la poesia y la musica.</p>
<p>En HAN, una argentina con alma y corazon coreano, se encontraran versos que acarician el alma, con poemas de amor que trascienden el corazon para inundar de ternura el aire. Silvana se ha propuesto ser esa primavera que inunda con sus versos de fragancias exquisita el aire como los cerezos en flor.</p>
<p>Y hacer este homenaje bilingue habla de la intencionalidad de la autora: rescatar culturas, ser puente entre Argentina y Corea del Sur. Una verdadera joya.</p>
<p>Los invitamos a disfrutar y saborear estos poemas de Silvana A. Monelli con Editorial Gema Azul, Cordoba, Argentina... para el mundo.</p>`,
    audience: 'Para almas sensibles que buscan encontrarse en las palabras de otro.',
    reviewsTitle: 'Resenas',
    reviewsSubtitle: 'Lo que dicen nuestros lectores',
    reviews: 'resenas',
    contactTitle: 'Contacto',
    contactSubtitle: 'Me encantaria saber de ti',
    successMessage: 'Mensaje enviado correctamente',
    quickResponse: 'Respuesta Rapida',
    quickResponseTime: 'En menos de 24 horas',
    quickResponseText: 'Respondo personalmente a cada mensaje. No dudes en escribirme.',
    footerTagline: 'Una Argentina con alma y corazon coreano',
    madeWith: 'Hecho con amor y poesia',
    rights: 'Todos los derechos reservados',
    available: 'Disponible',
    comingSoon: 'Proximamente',
    addToCart: 'Agregar al Carrito',
    added: 'Agregado',
    cart: 'Carrito',
    emptyCart: 'Tu carrito esta vacio',
    total: 'Total:',
    checkout: 'Proceder al Pago',
    quantity: 'Cantidad',
    description: 'Descripcion',
    rating: 'Calificacion',
    comments: 'Comentarios',
    yourRating: 'Tu calificacion:',
    writeComment: 'Escribe tu comentario...',
    author: 'por Silvana A. Monelli',
    shippingCost: 'Envio segun ubicacion',
    securePurchase: 'Compra segura',
    cards: 'Tarjetas',
    themes: 'Tematicas',
    family: 'Familia',
    love: 'Amor',
    overcoming: 'Superacion',
    admiration: 'Admiracion',
    dedication: 'Dedicacion',
    nostalgia: 'Nostalgia',
    flipBook: 'Clic para girar',
    collection: 'Coleccion Proximamente',
    book1Desc: 'Poemario bilingue espanol-coreano con 80 poemas que pueden escucharse como canciones a traves de codigos QR. Una experiencia sensorial unica que une dos culturas.',
    book2Desc: 'El segundo volumen de la coleccion continuara explorando temas de amor, familia y conexion cultural.',
    book3Desc: 'Un nuevo capitulo de poesia musical que seguira uniendo corazones a traves de versos y melodias.',
    imageNotAvailable: 'Imagen no disponible',
    feature1: '80 Poemas con QR (40 ES + 40 KR)',
    feature2: 'Accesible para discapacidad visual'
  },
  kr: {
    navSubtitle: '| 한',
    langText: 'KR | Español',
    heroTitle: '한',
    heroSubtitle: '(한국의 마음을 품은 아르헨티나인)',
    heroQuote: '"음악 시집 - 각 시에는 노래로 감상할 수 있는 QR 코드가 포함되어 있습니다"',
    exploreCta: '컬렉션 탐색',
    preview: '미리보기',
    poemTitle: '사랑 이야기',
    poemText: `진실과 비밀이 서로 얽혀 들던 곳에서,
그들의 마음은 노래 한 곡의 끝이 오기 전까지 춤추었고,
그들의 영혼은 하루가 작별을 고할 때까지 하나로 이어졌어요.

거센 바다의 물결을 거슬러,
운명 앞에서도 대담했고,
그들의 삶의 기억과 이야기들은 들려지기를 기다리며,
감정의 은하가 그들을 가득 채워요.

그 이야기는 오직 잉크로만 쓰여 있어요.
높은음자리표가 오선지의 시작을 알리고,
흰 음표와 검은 음표가 미끄러지듯 흐르며,
그들의 하나 됨에서 피어나는 가장 아름다운 멜로디가 되어,
"사랑해"라고 속삭일 때
시간은 멈춘 듯해요.`,
    qrText: 'QR 코드를 스캔하여 시를 노래로 들어보세요',
    aboutTitle: '저자 소개',
    aboutBio: `<p>실바나 모넬리는 아르헨티나 코르도바에서 태어났습니다. 그녀는 행복한 결혼 생활을 이어가며 네 명의 자녀를 둔 어머니입니다. 그녀의 가족은 사랑이 머무는 가장 큰 안식처입니다. 저자는 의학과 시에 대한 깊은 애정을 지니고 있으며, 시를 쓰는 예술을 즐기고 있습니다.</p>
<p>실바나는 『HAN』이라는 제목의 음악 시집 시리즈 첫 번째 작품을 선보입니다. 이 작품은 스페인어와 한국어, 두 언어로 쓰였다는 점에서 특별하며, 각 시에는 QR 코드가 포함되어 있어 노래로 감상할 수 있습니다.</p>
<p>현재 저자는 이 시리즈의 다음 작품들을 준비 중이며, Editorial Gema Azul 과 함께 출간을 이어갈 예정입니다.</p>`,
    aboutQuote: '"두 문화의 만남 속에서 나는 본질적인 것은 보이지도, 들리지도 않으며… 느껴진다는 것을 깨달았다."',
    bookTitle: '왜 『HAN』을 읽어야 할까요?',
    bookDescription: `<p>이 책은 시각 장애를 가진 사람들을 위한 접근성을 고려한 시집으로, QR 코드를 통해 시를 노래 형식으로 감상할 수 있도록 구성되어 있습니다.</p>
<p>『HAN』에서는 한국의 영혼과 마음을 품은 한 아르헨티나 작가의 시 세계를 만나볼 수 있습니다. 영혼을 어루만지는 시어들은 사랑을 노래하며, 그 감정은 마음을 넘어 공기마저 따뜻한 온기로 채워 줍니다.</p>
<p>이중 언어로 이루어진 이 작품은 서로 다른 문화를 잇고, 아르헨티나와 한국을 연결하는 다리와도 같습니다.</p>
<p>실바나 모넬리의 시를 통해, 독자 여러분이 이 작품을 천천히 음미하며 즐기시기를 바랍니다.</p>`,
    audience: '다른 이의 말에서 자신을 찾고자 하는 섬세한 영혼들을 위해.',
    reviewsTitle: '리뷰',
    reviewsSubtitle: '독자들의 이야기',
    reviews: '리뷰',
    contactTitle: '연락처',
    contactSubtitle: '여러분의 이야기를 듣고 싶습니다',
    successMessage: '메시지가 성공적으로 전송되었습니다',
    quickResponse: '빠른 응답',
    quickResponseTime: '24시간 이내',
    quickResponseText: '모든 메시지에 직접 답변드립니다. 언제든지 연락해 주세요.',
    footerTagline: '한국의 마음을 품은 아르헨티나인',
    madeWith: '사랑과 시로 만들어짐',
    rights: '모든 권리 보유',
    available: '구매 가능',
    comingSoon: '출시 예정',
    addToCart: '장바구니에 담기',
    added: '추가됨',
    cart: '장바구니',
    emptyCart: '장바구니가 비어 있습니다',
    total: '합계:',
    checkout: '결제하기',
    quantity: '수량',
    description: '설명',
    rating: '평점',
    comments: '리뷰',
    yourRating: '평점:',
    writeComment: '댓글을 작성하세요...',
    author: 'Silvana A. Monelli 저',
    shippingCost: '배송비 별도',
    securePurchase: '안전 결제',
    cards: '카드',
    themes: '주제',
    family: '가족',
    love: '사랑',
    overcoming: '극복',
    admiration: '존경',
    dedication: '헌신',
    nostalgia: '향수',
    flipBook: '클릭하여 회전',
    collection: '컬렉션 출시 예정',
    book1Desc: '80편의 시가 담긴 스페인어-한국어 이중 언어 시집으로, QR 코드를 통해 노래로 감상할 수 있습니다.',
    book2Desc: '컬렉션의 두 번째 책은 사랑, 가족, 문화적 연결에 대한 주제를 계속 탐구할 것입니다.',
    book3Desc: '시와 멜로디를 통해 마음을 연결하는 음악 시의 새로운 장.',
    imageNotAvailable: '이미지 준비 중',
    feature1: 'QR 코드가 있는 80편의 시',
    feature2: '시각 장애인 접근 가능'
  }
};

// ===== Products Data =====
const products = [
  {
    id: '1',
    title: 'HAN - Una Argentina con alma y corazon coreano',
    titleKr: 'HAN - 한국의 마음을 품은 아르헨티나인',
    price: 40,
    stock: 50,
    image: './books/han-cover.jpg',
    comingSoon: false
  },
  {
    id: '2',
    title: 'Coleccion HAN - Volumen 2',
    titleKr: 'HAN 컬렉션 - 2권',
    price: 0,
    stock: 0,
    image: '',
    comingSoon: true
  },
  {
    id: '3',
    title: 'Coleccion HAN - Volumen 3',
    titleKr: 'HAN 컬렉션 - 3권',
    price: 0,
    stock: 0,
    image: '',
    comingSoon: true
  }
];

// ===== Utility Functions =====
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatDate(dateString, lang) {
  const [year, month, day] = dateString.split('-');
  const monthNames = {
    es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    kr: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
  };
  const monthIndex = parseInt(month, 10) - 1;
  if (lang === 'es') {
    return `${parseInt(day, 10)} de ${monthNames.es[monthIndex]} de ${year}`;
  }
  return `${year}년 ${monthNames.kr[monthIndex]} ${parseInt(day, 10)}일`;
}

function createStarSVG(filled = true) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', filled ? 'currentColor' : 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.classList.add('star');
  if (!filled) svg.classList.add('empty');
  
  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2');
  svg.appendChild(polygon);
  
  return svg;
}

// ===== Initialize Sakura Petals =====
function initSakuraPetals() {
  const container = document.getElementById('sakura-container');
  if (!container) return;
  
  for (let i = 0; i < 20; i++) {
    const petal = document.createElement('div');
    petal.classList.add('sakura-petal');
    petal.innerHTML = `<svg width="${10 + Math.random() * 15}" height="${10 + Math.random() * 15}" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C12 2 8 6 8 10C8 14 12 18 12 18C12 18 16 14 16 10C16 6 12 2 12 2Z"/>
      <path d="M12 6C12 6 6 8 6 12C6 16 12 18 12 18C12 18 18 16 18 12C18 8 12 6 12 6Z" opacity="0.7"/>
    </svg>`;
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDelay = `${Math.random() * 10}s`;
    petal.style.animationDuration = `${10 + Math.random() * 15}s`;
    petal.style.opacity = `${0.4 + Math.random() * 0.4}`;
    container.appendChild(petal);
  }
}

// ===== Music Player =====
function initMusicPlayer() {
  const musicBtn = document.getElementById('music-btn');
  const audio = document.getElementById('background-music');
  const iconOff = document.getElementById('music-icon-off');
  const iconOn = document.getElementById('music-icon-on');
  
  if (!musicBtn || !audio) return;
  
  let isPlaying = false;
  
  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      musicBtn.classList.remove('playing');
      iconOff.classList.remove('hidden');
      iconOn.classList.add('hidden');
    } else {
      audio.play().catch(() => {});
      musicBtn.classList.add('playing');
      iconOff.classList.add('hidden');
      iconOn.classList.remove('hidden');
    }
    isPlaying = !isPlaying;
  });
}

// ===== Language Toggle =====
function initLanguageToggle() {
  const langToggle = document.getElementById('lang-toggle');
  const langText = document.getElementById('lang-text');
  
  if (!langToggle) return;
  
  langToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'es' ? 'kr' : 'es';
    langText.textContent = translations[currentLanguage].langText;
    updateAllTranslations();
  });
}

function updateAllTranslations() {
  const t = translations[currentLanguage];
  
  const navSubtitle = document.getElementById('nav-subtitle');
  if (navSubtitle) navSubtitle.textContent = t.navSubtitle;
  
  document.querySelectorAll('[data-es]').forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLanguage}`);
  });
  
  const poemText = document.getElementById('poem-text');
  if (poemText) poemText.textContent = t.poemText;
  
  const aboutBio = document.getElementById('about-bio');
  if (aboutBio) aboutBio.innerHTML = t.aboutBio;
  
  const bookDescription = document.getElementById('book-description');
  if (bookDescription) bookDescription.innerHTML = t.bookDescription;
  
  renderProducts();
  renderReviews();
  updateCart();
}

// ===== Mobile Menu =====
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
  
  if (!mobileMenuBtn || !mobileMenu) return;
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
  });
  
  mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
  
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// ===== Hero Book Animation =====
function initHeroBook() {
  const bookWrapper = document.getElementById('book-wrapper');
  const bookCover = document.getElementById('book-cover');
  const bookPages = document.getElementById('book-pages');
  const previewBtn = document.getElementById('book-preview-btn');
  
  if (!bookWrapper || !bookCover || !bookPages) return;
  
  let isOpen = false;
  
  function toggleBook() {
    isOpen = !isOpen;
    if (isOpen) {
      bookCover.classList.add('open');
      bookPages.classList.add('visible');
    } else {
      bookCover.classList.remove('open');
      bookPages.classList.remove('visible');
    }
  }
  
  bookWrapper.addEventListener('click', toggleBook);
  if (previewBtn) previewBtn.addEventListener('click', toggleBook);
}

// ===== Book Flip Animation =====
function initBookFlip() {
  const flipContainer = document.getElementById('book-flip-container');
  const flipBtn = document.getElementById('flip-btn');
  
  if (!flipContainer) return;
  
  let isFlipped = false;
  
  function toggleFlip() {
    isFlipped = !isFlipped;
    if (isFlipped) {
      flipContainer.classList.add('flipped');
    } else {
      flipContainer.classList.remove('flipped');
    }
  }
  
  flipContainer.addEventListener('click', toggleFlip);
  if (flipBtn) flipBtn.addEventListener('click', toggleFlip);
}

// ===== Intersection Observer for Animations =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
  });
}

// ===== Render Products =====
function renderProducts() {
  const shopGrid = document.getElementById('shop-grid');
  if (!shopGrid) return;
  
  const t = translations[currentLanguage];
  
  shopGrid.innerHTML = products.map(product => {
    const title = currentLanguage === 'es' ? product.title : product.titleKr;
    const isComingSoon = product.comingSoon;
    
    return `
      <div class="product-card fade-in-up visible" data-product-id="${product.id}">
        <div class="product-image-wrapper">
          ${product.image ? 
            `<img src="${product.image}" alt="${title}" class="product-image">` :
            `<div class="product-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>${t.imageNotAvailable}</span>
            </div>`
          }
          <span class="product-badge ${isComingSoon ? 'coming-soon' : 'available'}">
            ${isComingSoon ? t.comingSoon : t.available}
          </span>
        </div>
        <div class="product-content">
          <h3 class="product-title">${title}</h3>
          <p class="product-author">${t.author}</p>
          ${!isComingSoon ? 
            `<p class="product-price">$${formatPrice(product.price)} <span>ARS</span></p>` :
            `<p class="product-coming-soon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              ${t.comingSoon}
            </p>`
          }
        </div>
      </div>
    `;
  }).join('');
  
  shopGrid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const productId = card.dataset.productId;
      openProductModal(productId);
    });
  });
}

// ===== Product Modal =====
function openProductModal(productId) {
  const modal = document.getElementById('product-modal');
  const product = products.find(p => p.id === productId);
  if (!modal || !product) return;
  
  currentProductId = productId;
  userRating = 0;
  
  const t = translations[currentLanguage];
  const title = currentLanguage === 'es' ? product.title : product.titleKr;
  const isComingSoon = product.comingSoon;
  
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-image').src = product.image || '/books/placeholder.jpg';
  document.getElementById('modal-image').alt = title;
  
  const badge = document.getElementById('modal-badge');
  badge.textContent = isComingSoon ? t.comingSoon : t.available;
  badge.className = `modal-badge ${isComingSoon ? 'coming-soon' : 'available'}`;
  
  document.getElementById('modal-price').textContent = `$${formatPrice(product.price)}`;
  
  const descriptions = {
    '1': currentLanguage === 'es' ? t.book1Desc : t.book1Desc,
    '2': currentLanguage === 'es' ? t.book2Desc : t.book2Desc,
    '3': currentLanguage === 'es' ? t.book3Desc : t.book3Desc
  };
  document.getElementById('modal-description').textContent = descriptions[productId] || '';
  
  const featuresContainer = document.getElementById('modal-features');
  if (productId === '1') {
    featuresContainer.innerHTML = `
      <div class="feature-item pink">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
        <span>${t.feature1}</span>
      </div>
      <div class="feature-item blue">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        <span>${t.feature2}</span>
      </div>
    `;
  } else {
    featuresContainer.innerHTML = '';
  }
  
  const cartSection = document.querySelector('.modal-cart-section');
  const comingSoonSection = document.getElementById('modal-coming-soon');
  const priceSection = document.querySelector('.modal-price-section');
  
  if (isComingSoon) {
    cartSection.classList.add('hidden');
    comingSoonSection.classList.remove('hidden');
    priceSection.classList.add('hidden');
  } else {
    cartSection.classList.remove('hidden');
    comingSoonSection.classList.add('hidden');
    priceSection.classList.remove('hidden');
  }
  
  document.getElementById('qty-value').textContent = '1';
  
  renderModalReviews(productId);
  renderRatingInput();
  cargarComentariosDelServidor(productId);
  modal.classList.add('open');
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.classList.remove('open');
  currentProductId = null;
}

function renderModalReviews(productId) {
  const reviews = productReviews[productId] || [];
  const reviewsContainer = document.getElementById('modal-reviews');
  const starsContainer = document.getElementById('modal-stars');
  
  const avgRating = reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : 5;
  
  document.getElementById('modal-rating').textContent = avgRating.toFixed(1);
  document.getElementById('modal-review-count').textContent = `(${reviews.length})`;
  
  starsContainer.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    starsContainer.appendChild(createStarSVG(i <= Math.round(avgRating)));
  }
  
  reviewsContainer.innerHTML = reviews.map(review => `
    <div class="modal-review-item">
      <div class="modal-review-header">
        <span class="modal-review-name">${review.name}</span>
        <div class="modal-review-stars">
          ${Array.from({length: 5}, (_, i) => 
            `<svg viewBox="0 0 24 24" fill="${i < review.rating ? '#fbbf24' : 'none'}" stroke="${i < review.rating ? '#fbbf24' : '#cbd5e1'}" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>`
          ).join('')}
        </div>
      </div>
      <p class="modal-review-comment">${review.comment}</p>
    </div>
  `).join('') || `<p style="color: #64748b; font-size: 0.75rem;">${currentLanguage === 'es' ? 'No hay comentarios aun.' : '아직 댓글이 없습니다.'}</p>`;
}

function renderRatingInput() {
  const container = document.getElementById('review-stars-input');
  container.innerHTML = '';
  
  for (let i = 1; i <= 5; i++) {
    const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    star.setAttribute('viewBox', '0 0 24 24');
    star.setAttribute('fill', i <= userRating ? '#fbbf24' : 'none');
    star.setAttribute('stroke', i <= userRating ? '#fbbf24' : '#cbd5e1');
    star.setAttribute('stroke-width', '2');
    star.style.color = i <= userRating ? '#fbbf24' : '#cbd5e1';
    
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2');
    star.appendChild(polygon);
    
    star.addEventListener('click', () => {
      userRating = i;
      renderRatingInput();
    });
    
    star.addEventListener('mouseenter', () => {
      container.querySelectorAll('svg').forEach((s, idx) => {
        s.setAttribute('fill', idx < i ? '#fbbf24' : 'none');
        s.setAttribute('stroke', idx < i ? '#fbbf24' : '#cbd5e1');
      });
    });
    
    star.addEventListener('mouseleave', () => {
      container.querySelectorAll('svg').forEach((s, idx) => {
        s.setAttribute('fill', idx < userRating ? '#fbbf24' : 'none');
        s.setAttribute('stroke', idx < userRating ? '#fbbf24' : '#cbd5e1');
      });
    });
    
    container.appendChild(star);
  }
}

function submitReview() {
  const commentInput = document.getElementById('review-comment');
  const comment = commentInput.value.trim();
  
  if (userRating > 0 && comment && currentProductId) {
    const product = products.find(p => p.id === currentProductId);
    const userName = currentLanguage === 'es' ? 'Usuario' : '사용자';
    
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwk8fIuDjL71UsKaEM_yYopmgzgr6zQBmsMrvhGTK_iK7DUbWY_6Wfi0IKLPpmia_uz1Q/exec';
    
    const params = new URLSearchParams();
    params.append('producto', product.title);
    params.append('nombre', userName);
    params.append('rating', userRating);
    params.append('comentario', comment);
    params.append('fecha', new Date().toLocaleString());
    
    fetch(SCRIPT_URL, {
      method: 'POST',
      body: params
    })
    .then(response => {
      console.log('Comentario enviado:', response);
      
      const newReview = {
        id: Date.now(),
        name: userName,
        rating: userRating,
        comment: comment
      };
      
      if (!productReviews[currentProductId]) {
        productReviews[currentProductId] = [];
      }
      productReviews[currentProductId].unshift(newReview);
      
      commentInput.value = '';
      userRating = 0;
      renderRatingInput();
      renderModalReviews(currentProductId);
    })
    .catch(error => console.error('Error:', error));
  }
}

// ===== Cart Functions =====
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product || product.comingSoon) return;
  
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity = Math.min(existingItem.quantity + quantity, product.stock);
  } else {
    cart.push({ ...product, quantity });
  }
  
  updateCart();
  showAddedFeedback();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

function updateCartItemQuantity(productId, change) {
  const item = cart.find(i => i.id === productId);
  const product = products.find(p => p.id === productId);
  if (item && product) {
    item.quantity = Math.max(1, Math.min(item.quantity + change, product.stock));
    updateCart();
  }
}

function updateCart() {
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total-amount');
  
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  if (cartCount) {
    cartCount.textContent = totalItems;
    if (totalItems > 0) {
      cartCount.classList.remove('hidden');
    } else {
      cartCount.classList.add('hidden');
    }
  }
  
  if (cartTotal) {
    cartTotal.textContent = `$${formatPrice(totalPrice)}`;
  }
  
  if (cartItems) {
    const t = translations[currentLanguage];
    
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p>${t.emptyCart}</p>
        </div>
      `;
    } else {
      cartItems.innerHTML = cart.map(item => {
        const title = currentLanguage === 'es' ? item.title : item.titleKr;
        return `
          <div class="cart-item">
            <img src="${item.image}" alt="${title}" class="cart-item-image">
            <div class="cart-item-info">
              <p class="cart-item-title">${title}</p>
              <p class="cart-item-price">$${formatPrice(item.price)}</p>
              <div class="cart-item-qty">
                <button onclick="updateCartItemQuantity('${item.id}', -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateCartItemQuantity('${item.id}', 1)">+</button>
              </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `;
      }).join('');
    }
  }
}

function showAddedFeedback() {
  const addBtn = document.getElementById('modal-add-cart');
  if (addBtn) {
    const t = translations[currentLanguage];
    const originalText = addBtn.innerHTML;
    addBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon-left">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${t.added}</span>
    `;
    addBtn.style.background = '#22c55e';
    
    setTimeout(() => {
      addBtn.innerHTML = originalText;
      addBtn.style.background = '';
    }, 2000);
  }
}

function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  
  if (sidebar && overlay) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  }
}

// ===== Render Reviews =====
function renderReviews() {
  const reviewsGrid = document.getElementById('reviews-grid');
  const averageStars = document.getElementById('average-stars');
  const averageRating = document.getElementById('average-rating');
  const ratingCount = document.getElementById('rating-count');
  
  if (!reviewsGrid) return;
  
  const t = translations[currentLanguage];
  const avgRating = siteReviews.reduce((acc, r) => acc + r.rating, 0) / siteReviews.length;
  
  if (averageRating) averageRating.textContent = avgRating.toFixed(1);
  if (ratingCount) ratingCount.textContent = `(${siteReviews.length} ${t.reviews})`;
  
  if (averageStars) {
    averageStars.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      averageStars.appendChild(createStarSVG(i <= Math.round(avgRating)));
    }
  }
  
  reviewsGrid.innerHTML = siteReviews.map((review, index) => {
    const name = currentLanguage === 'es' ? review.name : review.nameKr;
    const comment = currentLanguage === 'es' ? review.comment : review.commentKr;
    const date = formatDate(review.date, currentLanguage);
    
    return `
      <div class="review-card fade-in-up visible" style="animation-delay: ${index * 0.15}s">
        <div class="review-quote-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z"></path>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
          </svg>
        </div>
        <p class="review-text">${comment}</p>
        <div class="review-footer">
          <div>
            <p class="review-author">${name}</p>
            <p class="review-date">${date}</p>
          </div>
          <div class="review-stars">
            ${Array.from({length: 5}, (_, i) => 
              `<svg viewBox="0 0 24 24" fill="${i < review.rating ? '#fbbf24' : 'none'}" stroke="${i < review.rating ? '#fbbf24' : 'rgba(100,116,139,0.3)'}" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>`
            ).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ===== Contact Form =====
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    form.classList.add('hidden');
    successMessage.classList.remove('hidden');
    
    setTimeout(() => {
      form.reset();
      form.classList.remove('hidden');
      successMessage.classList.add('hidden');
    }, 3000);
  });
}

// ===== Modal Event Listeners =====
function initModalListeners() {
  const modal = document.getElementById('product-modal');
  const closeBtn = document.getElementById('modal-close');
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  const addCartBtn = document.getElementById('modal-add-cart');
  const submitReviewBtn = document.getElementById('submit-review');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeProductModal);
  }
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProductModal();
    });
  }
  
  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      const qtyValue = document.getElementById('qty-value');
      const current = parseInt(qtyValue.textContent);
      if (current > 1) qtyValue.textContent = current - 1;
    });
  }
  
  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      const qtyValue = document.getElementById('qty-value');
      const product = products.find(p => p.id === currentProductId);
      const current = parseInt(qtyValue.textContent);
      if (product && current < product.stock) qtyValue.textContent = current + 1;
    });
  }
  
  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      const qtyValue = parseInt(document.getElementById('qty-value').textContent);
      if (currentProductId) {
        addToCart(currentProductId, qtyValue);
      }
    });
  }
  
  if (submitReviewBtn) {
    submitReviewBtn.addEventListener('click', submitReview);
  }
}

// ===== Cart Sidebar Listeners =====
function initCartListeners() {
  const cartBtn = document.getElementById('cart-btn');
  const cartClose = document.getElementById('cart-close');
  const cartOverlay = document.getElementById('cart-overlay');
  
  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCart();
    });
  }
  
  if (cartClose) {
    cartClose.addEventListener('click', toggleCart);
  }
  
  if (cartOverlay) {
    cartOverlay.addEventListener('click', toggleCart);
  }
}

// ===== Set Current Year =====
function setCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ===== MERCADO PAGO =====
const loadMercadoPagoSDK = () => {
  
};

const initCheckoutButton = () => {
  const checkoutBtn = document.querySelector('button[data-es="Proceder al Pago"]');
  if (!checkoutBtn) return;
  
  checkoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    
    try {
      checkoutBtn.disabled = true;
      checkoutBtn.innerHTML = '<span>Procesando...</span>';
      
      const items = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        return {
          title: product.title,
          quantity: item.quantity,
          unit_price: product.price / 100,
          description: `${product.title} x${item.quantity}`
        };
      });
      
      const response = await fetch('https://paginahan.onrender.com/create_preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });
      
      const data = await response.json();
      window.location.href = data.init_point;
      
    } catch (error) {
      alert('Error: ' + error.message);
      checkoutBtn.disabled = false;
      checkoutBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon-left"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>Proceder al Pago';
    }
  });
};

// ===== Cargar comentarios de Google Sheets =====
function cargarComentariosDelServidor(productId) {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwk8fIuDjL71UsKaEM_yYopmgzgr6zQBmsMrvhGTK_iK7DUbWY_6Wfi0IKLPpmia_uz1Q/exec';
  
  fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(comentarios => {
      const product = products.find(p => p.id === productId);
      
      // Filtrar comentarios de este producto
      const comentariosDelProducto = comentarios
        .filter(c => c.producto && c.producto.includes(product.title))
        .map(c => ({
          id: Date.now(),
          name: c.nombre,
          rating: parseInt(c.rating) || 0,
          comment: c.comentario
        }));
      
      // Guardar en productReviews
      productReviews[productId] = comentariosDelProducto;
      
      // Renderizar
      renderModalReviews(productId);
    })
    .catch(err => console.log('Error cargando comentarios:', err));
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
  initSakuraPetals();
  initMusicPlayer();
  initLanguageToggle();
  initMobileMenu();
  initHeroBook();
  initBookFlip();
  initScrollAnimations();
  renderProducts();
  renderReviews();
  initContactForm();
  initModalListeners();
  initCartListeners();
  updateCart();
  setCurrentYear();
  loadMercadoPagoSDK();
  initCheckoutButton();
});