// ============================================================
// APP LOGIC
// Progress is saved in the browser via localStorage — no
// backend needed. It's per-device: if a student switches
// computers, their stamps won't follow them. Good enough for
// a single-session classroom activity or personal practice.
// ============================================================

const STORAGE_KEY = "pasaporteELE_progress_v1";
const XP_PER_LEVEL = 300;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* corrupted or unavailable storage: fall back to defaults */ }
  return { completed: [], xp: 0, coins: 0 };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) { console.warn("No se pudo guardar el progreso:", e); }
}

let state = loadState();

function isUnlocked(mission) {
  if (mission.id === 1) return true;
  return state.completed.includes(mission.id - 1);
}
function isComplete(id) {
  return state.completed.includes(id);
}
function currentLevel() {
  return Math.floor(state.xp / XP_PER_LEVEL) + 1;
}

// ---------- Render: map nodes + connecting path ----------
function renderNodes() {
  const layer = document.getElementById("nodesLayer");
  layer.innerHTML = "";
  MISSIONS.forEach(m => {
    const unlocked = isUnlocked(m);
    const done = isComplete(m.id);
    const node = document.createElement("button");
    node.className = "node" + (done ? " done" : unlocked ? " unlocked" : " locked") + (m.isFinal ? " final" : "");
    node.style.top = m.position.top + "%";
    node.style.left = m.position.left + "%";
    node.style.setProperty("--delay", (m.id * 0.06) + "s");
    node.setAttribute("aria-label", `Misión ${m.id}: ${m.title}`);
    node.innerHTML = `
      <span class="node-ring"></span>
      <span class="node-badge">${done ? "✓" : unlocked ? m.id : "🔒"}</span>
      <span class="node-label">${m.emoji} ${m.title}</span>
      <span class="node-skills">${m.skills.join(" · ")}</span>
    `;
    node.addEventListener("click", () => handleNodeClick(m, node));
    layer.appendChild(node);
  });

  // dashed connecting path through node centers, in mission order
  const svgPath = document.getElementById("routePath");
  const pts = MISSIONS.map(m => `${m.position.left * 10},${m.position.top * 9}`);
  svgPath.setAttribute("d", "M " + pts.join(" L "));
}

function handleNodeClick(mission, nodeEl) {
  if (!isUnlocked(mission)) {
    nodeEl.classList.remove("shake");
    void nodeEl.offsetWidth; // restart animation
    nodeEl.classList.add("shake");
    showToast(`🔒 Completa la misión ${mission.id - 1} primero`);
    return;
  }
  nodeEl.classList.add("clicked");
  setTimeout(() => nodeEl.classList.remove("clicked"), 260);
  openMissionModal(mission);
}

// ---------- Render: passport stamps + progress ----------
function renderPassport(justCompletedId) {
  const grid = document.getElementById("stampGrid");
  grid.innerHTML = "";
  MISSIONS.forEach(m => {
    const done = isComplete(m.id);
    const slot = document.createElement("div");
    slot.className = "stamp-slot" + (done ? " filled" : "") + (m.id === justCompletedId ? " stamp-pop" : "");
    slot.innerHTML = done
      ? (m.badgeImg ? `<img src="${m.badgeImg}" alt="${m.badgeName}">` : m.badgeEmoji)
      : m.id;
    slot.title = done ? m.badgeName : `Misión ${m.id} — pendiente`;
    grid.appendChild(slot);
  });

  const pct = Math.round((state.completed.length / MISSIONS.length) * 100);
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressPct").textContent = pct + "%";
  animateCount("xpVal", state.xp);
  animateCount("coinVal", state.coins);
  animateCount("levelVal", currentLevel());
}

function animateCount(elId, target) {
  const el = document.getElementById(elId);
  el.textContent = target;
  el.classList.remove("bump");
  void el.offsetWidth;
  el.classList.add("bump");
}

function renderAll(justCompletedId) {
  renderNodes();
  renderPassport(justCompletedId);
}

// ---------- Modal content builders ----------
function youtubeEmbed(embedUrl) {
  return `<div class="video-wrap"><iframe src="${embedUrl}" title="video" frameborder="0" allowfullscreen loading="lazy"></iframe></div>`;
}

