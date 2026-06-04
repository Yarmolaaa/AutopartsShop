import type { Product, User } from '@/types';

/** Inline SVG placeholder so the app needs zero external network calls (works offline / in E2E). */
// function placeholder(label: string, bg: string): string {
//   const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='${bg}'/><text x='50%' y='50%' font-family='sans-serif' font-size='20' fill='white' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`;
//   return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
// }

export const products: Product[] = [
  // ─── Гальмівна система ───────────────────────────────────────────────────────
  { id: 1,  title: 'Гальмівні колодки Bosch BP956',        description: 'Передні гальмівні колодки Bosch для більшості авто Volkswagen/Audi. Матеріал — низькошумний напівметалевий склад, включає датчик зносу.',                price: 849,   category: 'Гальмівна система', image: `${import.meta.env.BASE_URL}/images/BrakePadsBosh.jpg`, rating: 4.7, stock: 42 },
  { id: 2,  title: 'Гальмівний диск TRW DF4075',           description: 'Вентильований гальмівний диск TRW діаметром 280 мм. Підходить для Renault Megane II, Scenic II. Термостійке покриття проти корозії.',                    price: 1290,  category: 'Гальмівна система', image: `${import.meta.env.BASE_URL}autoparts-shop/public/images/BrakeDiscTRW.jpg`, rating: 4.6, stock: 18 },
  { id: 3,  title: 'Гальмівний супорт ATE 24.3622',        description: 'Ремонтний гальмівний супорт (правий передній) з пилозахисними манжетами. Підходить для Opel Astra G/H.',                                                     price: 2150,  category: 'Гальмівна система', image: `${import.meta.env.BASE_URL}/images/BrakeCaliperATE.jpg`, rating: 4.5, stock: 9  },
  { id: 4,  title: 'Гальмівна рідина Castrol DOT 4',       description: 'Гальмівна рідина класу DOT 4, 1 л. Висока температура кипіння: 230°C суха / 155°C волога. Сумісна з DOT 3.',                                               price: 320,   category: 'Гальмівна система', image: `${import.meta.env.BASE_URL}/images/BrakeFluidCastrol.jpg`, rating: 4.8, stock: 95 },
  { id: 5,  title: 'Гальмівний шланг FEBI 02580',          description: 'Армований гальмівний шланг передній для BMW E46. Виготовлено відповідно до стандартів ECE R13. Пара — 2 шт.',                                               price: 680,   category: 'Гальмівна система', image: `${import.meta.env.BASE_URL}/images/BrakeHoseFEBI.jpg`, rating: 4.4, stock: 30 },
  { id: 6,  title: 'Ручний гальмівний трос Cofle 10.6502', description: 'Трос ручного гальма задній лівий/правий для Toyota Corolla E12. Довжина 1620 мм, оцинкований.',                                                             price: 410,   category: 'Гальмівна система', image: `${import.meta.env.BASE_URL}/images/BrakeCableCofle.jpg`, rating: 4.3, stock: 25 },

  // ─── Підвіска та рульове ──────────────────────────────────────────────────────
  { id: 7,  title: 'Сайлентблок важеля Moog RN-SB-7452',  description: 'Поліуретановий сайлентблок переднього нижнього важеля для Renault Laguna II. Комплект 2 шт.',                                                              price: 560,   category: 'Підвіска та рульове', image: `${import.meta.env.BASE_URL}/images/SilenBlockMoog.jpg`, rating: 4.6, stock: 55 },
  { id: 8,  title: 'Амортизатор SACHS 311 705',            description: 'Газомасляний задній амортизатор SACHS для Volkswagen Golf IV/Bora. Подвійне захисне покриття, безремонтна конструкція.',                                    price: 1780,  category: 'Підвіска та рульове', image: `${import.meta.env.BASE_URL}/images/ShockAbsorberSAHCS.jpg`, rating: 4.7, stock: 14 },
  { id: 9,  title: 'Пружина підвіски Eibach R10283',       description: 'Пружина передньої підвіски Eibach для Ford Focus II. Жорсткість 28 Н/мм. Продається поштучно.',                                                            price: 1120,  category: 'Підвіска та рульове', image: `${import.meta.env.BASE_URL}/images/SuspensionSpringEibach.jpg`, rating: 4.5, stock: 20 },
  { id: 10, title: 'Рульова тяга MOOG VW-AX-8020',         description: 'Зовнішній наконечник рульової тяги Moog для Volkswagen Passat B5/B5+. Саморегулівне мащення.',                                                             price: 490,   category: 'Підвіска та рульове', image: `${import.meta.env.BASE_URL}/images/SteeringRodMOOG.jpg`, rating: 4.4, stock: 38 },
  { id: 11, title: 'Опора амортизатора SKF VKDS 816003',   description: 'Підшипниковий комплект опори переднього амортизатора для Opel Astra H. У комплекті шайба та захисна чашка.',                                               price: 870,   category: 'Підвіска та рульове', image: `${import.meta.env.BASE_URL}/images/ShockAbsorberSupportSKF.jpg`, rating: 4.5, stock: 28 },
  { id: 12, title: 'Стабілізаторна стійка LEMFORDER',      description: 'Стійка стабілізатора передня Lemforder для BMW E90/E91/E92. Кована сталь, подвійна гайка.',                                                                price: 620,   category: 'Підвіска та рульове', image: `${import.meta.env.BASE_URL}/images/StabilizerBar.jpg`, rating: 4.6, stock: 44 },

  // ─── Двигун та паливна система ───────────────────────────────────────────────
  { id: 13, title: 'Оливний фільтр Mahle OC 295',          description: 'Масляний фільтр Mahle для Mercedes-Benz C/E-class (M271, M272). Підвищена фільтрація, Anti-drainback клапан.',                                             price: 280,   category: 'Двигун та паливо',    image: `${import.meta.env.BASE_URL}/images/OilFilterMahle.jpg`, rating: 4.8, stock: 110 },
  { id: 14, title: 'Повітряний фільтр Mann C 25 004',      description: 'Паперовий повітряний фільтр Mann для Audi A4/A6 2.0 TDI. Ефективність фільтрації 99,5%. Ресурс — 30 000 км.',                                             price: 350,   category: 'Двигун та паливо',    image: `${import.meta.env.BASE_URL}/images/AirFilterMann.jpg`, rating: 4.7, stock: 75 },
  { id: 15, title: 'Паливний фільтр Knecht KL 229',        description: 'Паливний фільтр для Skoda Octavia I/II дизель. Тиск 10 бар. Водовіддільна секція.',                                                                         price: 420,   category: 'Двигун та паливо',    image: `${import.meta.env.BASE_URL}/images/FuelFilterKnecht.jpg`, rating: 4.5, stock: 52 },
  { id: 16, title: 'Свіча запалювання NGK BKR6E',          description: 'Стандартна свіча запалювання NGK з мідним центральним електродом. Підходить для більшості бензинових двигунів 1.4–2.0. Комплект 4 шт.',                    price: 460,   category: 'Двигун та паливо',    image: `${import.meta.env.BASE_URL}/images/SparkPlugNGK.jpg`, rating: 4.9, stock: 88 },
  { id: 17, title: 'Ремінь ГРМ Gates K015517XS',           description: 'Комплект ременя ГРМ Gates + помпа для Fiat/Opel/Alfa Romeo 1.9 CDTi. Ресурс 120 000 км.',                                                                  price: 3200,  category: 'Двигун та паливо',    image: `${import.meta.env.BASE_URL}/images/TimingBeltGates.jpg`, rating: 4.8, stock: 11 },
  { id: 18, title: 'Інжектор Bosch 0 445 110 276',         description: 'Відновлений CR-інжектор Bosch для Toyota Avensis/Corolla 2.0 D4-D. Перевірений на стенді, з гарантією 12 місяців.',                                        price: 4900,  category: 'Двигун та паливо',    image: `${import.meta.env.BASE_URL}/images/InjectorBosch.jpg`, rating: 4.6, stock: 5  },

  // ─── Мастила та рідини ────────────────────────────────────────────────────────
  { id: 19, title: 'Моторна олива Mobil 1 5W-30 4L',       description: 'Повністю синтетична моторна олива Mobil 1 FS 5W-30, 4 л. Специфікації: ACEA C3, API SN. Підходить для DPF-авто.',                                          price: 1850,  category: 'Мастила та рідини',   image: `${import.meta.env.BASE_URL}/images/MotorOilMobil1.jpg`, rating: 4.9, stock: 62 },
  { id: 20, title: 'Моторна олива Shell Helix Ultra 5W-40', description: 'Синтетична олива Shell Helix Ultra 5W-40, 4 л. ACEA A3/B4, сумісна з BMW Longlife-98, VW 502.00/505.00.',                                                  price: 1680,  category: 'Мастила та рідини',   image: `${import.meta.env.BASE_URL}/images/MotorOilShell.jpg`, rating: 4.8, stock: 45 },
  { id: 21, title: 'Трансмісійна олива Castrol MTF-94',     description: 'Олива для механічних КПП Castrol 75W, 1 л. Spec: Porsche, Opel, GM. Знижує ударні навантаження на синхронізатори.',                                        price: 680,   category: 'Мастила та рідини',   image: `${import.meta.env.BASE_URL}/images/TransmisionOlilCastrol.jpg`, rating: 4.7, stock: 33 },
  { id: 22, title: 'Антифриз Glysantin G40 концентрат',    description: 'Концентрат антифризу рожевий (OAT), 1.5 л. Готується 1:1 з дистильованою водою. Ресурс 5 років / 250 000 км.',                                             price: 560,   category: 'Мастила та рідини',   image: `${import.meta.env.BASE_URL}/images/AntifreezeGlysantin.jpg`, rating: 4.8, stock: 80 },
  { id: 23, title: 'Рідина ГПК Pentosin CHF 11S',          description: 'Синтетична рідина для гідропідсилювача керма Pentosin, 1 л. Схвалено: Mercedes, BMW, Audi, Porsche. Зелений колір.',                                       price: 490,   category: 'Мастила та рідини',   image: `${import.meta.env.BASE_URL}/images/LiquidCHFPentosin.jpg`, rating: 4.6, stock: 40 },
  { id: 24, title: 'Рідина склоомивача -20°C 4L',          description: 'Готова рідина склоомивача з захистом до –30 °C, запах свіжої хвої, 4 л. Не містить метанолу.',                                                             price: 210,   category: 'Мастила та рідини',   image: `${import.meta.env.BASE_URL}/images/WindshieldFluid.jpg`, rating: 4.5, stock: 150 },

  // ─── Система охолодження ─────────────────────────────────────────────────────
  { id: 25, title: 'Термостат WAHLER 4107.82D',             description: 'Термостат з корпусом для Volkswagen Golf V/VI/Passat B6 2.0 TDI. Температура відкриття 82°C. Включає прокладку.',                                         price: 1050,  category: 'Охолодження',         image: `${import.meta.env.BASE_URL}/images/TermostatWahler.jpg`, rating: 4.7, stock: 22 },
  { id: 26, title: 'Помпа охолодження INA 538 0161 10',     description: 'Помпа системи охолодження з пластиковою крильчаткою для BMW N47. Рекомендується замінювати разом із ременем ГРМ.',                                        price: 2400,  category: 'Охолодження',         image: `${import.meta.env.BASE_URL}/images/PumpINA.jpg`, rating: 4.6, stock: 8  },
  { id: 27, title: 'Радіатор охолодження NRF 53148',        description: 'Алюмінієвий радіатор двигуна NRF для Honda Civic VII (2001–2005) 1.4/1.6/2.0. Ємність 1.1 л.',                                                            price: 3100,  category: 'Охолодження',         image: `${import.meta.env.BASE_URL}/images/RadiaotorNRF.jpg`, rating: 4.5, stock: 6  },
  { id: 28, title: 'Розширювальний бачок FEBI 26085',       description: 'Бачок охолоджувальної рідини для Opel Vectra C/Signum/Zafira B. Включає кришку-клапан.',                                                                  price: 890,   category: 'Охолодження',         image: `${import.meta.env.BASE_URL}/images/ExpansionTankFebi.jpg`, rating: 4.4, stock: 18 },
  { id: 29, title: 'Вентилятор радіатора NISSENS 85465',    description: 'Електровентилятор радіатора для Peugeot 307/308 1.6 HDi. Потужність 200 Вт, діаметр крильчатки 395 мм.',                                                  price: 2750,  category: 'Охолодження',         image: `${import.meta.env.BASE_URL}/images/RadiatorFanNISSENS.jpg`, rating: 4.5, stock: 10 },
  { id: 30, title: 'Патрубок охолодження GATES 05-2030',   description: 'Гумовий патрубок верхнього шланга радіатора для Ford Focus I/II 1.8 Duratorq. Стійкий до температур –40…+135°C.',                                        price: 340,   category: 'Охолодження',         image: `${import.meta.env.BASE_URL}/images/CoolingPipeGATES.jpg`, rating: 4.3, stock: 35 },

  // ─── Електрика та освітлення ─────────────────────────────────────────────────
  { id: 31, title: 'Акумулятор Bosch S4 60Ah 540A',        description: 'Стартерний акумулятор Bosch Silver S4 005, 60 А·г, пусковий струм 540 А. Типорозмір L2. Підходить для більшості авто Європи.',                            price: 4200,  category: 'Електрика',           image: `${import.meta.env.BASE_URL}/images/BatteryBosch.jpg`, rating: 4.8, stock: 17 },
  { id: 32, title: 'Генератор VALEO 437572',                description: 'Відновлений генератор 120 А для Peugeot/Citroën 1.6–2.0 HDi. Повністю перевірений, відповідає OE-специфікаціям.',                                         price: 5800,  category: 'Електрика',           image: `${import.meta.env.BASE_URL}/images/GeneratorVALEO.jpg`, rating: 4.5, stock: 4  },
  { id: 33, title: 'Стартер BOSCH 0 001 108 403',          description: 'Відновлений стартер 1.4 кВт для Renault Clio/Megane/Scenic 1.5 dCi. Гарантія 12 місяців.',                                                                 price: 3600,  category: 'Електрика',           image: `${import.meta.env.BASE_URL}/images/StartetBosch.jpg`, rating: 4.6, stock: 7  },
  { id: 34, title: 'Лампа ксенон Philips D2S 85122',       description: 'Ксенонова лампа Philips Xenon Standard D2S 35 Вт, 4200 К. Продається поштучно. Термін служби до 2000 год.',                                               price: 1200,  category: 'Електрика',           image: `${import.meta.env.BASE_URL}/images/LampXenonPhilips.jpg`, rating: 4.7, stock: 28 },
  { id: 35, title: 'LED-лампа H7 Osram Night Breaker',     description: 'LED-лампа H7 Osram LEDriving Night Breaker, 2 шт., 6000 К, 19 Вт. Схвалена для дорожнього руху в ЄС (ECE R37).',                                          price: 2900,  category: 'Електрика',           image: `${import.meta.env.BASE_URL}/images/LEDLampOsram.jpg`, rating: 4.6, stock: 22 },
  { id: 36, title: 'Датчик кисню Bosch 0 258 006 537',     description: 'Лямбда-зонд (широкополосний) Bosch LSU 4.9 для Opel/Vauxhall 2.0 Turbo. Роз`єм OE, кабель 600 мм.',                                                      price: 1950,  category: 'Електрика',           image: `${import.meta.env.BASE_URL}/images/OygenSensorBosch.jpg`, rating: 4.5, stock: 16 },
];

export const categories: string[] = [
  ...new Set(products.map((p) => p.category)),
];

/** Stored user includes the password (never sent to the client). */
export interface StoredUser extends User {
  password: string;
}

// Seeded so you can log in immediately. Mutable so register() works in-session.
export const users: StoredUser[] = [
  { id: 1, name: 'Демо користувач', email: 'demo@shop.dev', password: 'password123' },
];

export function nextUserId(): number {
  return users.reduce((max, u) => Math.max(max, u.id), 0) + 1;
}

/** Strip the password before returning a user to the client. */
export function toPublicUser(user: StoredUser): User {
  return { id: user.id, name: user.name, email: user.email };
}

export function makeToken(userId: number): string {
  return `mock-jwt-${userId}-${userId * 7919}`;
}

export function userIdFromToken(authHeader?: string): number | null {
  if (!authHeader) return null;
  const match = /mock-jwt-(\d+)-/.exec(authHeader);
  return match ? Number(match[1]) : null;
}
