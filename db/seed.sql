-- 初期データ

-- 古典テキスト
INSERT INTO medical_texts (id, slug, title_jp, title_en, description_jp, description_en, order_index)
VALUES
  ('text-1', 'shanghan-lun', '傷寒論', 'Shanghan Lun', '後漢末期の張仲景によって著された漢方医学の古典。傷寒（急性熱性疾患）の治療法を体系的に記述した医書で、現代の漢方医学の基礎となっています。', 'A classical text on Chinese medicine written by Zhang Zhongjing during the late Han Dynasty, systematically describing treatments for acute febrile diseases.', 1),
  ('text-2', 'jingui-yaolue', '金匱要略', 'Jingui Yaolue', '張仲景による内科疾患全般を扱う医学書。雑病（慢性疾患や内科疾患）の診断と治療について詳述しています。', 'A comprehensive medical text by Zhang Zhongjing covering various internal medicine conditions and chronic diseases.', 2),
  ('text-3', 'huangdi-neijing', '黄帝内経', 'Huangdi Neijing', '中国最古の医学書の一つ。黄帝と岐伯の問答形式で、医学理論、診断法、治療法、養生法などを記述しています。', 'One of the oldest Chinese medical texts, written in dialogue format between the Yellow Emperor and his physician Qibo, covering medical theories, diagnostics, and treatments.', 3);
