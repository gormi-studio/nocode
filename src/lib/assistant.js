// Deterministic, keyword-matching reply engine backing the chat widget.
// There is no LLM behind this — a browser bundle cannot hold an API key
// safely, and this app has no server to proxy one through. This gives
// visitors a genuinely useful (if simple) assistant without that risk;
// swap it for a real model call from a server-side function if one is
// added later.
import { faqs, products } from '@/data/fixtures';

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^0-9a-z가-힣\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 2);
}

function bestMatch(tokens, items, toHaystack) {
  let best = null;
  let bestScore = 0;
  for (const item of items) {
    const haystack = toHaystack(item).toLowerCase();
    const score = tokens.filter((t) => haystack.includes(t)).length;
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }
  return bestScore > 0 ? best : null;
}

export function getAssistantReply(input) {
  const tokens = tokenize(input);
  if (tokens.length === 0) {
    return '궁금하신 점을 조금 더 자세히 적어주시면 안내해 드릴게요. 예: "출장 미용을 시작하는데 뭘 골라야 할까요?"';
  }

  const faq = bestMatch(tokens, faqs, (f) => `${f.question} ${f.answer}`);
  const product = bestMatch(
    tokens,
    products,
    (p) => `${p.name} ${(p.tags || []).join(' ')} ${p.contextCopy} ${(p.recommendSituations || []).join(' ')}`
  );

  const parts = [];
  if (faq) parts.push(`Q. ${faq.question}\nA. ${faq.answer}`);
  if (product) {
    const level = product.level === 'professional' ? '전문가용' : '입문자용';
    parts.push(
      `추천 제품: ${product.name} (${level} · ${Number(product.price).toLocaleString('ko-KR')}원)\n${product.contextCopy}`
    );
  }

  if (parts.length === 0) {
    return '아직 정확히 맞는 답변을 찾지 못했어요. "제품" 페이지의 필터로 찾아보시거나, "고객센터"에서 1:1 문의를 남겨주시면 담당자가 확인 후 안내드릴게요.';
  }
  return parts.join('\n\n');
}
