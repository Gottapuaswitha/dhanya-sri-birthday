
/* =========================================
   DHANYA SRI BIRTHDAY WEBSITE
   Main BGM + Popup BGM + Video sound control
========================================= */

// MUSIC VOLUME SETTINGS
const POPUP_BGM = "assets/music/popup-bgm.mp3";

const MAIN_MUSIC_VOLUME = 0.65;    // Normal website BGM: 65%
const DUCKED_MUSIC_VOLUME = 0.04;  // Photo popup: main BGM 4%
const POPUP_MUSIC_VOLUME = 0.65;   // Popup BGM: 65%

// DOM ELEMENTS
const familyGrid = document.getElementById("familyGrid");
const galleryGrid = document.getElementById("galleryGrid");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalMedia = document.getElementById("modalMedia");
const modalNote = document.getElementById("modalNote");
const backgroundMusic = document.getElementById("bgm");
const musicToggle = document.getElementById("musicToggle");

let musicIsPlaying = false;
let popupAudio = null;

// If BGM was playing before a video started, resume it after the video pauses/ends.
let resumeMusicAfterVideo = false;


/* =========================================
   FAMILY DATA
========================================= */

const families = [

{
  title: "Thathamma",
  caption: "A lifetime of blessings and unconditional love. ♡",
  kind: "photo",
  photo: "assets/photos/nanamma.jpg",
  song: "assets/music/bahubali.mpeg",
  note: "Your loving words, warm hugs, and endless blessings make our family more beautiful. You are a precious treasure in our lives, Thathamma. Love you always! 💗♡",
},
  {
    title: "Amma & Nanna",
    caption: "The first home, the forever love.",
    kind: "photo",
    photo: "assets/photos/anitha & jagan.jpg",
    song: "assets/music/pop_bgm.mpeg",
    note: "Your first heroes, your forever safe place. ♡",
  },
  {
    title: "Nannamma & Tatayya",
    caption: "Blessings wrapped in a hug.",
    kind: "photo",
    photo: "assets/photos/nannamma.jpeg",
    song: "assets/music/bgm.mpeg",
    note: "Their love and blessings are treasures for a lifetime. ♡",
  },
  {
    title: "Ammamma & Tatayya",
    caption: "Old stories, endless affection.",
    kind: "video",
    video: "assets/videos/ammamma and tatayya.mp4",
    note: "A lifetime of love, stories and warm hugs. ♡",
  },
  {
    title: "Pinnis",
    caption: "Extra love, extra laughter.",
    kind: "video",
    video: "assets/videos/pinni.mp4",
    note: "Every moment with you is full of fun and love. ♡",
  },
  {
    title: "Mamas",
    caption: "Big smiles, bigger hearts.",
    kind: "video",
    video: "assets/videos/mama.mp4",
    note: "The ones who make every family moment more special. ♡",
  },
  {
    title: "Annayyas",
    caption: "Partners in fun & mischief.",
    kind: "video",
    video: "assets/videos/annayya.mp4",
    note: "May the jokes, memories and brotherly love never end. ♡",
  },
  {
    title: "Akka's",
    caption: "My first friend, my forever protector. ♡",
    kind: "video",
    video: "assets/videos/akka.mp4",
    note: "From silly fights to endless laughs, every memory with you is special. Thank you for your love, care, and all the beautiful moments, Akka. You will always have a special place in our hearts. 💗♡",
  },
  {
    title: "Bava & Vadina",
    caption: "A bond full of warmth.",
    kind: "photo",
    photo: "assets/photos/bava and vadina.jpeg",
    song: "assets/music/nanne.mpeg",
    note: "Sending you all their love on your special day. ♡",
  },
];


/* =========================================
   GALLERY PHOTOS
   Replace these sample files with your photos.
========================================= */

const galleryPhotos = [
  {
    caption: "A little sunshine",
    file: "assets/photos/1st day.jpg",
    fallback: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=85",
  },
  {
    caption: "Family hugs",
    file: "assets/photos/dhanya sri.jpg",
    fallback: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=85",
  },
  {
    caption: "Sweet memories",
    file: "assets/photos/dhanya sri 2.jpg",
    fallback: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=85",
  },
  {
    caption: "Little celebrations",
    file: "assets/photos/dhanya sri 3.jpg",
    fallback: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=85",
  },
  {
    caption: "Smiles forever",
    file: "assets/photos/dhanya sri 4.jpg",
    fallback: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=85",
  },
  {
    caption: "Our happy place",
    file: "assets/photos/dhanya sri 5.jpg",
    fallback: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=85",
  },
  {
    caption: "All the love",
    file: "assets/photos/dhanya sri 7.jpg",
    fallback: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85",
  },
  {
    caption: "Birthday magic",
    file: "assets/photos/dhanya sri 9.jpg",
    fallback: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85",
  },
    {
    caption: "Little moments, big love",
    file: "assets/photos/dhanya sri 8.jpg",
    fallback: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=85",
  },
  {
    caption: "Forever our sunshine",
    file: "assets/photos/dhanya sri 10.jpg",
    fallback: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=85",
  },
  {
    caption: "Memories to treasure",
    file: "assets/photos/dhanya sri 6.jpg",
    fallback: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=85",
  },
  {
    caption: "Our precious Chinni Thalli",
    file: "assets/photos/dhanuu.jpg",
    fallback: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=85",
  },
];


