import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-intro">
      <div className="content-wrap">
        <span className="eyebrow">404 · Page not found</span>
        <h1>We couldn’t find that page.</h1>
        <p>The link may be out of date, or the page may have moved.</p>
        <div className="cta-actions">
          <Link className="button" href="/">Return to PujaPath</Link>
          <Link className="text-link" href="/pujas">Explore pujas</Link>
          <Link className="text-link" href="/cities">Browse city guides</Link>
        </div>
      </div>
    </section>
  );
}
