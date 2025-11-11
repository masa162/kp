-- 初期データ

-- 古典テキスト
INSERT INTO medical_texts (id, slug, title_jp, title_en, description_jp, description_en, order_index)
VALUES
  ('text-1', 'shanghan-lun', '傷寒論', 'Shanghan Lun', '後漢末期の張仲景によって著された漢方医学の古典。傷寒（急性熱性疾患）の治療法を体系的に記述した医書で、現代の漢方医学の基礎となっています。', 'A classical text on Chinese medicine written by Zhang Zhongjing during the late Han Dynasty, systematically describing treatments for acute febrile diseases.', 1),
  ('text-2', 'jingui-yaolue', '金匱要略', 'Jingui Yaolue', '張仲景による内科疾患全般を扱う医学書。雑病（慢性疾患や内科疾患）の診断と治療について詳述しています。', 'A comprehensive medical text by Zhang Zhongjing covering various internal medicine conditions and chronic diseases.', 2),
  ('text-3', 'huangdi-neijing', '黄帝内経', 'Huangdi Neijing', '中国最古の医学書の一つ。黄帝と岐伯の問答形式で、医学理論、診断法、治療法、養生法などを記述しています。', 'One of the oldest Chinese medical texts, written in dialogue format between the Yellow Emperor and his physician Qibo, covering medical theories, diagnostics, and treatments.', 3);

-- 章データ（サンプル）
INSERT INTO chapters (id, text_id, chapter_order, title_jp, title_en, content_jp, content_en, audio_url, duration_seconds)
VALUES
  -- 傷寒論の章
  ('chapter-1', 'text-1', 1, '辨太陽病脈證併治上', 'Differentiation of Tai Yang Disease - Part 1', '太陽之為病、脈浮、頭項強痛、而悪寒。\n太陽病、發熱、汗出、惡風、脈緩者、名為中風。\n太陽病、或已發熱、或未發熱、必惡寒、體痛嘔逆、脈陰陽俱緊者、名曰傷寒。', 'Tai Yang disease is characterized by floating pulse, stiffness and pain in the head and nape, and aversion to cold.\nWhen there is fever, sweating, aversion to wind, and moderate pulse in Tai Yang disease, it is called Zhong Feng (wind strike).\nWhen there is either fever or not yet fever, but definitely aversion to cold, body pain, vomiting, and tight pulse in both yin and yang positions, it is called Shang Han (cold damage).', NULL, 0),
  ('chapter-2', 'text-1', 2, '辨太陽病脈證併治中', 'Differentiation of Tai Yang Disease - Part 2', '太陽病、頭痛至七日以上自癒者、以行其經盡故也。若欲作再經者、鍼足陽明、使經不伝則癒。\n太陽病欲解時、從巳至未上。', 'In Tai Yang disease, when headache persists for seven days and then resolves naturally, it is because the course through the meridian is complete. If the disease threatens to transmit to another meridian, needle the Foot Yang Ming meridian to prevent transmission and the disease will be cured.\nThe time when Tai Yang disease tends to resolve is from 9 AM to 3 PM.', NULL, 0),
  ('chapter-3', 'text-1', 3, '辨太陽病脈證併治下', 'Differentiation of Tai Yang Disease - Part 3', '太陽病、項背強几几、無汗、惡風者、葛根湯主之。\n太陽與陽明合病者、必自下利、葛根湯主之。', 'For Tai Yang disease with stiffness in the nape and back, no sweating, and aversion to wind, Ge Gen Tang (Kudzu Decoction) governs.\nWhen Tai Yang and Yang Ming diseases combine, there will certainly be diarrhea; Ge Gen Tang governs.', NULL, 0),

  -- 金匱要略の章
  ('chapter-4', 'text-2', 1, '臓腑経絡先後病脈證第一', 'Pulse and Symptoms of Zang-Fu and Meridians - Chapter 1', '問曰、上工治未病、何也。師曰、夫治未病者、見肝之病、知肝伝脾、當先実脾、四季脾旺不受邪、即勿補之。', 'Question: What does it mean for a superior physician to treat未disease (before illness manifests)?\nAnswer: In treating pre-disease, when you see liver disease, you know it will transmit to the spleen. You should first strengthen the spleen. When the spleen is strong in all four seasons and does not receive pathogenic factors, then do not supplement it.', NULL, 0),
  ('chapter-5', 'text-2', 2, '痙湿暍病脈證治第二', 'Spasms, Dampness, and Summerheat - Chapter 2', '太陽病、發熱無汗、反惡寒者、名曰剛痙。\n太陽病、發熱汗出、而不惡寒、名曰柔痙。', 'In Tai Yang disease, when there is fever without sweating and aversion to cold, it is called rigid spasm.\nIn Tai Yang disease, when there is fever with sweating but no aversion to cold, it is called soft spasm.', NULL, 0),

  -- 黄帝内経の章
  ('chapter-6', 'text-3', 1, '上古天真論篇第一', 'Discourse on the Natural Truth of High Antiquity - Chapter 1', '昔在黄帝、生而神霊、弱而能言、幼而徇斉、長而敦敏、成而登天。\n乃問於天師曰、余聞上古之人、春秋皆度百歳、而動作不衰。今時之人、年半百而動作皆衰者、時世異耶、人将失之耶。', 'In ancient times, when the Yellow Emperor was born, he had divine intelligence. Even as an infant, he could speak. As a youth, he was precocious. As he matured, he was sincere and keen. When fully grown, he ascended to Heaven.\nHe asked the Heavenly Master: I have heard that in high antiquity, people lived through all the seasons to one hundred years of age, yet their movements and activities did not decline. Today people are only half of fifty years old and their movements and activities all decline. Is it because the times are different, or have people lost the Way?', NULL, 0),
  ('chapter-7', 'text-3', 2, '四気調神大論篇第二', 'Great Discourse on Regulating the Spirit with the Four Seasons - Chapter 2', '春三月、此謂発陳。天地倶生、万物以栄。\n夜臥早起、広歩於庭、被髪緩形、以使志生。', 'The three months of spring are called the period of beginning and development. Heaven and Earth generate life, and the myriad things flourish.\nGo to sleep late and rise early, walk briskly in the courtyard with hair unbound and body relaxed, so that the will may be generated.', NULL, 0);