/* =========================================
   PAGE NAVIGATION
========================================= */

function go(pageNumber) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.id === `page${pageNumber}`);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if ([2, 4, 5, 6].includes(pageNumber)) {
    burstHearts(5);
  }
}

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    go(Number(button.dataset.go));
  });
});


/* =========================================
   UNLOCK THE WEBSITE
========================================= */

const unlockForm = document.getElementById("unlockForm");
const nameInput = document.getElementById("secretName");
const nameHint = document.getElementById("nameHint");

unlockForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const typedName = nameInput.value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  if (typedName === "dhanya sri" || typedName === "dhanyasri") {
    nameHint.textContent =
      "Unlocked with love! Happy Birthday, Chinni Thalli ♡";

    go(2);
    startBackgroundMusic();
  } else {
    nameHint.textContent = "Hint: Type Dhanya Sri exactly ♡";
    burstHearts(5);
  }
});


/* =========================================
   MEDIA PLACEHOLDER
========================================= */

function showMediaPlaceholder(container, title, type, filename) {
  const placeholder = document.createElement("div");
  placeholder.className = "media-placeholder";

  const icon = document.createElement("span");
  icon.className = "placeholder-icon";
  icon.textContent = type === "video" ? "▶" : "♡";

  const heading = document.createElement("strong");
  heading.textContent =
    type === "video" ? "Add your family video" : "Add your family photo";

  const path = document.createElement("small");
  path.textContent = filename;

  placeholder.append(icon, heading, path);
  placeholder.setAttribute("role", "img");
  placeholder.setAttribute("aria-label", `${title}: add ${filename}`);

  container.replaceChildren(placeholder);
}


/* =========================================
   BACKGROUND MUSIC HELPERS
========================================= */

// Stop the main BGM without forgetting the visitor's music preference.
function pauseMainMusicForVideo() {
  if (!backgroundMusic) return;

  if (musicIsPlaying && !backgroundMusic.paused) {
    resumeMusicAfterVideo = true;
  }

  backgroundMusic.pause();
}

// Resume music only if it was playing before the video started.
function resumeMainMusicAfterVideo() {
  if (!backgroundMusic || !resumeMusicAfterVideo) return;

  resumeMusicAfterVideo = false;

  if (!musicIsPlaying) return;

  // If the video was inside a popup, resume at a lower volume.
  backgroundMusic.volume = modal.classList.contains("open")
    ? DUCKED_MUSIC_VOLUME
    : MAIN_MUSIC_VOLUME;

  backgroundMusic.play().catch((error) => {
    console.warn("Main music could not resume:", error);
  });
}

function duckBackgroundMusic() {
  if (musicIsPlaying && !backgroundMusic.paused) {
    backgroundMusic.volume = DUCKED_MUSIC_VOLUME;
  }
}

function restoreBackgroundMusic() {
  if (!backgroundMusic || !musicIsPlaying) return;

  // Do not restart the music while a video is playing.
  const playingVideo = document.querySelector(
    ".page.active video:not(.family-preview-video), #modal video"
  );

  if (playingVideo && !playingVideo.paused && !playingVideo.ended) {
    return;
  }

  backgroundMusic.volume = MAIN_MUSIC_VOLUME;

  if (backgroundMusic.paused) {
    backgroundMusic.play().catch((error) => {
      console.warn("Main music could not resume:", error);
    });
  }
}


/* =========================================
   VIDEO SOUND CONTROL
   Video plays = background music stops.
========================================= */

function attachVideoSoundControl(video) {
  // Do not apply this to the tiny muted family-card previews.
  if (video.classList.contains("family-preview-video")) return;

  video.volume = 1;

  video.addEventListener("play", () => {
    pauseMainMusicForVideo();
    stopPopupAudio();
  });

  video.addEventListener("pause", () => {
    // Wait until the video has actually stopped.
    if (video.ended) return;
    resumeMainMusicAfterVideo();
  });

  video.addEventListener("ended", () => {
    resumeMainMusicAfterVideo();
  });
}

