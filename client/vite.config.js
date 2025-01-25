import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],   // react 플러그인 활성화 : React 프로젝트를 위한 Vite 플러그인을 사용, JSX 및 Fast Refresh 지원
  resolve: {
    alias: {
      '@': '/client/src',   // '@'를 프로젝트의 '/client/src' 디렉토리와 매핑(연동). 간단한 경로로 파일 불러들일 수 있음.
    },
  },
  server: {
    port: 5174,   // 개발 서버가 실행될 포트 지정 (기본값을 5174번)
    proxy: {
      '/api': {
        target: 'http://localhost:5003',    // 프록시 요청을 보낼 대상 서버 URL 
        changeOrigin: true,   // 프록시 요청의 Origin 헤더를 대상 서버의 Origin으로 변경 
        rewrite: (path) => path.replace(/^\/api/, ''),    // 경로 재작성 함수. '/api'를 제거하고 대상 서버에 요청 보냄 
        // ex) 클라이언트에서 'fetch('/api/users')를 호출 -> 요청이 'http://localhost:5001/users'로 전달.
      },
    },
  },
});
