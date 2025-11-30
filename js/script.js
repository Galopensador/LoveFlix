// Dados (ajuste caminhos conforme seu projeto)
        const seasonsData = {
            0:{
                title: "Temporada de Pré-estreia",
                images: [
                    { src: "images/pre-estreia/foto1.jpeg", caption: "Nosso primeiro dia juntos." },
                    { src: "images/pre-estreia/foto2.jpeg", caption: "Sorrisos que marcaram o início." }
                ]
            },
            1: {
                title: "Temporada 1 — Dezembro 2024",
                images: [
                    { src: "images/dezembro/foto1.jpeg", caption: "Nosso primeiro mês oficial juntos. ❤️" }
                ]
            },
            2: {
                title: "Temporada 2 — Janeiro 2025",
                images: [
                    { src: "images/janeiro/foto1.jpeg", caption: "Começando 2025 com a melhor companhia." },
                    { src: "images/janeiro/foto2.jpeg", caption: "Cada dia mais apaixonado por você. " }
                ]
            },
            3: {
                title: "Temporada 3 — Fevereiro 2025",
                images: [
                    { src: "images/fevereiro/foto1.jpeg", caption: "Mais encontros, mais histórias pra guardar." }
                ]
            },
            4: {
                title: "Temporada 4 — Março 2025",
                images: [
                    { src: "images/marco/foto1.jpeg", caption: "A rotina já tem espaço pra nós dois." }
                ]
            },
            5: {
                title: "Temporada 5 — Abril 2025",
                images: [
                    { src: "images/abril/foto1.jpeg", caption: "Cada foto vira um episódio favorito." }
                ]
            },
            6: {
                title: "Temporada 6 — Maio 2025",
                images: [
                    { src: "images/maio/foto1.jpeg", caption: "Momentos simples que viram lembranças gigantes." }
                ]
            },
            7: {
                title: "Temporada 7 — Junho 2025",
                images: [
                    { src: "images/junho/foto1.jpeg", caption: "Frio lá fora, calor aqui com você." }
                ]
            },
            8: {
                title: "Temporada 8 — Julho 2025",
                images: [
                    { src: "images/julho/foto1.jpeg", caption: "Sorrisos bobos e fotos improvisadas." }
                ]
            },
            9: {
                title: "Temporada 9 — Agosto 2025",
                images: [
                    { src: "images/agosto/foto1.jpeg", caption: "Chamadas, conversas e saudades registradas." }
                ]
            },
            10: {
                title: "Temporada 10 — Setembro 2025",
                images: [
                    { src: "images/setembro/foto1.jpeg", caption: "Planejando o que ainda vem pela frente." }
                ]
            },
            11: {
                title: "Temporada 11 — Outubro 2025",
                images: [
                    { src: "images/outubro/foto1.jpeg", caption: "Nosso primeiro aniversário de namoro! 🎉" }
                ]
            },
            12: {
                title: "Temporada 12 — Novembro 2025",
                images: [
                    { src: "images/novembro/foto1.jpeg", caption: "Fechando o primeiro ano da nossa série favorita. 🎊" },
                    { src: "images/novembro/foto2.jpeg", caption: "E que venham muitos episódios mais!" }
                ]
            }
        };

        // elementos
        const seasonButtons = document.querySelectorAll(".season-card");
        const galleryTitle = document.getElementById("gallery-title");
        const galleryGrid = document.getElementById("gallery-grid");
        const gallerySubtitle = document.getElementById("gallery-subtitle");

        const lightbox = document.getElementById("lightbox");
        const lightboxInner = document.querySelector(".lightbox-inner");
        const lightboxTitle = document.getElementById("lightbox-title");
        const lightboxImg = document.getElementById("lightbox-img");
        const lightboxCaption = document.getElementById("lightbox-caption");
        const lightboxCloseBtn = document.getElementById("lightbox-close");
        const prevBtn = document.getElementById("lightbox-prev");
        const nextBtn = document.getElementById("lightbox-next");

        // estado atual para navegação
        let currentSeasonId = null;
        let currentIndex = 0;

        function openSeason(seasonId) {
            const data = seasonsData[seasonId];

            currentSeasonId = seasonId;
            currentIndex = 0;

            if (!data) {
                galleryTitle.textContent = "Temporada sem álbum configurado ainda";
                galleryGrid.innerHTML = '<p class="empty-gallery">Ops! Ainda não coloquei as fotos deste mês aqui. Mas logo essa temporada ganha episódios. 😉</p>';
                return;
            }

            galleryTitle.textContent = data.title;
            galleryGrid.innerHTML = "";

            if (!data.images || !Array.isArray(data.images) || data.images.length === 0) {
                showNoPhotosMessage();
                return;
            }

            let loadedImagesCount = 0;
            let hasAnyImageLoaded = false;

            data.images.forEach((photo, index) => {
                const card = document.createElement("button");
                card.className = "photo-card";
                card.type = "button";
                card.setAttribute("data-index", index);

                card.innerHTML = `
            <img src="${photo.src}" alt="${photo.caption || "Foto"}" 
                 onload="handleImageLoad()" 
                 onerror="handleImageError(this)">
            <span class="photo-caption">${photo.caption || ""}</span>
        `;

                card.addEventListener("click", () => {
                    openLightboxAt(index);
                });

                galleryGrid.appendChild(card);
            });

            // Funções para controlar o carregamento
            window.handleImageLoad = function () {
                loadedImagesCount++;
                hasAnyImageLoaded = true;

                // Se todas as imagens foram processadas e nenhuma carregou, mostra mensagem
                if (loadedImagesCount === data.images.length && !hasAnyImageLoaded) {
                    setTimeout(() => showNoPhotosMessage(), 100);
                }
            };

            window.handleImageError = function (imgElement) {
                loadedImagesCount++;

                // Oculta o card da imagem que falhou
                const card = imgElement.closest('.photo-card');
                if (card) {
                    card.style.display = 'none';
                }

                // Se todas as imagens foram processadas e nenhuma carregou, mostra mensagem
                if (loadedImagesCount === data.images.length && !hasAnyImageLoaded) {
                    setTimeout(() => showNoPhotosMessage(), 100);
                }
            };

            // Fallback: se depois de 2 segundos nenhuma imagem carregou, mostra mensagem
            setTimeout(() => {
                if (!hasAnyImageLoaded && loadedImagesCount === data.images.length) {
                    showNoPhotosMessage();
                }
            }, 2000);
        }

        // Função auxiliar para mostrar mensagem de sem fotos
        function showNoPhotosMessage() {
            galleryGrid.innerHTML = '<p class="empty-gallery">Essa temporada ainda está sem fotos, mas as memórias estão todas aqui comigo. 💭</p>';
        }

        // Abre lightbox em posição específica
        function openLightboxAt(index) {
            const data = seasonsData[currentSeasonId];
            if (!data || !data.images || !data.images[index]) return;

            currentIndex = index;
            showLightboxImage(currentIndex);

            // abrir visual
            lightbox.classList.remove("hidden");
            lightbox.setAttribute("aria-hidden", "false");

                        // pequeno atraso para permitir a animação
            setTimeout(() => {
                lightbox.classList.add("open");
                lightboxInner.classList.add("open");
            }, 10);
        }

        // mostra a imagem atual e atualiza estado das setas
        function showLightboxImage(idx) {
            const data = seasonsData[currentSeasonId];
            const photo = data.images[idx];
            lightboxTitle.textContent = data.title;
            lightboxImg.src = photo.src;
            lightboxImg.alt = photo.caption || "Foto em destaque";
            lightboxCaption.textContent = photo.caption || "";

            // setar desativado nas setas se for início/fim
            if (idx <= 0) prevBtn.classList.add("disabled"); else prevBtn.classList.remove("disabled");
            if (idx >= data.images.length - 1) nextBtn.classList.add("disabled"); else nextBtn.classList.remove("disabled");
        }

        function closeLightbox() {
            // iniciar animação de fechamento
            lightboxInner.classList.remove("open");
            // remover classe open do contêiner para não sobrescrever display:none
            lightbox.classList.remove("open");

            // aguardar término da transição antes de esconder (220ms conforme CSS)
            setTimeout(() => {
                lightbox.classList.add("hidden");
                lightbox.setAttribute("aria-hidden", "true");
                // limpar src depois de um tempo curto para evitar carregamento em background
                lightboxImg.src = "";
                lightboxCaption.textContent = "";
            }, 220);
        }

        // navegação
        prevBtn.addEventListener("click", () => {
            if (prevBtn.classList.contains("disabled")) return;
            const data = seasonsData[currentSeasonId];
            if (!data) return;
            currentIndex = Math.max(0, currentIndex - 1);
            showLightboxImage(currentIndex);
        });

        nextBtn.addEventListener("click", () => {
            if (nextBtn.classList.contains("disabled")) return;
            const data = seasonsData[currentSeasonId];
            if (!data) return;
            currentIndex = Math.min(data.images.length - 1, currentIndex + 1);
            showLightboxImage(currentIndex);
        });

        lightboxCloseBtn.addEventListener("click", () => closeLightbox());

        // fechar clicando fora do conteúdo
        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) closeLightbox();
        });

        // keyboard navigation: ESC fecha, left/right navegam
        document.addEventListener("keydown", (event) => {
            if (lightbox.classList.contains("hidden")) {
                return; // nada a fazer se lightbox fechado
            }
            if (event.key === "Escape") closeLightbox();
            if (event.key === "ArrowLeft") {
                const data = seasonsData[currentSeasonId];
                if (data && currentIndex > 0) {
                    currentIndex--;
                    showLightboxImage(currentIndex);
                }
            }
            if (event.key === "ArrowRight") {
                const data = seasonsData[currentSeasonId];
                if (data && currentIndex < data.images.length - 1) {
                    currentIndex++;
                    showLightboxImage(currentIndex);
                }
            }
        });

        // inicializa cliques de temporada
        seasonButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const seasonId = btn.getAttribute("data-season");
                openSeason(seasonId);
                document.querySelector(".gallery").scrollIntoView({ behavior: "smooth", block: "start" });
            });
        });

        // Se quiser abrir automaticamente a temporada 1 ao carregar:
        // openSeason(1);