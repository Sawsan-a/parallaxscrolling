// ScrollTrigger anmelden (ohne startet Animation nicht durch Scrollen, sondern durch Laden der Seite)
gsap.registerPlugin(ScrollTrigger);

/* ----------------- STAGE 1 --------------*/
//Er animiert ein Element mit der Klasse .cake-start
gsap.to(".cake-start", {
  scrollTrigger: {
    trigger: ".cake-start", //Dies ist das Element, das die Animation auslöst
    scrub: true, // Dies aktiviert den “Scrubbing”-Modus für die Animation
    start: "top top", //Dies ist die Startposition der Animation relativ zum Trigger-Element.
    end: "bottom top", //Dies ist die Endposition der Animation relativ zum Trigger-Element.
  },
  y: -150, //Dies ist der vertikale Abstand, den das Element während der Animation zurücklegt
  duration: 10, //Dies ist die Dauer der Animation in Sekunden
});

gsap.from(".erdbeere", {
  scrollTrigger: {
    trigger: ".cake-start",
    scrub: true,
    start: "top bottom",
  },
  x: () =>
    viewPortWidth(
      -0.9
    ) /*Dies ist der horizontale Abstand, den das Element während der Animation zurücklegt. Die Funktion viewPortWidth() wird verwendet, um den Abstand relativ zur Breite des Viewports zu berechnen.*/,
  duration: 1,
});

const introAnimation = () => {
  const introText =
    document.querySelector(
      ".einleitungs-text"
    ); /*Der Code definiert eine Funktion namens introAnimation(), die ein Element mit der Klasse .einleitungs-text animiert. Das Element wird in der Variable introText gespeichert.*/
  gsap.from(introText, {
    scrollTrigger: {
      trigger: ".cake-start",
      start: "top bottom",
      scrub: true,
    },
    x: () => viewPortWidth(0.6),
    duration: 3,
  });
};

introAnimation();

/* ---------------ENDE STAGE 1 --------------*/

/* ---------------- STAGE 2 --------------- */
// Warten auf das Laden der DOM-Struktur, bevor die Funktion ausgeführt wird
document.addEventListener("DOMContentLoaded", function () {
  // Setzen der Ausgangszustände für die Elemente
  gsap.set(".left-box", { opacity: 0, y: "100%" });
  gsap.set(".right-box", { opacity: 0, y: "100%" });
  gsap.set(".image-box img", { opacity: 0, y: "100%" });
  gsap.set(".utensilien-image img", { opacity: 0, y: "100%" });

  // Animation für den Zutatenkasten
  ScrollTrigger.create({
    trigger: ".left-box, .image-box img", // beide Elemente werden gleichzeitig animiert
    start: "top 88%",
    end: "top 50%",
    scrub: true, // Sanfte Animation basierend auf dem Scrollverhalten
    // Callback-Funktion, die beim Eintreten in den Auslöserbereich ausgeführt wird
    onEnter: () => {
      // Animation für die Sichtbarkeit und Position von Zutatenkasten und Icons
      gsap.to(".left-box", { opacity: 1, y: 0, duration: 1 });
      gsap.to(".image-box img", { opacity: 1, y: 0, duration: 1 });
    },
    // Callback-Funktion, die beim Zurückscrollen aus dem Auslöserbereich ausgeführt wird
    onLeaveBack: () => {
      // Animation von beiden wieder auszublenden und nach unten zu verschieben
      gsap.to(".left-box", { opacity: 0, y: "100%", duration: 1 });
      gsap.to(".image-box img", { opacity: 0, y: "100%", duration: 1 });
    },
  });

  // Animation für die Zutaten Icons
  ScrollTrigger.create({
    trigger: ".left-box",
    start: "top 77%",
    end: "top 50%",
    scrub: true,
    onEnter: () => {
      gsap.to(".image-box img", {
        rotation: -6, // Rotationseffekt der Bilder
        duration: 0.5, // Dauer der Animation
        repeat: -1, // Wiederholung der Animation (-1 bedeutet unendlich)
        yoyo: true, // Hin- und Herbewegung der Animation
        ease: "power2.out", // Animation zu Beginn relativ schnell beschleunigt und wird dann allmählich verlangsamt
      });
    },
    onLeaveBack: () => {
      gsap.to(".image-box img", { rotation: 0, duration: 0.1 }); // Zurücksetzen der Rotation der Bilder
    },
  });

  // Animation für die Utensilien Icons - dasselbe wie bei den Zutaten Icons
  ScrollTrigger.create({
    trigger: ".right-box",
    start: "top 88%",
    end: "top 10%",
    scrub: true,
    onEnter: () => {
      gsap.to(".utensilien-image img", {
        rotation: -6,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.out",
      });
    },
    onLeaveBack: () => {
      gsap.to(".utensilien-image img", { rotation: 0, duration: 0.1 });
    },
  });

  // Animation für den Utensilienkasten - dasselbe wie bei dem Zutatenkasten
  ScrollTrigger.create({
    trigger: ".right-box, .utensilien-image img",
    start: "top 85%",
    scrub: true,
    onEnter: () => {
      gsap.to(".right-box", { opacity: 1, y: 0, duration: 1 });
      gsap.killTweensOf(".image-box img"); // Stoppt den Wackeleffekt der Zutaten Icons
      gsap.to(".utensilien-image img", { opacity: 1, y: 0, duration: 1 });
    },
    onLeaveBack: () => {
      gsap.to(".right-box", { opacity: 0, y: "100%", duration: 1 });
      gsap.to(".utensilien-image img", { opacity: 0, y: "100%", duration: 1 });
    },
  });
});

