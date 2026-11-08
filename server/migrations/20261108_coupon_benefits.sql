-- 기존 회원/쿠폰/잔액을 수정하지 않습니다. 배포 전 적용합니다. 재실행 가능.
CREATE TABLE IF NOT EXISTS coupon_benefit_profiles (
  user_id VARCHAR(100) NOT NULL PRIMARY KEY,
  birth_date DATE NULL,
  birth_registered_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS coupon_benefit_issues (
  user_id VARCHAR(100) NOT NULL,
  benefit_key VARCHAR(100) NOT NULL,
  user_coupon_id BIGINT NOT NULL,
  issued_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, benefit_key),
  UNIQUE KEY benefit_user_coupon (user_coupon_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS coupon_benefit_effects (
  coupon_id BIGINT NOT NULL PRIMARY KEY,
  effect VARCHAR(20) NOT NULL,
  CHECK (effect IN ('SHIPPING'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
