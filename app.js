// ============================================================
// リンク集 本体スクリプト
// データは links.js (SITE_CONFIG / SITES) から読む。
// 編集モードの変更は localStorage に下書き保存され、
// 「links.jsをコピー」→ GitHubのlinks.jsに貼り付けで公開。
// ============================================================

const DRAFT_KEY = "linkshu_draft_v1";

let sites = loadDraft() || structuredClone(SITES);
let activeTag = "すべて";
let editing = false;
let editIndex = -1; // ダイアログで編集中のindex。-1は新規追加

// ---------- 下書き ----------
function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveDraft() {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(sites));
  updateDraftBar();
}

function discardDraft() {
  localStorage.removeItem(DRAFT_KEY);
  sites = structuredClone(SITES);
  updateDraftBar();
  renderAll();
}

function hasDraft() {
  return localStorage.getItem(DRAFT_KEY) !== null
    && JSON.stringify(sites) !== JSON.stringify(SITES);
}

function updateDraftBar() {
  const bar = document.getElementById("draft-bar");
  if (hasDraft()) bar.classList.add("visible");
  else {
    bar.classList.remove("visible");
    localStorage.removeItem(DRAFT_KEY);
  }
}

// links.js の中身を生成
function generateLinksJs() {
  const header = `// リンク集のデータファイル(ページの編集モードから生成)\n\n`;
  const config = `const SITE_CONFIG = ${JSON.stringify(SITE_CONFIG, null, 2)};\n\n`;
  const list = `const SITES = ${JSON.stringify(sites, null, 2)};\n`;
  return header + config + list;
}

// ---------- クレヨンっぽいくすみ色パレット ----------
const CRAYON_PALETTE = ["#dd8a6e", "#dcae5a", "#96b380", "#7fa8c9", "#b08bbf", "#dd8fa4"];

// 色を白と混ぜて薄くする(t=0で元の色、1で白)
function tint(hex, t) {
  const n = parseInt(hex.slice(1), 16);
  const mix = c => Math.round(c + (255 - c) * t);
  const r = mix((n >> 16) & 255), g = mix((n >> 8) & 255), b = mix(n & 255);
  return `rgb(${r},${g},${b})`;
}

// ---------- エンブレム自動生成 ----------
// タイトルから決まる乱数で、カードごとに固有のらくがき模様を作る
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ふにゃっとした円のpath(手描きの丸)
function wobblyCircle(cx, cy, r, rnd, wob = 0.14) {
  const n = 9;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = r * (1 + (rnd() * 2 - 1) * wob);
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  let d = `M ${((pts[0][0] + pts[1][0]) / 2).toFixed(1)} ${((pts[0][1] + pts[1][1]) / 2).toFixed(1)}`;
  for (let i = 1; i <= n; i++) {
    const p = pts[i % n], q = pts[(i + 1) % n];
    d += ` Q ${p[0].toFixed(1)} ${p[1].toFixed(1)} ${((p[0] + q[0]) / 2).toFixed(1)} ${((p[1] + q[1]) / 2).toFixed(1)}`;
  }
  return d + " Z";
}

