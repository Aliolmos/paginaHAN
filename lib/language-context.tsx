"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'es' | 'kr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Sobre la Autora',
    'nav.book': 'Sobre el Libro',
    'nav.shop': 'Tienda',
    'nav.reviews': 'Reseñas',
    'nav.contact': 'Contacto',
    
    // Hero
    'hero.title': 'HAN',
    'hero.subtitle': 'Una Argentina con alma y corazón coreano',
    'hero.quote': '"Poesías Musicales - Cada poema tiene un QR para escuchar la versión cantada"',
    'hero.cta': 'Explorar Colección',
    'hero.preview': 'Vista Previa',
    'hero.poem.title': 'EL COMIENZO DE UN AMOR ETERNO',
    'hero.poem.content': `Donde verdades y secretos se entrelazaron,
sus corazones danzaron antes del fin de cada canción,
y sus almas se unieron hasta que el día se despidió.

Voraces contra las corrientes del mar,
audaces frente al destino,
sus vivencias y memorias esperan ser contadas,
una galaxia de sentimientos los inunda.

Esa historia solo está escrita con tinta,
la clave de sol marca el inicio del pentagrama,
notas blancas y negras se deslizan,
como las más bellas melodías que emergen de su unión,
cuando susurran "te amo" y el tiempo parece detenerse.`,
    
    // About
    'about.title': 'Sobre la Autora',
    'about.description': `Silvana A. Monelli nació en Córdoba, Argentina. Está felizmente casada y es madre de cuatro hijos. Su familia es su refugio de amor. La autora comparte el amor a la medicina y a la poesía, disfrutando del arte de escribir poemas.

Silvana nos presenta el primer libro de esta colección de POESIAS MUSICALES llamado "HAN", que tienen la peculiaridad que están escrito en español y coreano, cada poema tiene un QR a dónde se puede escuchar la versión cantada, buscando eliminar barreras, ofreciendo una experiencia sensorial completa tanto para lectores como para las personas con discapacidad visual que deseen sumergirse en sus melodías.

La autora se encuentra trabajando para lanzar los próximos libros de esta colección de una argentina con alma y corazón coreano de la mano de Editorial Germa Azul.`,
    'about.quote': '"En el encuentro de dos culturas descubrí que lo esencial no se ve ni se oye… se siente; y es en ese sentir donde el alma aprende a sanar sus huellas más ocultas."',
    'about.stats.books': 'Libro',
    'about.stats.poems': 'Poemas',
    'about.stats.languages': 'Idiomas',
    'about.stats.coming': 'Colección Próximamente',
    
    // Book
    'book.title': '¿Por qué leer HAN?',
    'book.description': `Porque es el primer libro de poemas inclusivo para personas con discapacidad visual, quienes podrán acceder con a través de un QR y escucharlos en forma de canción. Esta innovación parte por iniciativa de la autora, quien quiere llegar a la mayor cantidad de lectores amantes de la poesía y la música.

En HAN, una argentina con alma y corazón coreano, se encontrarán versos que acarician el alma, con poemas de amor que trascienden el corazón para inundar de ternura el aire. Silvana se ha propuesto ser esa primavera que inunda con sus versos de fragancias exquisita el aire como los cerezos en flor.

Y hacer este homenaje bilingüe habla de la intencionalidad de la autora: rescatar culturas, ser puente entre Argentina y Corea del Sur. Una verdadera joya.

Los invitamos a disfrutar y saborear estos poemas de Silvana A. Monelli con Editorial Gema Azul, Córdoba, Argentina… para el mundo.`,
    'book.themes': 'Temáticas',
    'book.theme1': 'Familia',
    'book.theme2': 'Amor',
    'book.theme3': 'Superación',
    'book.theme4': 'Admiración',
    'book.theme5': 'Dedicación',
    'book.theme6': 'Nostalgia',
    'book.audience': 'Para almas sensibles que buscan encontrarse en las palabras de otro.',
    
    // Shop
    'shop.title': 'Tienda',
    'shop.price': 'Precio',
    'shop.stock': 'unidades disponibles',
    'shop.lowStock': 'Últimas unidades',
    'shop.outOfStock': 'Agotado',
    'shop.quantity': 'Cantidad',
    'shop.addToCart': 'Agregar al Carrito',
    'shop.cart': 'Carrito',
    'shop.total': 'Total',
    'shop.checkout': 'Proceder al Pago',
    'shop.empty': 'Tu carrito está vacío',
    'shop.payment': 'Métodos de Pago',
    'shop.comingSoon': 'Próximamente',
    
    // Reviews
    'reviews.title': 'Reseñas',
    'reviews.subtitle': 'Lo que dicen nuestros lectores',
    
    // Contact
    'contact.title': 'Contacto',
    'contact.subtitle': 'Me encantaría saber de ti',
    'contact.name': 'Nombre',
    'contact.email': 'Correo Electrónico',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.social': 'Redes Sociales',
    'contact.success': 'Mensaje enviado correctamente',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados',
    'footer.made': 'Hecho con amor y poesía',
    'footer.publisher': 'Editorial Gema Azul',
  },
  kr: {
    // Navigation
    'nav.home': '홈',
    'nav.about': '저자 소개',
    'nav.book': '책 소개',
    'nav.shop': '상점',
    'nav.reviews': '리뷰',
    'nav.contact': '연락처',
    
    // Hero
    'hero.title': '한',
    'hero.subtitle': '(한국의 마음을 품은 아르헨티나인)',
    'hero.quote': '"음악 시집 - 각 시에는 노래로 감상할 수 있는 QR 코드가 포함되어 있습니다"',
    'hero.cta': '컬렉션 탐색',
    'hero.preview': '미리보기',
    'hero.poem.title': '사랑 이야기',
    'hero.poem.content': `진실과 비밀이 서로 얽혀 들던 곳에서,
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
    
    // About
    'about.title': '저자 소개',
    'about.description': `실바나 모넬리는 아르헨티나 코르도바에서 태어났습니다.
그녀는 행복한 결혼 생활을 이어가며 네 명의 자녀를 둔 어머니입니다. 그녀의 가족은 사랑이 머무는 가장 큰 안식처입니다.
저자는 의학과 시에 대한 깊은 애정을 지니고 있으며, 시를 쓰는 예술을 즐기고 있습니다.

실바나는 『HAN』이라는 제목의 음악 시집 시리즈 첫 번째 작품을 선보입니다. 이 작품은 스페인어와 한국어, 두 언어로 쓰였다는 점에서 특별하며, 각 시에는 QR 코드가 포함되어 있어 노래로 감상할 수 있습니다. 이는 장벽을 허물고, 독자뿐만 아니라 시각 장애를 가진 사람들 또한 그 멜로디에 몰입할 수 있도록 하는, 더욱 풍부한 감각적 경험을 제공합니다.

현재 저자는 "Una argentina con alma y corazón coreano"라는 정체성을 바탕으로, 이 시리즈의 다음 작품들을 준비 중이며, Editorial Germa Azul 과 함께 출간을 이어갈 예정입니다.`,
    'about.quote': '"두 문화의 만남 속에서 나는 본질적인 것은 보이지도, 들리지도 않으며… 느껴진다는 것을 깨달았다. 그리고 바로 그 느껴짐 속에서 영혼은 가장 깊이 숨겨진 흔적을 치유하는 법을 배운다."',
    'about.stats.books': '책',
    'about.stats.poems': '시',
    'about.stats.languages': '언어',
    'about.stats.coming': '컬렉션 출시 예정',
    
    // Book
    'book.title': '왜 『HAN』을 읽어야 할까요?',
    'book.description': `이 책은 시각 장애를 가진 사람들을 위한 접근성을 고려한 시집으로, QR 코드를 통해 시를 노래 형식으로 감상할 수 있도록 구성되어 있습니다. 이는 더 많은 독자들에게 시�� 음악을 함께 전하고자 하는 작가의 특별한 의도에서 비롯된 새로운 시도입니다.

『HAN』에서는 한국의 영혼과 마음을 품은 한 아르헨티나 작가의 시 세계를 만나볼 수 있습니다. 영혼을 어루만지는 시어들은 사랑을 노래하며, 그 감정은 마음을 넘어 공기마저 따뜻한 온기로 채워 줍니다. 실바나는 벚꽃이 만개하듯, 향기로운 시로 세상을 물들이는 '봄'과 같은 존재가 되고자 합니다.

이중 언어로 이루어진 이 작품은 서로 다른 문화를 잇고, 아르헨티나와 한국을 연결하는 다리와도 같습니다. 작가의 이러한 시도는 문화의 가치를 되새기고, 서로를 이해하는 새로운 길을 제시합니다. 그 자체로 하나의 빛나는 작품이라 할 수 있습니다.

실바나 모넬리의 시를 통해, 독자 여러분이 이 작품을 천천히 음미하며 즐기시기를 바랍니다.
아르헨티나 코르도바의 Editorial Gema Azul 과 함께, 이 시집을 세계로 전합니다.`,
    'book.themes': '주제',
    'book.theme1': '가족',
    'book.theme2': '사랑',
    'book.theme3': '극복',
    'book.theme4': '존경',
    'book.theme5': '헌신',
    'book.theme6': '향수',
    'book.audience': '다른 이의 말에서 자신을 찾고자 하는 섬세한 영혼들을 위해.',
    
    // Shop
    'shop.title': '상점',
    'shop.price': '가격',
    'shop.stock': '재고 있음',
    'shop.lowStock': '마지막 재고',
    'shop.outOfStock': '품절',
    'shop.quantity': '수량',
    'shop.addToCart': '장바구니에 담기',
    'shop.cart': '장바구니',
    'shop.total': '합계',
    'shop.checkout': '결제하기',
    'shop.empty': '장바구니가 비어 있습니다',
    'shop.payment': '결제 방법',
    'shop.comingSoon': '출시 예정',
    
    // Reviews
    'reviews.title': '리뷰',
    'reviews.subtitle': '독자들의 이야기',
    
    // Contact
    'contact.title': '연락처',
    'contact.subtitle': '여러분의 이야기를 듣고 싶습니다',
    'contact.name': '이름',
    'contact.email': '이메일',
    'contact.message': '메시지',
    'contact.send': '메시지 보내기',
    'contact.social': '소셜 미디어',
    'contact.success': '메시지가 성공적으로 전송되었습니다',
    
    // Footer
    'footer.rights': '모든 권리 보유',
    'footer.made': '사랑과 시로 만들어짐',
    'footer.publisher': 'Editorial Gema Azul',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')
  
  const t = (key: string): string => {
    return translations[language][key] || key
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
