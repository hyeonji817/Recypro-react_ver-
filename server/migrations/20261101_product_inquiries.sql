-- 기존 회원 ID 및 v_product_catalog를 사용하는 독립 상품문의 테이블입니다.
CREATE TABLE IF NOT EXISTS product_inquiries (
  inquiry_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  product_table VARCHAR(40) NOT NULL,
  product_id VARCHAR(100) NOT NULL,
  product_name VARCHAR(500) NOT NULL,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  is_secret TINYINT(1) NOT NULL DEFAULT 0,
  answer TEXT NULL,
  answered_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_inquiry_user_date (user_id, created_at, inquiry_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
