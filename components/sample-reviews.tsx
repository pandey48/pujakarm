const reviews = [
  { name: "Aarav S.", place: "Bhopal", puja: "Griha Pravesh Puja", quote: "The team helped us understand the preparations for our Griha Pravesh and made it easy to share our preferences." },
  { name: "Mira K.", place: "Indore", puja: "Satyanarayan Puja", quote: "The booking conversation was clear, and we knew what details would be confirmed before the puja." },
  { name: "Rohan M.", place: "Ahmedabad", puja: "Ganesh Puja", quote: "It was helpful to discuss the ceremony, preferred language, and timing in one place." },
  { name: "Kavya R.", place: "Bengaluru", puja: "Rudrabhishek Puja", quote: "We could ask about the puja items and preparation before deciding how to proceed." },
  { name: "Dev P.", place: "Mumbai", puja: "Lakshmi Puja", quote: "The team listened to our family's preferences and explained the next steps clearly." },
  { name: "Nisha T.", place: "Hyderabad", puja: "Vastu Shanti Puja", quote: "Sharing our location and preferred date was straightforward, and the process felt organized." },
  { name: "Ishaan V.", place: "Jaipur", puja: "Online Puja", quote: "The online format was explained clearly, including the details we needed to confirm." },
  { name: "Anaya D.", place: "Pune", puja: "Havan", quote: "We appreciated being able to ask about samagri and ceremony arrangements before booking." },
];

function ReviewCards() {
  return reviews.map((review, index) => (
    <article className="pp-sample-review-card" key={review.name}>
      <span className="pp-sample-review-label">Sample {String(index + 1).padStart(2, "0")}</span>
      <blockquote>{review.quote}</blockquote>
      <p className="pp-sample-review-byline"><strong>{review.name}</strong><span>{review.puja} · {review.place}</span></p>
    </article>
  ));
}

export function SampleReviews() {
  return (
    <section className="pp-sample-reviews" aria-labelledby="sample-reviews-title">
      <div className="pp-sample-reviews-heading">
        <div>
          <span className="pp-kicker">Illustrative examples</span>
          <h3 id="sample-reviews-title">Sample Puja Reviews</h3>
        </div>
        <p>These are fictional examples, not verified customer reviews.</p>
      </div>
      <div className="pp-review-marquee" aria-label="Eight sample puja reviews">
        <div className="pp-review-track">
          <div className="pp-review-group"><ReviewCards /></div>
          <div className="pp-review-group" aria-hidden="true"><ReviewCards /></div>
        </div>
      </div>
    </section>
  );
}