/* ---------------- ENDE STAGE 2 --------------- */
/* ---------------- STAGE 3 ------------------- */

const ofenElement = document.querySelector(".ofen");

const tl4 = gsap.timeline({
  // Timeline für Animation erstellen

  scrollTrigger: {
    trigger: ".stage3", // Auslöserelement für den ScrollTrigger
    start: "top bottom", // Startpunkt des Auslöserelements
    end: "bottom top", // Endpunkt des Auslöserelements
    scrub: 1, // Aktiviertert das smoothe Scrollen der Animation
    pin: true, // Auslöserelement wird oben am Viewpoint angeheftet
    pinSpacing: false, // Verwendet die Maße anstatt des Margins für Positionierung
    toggleActions: "play none none reverse", // Define actions to take when scrolling away from the trigger element
    onUpdate: (self) => {
      // Updatefunktion, die bei jedem Scrollereignnis aufgerufen wird
      const progress = self.progress; // Aktueller Fortschritt des ScrollTriggers
      const isVisible = progress > 0 && progress < 1; // Überprüft, ob das Auslöserelement sichtbar ist

      console.log(progress); // Ausgabe des Fortschritts im Konsolen-Log

      if (progress < 0.2) {
        // Wenn Fortschritt kleiner als 0.2 ist, animiere das Element von unten in der Mitte
        ofenElement.style.transform = `translate(-50%, ${
          (1 - progress * 2) * 100
        }%)`;
      } else if (isVisible) {
        // Wenn das Auslöserelement sichtbar ist, bleibe in der Mitte positioniert
        ofenElement.style.transform = `translate(-50%, 0%)`;
      } else {
        // Ansonsten animierte das Element von der Mitte nach rechts
        ofenElement.style.transform = `translate(${
          (progress - 0.5) * 400
        }%, 0%)`;
      }
    },
  },
});

/* ----------------- ENDE STAGE 3 ------------------- */

/* ---------------- STAGE 4 ------------------- */

// Timeline für 1. Abschnitt erstellen
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".stage4",
    start: "top top", // Start der Animation, wenn Stage vollständig den Bildschirm betreten hat
    // top des Trigger-Elements ".stage4" erreicht top des Viewports
    end: "bottom top",
    scrub: 3, // Animation wird an der Position der Scrollbar ausgerichtet --> durch Zahl wird Animation smoother (Element bewegt sich nach)
    pin: true, // Container-Element (".stage4") wird an seine Position im viewport gepinnt & scrollt nicht mit
    // --> frame bleibt so lange gepinnt bis alle Animationen der Timeline durchgelaufen sind
    pinSpacing: true,
    // fügt padding unterhalb des Elements hinzu, das gepinnt wird , so dass das folgende Element nicht gekreuzt wird
    toggleActions: "restart   complete      reverse          reset",
    //              onEnter | onLeave | onEnterBack | onLeaveBack
  },
});

