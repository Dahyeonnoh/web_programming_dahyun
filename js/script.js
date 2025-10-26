$(document).ready(function () {
  $(".bubble1_img, .bubble2_img, .bubble3_img, .bubble4_img, .bubble5_img").on(
    "click",
    function () {
      const $this = $(this);
      if ($this.data("popping")) return;
      $this.data("popping", true);

      const container = $(".image-container");
      const pos = $this.position();
      const centerX = pos.left + $this.width() / 2;
      const centerY = pos.top + $this.height() / 2;

      for (let i = 0; i < 15; i++) {
        const fragment = $("<div class='bubble_fragment'></div>");
        const x = (Math.random() - 0.5) * 330;
        const y = (Math.random() - 0.5) * 330;

        fragment.css({
          "--x": `${x}px`,
          "--y": `${y}px`,
          left: centerX,
          top: centerY,
        });

        container.append(fragment);
        fragment.on("animationend", () => fragment.remove());
      }

      const popSound = document.getElementById("bubbleSound");
      popSound.currentTime = 0;
      popSound.play();

      $this.addClass("pop");
      $this.one("animationend", function () {
        $this.css({ visibility: "hidden", pointerEvents: "none" });
        $this.removeClass("pop");
        setTimeout(function () {
          $this.css({
            visibility: "visible",
            pointerEvents: "auto",
            animation: "bubbleReappear 1s ease-out",
          });
          setTimeout(function () {
            $this.css("animation", "");
            $this.data("popping", false);
          }, 1000);
        }, 1800);
      });
    }
  );

  const sosukec = document.getElementById("sosukec");
  const ponyo = document.querySelector(".ponyo_img");
  const sosuke = document.getElementById("sosuke");
  const boat = document.querySelector(".boat_img");
  const bucketWrapper = document.querySelector(".bucket_wrapper");

  sosukec.addEventListener("mouseenter", () => {
    sosukec.classList.add("hovered");
  });

  sosukec.addEventListener("mouseleave", () => {
    sosukec.classList.remove("hovered");
  });

  sosukec.addEventListener("click", () => {
    sosukec.style.transition = "transform 0.2s ease";
    sosukec.classList.remove("hovered");
    sosukec.style.transform = "scale(1)";

    ponyo.classList.add("fly");

    const flySound = document.getElementById("ponyoFlySound");
    flySound.currentTime = 0.3;
    flySound.play();
    setTimeout(() => flySound.pause(), 1600);

    function onPonyoAnimEnd(e) {
      if (e.animationName === "ponyoFly") {
        ponyo.style.opacity = "1";
        ponyo.classList.remove("fly");
        ponyo.classList.add("floating");
        ponyo.removeEventListener("animationend", onPonyoAnimEnd);
      }
    }
    ponyo.addEventListener("animationend", onPonyoAnimEnd);

    setTimeout(() => {
      sosukec.style.display = "none";
      sosuke.style.display = "block";

      sosuke.classList.add("jump");
      bucketWrapper.classList.add("jump");
      boat.classList.add("tilt");
    }, 1000);
  });
});
