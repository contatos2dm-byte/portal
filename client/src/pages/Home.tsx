import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface NFT {
  id: number;
  titulo: string;
  tipo: string;
  emoji: string;
  data: string;
  descricao: string;
  hash: string;
  blockchain: string;
  autor: string;
  link_ouvir: string | null;
  link_download: string | null;
}

interface Projeto {
  id: number;
  titulo: string;
  emoji: string;
  status: string;
  data_inicio: string;
  descricao: string;
  impacto: string;
  link: string | null;
}

interface Event {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  categoria: string;
  emoji: string;
}

interface Ajuda {
  total_arrecadado: string;
  total_convertido: string;
  beneficiarios: string;
  projetos_apoiados: string;
  acoes: Array<{
    id: number;
    titulo: string;
    descricao: string;
    data: string;
    valor: string;
    beneficiarios: string;
  }>;
}

// Mapeamento de categorias para cores
const categoryColors: Record<string, string> = {
  nft: "#8b5a8e",
  arte: "#e74c3c",
  musica: "#3498db",
  produto: "#27ae60",
  doacao: "#f39c12",
  noticia: "#9b59b6",
};

const categoryLabels: Record<string, string> = {
  nft: "NFT",
  arte: "Arte",
  musica: "Música",
  produto: "Produto",
  doacao: "Doação",
  noticia: "Notícia",
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [ajudas, setAjudas] = useState<Ajuda | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [eventsRes, nftsRes, projetosRes, ajudasRes] = await Promise.all([
          fetch("/events.json"),
          fetch("/nfts.json"),
          fetch("/projetos.json"),
          fetch("/ajudas.json"),
        ]);

        const eventsData = await eventsRes.json();
        const nftsData = await nftsRes.json();
        const projetosData = await projetosRes.json();
        const ajudasData = await ajudasRes.json();

        setEvents(eventsData);
        setNfts(nftsData);
        setProjetos(projetosData);
        setAjudas(ajudasData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (loading || !containerRef.current) return;

    // --- CENA 3D ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    containerRef.current.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(light);

    // --- FUNDO ESTRELADO ---
    const starsGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 1500; i++) {
      const x = THREE.MathUtils.randFloatSpread(60);
      const y = THREE.MathUtils.randFloatSpread(60);
      const z = THREE.MathUtils.randFloatSpread(60);
      starVertices.push(x, y, z);
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.01 });
    const stars = new THREE.Points(starsGeometry, starMaterial);
    scene.add(stars);

    // --- ESPIRAL DE DNA ---
    const turns = 10;
    const points = 400;
    const radius = 1.2;
    const height = 10;

    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const geometry1 = new THREE.BufferGeometry();
    const geometry2 = new THREE.BufferGeometry();
    const vertices1 = [], vertices2 = [];

    const nodes = [];

    // Usar eventos como artefatos
    const artifacts = events.slice(0, 12).map((event) => ({
      name: event.titulo,
      color: categoryColors[event.categoria] || "#ffffff",
      emoji: event.emoji,
      category: event.categoria,
    }));

    for (let i = 0; i < points; i++) {
      const t = (i / points) * Math.PI * 2 * turns;
      const y = (i / points) * height - height / 2;
      const x1 = radius * Math.cos(t);
      const z1 = radius * Math.sin(t);
      const x2 = -radius * Math.cos(t);
      const z2 = -radius * Math.sin(t);

      vertices1.push(x1, y, z1);
      vertices2.push(x2, y, z2);

      if (i % 35 === 0 && artifacts.length > 0) {
        const art = artifacts[(i / 35) % artifacts.length];
        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.1, 16, 16),
          new THREE.MeshStandardMaterial({
            color: art.color,
            emissive: art.color,
            emissiveIntensity: 0.6,
          })
        );
        sphere.position.set(x1, y, z1);
        sphere.userData = art;
        scene.add(sphere);
        nodes.push(sphere);
      }
    }

    geometry1.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices1, 3)
    );
    geometry2.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices2, 3)
    );

    const line1 = new THREE.Line(geometry1, material);
    const line2 = new THREE.Line(geometry2, material);
    scene.add(line1);
    scene.add(line2);

    camera.position.z = 8;
    camera.position.y = 1;

    // --- ANIMAÇÃO ---
    function animate() {
      requestAnimationFrame(animate);
      scene.rotation.y += 0.01;
      stars.rotation.y += 0.001;
      renderer.render(scene, camera);
    }
    animate();

    // --- RESPONSIVIDADE ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [loading, events]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Carregando arquivo vivo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Canvas 3D */}
      <div ref={containerRef} className="w-full h-screen relative overflow-hidden" />

      {/* Legenda */}
      <div className="absolute top-4 right-6 text-sm leading-relaxed space-y-1 z-20 bg-black/70 backdrop-blur-md p-4 rounded-xl border border-white/20">
        <h2 className="text-lg font-semibold mb-2 text-white/90">Categorias e Cores:</h2>
        <ul className="space-y-1">
          {Object.entries(categoryColors).map(([key, color]) => (
            <li key={key}>
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: color }}
              ></span>
              <b>{categoryLabels[key]}</b>: {getDescription(key)}
            </li>
          ))}
        </ul>
      </div>

      {/* Seção de Conteúdo */}
      <div className="relative z-10 bg-gradient-to-b from-transparent via-black to-black">
        {/* NFTs Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Obras Certificadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft) => (
              <div
                key={nft.id}
                className="bg-white/5 border border-white/20 rounded-lg p-6 hover:bg-white/10 transition-all"
              >
                <div className="text-3xl mb-3">{nft.emoji}</div>
                <h3 className="text-xl font-semibold mb-2">{nft.titulo}</h3>
                <p className="text-sm text-gray-300 mb-4">{nft.descricao}</p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>
                    <span className="font-semibold">Tipo:</span> {nft.tipo}
                  </p>
                  <p>
                    <span className="font-semibold">Autor:</span> {nft.autor}
                  </p>
                  <p>
                    <span className="font-semibold">Data:</span> {nft.data}
                  </p>
                  <p>
                    <span className="font-semibold">Blockchain:</span> {nft.blockchain}
                  </p>
                  <p className="break-all">
                    <span className="font-semibold">Hash:</span> {nft.hash.substring(0, 32)}...
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  {nft.link_ouvir && (
                    <a
                      href={nft.link_ouvir}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                    >
                      Ouvir
                    </a>
                  )}
                  {nft.link_download && (
                    <a
                      href={nft.link_download}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                    >
                      Download
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projetos Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Projetos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projetos.map((projeto) => (
              <div
                key={projeto.id}
                className="bg-white/5 border border-white/20 rounded-lg p-6 hover:bg-white/10 transition-all"
              >
                <div className="text-3xl mb-3">{projeto.emoji}</div>
                <h3 className="text-2xl font-semibold mb-2">{projeto.titulo}</h3>
                <p className="text-sm text-gray-300 mb-4">{projeto.descricao}</p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>
                    <span className="font-semibold">Status:</span> {projeto.status}
                  </p>
                  <p>
                    <span className="font-semibold">Desde:</span> {projeto.data_inicio}
                  </p>
                  <p>
                    <span className="font-semibold">Impacto:</span> {projeto.impacto}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Doações Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Movimentos de Doação</h2>
          {ajudas && (
            <div className="bg-white/5 border border-white/20 rounded-lg p-8 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <p className="text-sm text-gray-400">Total Arrecadado</p>
                  <p className="text-2xl font-bold">{ajudas.total_arrecadado}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Convertido em</p>
                  <p className="text-2xl font-bold">{ajudas.total_convertido}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Beneficiários</p>
                  <p className="text-2xl font-bold">{ajudas.beneficiarios}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Projetos Apoiados</p>
                  <p className="text-2xl font-bold">{ajudas.projetos_apoiados}</p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4">Ações Realizadas</h3>
              <div className="space-y-4">
                {ajudas.acoes.map((acao) => (
                  <div key={acao.id} className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold mb-1">{acao.titulo}</h4>
                    <p className="text-sm text-gray-300 mb-2">{acao.descricao}</p>
                    <div className="text-xs text-gray-400 flex justify-between">
                      <span>
                        <span className="font-semibold">Data:</span> {acao.data}
                      </span>
                      <span>
                        <span className="font-semibold">Valor:</span> {acao.valor}
                      </span>
                      <span>
                        <span className="font-semibold">Beneficiários:</span> {acao.beneficiarios}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-white/20 py-8 px-6 text-center text-gray-400">
          <p>© 2025 Coletivo Dois de Muitos. Todos os registros são públicos e transparentes.</p>
          <p className="mt-2">Hospedado no GitHub Pages • Dados alimentados via JSON</p>
        </footer>
      </div>
    </div>
  );
}

function getDescription(category: string): string {
  const descriptions: Record<string, string> = {
    nft: "Registros de propriedade intelectual",
    arte: "Obras visuais e criativas",
    musica: "Composições e áudios",
    produto: "Itens da loja e ateliê",
    doacao: "Ações sociais e arrecadações",
    noticia: "Anúncios e marcos importantes",
  };
  return descriptions[category] || "";
}
