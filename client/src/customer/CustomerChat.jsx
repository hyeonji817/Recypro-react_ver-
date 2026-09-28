import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../main/Header_loginOK';
import Footer from '../main/Footer';
import './CustomerChat.css';

const suggestions = ['배송은 어디서 확인하나요?', '교환·반품 방법이 궁금해요', '분리배출 방법을 알려주세요', '친환경 생활을 시작하고 싶어요'];
const endpoint = `${(import.meta.env.VITE_API_URL || '').replace(/\/$/, '')}/api/support/chat`;

export default function CustomerChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const controller = useRef(null);
  const bottom = useRef(null);
  const field = useRef(null);

  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, [messages, busy]);

  async function send(text = input, retry = false) {
    const question = text.trim();

    if (controller.current || !question || question.length > 2000) return;

    const history = retry ? messages : [...messages, { role: 'user', content: question }];
    const request = new AbortController();
    controller.current = request;
    setMessages(history); setInput(''); setError(''); setBusy(true);
    const timeout = setTimeout(() => request.abort(), 65000);

    try {
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-19) }), signal: request.signal,
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || typeof data.answer !== 'string' || !data.answer.trim()) {
        throw new Error(data.error || '답변을 받아오지 못했어요. 잠시 후 다시 시도해 주세요.');
      }
      setMessages([...history, { role: 'assistant', content: data.answer }]);

    } catch (err) {
      setError(err.name === 'AbortError' ? '답변 요청이 중단되었어요. 다시 시도할 수 있어요.' : err.message);
    } finally {
      clearTimeout(timeout); controller.current = null; setBusy(false); field.current?.focus();
    }
  }

  function reset() {
    if (busy) return;
    setMessages([]); setInput(''); setError(''); field.current?.focus();
  }

  return <div><Header />
    <main className="rc-chat">
      <div className="rc-chat-heading">
        <div>
          <span>CUSTOMER CARE</span>
          <h1>Q&amp;A <small>AI 상담</small></h1>
        </div>
        <Link to="/customer_main">고객센터 →</Link>
      </div>

      <div className="rc-chat-layout">
        <aside className="rc-chat-sidebar">
          <div className="rc-chat-brand">✳ <strong>RECYPRO AI</strong></div>
          <p>더 가벼운 일상,<br />함께 찾아가는 답.</p>
          <button onClick={reset} disabled={busy}>＋ 새 대화</button>
          <h2>이런 질문을 해보세요</h2>
          {suggestions.map(text => <button className="rc-chat-topic" key={text} disabled={busy || !!error} onClick={() => send(text)}>{text} <span>↗</span></button>)}
          <div className="rc-chat-help">
            <strong>도움이 더 필요하신가요?</strong>
            <p>개별 주문과 정확한 운영 정책은<br />고객센터에서 확인해 주세요.</p>
            <Link to="/customer_guide">이용 안내 →</Link>
          </div>
        </aside>

        <section className="rc-chat-panel" aria-label="AI 상담 대화">
          <header>
            <div>
              <strong>리싸이프로 AI 도우미</strong>
              <span>쇼핑부터 친환경 생활까지</span>
            </div>
            <span className="rc-chat-tag">AI 상담</span>
          </header>

          <div className="rc-chat-messages" role="log" aria-live="polite" aria-relevant="additions">
            {!messages.length && <div className="rc-chat-welcome">
              <div className="rc-chat-symbol">✳</div>
              <h2>무엇을 도와드릴까요?</h2>
              <p>궁금한 점을 편하게 물어보세요.<br />리싸이프로 AI가 함께 답을 찾아드릴게요.</p>
              <div className="rc-chat-cards">{suggestions.map((text, i) => <button key={text} onClick={() => send(text)}><span>0{i + 1}</span>{text}<b>↗</b></button>)}</div>
            </div>}
            {messages.map((message, i) => 
              <article key={i} className={`rc-chat-message ${message.role}`}>
                <span>{message.role === 'user' ? '나' : '✳ RECYPRO AI'}</span>
                <div>{message.content}</div>
              </article>
            )}
            {busy && <p className="rc-chat-loading" role="status">✳ 답변을 생각하고 있어요…</p>}<div ref={bottom} />
          </div>
          {error && <div className="rc-chat-error" role="alert">{error}
            <button onClick={() => send(messages.at(-1)?.content || '', true)}>다시 시도</button>
            <button onClick={reset}>새 대화</button>
          </div>}
          <form className="rc-chat-composer" onSubmit={e => { e.preventDefault(); send(); }}>
            <label className="rc-chat-sr" htmlFor="support-message">AI에게 질문하기</label>
            <textarea id="support-message" ref={field} value={input} maxLength={2000} disabled={busy || !!error} onChange={e => setInput(e.target.value)} placeholder="궁금한 내용을 입력해 주세요" rows={2} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); send(); } }} />
            {busy ? <button type="button" onClick={() => controller.current?.abort()}>중지</button> : <button type="submit" disabled={!input.trim() || !!error} aria-label="질문 보내기">↑</button>}
          </form>
          <p className="rc-chat-note">AI 답변은 부정확할 수 있어요. 개인정보는 입력하지 마세요. 대화는 페이지를 나가면 삭제됩니다.</p>
        </section>
      </div>
    </main><Footer /></div>;
}
