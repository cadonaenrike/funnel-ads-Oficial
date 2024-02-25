import { useState } from "react";
import { FaLink } from "react-icons/fa";
import Image from "next/image";
import { FaRegCopy } from "react-icons/fa6";

export default function IntegrationSection() {
  const [activeTab, setActiveTab] = useState("Plataformas");
  const [showModal, setShowModal] = useState(false);
  const [platformsData, setPlatformsData] = useState([
    {
      name: "Eduzz",
      icon: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F6aa782829d4c1fd92d74182ab9d9a4e3.cdn.bubble.io%2Ff1701870707102x411486918136621200%2Feduzz.png?w=64&h=64&auto=compress&dpr=1&fit=max",
      link: "https://serve-qm5b.vercel.app/eduzz/webhook-eduzz",
    },
    {
      name: "Kiwify",
      icon: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F6aa782829d4c1fd92d74182ab9d9a4e3.cdn.bubble.io%2Ff1701871002033x232600001687086620%2Fkiwify.png?w=64&h=64&auto=compress&dpr=1&fit=max",
      link: "https://dashboard.kiwify.com.br/?onboarding=true",
    },
    {
      name: "Kirvano",
      icon: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F6aa782829d4c1fd92d74182ab9d9a4e3.cdn.bubble.io%2Ff1701870942356x419972233255450100%2Fkirvano.png?w=64&h=64&auto=compress&dpr=1&fit=max",
      link: "https://app.kirvano.com/settings",
    },
    {
      name: "Hotmart",
      icon: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F6aa782829d4c1fd92d74182ab9d9a4e3.cdn.bubble.io%2Ff1701870802130x932395330525367600%2Fhotmart.png?w=64&h=64&auto=compress&dpr=1&fit=max",
      link: "https://serve-qm5b.vercel.app/hotmart/webhook-hotmart",
    },
    {
      name: "Braip",
      icon: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F6aa782829d4c1fd92d74182ab9d9a4e3.cdn.bubble.io%2Ff1701869942854x842999583725314300%2Fbraip.png?w=64&h=64&auto=compress&dpr=1&fit=max",
      link: "https://ev.braip.com/register",
    },
    {
      name: "Monetize",
      icon: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F6aa782829d4c1fd92d74182ab9d9a4e3.cdn.bubble.io%2Ff1701871074223x110242293705470340%2Fmonetizze.png?w=64&h=64&auto=compress&dpr=1&fit=max",
      link: "https://serve-qm5b.vercel.app/monetizzer/webhook-monetizze",
    },
    {
      name: "Pepper",
      icon: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F6aa782829d4c1fd92d74182ab9d9a4e3.cdn.bubble.io%2Ff1701869855450x479592595486222600%2Fdefault%2520%25281%2529.jpg?w=64&h=64&auto=compress&dpr=1&fit=max",
      link: "https://pepper.com.br/login.html",
    },
  ]);

  const [apiData, setApiData] = useState([
    {
      name: "API 1",
      image:
        "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F6aa782829d4c1fd92d74182ab9d9a4e3.cdn.bubble.io%2Ff1701872393006x593436640615109900%2Fcartpanda.png?w=64&h=64&auto=compress&dpr=1&fit=max",
      link: "https://api1.example.com",
    },
    {
      name: "API 2",
      image:
        "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F6aa782829d4c1fd92d74182ab9d9a4e3.cdn.bubble.io%2Ff1701872439648x188666949717217300%2Fnuvemshop.png?w=64&h=64&auto=compress&dpr=1&fit=max",
      link: "https://api2.example.com",
    },
    {
      name: "API 3",
      image:
        "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F6aa782829d4c1fd92d74182ab9d9a4e3.cdn.bubble.io%2Ff1701872421613x298961264483128300%2Ftray.png?w=64&h=64&auto=compress&dpr=1&fit=max",
      link: "https://api3.example.com",
    },
    {
      name: "API 4",
      image:
        "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F6aa782829d4c1fd92d74182ab9d9a4e3.cdn.bubble.io%2Ff1701872474365x353872189704246300%2Floja_integrada.png?w=64&h=64&auto=compress&dpr=1&fit=max",
      link: "https://api3.example.com",
    },
    // Adicione mais APIs conforme necessário
  ]);

  const [tagsData, setTagsData] = useState([
    {
      name: "ABANDONOU CARRINHO",
      image:
        "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F6aa782829d4c1fd92d74182ab9d9a4e3.cdn.bubble.io%2Ff1701869483814x731598548886547400%2Fabmax.png?w=64&h=64&auto=compress&dpr=1&fit=max",
    },
    {
      name: "IMPORT CONTACT",
      image:
        "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F6aa782829d4c1fd92d74182ab9d9a4e3.cdn.bubble.io%2Ff1701873589676x678517497187827200%2Fperfect-pay.png?w=64&h=64&auto=compress&dpr=1&fit=max",
    },
    {
      name: "IMPORTADO CSV",
      image:
        "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F6aa782829d4c1fd92d74182ab9d9a4e3.cdn.bubble.io%2Ff1701873567419x589796934438844700%2Fmonetizze.png?w=64&h=64&auto=compress&dpr=1&fit=max",
    },
  ]);

  // Função para copiar o link e mostrar o modal
  const copyToClipboardAndShowModal = (link: string) => {
    navigator.clipboard.writeText(link);
    setShowModal(true);

    // Após 5 segundos, fecha o modal
    setTimeout(() => {
      setShowModal(false);
    }, 5000);
  };

  return (
    <div className="p-5">
      {/* Abas */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`${
            activeTab === "Plataformas"
              ? "bg-gray-100 text-gray-700"
              : "bg-transparent text-gray-700"
          } flex-grow rounded-t-lg px-4 py-2 border-b-2 border-blue-200 hover:bg-gray-100 hover:text-gray-700 font-semibold hover:border-blue-200 transition-colors`}
          onClick={() => setActiveTab("Plataformas")}
        >
          Plataformas
        </button>
        <button
          className={`${
            activeTab === "API"
              ? "bg-gray-100 text-gray-700"
              : "bg-transparent text-gray-700"
          } flex-grow rounded-t-lg  px-8 py-2 border-b-2 border-blue-200 hover:bg-gray-100 hover:text-gray-700 hover:border-blue-200 font-semibold transition-colors`}
          onClick={() => setActiveTab("API")}
        >
          API
        </button>
        <button
          className={`${
            activeTab === "Tags"
              ? "bg-gray-100 text-gray-700"
              : "bg-transparent text-gray-700"
          } flex-grow px-0 rounded-t-lg  py-2 font-semibold border-b-2 border-blue-200 hover:bg-gray-100 hover:text-gray-700 hover:border-blue-200 transition-colors`}
          onClick={() => setActiveTab("Tags")}
        >
          Tag`s aplicadas automaticamente pelo sistema
        </button>
      </div>

      {/* Grid container */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Cards */}
        {activeTab === "Plataformas" &&
          platformsData.map((platform, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 space-y-0 bg-gray-100 p-2 rounded-md shadow-md`}
            >
              <Image
                className="rounded-md"
                src={platform.icon}
                alt={platform.name}
                width={52} // Aumentamos a largura da imagem para 72 pixels
                height={52} // Aumentamos a altura da imagem para 72 pixels
              />
              <div className="flex-grow pl-1">
                <h3 className="text-base font-semibold">{platform.name}</h3>
                <p className="text-sm   text-gray-500">
                  Clique aqui para copiar o link
                </p>
              </div>
              <button
                onClick={() => copyToClipboardAndShowModal(platform.link)}
                className="pr-4 text-gray-500 rounded-md transition-colors"
              >
                <FaRegCopy />
              </button>
            </div>
          ))}

        {activeTab === "API" &&
          apiData.map((api, index) => (
            <div
              key={index}
              className={`flex items-center justify-between bg-gray-100 space-x-6  p-2 rounded-lg shadow-md`}
            >
              <div className="w-12 h-12  relative rounded-md overflow-hidden">
                <Image
                  src={api.image}
                  alt={api.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-base font-medium">{api.name}</h3>
              </div>
              <button
                onClick={() => copyToClipboardAndShowModal(api.link)}
                className="p-2 text-gray-500 rounded-md"
              >
                <FaLink />
              </button>
            </div>
          ))}

        {activeTab === "Tags" &&
          tagsData.map((tag, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 bg-gray-100 p-2 rounded-lg shadow-md`}
            >
              {tag.image && (
                <div className="w-12 h-12 relative overflow-hidden rounded-md">
                  <Image
                    src={tag.image}
                    alt={tag.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-base font-medium">{tag.name}</h3>
              </div>
            </div>
          ))}
      </div>

      {/* Modal de Link Copiado */}
      {showModal && (
        <div className="fixed top-0 right-0 m-4 bg-green-400 text-white p-2 rounded-md shadow-md">
          LINK COPIADO COM SUCESSO
        </div>
      )}
    </div>
  );
}
