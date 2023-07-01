insert into
    users (name, email, password_hash, photo_id, bio, last_location)
    values ('admin', 'admin', '$2a$10$D2LwGBKymTRb.ItUec5vQeu5r2n5PTgjoO3YP3C/iApD.bZAd2.BW', NULL, '',  point(0.0, 0.0));
    
insert into locations 
    (name, photo_url, coordinates, food, nature, adventure, culture, exercise, tourist_hotspot, cozy, family, wildlife, cbd, disabled_accessibility) 
values 
    ('Sydney Opera House', 'https://url-to-opera-house-photo.com', point(-33.8568, 151.2153), 0.6, 0.4, 0.2, 0.9, 0.3, 1.0, 0.6, 0.8, 0.2, 0.8, 0.9),
    ('Bondi Beach', 'https://url-to-bondi-beach-photo.com', point(-33.8908, 151.2743), 0.8, 0.7, 0.6, 0.4, 0.9, 0.9, 0.5, 0.7, 0.3, 0.5, 0.7),
    ('Sydney Harbour Bridge', 'https://url-to-harbour-bridge-photo.com', point(-33.8522, 151.2102), 0.5, 0.3, 0.8, 0.7, 0.8, 0.9, 0.4, 0.6, 0.1, 0.8, 0.9),
    ('Royal Botanic Garden', 'https://url-to-royal-botanic-photo.com', point(-33.8642, 151.2166), 0.6, 0.9, 0.5, 0.4, 0.7, 0.8, 0.7, 0.8, 0.9, 0.5, 0.8),
    ('Taronga Zoo', 'https://url-to-taronga-zoo-photo.com', point(-33.8434, 151.2416), 0.6, 0.5, 0.7, 0.3, 0.7, 0.9, 0.6, 0.8, 1.0, 0.4, 0.8),
    ('Darling Harbour', 'https://url-to-darling-harbour-photo.com', point(-33.8737, 151.1998), 0.8, 0.4, 0.7, 0.8, 0.6, 0.9, 0.7, 0.7, 0.2, 0.9, 0.9),
    ('The Rocks', 'https://url-to-the-rocks-photo.com', point(-33.8599, 151.2093), 0.7, 0.3, 0.5, 0.8, 0.4, 0.9, 0.7, 0.6, 0.1, 0.8, 0.7),
    ('Hyde Park', 'https://url-to-hyde-park-photo.com', point(-33.8731, 151.2113), 0.5, 0.8, 0.5, 0.5, 0.9, 0.7, 0.7, 0.6, 0.7, 0.4, 0.9),
    ('Manly Beach', 'https://url-to-manly-beach-photo.com', point(-33.7990, 151.2890), 0.7, 0.7, 0.7, 0.3, 0.9, 0.8, 0.6, 0.7, 0.5, 0.3, 0.6),
    ('Sydney Tower Eye', 'https://url-to-sydney-tower-eye-photo.com', point(-33.8705, 151.2090), 0.6, 0.3, 0.9, 0.7, 0.8, 0.8, 0.5, 0.6, 0.1, 0.9, 0.9),
    ('Cockatoo Island', 'https://url-to-cockatoo-island-photo.com', point(-33.8490, 151.1714), 0.5, 0.7, 0.6, 0.6, 0.8, 0.3, 0.7, 0.6, 0.8, 0.5, 0.6),
    ('Barangaroo Reserve', 'https://url-to-barangaroo-reserve-photo.com', point(-33.8587, 151.2017), 0.6, 0.8, 0.5, 0.6, 0.7, 0.3, 0.6, 0.7, 0.7, 0.5, 0.8),
    ('Carriageworks Farmers Market', 'https://url-to-carriageworks-market-photo.com', point(-33.8949, 151.1899), 0.9, 0.3, 0.3, 0.5, 0.4, 0.2, 0.7, 0.5, 0.1, 0.5, 0.8),
    ('White Rabbit Gallery', 'https://url-to-white-rabbit-gallery-photo.com', point(-33.8818, 151.2009), 0.4, 0.2, 0.3, 0.9, 0.2, 0.2, 0.7, 0.5, 0.1, 0.7, 0.9),
    ('Spit Bridge to Manly Walk', 'https://url-to-spit-bridge-to-manly-walk-photo.com', point(-33.8076, 151.2431), 0.3, 0.9, 0.8, 0.3, 0.9, 0.2, 0.5, 0.8, 0.7, 0.2, 0.7),
    ('Chinatown', 'https://url-to-chinatown-sydney-photo.com', point(-33.8799, 151.2045), 0.9, 0.2, 0.4, 0.7, 0.3, 0.2, 0.6, 0.5, 0.2, 0.7, 0.9),
    ('Brett Whiteley Studio Museum', 'https://url-to-brett-whiteley-studio-photo.com', point(-33.8791, 151.2111), 0.4, 0.2, 0.3, 0.9, 0.3, 0.2, 0.7, 0.5, 0.1, 0.7, 0.9),
    ('Belvoir St Theatre', 'https://url-to-belvoir-st-theatre-photo.com', point(-33.8915, 151.2047), 0.4, 0.2, 0.3, 0.8, 0.2, 0.2, 0.6, 0.5, 0.1, 0.6, 0.8),
    ('Palm Beach', 'https://url-to-palm-beach-photo.com', point(-33.6060, 151.3230), 0.6, 0.9, 0.7, 0.3, 0.9, 0.3, 0.6, 0.8, 0.5, 0.2, 0.6),
    ('Sydney Fish Market', 'https://url-to-sydney-fish-market-photo.com', point(-33.8699, 151.1926), 0.9, 0.2, 0.5, 0.6, 0.3, 0.3, 0.7, 0.6, 0.1, 0.6, 0.8);