tl.to(".stage4 .ueberschrift1", {
  x: () => viewPortWidth(0.65),
  duration: 6000,
});
tl.to(".stage4 .ueberschrift1", { duration: 6000 });
tl.to(".stage4 .ueberschrift1", { y: -100, opacity: 0, duration: 4000 });
tl.to(".stage4 .text1", { opacity: 1, duration: 200 });
tl.to(".stage4 .eier", {
  x: () => viewPortWidth(0.3),
  opacity: 1, // Element wird sichtbar
  duration: 4000,
})
  .to(".stage4 .eier", {
    x: () => getMiddleX(".schuessel"),
    y: () => getMiddleY(".schuessel"),
    duration: 6000,
  })
  .to(".stage4 .eier", {
    opacity: 0,
    duration: 2,
  })
  .to(".stage4 .salz", {
    x: () => viewPortWidth(0.3),
    opacity: 1,
    duration: 3000,
  })
  .to(".stage4 .salz", {
    x: () => getMiddleX(".schuessel"),
    y: () => getMiddleY(".schuessel"),
    duration: 6000,
  })
  .to(".stage4 .salz", {
    opacity: 0,
    duration: 2,
  });
tl.to(".stage4 .zucker", {
  x: () => viewPortWidth(0.3),
  opacity: 1,
  duration: 3000,
})
  .to(".stage4 .zucker", {
    x: () => getMiddleX(".schuessel"),
    y: () => getMiddleY(".schuessel"),
    duration: 6000,
  })
  .to(".stage4 .zucker", {
    opacity: 0,
    duration: 2,
  });
tl.to(".stage4 .text1", { opacity: 0, duration: 200 });

tl.to(".stage4 .text2", { opacity: 1, duration: 2000 });
tl.to(".stage4 .text2", { duration: 8000 });
tl.to(".stage4 .text2", { opacity: 0, duration: 2000 });

tl.to(".stage4 .text3", { opacity: 1, duration: 600 });

tl.to(".stage4 .mehl", {
  x: () => viewPortWidth(0.3),
  opacity: 1,
  duration: 3000,
})
  .to(".stage4 .mehl", {
    x: () => getMiddleX(".schuessel"),
    y: () => getMiddleY(".schuessel"),
    duration: 6000,
  })
  .to(".stage4 .mehl", {
    opacity: 0,
    duration: 2,
  });
tl.to(".stage4 .backpulver", {
  x: () => viewPortWidth(0.3),
  opacity: 1,
  duration: 3000,
})
  .to(".stage4 .backpulver", {
    x: () => getMiddleX(".schuessel"),
    y: () => getMiddleY(".schuessel"),
    duration: 6000,
  })
  .to(".stage4 .backpulver", {
    opacity: 0,
    duration: 2,
  });
tl.to(".stage4 .text3", { opacity: 0, duration: 200 });

// Stage 4-2

// Erstellen einer 2. Timeline für den nächsten Abschnitt aus Stage4
const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".stage4-2",
    start: "top top", // Start der Animation, wenn Stage vollständig den Bildschirm betreten hat
    // top des Trigger-Elements ".stage4-2" erreicht top des Viewports
    end: "bottom top",
    scrub: 3, // Animation wird an der Position der Scrollbar ausgerichtet --> durch Zahl wird Animation smoother (Element bewegt sich nach)
    pin: true, // Container-Element (".stage4-2") wird an seine Position im viewport gepinnt & scrollt nicht mit
    // --> frame bleibt so lange gepinnt bis alle Animationen der Timeline durchgelaufen sind
    pinSpacing: true,
    // fügt padding unterhalb des Elements hinzu, das gepinnt wird , so dass das folgende Element nicht gekreuzt wird
    toggleActions: "restart   complete      reverse          reset",
    //              onEnter | onLeave | onEnterBack | onLeaveBack
  },
});

