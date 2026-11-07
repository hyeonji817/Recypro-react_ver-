import { shoppingGuideSections } from "./shoppingGuideData";
import "./ShoppingGuideNotice.css";

export default function ShoppingGuideNotice() {
  return <article className="shopping-guide-notice" aria-label="리싸이프로 쇼핑몰 이용 가이드">
    {shoppingGuideSections.map(section => <section className={section.warning ? "sg-section sg-warning" : "sg-section"} key={section.title}>
      <h2>{section.title}</h2>
      {section.paragraphs.map((paragraph, index) => paragraph.address
        ? <address key={index}>{paragraph.text}</address>
        : <p key={index} className={paragraph.tone ? `sg-${paragraph.tone}` : undefined}>{paragraph.text}</p>)}
    </section>)}
  </article>;
}
