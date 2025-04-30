/*
  # Add more universities

  1. New Universities
    - Adding universities from Texas, Oklahoma, and Louisiana
    - Each university includes:
      - Name
      - Location (state, coordinates)
      - Ranking
      - Acceptance rate
      - Tuition range
      - Description
*/

INSERT INTO universities (name, location_state, location_lat, location_lng, ranking, acceptance_rate, tuition_min, tuition_max, description)
VALUES
  -- Texas Universities
  ('University of Texas at Austin', 'Texas', 30.2849, -97.7341, 10, 32.0, 38000, 48000, 'The University of Texas at Austin is a public research university and the flagship institution of the University of Texas System.'),
  ('Texas A&M University', 'Texas', 30.6188, -96.3365, 25, 63.0, 35000, 45000, 'Texas A&M University is a public land-grant research university known for its engineering and agriculture programs.'),
  ('Rice University', 'Texas', 29.7174, -95.4018, 15, 11.0, 52000, 62000, 'Rice University is a private research university known for its science and engineering programs.'),
  ('Southern Methodist University', 'Texas', 32.8412, -96.7845, 45, 47.0, 50000, 60000, 'SMU is a private research university in University Park, Texas.'),
  ('Texas Tech University', 'Texas', 33.5843, -101.8783, 50, 69.0, 30000, 40000, 'Texas Tech is a public research university in Lubbock, Texas.'),

  -- Oklahoma Universities
  ('University of Oklahoma', 'Oklahoma', 35.2058, -97.4451, 35, 80.0, 32000, 42000, 'The University of Oklahoma is a public research university known for its meteorology and energy programs.'),
  ('Oklahoma State University', 'Oklahoma', 36.1270, -97.0737, 40, 70.0, 30000, 40000, 'Oklahoma State University is a public land-grant research university with strong agriculture and engineering programs.'),
  ('University of Tulsa', 'Oklahoma', 36.1520, -95.9459, 55, 42.0, 45000, 55000, 'The University of Tulsa is a private research university known for its petroleum engineering program.'),

  -- Louisiana Universities
  ('Tulane University', 'Louisiana', 29.9407, -90.1209, 30, 13.0, 54000, 64000, 'Tulane University is a private research university in New Orleans, known for its medical and business programs.'),
  ('Louisiana State University', 'Louisiana', 30.4133, -91.1800, 45, 75.0, 28000, 38000, 'LSU is a public land-grant research university and the flagship institution of Louisiana.'),
  ('Louisiana Tech University', 'Louisiana', 32.5262, -92.6481, 60, 65.0, 25000, 35000, 'Louisiana Tech is a public research university known for its engineering and science programs.');