// Page 5 / Page 6 videos that already exist in index.html.
document.querySelectorAll(".page video").forEach((video) => {
  attachVideoSoundControl(video);
});


/* =========================================
   FAMILY CARDS
========================================= */

function renderFamilyCards() {
  familyGrid.replaceChildren();

  families.forEach((family) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "family-card";

    const mediaWrap = document.createElement("div");
    mediaWrap.className = "family-photo";

    if (family.kind === "video") {
      const preview = document.createElement("video");

      preview.className = "family-preview-video";
      preview.src = family.video;
      preview.muted = true;
      preview.loop = true;
      preview.autoplay = true;
      preview.playsInline = true;
      preview.preload = "metadata";

      preview.addEventListener("error", () => {
        showMediaPlaceholder(
          mediaWrap,
          family.title,
          "video",
          family.video
        );
      }, { once: true });

      mediaWrap.appendChild(preview);

      const badge = document.createElement("span");
      badge.className = "family-video-badge";
      badge.textContent = "▶ VIDEO";
      mediaWrap.appendChild(badge);
    } else {
      const image = document.createElement("img");

      image.src = family.photo;
      image.alt = family.title;
      image.loading = "lazy";

      image.addEventListener("error", () => {
        showMediaPlaceholder(
          mediaWrap,
          family.title,
          "photo",
          family.photo
        );
      }, { once: true });

      mediaWrap.appendChild(image);
    }

    const info = document.createElement("div");
    info.className = "family-info";

    const small = document.createElement("small");
    small.textContent = "Open a memory ♡";

    const heading = document.createElement("h3");
    heading.textContent = family.title;

    const caption = document.createElement("p");
    caption.textContent = family.caption;

    info.append(small, heading, caption);
    card.append(mediaWrap, info);

    card.addEventListener("click", () => {
      openFamilyMemory(family);
    });

    familyGrid.appendChild(card);
  });
}


/* =========================================
   PHOTO GALLERY
========================================= */

function renderGallery() {
  galleryGrid.replaceChildren();

  galleryPhotos.forEach((photo) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "gallery-item";

    const image = document.createElement("img");
    image.src = photo.file;
    image.alt = photo.caption;
    image.loading = "lazy";

    image.addEventListener("error", () => {
      image.src = photo.fallback;
    }, { once: true });

    const caption = document.createElement("span");
    caption.textContent = `${photo.caption} ♡`;

    card.append(image, caption);

    card.addEventListener("click", () => {
      openGalleryPhoto(image.currentSrc || image.src, photo.caption);
    });

    galleryGrid.appendChild(card);
  });
}


/* =========================================
   POPUP MUSIC
========================================= */

function stopPopupAudio() {
  if (popupAudio) {
    popupAudio.pause();
    popupAudio.currentTime = 0;
    popupAudio = null;
  }
}

function playPopupMusic(preferredTrack) {
  stopPopupAudio();

  const tracks = [
    ...new Set([preferredTrack, POPUP_BGM].filter(Boolean)),
  ];

  let trackIndex = 0;

  function tryTrack() {
    if (trackIndex >= tracks.length) {
      console.warn("Could not play any popup music track.");
      return;
    }

    const track = tracks[trackIndex++];
    const audio = new Audio(track);

    audio.loop = true;
    audio.volume = POPUP_MUSIC_VOLUME;
    popupAudio = audio;

    function tryFallback() {
      if (popupAudio !== audio) return;

      audio.pause();
      popupAudio = null;
      tryTrack();
    }

    audio.addEventListener("error", tryFallback, { once: true });

    audio.play().catch(() => {
      tryFallback();
    });
  }

  tryTrack();
}


/* =========================================
   OPEN FAMILY MEMORY
========================================= */

function openFamilyMemory(family) {
  duckBackgroundMusic();
  stopPopupAudio();

  modalTitle.textContent = `${family.title} ♡`;
  modalMedia.replaceChildren();
  modalNote.textContent = family.note;

  if (family.kind === "video") {
    const video = document.createElement("video");

    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.volume = 1;
    video.src = family.video;

    // Stop BGM whenever this popup video starts.
    attachVideoSoundControl(video);

    video.addEventListener("error", () => {
      showMediaPlaceholder(
        modalMedia,
        family.title,
        "video",
        family.video
      );

      modalNote.textContent = `Add your video file here: ${family.video}`;
    }, { once: true });

    modalMedia.appendChild(video);
    showModal();

    video.play().catch(() => {
      // If autoplay is blocked, the visitor can press Play.
    });
  } else {
    const image = document.createElement("img");

    image.src = family.photo;
    image.alt = family.title;

    image.addEventListener("error", () => {
      showMediaPlaceholder(
        modalMedia,
        family.title,
        "photo",
        family.photo
      );
    }, { once: true });

    modalMedia.appendChild(image);
    showModal();

    // Photo popup: quiet main BGM + louder popup BGM.
    playPopupMusic(family.song || POPUP_BGM);
  }
}