tl2.to(".stage4-2 .form-fuellen1", {
  x: 700,
  y: 850,
  opacity: 1,
  duration: 4000,
});
tl2.to(".stage4-2 .text4", { y: () => viewPortHeight(-0.7), duration: 2000 });
tl2.to(".stage4-2 .text4", { duration: 1000 });
tl2.to(".stage4-2 .form-fuellen1", {
  opacity: 0,
  duration: 50,
});
tl2.to(".stage4-2 .form-fuellen2", {
  opacity: 1,
  duration: 1000,
});
tl2.to(".stage4-2 .form-fuellen2", { duration: 2000 });
tl2.to(".stage4-2 .form-fuellen2", {
  opacity: 0,
  duration: 50,
});
tl2.to(".stage4-2 .form-fuellen3", {
  opacity: 1,
  duration: 1000,
});
tl2.to(".stage4-2 .form-fuellen3", { duration: 1000 });

// Stage 4-3

// Erstellen einer 3. Timeline für den letzten Abschnitt aus Stage4
const tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".stage4-3",
    start: "top top", // Start der Animation, wenn Stage vollständig den Bildschirm betreten hat
    // top des Trigger-Elements ".stage4-3" erreicht top des Viewports
    end: "bottom top",
    scrub: 3, // Animation wird an der Position der Scrollbar ausgerichtet --> durch Zahl wird Animation smoother (Element bewegt sich nach)
    pin: true, // Container-Element (".stage4-3") wird an seine Position im viewport gepinnt & scrollt nicht mit
    // --> frame bleibt so lange gepinnt bis alle Animationen der Timeline durchgelaufen sind
    pinSpacing: true,
    // fügt padding unterhalb des Elements hinzu, das gepinnt wird , so dass das folgende Element nicht gekreuzt wird
    toggleActions: "restart   complete      reverse          reset",
    //              onEnter | onLeave | onEnterBack | onLeaveBack
  },
});

tl3.to(".stage4-3 .backen-zeit", {
  x: () => viewPortWidth(0.4),
  opacity: 1,
  duration: 4000,
});
tl3.to(".stage4-3 .text5", {
  y: () => viewPortHeight(-0.8), // Bewegung nach oben
  duration: 2000,
});
tl3.to(".stage4-3 .text5", { duration: 1000 });
tl3.to(".stage4-3 .backen-zeit", {
  x: () => viewPortWidth(-0.4),
  duration: 3000,
});
tl3.to(".stage4-3 .text6", {
  y: () => viewPortHeight(-0.5),
  duration: 1000,
});
tl3.to(".stage4-3 .text6", { duration: 2000 });

// Funktionen:

// View Port Breite ermitteln
function viewPortWidth(faktor) {
  const width = window.innerWidth;

  return width * faktor; // man kann als Parameter einen Faktor angeben, mit dem die Breite des Viewports multipliziert wird
  // Ideal: 0 < faktor < 1 --> Position irgendwo innerhalb des Viewports
}
// View Port Höhe ermitteln
function viewPortHeight(faktor) {
  const height = window.innerHeight;

  return height * faktor; // man kann als Parameter einen Faktor angeben, mit dem die Breite des Viewports multipliziert wird
  // Ideal: 0 < faktor < 1 --> Position irgendwo innerhalb des Viewports
}

// Funktion um Mitte in x-Richtung des angegebenen Elements zu ermitteln
function getMiddleX(classname) {
  const element = document.querySelector(classname);

  if (!element) return 0; // wenn das Element nicht existiert

  const centerX = element.offsetLeft + element.offsetWidth * 0.4; // centerX = (Position Ecke oben links) + (~ Hälfte der Breite des Elements)
  return centerX;
}

// Funktion um Mitte in y-Richtung des angegebenen Elements zu ermittel
function getMiddleY(classname) {
  const element = document.querySelector(classname);

  if (!element) return 0; // wenn das Element nicht existiert

  const centerY = element.offsetTop + element.offsetHeight / 2; // centerY = (Position Ecke oben links) + (Hälfte der Höhe des Elements)
  return centerY - 170; // minimale Anpassung der Position
}

