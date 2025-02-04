INSERT INTO characters (name, title, role, backstory, objective, secret, relationships, clue, clue_rank, optional, is_cultist) VALUES
('Marlowe Darkweave', 'Village Leader', 'Cult Leader', 
'A respected leader who has guided the village through many difficult winters. Marlowe is seen as a protector of the village''s traditions.',
'Maintain order and find the murderer. Identify a new sacrifice and get the cult to agree on them.',
'Suspects the Sacrifice had doubts about the ritual.',
'Trusted by most villagers, but wary of Thalia''s ambition and Elara''s visions. Knows Thalia is a cult member.',
'A document revealing the Sacrifice''s wavering commitment to the ritual. The ritual book shows signs of recent tampering, with markings on the pages about poison-based sacrifices.',
5, false, true),

('Thalia Nightshade', 'Herbalist', 'Cult Acolyte',
'A young and ambitious herbalist eager to prove themselves. They believe the end justifies the means.',
'Rise in rank by finding the murderer. Secretly, advance the cult''s agenda.',
'Recently acquired rare poisonous herbs from Finn under the pretense of studying ritual preparations. Knows Marlowe is a cult member.',
'Mentored by Marlowe, but has a rivalry with Garrick and is suspicious of Finn.',
'A note in the Sacrifice''s belongings about a meeting with Thalia. The note reads: ''Thalia, I know what you''ve been planning. Meet me at the grove tonight, or I''ll tell Marlowe everything.''',
8, false, true),

('Garrick Ironbound', 'Guard', 'Cult Member',
'A steadfast and loyal protector of the village, Garrick enforces the rules with an iron fist. Their dedication often leads to conflicts with those who question authority.',
'Find the murderer. Secretly, protect the cult''s interests.',
'Had a dispute with the Sacrifice over the ritual. Knows Elara is a cult member.',
'Close to Marlowe, but clashes with Thalia''s ambitions and is wary of Lila.',
'Eyewitnesses saw Garrick arguing with the Sacrifice about the ritual.',
6, false, true),

('Elara Sightseer', 'Seer', 'Cult Member',
'Known for their mysterious visions, which have guided the village in the past. However, their recent visions have become more troubling and harder to interpret.',
'Identify the new sacrifice. Help cult members agree on a new sacrifice.',
'Foretold a death but kept it secret. Knows Garrick and Marlowe are cult members.',
'Confidant to Marlowe, but fears the implications of their visions and avoids Celine.',
'Elara had a vision of a death but chose not to share it.',
4, false, true),

('Bram Grimtome', 'Librarian', 'Elf Villager',
'The village''s librarian, Bram is deeply knowledgeable about ancient texts and rituals. They often provide advice to the cult but remain skeptical of some of their practices.',
'Find the murderer.',
'Is aware of cult members frequenting the forbidden section of the forest.',
'Respected by villagers, allied with Elara, but distrustful of Finn''s experiments.',
'Ancient texts hinting at fairy involvement in the ritual.',
2, false, false),

('Lila Duskwander', 'Village Outsider', 'Forest Fairy',
'Lila recently arrived in Shadowmoor, drawn by the mysterious happenings. They seek to uncover the village''s secrets for their own gain.',
'Find the murderer. Identify the cult members to put a stop to the ritual.',
'Knows the Sacrifice wanted to leave the village.',
'Befriended by Bram, viewed with suspicion by Garrick and Hugo.',
'Overheard the Sacrifice expressing doubts about the ritual.',
3, false, false),

('Finn Brewbane', 'Alchemist', 'Elf Villager',
'A skilled alchemist who supplies the village with potions and remedies. Finn is known for their curiosity and occasional reckless experiments.',
'Identify the murderer. Identify the cult members.',
'Recently taught Thalia about rare poisons, believing it was for ritual studies.',
'Works closely with Rowan, has a professional rivalry with Bram, and is suspicious of Thalia.',
'The poison used is an obscure concoction that requires specialized knowledge, implicating someone with alchemical expertise. Records showing Thalia requested specific poisonous ingredients, matching those found in the victim.',
9, false, false),

('Rowan Shadowtracker', 'Hunter', 'Elf Villager',
'A skilled hunter who knows the forest better than anyone. Rowan is often the first to notice any unusual occurrences in the woods.',
'Uncover unusual forest movements.',
'Saw a fairy near the village before the murder.',
'Allied with Finn, protective of Sylvara, and wary of outsiders like Lila.',
'Tracked movements of a fairy near the village.',
1, false, false),

('Hugo Steelwhisper', 'Blacksmith', 'Elf Villager',
'A strong and reliable blacksmith, Hugo takes pride in their work and their role in protecting the village. They are respected for their strength and reliability.',
'Protect the village and find the murderer.',
'Believes the Sacrifice was murdered by the forest fairies.',
'Respected by villagers, has a protective streak towards Celine, and distrusts Lila.',
'Witnessed Lila having a heated argument with the Sacrifice over village matters.',
7, false, false),

('Silas Nightweaver', 'Traveler', 'Elf Villager',
'Silas is a mysterious figure who knows more than they let on. Their past is shrouded in secrecy, and they take delight in a good mystery.',
'Convince the villagers that the sacrifice was murdered by the forest fairies (Lila).',
'Knows the last person who saw the Sacrifice alive. Has their own secret agenda.',
'Keeps their distance, but has key information that connects them to Thalia and Lila.',
'Witnessed the Sacrifice''s final moments with Thalia and possibly another.',
10, false, false),

('Celine Moonshadow', 'Artist', 'Elf Villager',
'An artist who draws inspiration from the mystical forest, Celine''s works often contain hidden messages and symbols.',
'Distract and entertain while uncovering clues.',
'Painted a scene that hints at the murderer''s identity.',
'Friend to many villagers, inspires curiosity and wonder, and is often consulted by Bram for artistic interpretations.',
'Artwork depicting a scene that reveals clues about the murder.',
6, false, false),

('Alaric Elderwhisper', 'Village Elder', 'Elf Villager',
'The village elder, Alaric has seen many seasons and holds the collective memory of the village. Their wisdom is sought in times of crisis.',
'Guide the villagers and uncover the truth about the murderer.',
'Knows about the Sacrifice''s doubts regarding the ritual.',
'Trusted advisor to Marlowe, and a mentor to Bram and Rowan.',
'Knows that the sacrifice did not want to be the sacrifice, which would ruin the ritual because it must be done willingly.',
4, false, false),

('Sylvara Wildbloom', 'Forest Groundskeeper', 'Forest Fairy',
'A guardian of the forest, Sylvara seeks to maintain the balance between nature and the village. She is wary of the cult''s actions.',
'Protect the forest and aid in uncovering the truth.',
'Knows the Whisperer''s true nature. Knows the cult is trying to awaken the Whisperer.',
'Protective of Rowan, cautious of Marlowe, and intrigued by Bram''s knowledge.',
'Holds secrets about the forest''s connection to the murder. Knows that a cult member is responsible for the murder.',
8, true, false);

/* Generate a random 4-digit passcode for each character */
UPDATE characters
SET clue_passcode = LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');