function emblemSvg(title, color) {
  const rnd = mulberry32(hashStr(title));
  const W = 320, H = 160;
  const base = color || CRAYON_PALETTE[Math.floor(rnd() * CRAYON_PALETTE.length)];
  const stroke = (d, c, w = 3) =>
    `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>`;
  let parts = "";

  // 紙色の下地に、うすい色の「ぬりあと」
  parts += `<rect width="${W}" height="${H}" fill="#faf5ea"/>`;
  const washes = 1 + Math.floor(rnd() * 2);
  for (let i = 0; i < washes; i++) {
    parts += `<ellipse cx="${(30 + rnd() * (W - 60)).toFixed(1)}" cy="${(30 + rnd() * (H - 60)).toFixed(1)}"`
      + ` rx="${(40 + rnd() * 50).toFixed(1)}" ry="${(25 + rnd() * 30).toFixed(1)}"`
      + ` fill="${tint(base, 0.72)}" opacity="0.7" transform="rotate(${(rnd() * 40 - 20).toFixed(0)} ${W / 2} ${H / 2})"/>`;
  }

  // らくがき(おひさま・お花・ほし・ぐるぐる・なみなみ)
  const n = 4 + Math.floor(rnd() * 3);
  for (let i = 0; i < n; i++) {
    const c = CRAYON_PALETTE[Math.floor(rnd() * CRAYON_PALETTE.length)];
    const x = 30 + rnd() * (W - 60), y = 26 + rnd() * (H - 52);
    const s = 12 + rnd() * 14;
    const kind = Math.floor(rnd() * 5);
    if (kind === 0) {
      // おひさま
      parts += stroke(wobblyCircle(x, y, s * 0.55, rnd), c);
      const rays = 7 + Math.floor(rnd() * 3);
      for (let k = 0; k < rays; k++) {
        const a = (k / rays) * Math.PI * 2 + rnd() * 0.3;
        parts += stroke(
          `M ${(x + Math.cos(a) * s * 0.8).toFixed(1)} ${(y + Math.sin(a) * s * 0.8).toFixed(1)}`
          + ` L ${(x + Math.cos(a) * s * 1.15).toFixed(1)} ${(y + Math.sin(a) * s * 1.15).toFixed(1)}`, c, 2.5);
      }
    } else if (kind === 1) {
      // お花
      const petals = 5 + Math.floor(rnd() * 2);
      for (let k = 0; k < petals; k++) {
        const a = (k / petals) * Math.PI * 2 + rnd() * 0.2;
        parts += stroke(wobblyCircle(x + Math.cos(a) * s * 0.62, y + Math.sin(a) * s * 0.62, s * 0.36, rnd, 0.2), c, 2.5);
      }
      parts += `<path d="${wobblyCircle(x, y, s * 0.3, rnd)}" fill="${tint(base, 0.35)}" opacity="0.8"/>`;
    } else if (kind === 2) {
      // ほし(手描きの5角)
      const pts = [];
      for (let k = 0; k < 10; k++) {
        const rad = (k % 2 === 0 ? s : s * 0.45) * (1 + (rnd() * 2 - 1) * 0.12);
        const a = (k / 10) * Math.PI * 2 - Math.PI / 2 + rnd() * 0.1;
        pts.push(`${(x + Math.cos(a) * rad).toFixed(1)} ${(y + Math.sin(a) * rad).toFixed(1)}`);
      }
      parts += stroke(`M ${pts.join(" L ")} Z`, c, 2.5);
    } else if (kind === 3) {
      // ぐるぐる
      let d = `M ${x.toFixed(1)} ${y.toFixed(1)}`;
      const turns = 2.2 + rnd();
      for (let a = 0.3; a < Math.PI * 2 * turns; a += 0.4) {
        const rr = (a / (Math.PI * 2 * turns)) * s * (1 + (rnd() * 2 - 1) * 0.06);
        d += ` L ${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`;
      }
      parts += stroke(d, c, 2.5);
    } else {
      // なみなみ
      const rot = (rnd() * 60 - 30).toFixed(0);
      let d = `M ${(x - s).toFixed(1)} ${y.toFixed(1)}`;
      for (let k = 0; k < 3; k++) {
        const step = (s * 2) / 3;
        d += ` q ${(step / 2).toFixed(1)} ${(k % 2 === 0 ? -s * 0.5 : s * 0.5).toFixed(1)} ${step.toFixed(1)} 0`;
      }
      parts += `<g transform="rotate(${rot} ${x.toFixed(1)} ${y.toFixed(1)})">${stroke(d, c, 2.5)}</g>`;
    }
  }

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${parts}</svg>`;
}

// ---------- 描画 ----------
function allTags() {
  const set = new Set();
  sites.forEach(s => (s.tags || []).forEach(t => set.add(t)));
  return ["すべて", ...set];
}

function renderTagBar() {
  const bar = document.getElementById("tag-bar");
  bar.innerHTML = "";
  allTags().forEach(tag => {
    const b = document.createElement("button");
    b.className = "tag-chip" + (tag === activeTag ? " active" : "");
    b.textContent = tag;
    b.onclick = () => { activeTag = tag; renderAll(); };
    bar.appendChild(b);
  });
}

function renderGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  sites.forEach((site, i) => {
    if (activeTag !== "すべて" && !(site.tags || []).includes(activeTag)) return;

    const card = document.createElement("article");
    card.className = "card" + (site.url ? "" : " pending");
    card.dataset.index = i;
    if (site.color) card.style.setProperty("--card-accent", site.color);

    // サムネイル
    const thumb = document.createElement("div");
    thumb.className = "card-thumb";
    if (site.image) {
      const img = document.createElement("img");
      img.src = /^https?:\/\//.test(site.image) ? site.image : "images/" + site.image;
      img.alt = site.title;
      img.onerror = () => { thumb.innerHTML = emblemSvg(site.title, site.color); };
      thumb.appendChild(img);
    } else {
      thumb.innerHTML = emblemSvg(site.title, site.color);
    }
    card.appendChild(thumb);

    // 本文
    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("div");
    title.className = "card-title";
    if (site.url) {
      const a = document.createElement("a");
      a.href = site.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = site.title;
      title.appendChild(a);
    } else {
      title.textContent = site.title;
      const badge = document.createElement("span");
      badge.className = "badge-pending";
      badge.textContent = "準備中";
      title.appendChild(badge);
    }
    body.appendChild(title);

    if (site.desc) {
      const desc = document.createElement("div");
      desc.className = "card-desc";
      desc.textContent = site.desc;
      body.appendChild(desc);
    }

    if (site.tags && site.tags.length) {
      const tagsEl = document.createElement("div");
      tagsEl.className = "card-tags";
      site.tags.forEach(t => {
        const el = document.createElement("span");
        el.className = "card-tag";
        el.textContent = t;
        tagsEl.appendChild(el);
      });
      body.appendChild(tagsEl);
    }
    card.appendChild(body);

    // フッター(共有ボタン)
    if (site.url && !editing) {
      const foot = document.createElement("div");
      foot.className = "card-footer";
      const copyBtn = document.createElement("button");
      copyBtn.textContent = "リンクをコピー";
      copyBtn.onclick = async (e) => {
        e.preventDefault();
        await navigator.clipboard.writeText(site.url);
        toast(`「${site.title}」のリンクをコピーしました`);
      };
      foot.appendChild(copyBtn);
      card.appendChild(foot);
    }

    // 編集モードの操作ボタン
    if (editing) {
      const ctrl = document.createElement("div");
      ctrl.className = "edit-controls";

      const editBtn = document.createElement("button");
      editBtn.textContent = "編集";
      editBtn.onclick = (e) => { e.preventDefault(); openDialog(i); };

      const upBtn = document.createElement("button");
      upBtn.textContent = "↑";
      upBtn.disabled = i === 0;
      upBtn.onclick = (e) => {
        e.preventDefault();
        [sites[i - 1], sites[i]] = [sites[i], sites[i - 1]];
        saveDraft(); renderAll();
      };

      const downBtn = document.createElement("button");
      downBtn.textContent = "↓";
      downBtn.disabled = i === sites.length - 1;
      downBtn.onclick = (e) => {
        e.preventDefault();
        [sites[i], sites[i + 1]] = [sites[i + 1], sites[i]];
        saveDraft(); renderAll();
      };

      const delBtn = document.createElement("button");
      delBtn.className = "danger";
      delBtn.textContent = "削除";
      delBtn.onclick = (e) => {
        e.preventDefault();
        if (confirm(`「${site.title}」を削除しますか?`)) {
          sites.splice(i, 1);
          saveDraft(); renderAll();
        }
      };

      ctrl.append(editBtn, upBtn, downBtn, delBtn);
      card.appendChild(ctrl);
    }

    grid.appendChild(card);
  });

  // 追加カード
  if (editing) {
    const add = document.createElement("button");
    add.className = "card-add";
    add.textContent = "＋ リンクを追加";
    add.onclick = () => openDialog(-1);
    grid.appendChild(add);
  }
}

function renderAll() {
  renderTagBar();
  renderGrid();
  updateDraftBar();
}

// ---------- 編集ダイアログ ----------
function openDialog(index) {
  editIndex = index;
  const site = index >= 0 ? sites[index] : { title: "", url: "", desc: "", tags: [], image: "", color: "" };
  document.getElementById("f-title").value = site.title;
  document.getElementById("f-url").value = site.url;
  document.getElementById("f-desc").value = site.desc || "";
  document.getElementById("f-tags").value = (site.tags || []).join(", ");
  document.getElementById("f-image").value = site.image || "";
  document.getElementById("f-color").value = site.color || "#dd8a6e";
  document.getElementById("f-color-none").dataset.none = site.color ? "" : "1";
  document.getElementById("dialog-title").textContent = index >= 0 ? "リンクを編集" : "リンクを追加";
  document.getElementById("edit-dialog").showModal();
}

function submitDialog() {
  const title = document.getElementById("f-title").value.trim();
  if (!title) { toast("タイトルを入れてください"); return; }
  const colorNone = document.getElementById("f-color-none").dataset.none === "1";
  const site = {
    title,
    url: document.getElementById("f-url").value.trim(),
    desc: document.getElementById("f-desc").value.trim(),
    tags: document.getElementById("f-tags").value.split(/[,、]/).map(t => t.trim()).filter(Boolean),
    image: document.getElementById("f-image").value.trim(),
    color: colorNone ? "" : document.getElementById("f-color").value
  };
  if (editIndex >= 0) sites[editIndex] = site;
  else sites.push(site);
  saveDraft();
  document.getElementById("edit-dialog").close();
  renderAll();
}

// ---------- ルーレット ----------
let rouletteRunning = false;
async function roulette() {
  if (rouletteRunning) return;
  const cards = [...document.querySelectorAll(".card:not(.pending)")];
  if (cards.length < 2) { toast("ルーレットするには公開中リンクが2つ以上必要"); return; }
  rouletteRunning = true;
  cards.forEach(c => c.classList.remove("roulette-winner"));

  const total = 14 + Math.floor(Math.random() * 6);
  let prev = null;
  for (let step = 0; step < total; step++) {
    let pick;
    do { pick = cards[Math.floor(Math.random() * cards.length)]; } while (pick === prev && cards.length > 1);
    prev?.classList.remove("roulette-active");
    pick.classList.add("roulette-active");
    prev = pick;
    // だんだん減速
    const delay = 60 + Math.pow(step / total, 2) * 340;
    await new Promise(r => setTimeout(r, delay));
  }
  prev.classList.remove("roulette-active");
  prev.classList.add("roulette-winner");
  prev.scrollIntoView({ behavior: "smooth", block: "center" });
  const title = sites[+prev.dataset.index]?.title || "";
  toast(`今日はこれ → 「${title}」`);
  rouletteRunning = false;
}

// ---------- トースト ----------
let toastTimer = null;
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

// ---------- 背景のらくがき(ゆっくり漂う) ----------
function startBackground() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let W, H, shapes;
  function resize() {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
    const count = Math.min(18, Math.floor((W * H) / 70000));
    shapes = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: 10 + Math.random() * 14,
      color: CRAYON_PALETTE[Math.floor(Math.random() * CRAYON_PALETTE.length)],
      vy: 0.06 + Math.random() * 0.12,     // ゆっくり上に漂う
      sway: Math.random() * Math.PI * 2,   // 横ゆれの位相
      swaySpeed: 0.003 + Math.random() * 0.005,
      rot: (Math.random() - 0.5) * 0.6,
      vr: (Math.random() - 0.5) * 0.004,
      kind: Math.floor(Math.random() * 4), // 0:まる 1:おひさま 2:ほし 3:なみなみ
      // 手描きのゆらぎ(毎フレーム変わるとチカチカするので固定で持つ)
      jit: Array.from({ length: 10 }, () => 1 + (Math.random() * 2 - 1) * 0.16)
    }));
  }
  resize();
  addEventListener("resize", resize);

  function wobblyPath(pts) {
    ctx.beginPath();
    ctx.moveTo((pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2);
    for (let i = 1; i <= pts.length; i++) {
      const p = pts[i % pts.length], q = pts[(i + 1) % pts.length];
      ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2);
    }
  }

  function drawShape(s) {
    ctx.save();
    ctx.translate(s.x + Math.sin(s.sway) * 16, s.y);
    ctx.rotate(s.rot);
    ctx.strokeStyle = s.color;
    ctx.fillStyle = s.color;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = 0.2;
    const z = s.size;
    if (s.kind === 0) {
      // ふにゃっとしたまる
      const pts = s.jit.slice(0, 8).map((j, i) => {
        const a = (i / 8) * Math.PI * 2;
        return [Math.cos(a) * z * 0.5 * j, Math.sin(a) * z * 0.5 * j];
      });
      wobblyPath(pts);
      ctx.closePath();
      ctx.stroke();
    } else if (s.kind === 1) {
      // おひさま
      ctx.beginPath();
      ctx.arc(0, 0, z * 0.4, 0, Math.PI * 2);
      ctx.stroke();
      for (let k = 0; k < 7; k++) {
        const a = (k / 7) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * z * 0.55 * s.jit[k], Math.sin(a) * z * 0.55 * s.jit[k]);
        ctx.lineTo(Math.cos(a) * z * 0.8, Math.sin(a) * z * 0.8);
        ctx.stroke();
      }
    } else if (s.kind === 2) {
      // ほし
      ctx.beginPath();
      for (let k = 0; k < 10; k++) {
        const rad = (k % 2 === 0 ? z * 0.6 : z * 0.27) * s.jit[k % s.jit.length];
        const a = (k / 10) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(a) * rad, py = Math.sin(a) * rad;
        k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    } else {
      // なみなみ
      ctx.beginPath();
      ctx.moveTo(-z, 0);
      const step = (z * 2) / 3;
      for (let k = 0; k < 3; k++) {
        ctx.quadraticCurveTo(
          -z + step * k + step / 2, (k % 2 === 0 ? -1 : 1) * z * 0.5 * s.jit[k],
          -z + step * (k + 1), 0
        );
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (const s of shapes) {
      s.y -= s.vy;
      s.sway += s.swaySpeed * 16;
      s.rot += s.vr * 16;
      if (s.y < -s.size * 2) { s.y = H + s.size * 2; s.x = Math.random() * W; }
      drawShape(s);
    }
    ctx.globalAlpha = 1;
    if (!reduced) requestAnimationFrame(frame);
  }
  frame(); // reduced-motion時は1フレームだけ描いて静止画にする
}

// ---------- 初期化 ----------
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("site-title").textContent = SITE_CONFIG.title;
  document.getElementById("site-subtitle").textContent = SITE_CONFIG.subtitle;
  document.title = SITE_CONFIG.title;

  document.getElementById("btn-roulette").onclick = roulette;

  document.getElementById("btn-edit").onclick = () => {
    editing = !editing;
    document.body.classList.toggle("editing", editing);
    document.getElementById("btn-edit").textContent = editing ? "✔ 編集を終える" : "✎ 編集";
    renderAll();
  };

  document.getElementById("btn-copy-links").onclick = async () => {
    await navigator.clipboard.writeText(generateLinksJs());
    toast("links.jsの中身をコピーしました。GitHubのlinks.jsに貼り付けて公開!");
  };

  document.getElementById("btn-discard").onclick = () => {
    if (confirm("下書きを破棄して公開中の内容に戻しますか?")) discardDraft();
  };

  document.getElementById("btn-dialog-save").onclick = (e) => { e.preventDefault(); submitDialog(); };
  document.getElementById("btn-dialog-cancel").onclick = (e) => {
    e.preventDefault();
    document.getElementById("edit-dialog").close();
  };
  document.getElementById("f-color").oninput = () => {
    document.getElementById("f-color-none").dataset.none = "";
  };
  document.getElementById("f-color-none").onclick = (e) => {
    e.preventDefault();
    e.target.dataset.none = "1";
    toast("共通色を使います");
  };

  startBackground();
  renderAll();
});