/* ---------------- ENDE STAGE 4 --------------- */

/* ---------------- STAGE 5 --------------- */

/* ------------ Ende STAGE 5 ---------------- */
function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
    y = direction * 100;
  // Überprüfen, ob das Element eine Klasse für den Eingang von links hat
  if (elem.classList.contains("text_fromLeft")) {
    x = -100;
    y = 0;
    // Überprüfen, ob das Element eine Klasse für den Eingang von rechts hat
  } else if (elem.classList.contains("text_fromRight")) {
    x = 100;
    y = 0;
  }
  // Das Element wird verschoben und ausgeblendet
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(
    // Verwendung der GSAP-Bibliothek, um die Animation durchzuführen
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 1.25,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "expo",
      overwrite: "auto",
    }
  );
}
// Diese Funktion blendet ein Element aus
function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}
// Sobald das DOM vollständig geladen ist, werden die ScrollTrigger-Plugin registriert und die Animationen eingerichtet
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".text").forEach(function (elem) {
    hide(elem);

    ScrollTrigger.create({
      // Das Element wird zum Trigger für die Animation
      trigger: elem,
      markers: false,
      // Beim Betreten des Viewports wird das Element animiert
      onEnter: function () {
        animateFrom(elem);
      },
      // Beim Rückwärts-Scrollen wird das Element in umgekehrter Richtung animiert
      onEnterBack: function () {
        animateFrom(elem, -1);
      },
      // Beim Verlassen des Viewports wird das Element ausgeblendet
      onLeave: function () {
        hide(elem);
      },
    });
  });
});

/* ------------ STAGE 6 ---------------- */
/* horizontale Bewegung von Container CakeLayers*/
gsap.to(".CakeLayers", {
  yPercent: -30,
  scrollTrigger: {
    trigger: ".CakeLayers",
    scrub: true,
  },
});

/* Funktion um Texte zu animieren je nach Position (rechtsliegender oder linksliegender Text)*/

function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
    y = direction * 100;
  if (elem.classList.contains("left schritt")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("right schritt")) {
    x = 100;
    y = 0;
  }
  /* Verschiebung wird in CSS festgelegt*/
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0"; // nicht sichtbar
  /* Bewegung von gerade geänderter Position zur ursprünglicher Position */
  gsap.fromTo(
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 5,
      x: 0,
      y: 0,
      autoAlpha: 1, // sichtbar
      ease: "expo", // Bewegung steuern
      overwrite: "auto", // automatische Überschreibung zeitgleicher Animationen auf demselben Element
    }
  );
}

/* Jedes Textelement wird animiert durch den Aufrufe der animateFrom()-Funktion*/
gsap.utils.toArray(".CakeLayers p").forEach(function (elem) {
  hide(elem); // Aufruf Funktion hide()
  /* erstellen eines ScrollTrigger für jedes Textelement */
  ScrollTrigger.create({
    trigger: elem,
    onEnter: function () {
      animateFrom(elem);
    },
    onEnterBack: function () {
      animateFrom(elem, -1);
    },
    onLeave: function () {
      hide(elem);
    },
  });
});

/* Animation der Kuchenschichten, horizontale Bewegung der Schichten unterm Kuchentopping  */

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".layers",
      start: "top center",
      scrub: true,
    },
  })

  .from(".filling2", { y: innerHeight * 1.5, duration: 3 })
  .from(".bottom2", { y: innerHeight * 1.5, duration: 3 })
  .from(".filling1", { y: innerHeight * 1.5, duration: 3 })
  .from(".bottom1", { y: innerHeight * 1.5, duration: 3 });

/* ------------ ENDE STAGE 6 ---------------- */
/*Animation der Erdbeere , horizontale Bewegung*/
gsap.to(".endbeere", {
  yPercent: -50,
  scrollTrigger: {
    trigger: ".ende",
    scrub: true,
  },
});

/*Animation des Textes, vertikale Bewegung*/
gsap.to(".endtext", {
  opacity: 1,
  xPercent: 15,
  scrollTrigger: {
    trigger: ".ende",
    end: "top center",
    scrub: true,
  },
});