function renderResourceBlock(icon, title, resource) {
  if (!resource) {
    return `<section class="modal-section soon"><h3>${icon} ${title}</h3><p class="soon-text">✏️ Próximamente — añade el enlace en <code>missions-data.js</code></p></section>`;
  }
  let body = "";
  if (resource.type === "video") {
    body = youtubeEmbed(resource.embedUrl);
  } else if (resource.type === "audio") {
    body = `<div class="audio-wrap"><iframe src="${resource.embedUrl}" frameborder="0" allow="autoplay" loading="lazy"></iframe></div>`;
  } else if (resource.type === "iframe") {
    body = `<div class="embed-wrap"><iframe src="${resource.embedUrl}" frameborder="0" allowfullscreen loading="lazy"></iframe></div>`;
  } else if (resource.type === "link") {
    body = `<a class="activity-link" href="${resource.url}" target="_blank" rel="noopener">${resource.label} ↗</a>`;
  } else if (resource.type === "text") {
    body = "";
  }
  const note = resource.note || resource.instructions;
  return `
    <section class="modal-section">
      <h3>${icon} ${title}</h3>
      ${resource.type !== "video" && resource.type !== "iframe" ? `<p class="resource-label">${resource.label}</p>` : ""}
      ${body}
      ${note ? `<p class="resource-note">${note}</p>` : ""}
    </section>
  `;
}

// ---------- Modal ----------
const overlay = document.getElementById("modalOverlay");
const modalEl = document.getElementById("missionModal");

function openMissionModal(mission) {
  const done = isComplete(mission.id);
  modalEl.innerHTML = `
    <button class="modal-close" aria-label="Cerrar">✕</button>
    <div class="modal-header">
      <span class="modal-emoji">${mission.emoji}</span>
      <div>
        <h2>Misión ${mission.id}. ${mission.title}</h2>
        <span class="modal-skills">${mission.skills.join(" · ")}</span>
      </div>
    </div>

    <section class="modal-section">
      <h3>📚 Vocabulario</h3>
      <div class="vocab-chips">
        ${mission.vocab.map(v => `<span class="chip">${v}</span>`).join("")}
      </div>
    </section>

    ${renderResourceBlock("🎬", "Aprende", mission.aprende)}
    ${renderResourceBlock("🎯", "Practica", mission.practica)}
    ${renderResourceBlock("🎮", "Juega / Reto", mission.reto)}

    <section class="modal-section badge-section">
      <h3>🏅 Gana</h3>
      <div class="badge-preview">
        ${mission.badgeImg ? `<img src="${mission.badgeImg}" alt="${mission.badgeName}" class="badge-preview-img">` : `<span class="badge-preview-emoji">${mission.badgeEmoji}</span>`}
        <p>Insignia: <strong>${mission.badgeName}</strong> · +${mission.xp} XP</p>
      </div>
    </section>

    ${done
      ? `<div class="already-done">✓ Misión completada</div>`
      : `<button class="btn-complete" id="completeBtn">Ya terminé la actividad — ¡Marcar como completada!</button>`
    }
  `;

  modalEl.querySelector(".modal-close").addEventListener("click", closeModal);
  if (!done) {
    modalEl.querySelector("#completeBtn").addEventListener("click", () => completeMission(mission));
  }

  overlay.classList.add("open");
}

function closeModal() {
  overlay.classList.remove("open");
}
overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

function completeMission(mission) {
  if (isComplete(mission.id)) return;
  state.completed.push(mission.id);
  state.xp += mission.xp;
  state.coins += Math.round(mission.xp / 10);
  saveState();
  closeModal();
  renderAll(mission.id);
  burstConfetti();
  showToast(`${mission.badgeEmoji} ¡Insignia "${mission.badgeName}" conseguida! +${mission.xp} XP`);
}

// ---------- Confetti burst ----------
function burstConfetti() {
  const colors = ["#D9A441", "#2F6B3C", "#1E7A93", "#C1443A", "#F3E5C0"];
  for (let i = 0; i < 22; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = "50%";
    piece.style.top = "40%";
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--tx", (Math.random() * 2 - 1) * 260 + "px");
    piece.style.setProperty("--ty", (Math.random() * -200 - 60) + "px");
    piece.style.setProperty("--rot", (Math.random() * 720 - 360) + "deg");
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1100);
  }
}

// ---------- Toast ----------
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

// ---------- Reset ----------
document.getElementById("resetBtn").addEventListener("click", () => {
  if (confirm("¿Reiniciar todo el progreso del pasaporte?")) {
    state = { completed: [], xp: 0, coins: 0 };
    saveState();
    renderAll();
  }
});

// ---------- Nav placeholders ----------
document.querySelectorAll("[data-soon]").forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    showToast(`🚧 Sección "${a.dataset.soon}" próximamente`);
  });
});

// ---------- Intro welcome video ----------
const introVideoBtn = document.getElementById("introVideoBtn");
if (introVideoBtn) {
  introVideoBtn.addEventListener("click", () => {
    modalEl.innerHTML = `
      <button class="modal-close" aria-label="Cerrar">✕</button>
      <div class="modal-header"><span class="modal-emoji">🎬</span><h2>${INTRO_VIDEO.label}</h2></div>
      ${youtubeEmbed(INTRO_VIDEO.embedUrl)}
    `;
    modalEl.querySelector(".modal-close").addEventListener("click", closeModal);
    overlay.classList.add("open");
  });
}

renderAll();
