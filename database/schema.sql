-- Student Achievements — MySQL Schema and Seed
-- 1. Create DB:   CREATE DATABASE student_achievements;
-- 2. Then run this file against that database.

USE student_achievements;

-- Admins (email/password)
CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  college_id VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  branch VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Activity categories
CREATE TABLE IF NOT EXISTS activity_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type ENUM('cultural', 'sports', 'ncc_outreach', 'college_fest') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activities
CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  is_event TINYINT(1) DEFAULT 0,
  event_date DATE,
  max_participants INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES activity_categories(id) ON DELETE CASCADE
);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  activity_id INT,
  type ENUM('award', 'participation', 'certification') NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  achieved_date DATE NOT NULL,
  certificate_url VARCHAR(500),
  approved TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE SET NULL
);

-- Event registrations
CREATE TABLE IF NOT EXISTS event_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  activity_id INT NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP NULL,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
  UNIQUE KEY unique_registration (student_id, activity_id)
);

-- Stall bookings
CREATE TABLE IF NOT EXISTS stall_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  stall_type ENUM('food', 'event') NOT NULL,
  stall_name VARCHAR(150),
  description TEXT,
  payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
  amount DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Helpful indexes
CREATE INDEX idx_students_college_id ON students(college_id);
CREATE INDEX idx_achievements_student ON achievements(student_id);
CREATE INDEX idx_event_registrations_student ON event_registrations(student_id);
CREATE INDEX idx_event_registrations_status ON event_registrations(status);
CREATE INDEX idx_stall_bookings_student ON stall_bookings(student_id);

-- ---------------------------------------------------------------------------
-- Seed data (bcrypt hashes are placeholders – see README to regenerate)
-- ---------------------------------------------------------------------------

-- Admin user: admin@college.edu / admin123
INSERT INTO admin (email, password_hash)
VALUES
  (
    'admin@college.edu',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
  );

-- Students with college IDs and password student123
-- NOTE: The hash below is a placeholder bcrypt hash; regenerate in real setups.
SET @STUDENT_HASH = '$2a$10$EixZaYVK1psbwgtzrA2RuOeKqY5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z';

INSERT INTO students (college_id, name, branch, password_hash) VALUES
  ('2400030001', 'Sample CSE Student',  'CSE',  @STUDENT_HASH),
  ('2400090100', 'Sample CSIT Student', 'CSIT', @STUDENT_HASH),
  ('24000040001', 'Sample ECE Student', 'ECE',  @STUDENT_HASH);

-- Activity categories
INSERT INTO activity_categories (name, type) VALUES
  ('Cultural',            'cultural'),
  ('Sports',              'sports'),
  ('NCC and Outreach',    'ncc_outreach'),
  ('College Fest',        'college_fest');

-- Activities (a few examples under each category)
INSERT INTO activities (category_id, name, description, is_event) VALUES
  (1, 'Dancing',           'Solo and group dance competitions', 1),
  (1, 'Singing',           'Classical and Western singing events', 1),
  (1, 'Short Films',       'Short film making and screening', 1),
  (1, 'Cover Songs',       'Cover song performances', 1),
  (1, 'Influencer Promotions', 'Social media and outreach events', 1),

  (2, 'Table Tennis',      'Singles and doubles tournaments', 1),
  (2, 'Basketball',        'Inter-branch matches', 1),
  (2, 'Cricket',           'College cricket league', 1),
  (2, 'Volleyball',        'Indoor and outdoor tournaments', 1),

  (3, 'NCC Drill',         'Parade and drill events', 1),
  (3, 'Community Outreach','Social service and outreach programs', 1),

  (4, 'Cultural Stalls',   'Club and fest cultural stalls', 1),
  (4, 'Food Stalls',       'Student-led food stalls', 1);

