-- 기존 user, mileage_ledger와 같은 DB에서 1회 실행. InnoDB 필수.
CREATE TABLE IF NOT EXISTS special_mileage_codes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  code_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL UNIQUE,
  title VARCHAR(100) NOT NULL,
  amount INT UNSIGNED NOT NULL,
  target_user_id VARCHAR(191) NULL,
  starts_at DATETIME NOT NULL,
  expires_at DATETIME NOT NULL,
  max_redemptions INT UNSIGNED NOT NULL DEFAULT 1,
  redeemed_count INT UNSIGNED NOT NULL DEFAULT 0,
  active TINYINT NOT NULL DEFAULT 1,
  CHECK (amount > 0),
  CHECK (expires_at > starts_at),
  CHECK (redeemed_count <= max_redemptions)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS special_mileage_redemptions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  code_id BIGINT UNSIGNED NOT NULL,
  user_id VARCHAR(191) NOT NULL,
  amount INT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY once_per_member (code_id, user_id),
  KEY member_history (user_id, created_at),
  FOREIGN KEY (code_id) REFERENCES special_mileage_codes(id)
) ENGINE=InnoDB;