/* =========================================
   OPEN GALLERY PHOTO
========================================= */

function openGalleryPhoto(source, caption) {
  duckBackgroundMusic();
  stopPopupAudio();

  modalTitle.textContent = `${caption} ♡`;
  modalMedia.replaceChildren();
  modalNote.textContent = "A little moment to keep forever. ✨";

  const image = document.createElement("img");
  image.src = source;
  image.alt = caption;

  modalMedia.appendChild(image);
  showModal();

  playPopupMusic(POPUP_BGM);
}


/* =========================================
   MODAL OPEN / CLOSE
========================================= */

function showModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  document.getElementById("modalClose").focus();
}

function closeModal() {
  // Remember if the visitor had music on before closing.
  const videos = modalMedia.querySelectorAll("video, audio");

  videos.forEach((media) => {
    media.pause();
  });

  stopPopupAudio();

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  // Restore main BGM if it was on before the video/popup.
  restoreBackgroundMusic();
}

document.getElementById("modalClose").addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});


/* =========================================
   MAIN WEBSITE MUSIC
========================================= */

function startBackgroundMusic() {
  backgroundMusic.volume = MAIN_MUSIC_VOLUME;

  backgroundMusic.play()
    .then(() => {
      musicIsPlaying = true;
      musicToggle.textContent = "♫ Music: On";

      if (nameHint) {
        nameHint.textContent = "Surprise opened with music ♡";
      }
    })
    .catch((error) => {
      musicIsPlaying = false;
      musicToggle.textContent = "♫ Music: Tap to play";

      if (nameHint) {
        nameHint.textContent =
          "Surprise opened ♡ Music did not start. Check the main music file, then tap Music.";
      }

      console.warn("Background music could not start:", error);
    });
}

backgroundMusic.addEventListener("error", () => {
  musicIsPlaying = false;
  musicToggle.textContent = "♫ Music: Check file";

  if (nameHint) {
    nameHint.textContent =
      "Main music file not found or unsupported. Check the audio src in index.html.";
  }

  console.error("Could not load the main background music.");
});

musicToggle.addEventListener("click", async () => {
  if (musicIsPlaying) {
    // Visitor chooses to turn music off.
    backgroundMusic.pause();
    musicIsPlaying = false;
    resumeMusicAfterVideo = false;
    musicToggle.textContent = "♫ Music: Off";
    return;
  }

  // Do not start BGM while a real video is playing.
  const playingVideo = document.querySelector(
    ".page.active video:not(.family-preview-video), #modal video"
  );

  if (playingVideo && !playingVideo.paused && !playingVideo.ended) {
    musicToggle.textContent = "♫ Video playing";
    return;
  }

  try {
    backgroundMusic.volume = modal.classList.contains("open")
      ? DUCKED_MUSIC_VOLUME
      : MAIN_MUSIC_VOLUME;

    await backgroundMusic.play();

    musicIsPlaying = true;
    resumeMusicAfterVideo = false;
    musicToggle.textContent = "♫ Music: On";
  } catch (error) {
    musicToggle.textContent = "♫ Music: Check file";

    alert(
      "Check that your main music file exists and is supported."
    );
  }
});


/* =========================================
   FLOATING HEARTS
========================================= */

function burstHearts(count = 5) {
  const symbols = ["♡", "♥", "✧", "💕"];

  for (let index = 0; index < count; index += 1) {
    const heart = document.createElement("span");

    heart.className = "float-heart";
    heart.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.fontSize = `${17 + Math.random() * 22}px`;
    heart.style.animationDuration = `${5 + Math.random() * 4}s`;

    document.body.appendChild(heart);

    window.setTimeout(() => {
      heart.remove();
    }, 9500);
  }
}


/* =========================================
   INITIALIZE WEBSITE
========================================= */

renderFamilyCards();
renderGallery();
burstHearts(10);

window.setInterval(() => {
  if (Math.random() > 0.35) {
    burstHearts(1);
  }
}, 2100);
