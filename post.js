const likeButton = document.querySelector(".like-button");
const likeCount = document.querySelector("#like-count");
const commentForm = document.querySelector("#comment-form");
const commentInput = document.querySelector("#comment-input");
const comments = document.querySelector("#social-comments");
const postImage = document.querySelector("#post-image");
const postCaption = document.querySelector("#post-caption");

const posts = {
  "1794367775681": {
    image: "postingan/1794367775681.jpg",
    alt: "Meme percakapan tentang meminta ditambah tanah saat dikubur",
    caption: "Ketika warjo kena azab akibat nyolong foto wkwk 😅"
  },
  "1794368037914": {
    image: "postingan/1794368037914.jpg",
    alt: "Postingan Suwarko Jo",
    caption: "Jancok aku diarani koyo sikat wc"
  },
  "1794370727909": {
    image: "postingan/1794370727909.jpg",
    alt: "Foto Suwarko mengenakan seragam masinis",
    caption: "Aku sekarang jadi masinis kai cuy hore hasil nyogok"
  },
  "1794370784854": {
    image: "postingan/1794370784854.jpg",
    alt: "Suwarko duduk di kursi pesawat",
    caption: "Saiki aku numpak pswawat slur ke bandara kualanamu medan mau ketemu Farhan Alfirman di lapangan Takraw"
  },
  "1794372698290": {
    image: "postingan/1794372698290.jpg",
    alt: "Meme kemasan obat dengan foto Suwarko",
    caption: "obat sakit kepala parah jo pembuat obat"
  }
};

const requestedPost = new URLSearchParams(window.location.search).get("id");
const post = posts[requestedPost] || posts["1794367775681"];
postImage.src = post.image;
postImage.alt = post.alt;
postCaption.textContent = post.caption;

likeButton.addEventListener("click", () => {
  const liked = likeButton.getAttribute("aria-pressed") !== "true";
  likeButton.setAttribute("aria-pressed", String(liked));
  likeButton.setAttribute("aria-label", liked ? "Batal menyukai postingan" : "Sukai postingan");
  likeButton.textContent = liked ? "♥" : "♡";
  likeCount.textContent = liked ? "Anda menyukai ini" : "Suka";
});

document.querySelector(".comment-focus").addEventListener("click", () => commentInput.focus());

commentForm.addEventListener("submit", event => {
  event.preventDefault();
  const comment = commentInput.value.trim();
  if (!comment) return;

  const commentRow = document.createElement("p");
  const username = document.createElement("strong");
  username.textContent = "Anda";
  commentRow.append(username, document.createTextNode(` ${comment}`));
  comments.append(commentRow);
  commentInput.value = "";
  commentInput.focus();
});

document.querySelector(".share-button").addEventListener("click", async event => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(window.location.href);
    button.setAttribute("aria-label", "Tautan postingan disalin");
    button.textContent = "✓";
    window.setTimeout(() => {
      button.setAttribute("aria-label", "Bagikan postingan");
      button.textContent = "↗";
    }, 1600);
  } catch (error) {
    button.setAttribute("aria-label", "Gagal menyalin tautan postingan");
    console.error("Tidak dapat menyalin tautan postingan.", error);
  }
});
