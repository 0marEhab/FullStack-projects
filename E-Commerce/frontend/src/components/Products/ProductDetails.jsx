import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import summaryApi from "../../common";

export default function ProductDetails() {
  const { productName } = useParams();

  const [product, setProduct] = useState(null);
  const [isOpen, setIsOpen] = useState({
    section1: false,
    section2: false,
    section3: false,
  });
  const [notFound, setNotFound] = useState(false); // New state to track if product is not found

  const toggleAccordion = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `${summaryApi.detailedProduct.url}/${productName}`
        );
        if (response.status === 404) {
          setNotFound(true); // Set notFound to true if product is not found
          return;
        }
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetails();
  }, [productName]);

  if (notFound) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <p className="text-5xl font-bold text-black opacity-70">
          Product not found! :(
        </p>
      </div>
    );
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-10 md:my-20 mx-auto px-4 py-8 bg-transparent">
      <div className="flex flex-col justify-around md:flex-row">
        <div className="md:ml-20">
          <img
            src={product.image}
            alt="Product Image"
            className="object-contain w-[600px] h-[400px] flex justify-center items-center rounded-xl"
          />
        </div>
        <div className="md:w-1/2 ml-4">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex justify-between">
            <span className="text-gray-700 font-bold text-xl mb-10">
              ${product.price}
            </span>
          </div>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="mb-4">
            <ul className="mt-8">
              <li className="text-xl my-2 mx-6 list-disc">
                stock: {product.stock}
              </li>
              <li className="text-xl my-2 mx-6 list-disc">
                category: {product.category.name}
              </li>
            </ul>
          </div>

          <div className="md:mt-20">
            <button className="bg-red-600 hover:bg-red-700 duration-100 text-white px-4 py-2 rounded-md w-[300px]">
              Buy Now
            </button>
          </div>

          <div id="accordion-collapse" className="mt-10">
            {/* First Section */}
            <h2>
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-gray-200 rounded-t-xl focus:ring-1 focus:ring-gray-800  hover:bg-gray-300 duration-200 gap-3"
                onClick={() => toggleAccordion("section1")}
                aria-expanded={isOpen.section1}
              >
                <span>Feature</span>
                <svg
                  className={`w-3 h-3 ${isOpen.section1 ? "rotate-180" : ""}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            {isOpen.section1 && (
              <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-200">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  iPhone 13 features a cinema standard wide color gamut,
                  displaying colors just as filmmakers intended. And with
                  precise color accuracy, everything on the screen looks
                  remarkably natural The lightning fast a15 bionic powers
                  cinematic mode photographic styles live text and more its
                  secure enclave locks down personal info like your face id data
                  and contacts We designed a totally new architecture and turned
                  the lenses 45 degrees to fit in our best dual camera system
                  ever with its biggest wide camera sensor we also made room for
                  our sensor shift optical image stabilization Voice control
                  voice over zoom magnifier rtt and tty support siri and
                  dictation type to siri switch control closed captions
                  assistive touch speak screen back tap A more vivid oled
                  display that’s both easier to see in full sunlight and power
                  efficient with a durable design that’s water and dust
                  resistant Audio Calling: FaceTime Audio, Voice over LTE
                  (VoLTE), Wi‑Fi Calling, Spatial Audio, Voice Isolation and
                  Wide Spectrum Microphone Modes; Video Calling: FaceTime Video
                  Calling Over Cellular or Wi‑Fi, FaceTime HD (1080p) Video
                  Calling Over 5G or Wi-Fi, Portrait mode in FaceTime Video,
                  Spatial Audio, Voice Isolation and Wide Spectrum Microphone
                  Modes, Zoom with rear-facing Camera; MagSafe: Magnet array,
                  Alignment Magnet, Accessory Identification NFC, Magnetometer
                  Facetime is available on the product & would be accessible in
                  regions where facetime is permitted by telecom operators
                </p>
              </div>
            )}

            {/* Second Section */}
            <h2>
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-gray-200  focus:ring-1 focus:ring-gray-800  hover:bg-gray-300 duration-200 gap-3"
                onClick={() => toggleAccordion("section2")}
                aria-expanded={isOpen.section1}
              >
                <span>Shipping & Returns</span>
                <svg
                  className={`w-3 h-3 ${isOpen.section1 ? "rotate-180" : ""}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            {isOpen.section2 && (
              <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-200">
                <ul className="mb-2 text-gray-500 dark:text-gray-400">
                  <li>
                    TRUSTED SHIPPING: Free shipping when you spend EGP 200 and
                    above
                  </li>
                  <li>SECURE SHOPPING: Your data is always protected</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
