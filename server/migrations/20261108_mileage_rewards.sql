-- 기존 적립금 원장/잔액은 보존합니다. 각 CREATE 문을 한 번씩 실행하세요.
CREATE TABLE IF NOT EXISTS review (
  review_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id VARCHAR(100) NOT NULL,
  image VARCHAR(255) NOT NULL DEFAULT '',
  rv_title TEXT NOT NULL,
  rv_rating INT NOT NULL,
  date DATE NOT NULL,
  pname VARCHAR(255) NOT NULL,
  KEY review_member (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS mileage_delivery_confirmations (
  order_id BIGINT NOT NULL PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  delivered_at DATETIME NOT NULL,
  confirmed_by VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS mileage_purchase_rewards (
  order_id BIGINT NOT NULL PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  amount BIGINT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  ledger_id BIGINT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY reward_user (user_id,status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS mileage_review_rewards (
  order_item_id BIGINT NOT NULL PRIMARY KEY,
  order_id BIGINT NOT NULL,
  user_id VARCHAR(100) NOT NULL,
  pname VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  rating INT NOT NULL,
  images_json TEXT NOT NULL,
  amount INT NOT NULL,
  ledger_id BIGINT NOT NULL,
  reversed_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY review_reward_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
